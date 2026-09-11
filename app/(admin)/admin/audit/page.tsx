"use client";

import { useMemo, useState } from "react";
import { Search, FileText, User, Shield, DollarSign } from "lucide-react";
import {
  PageHeader,
  SectionCard,
  KpiTile,
  StatusTag,
  EmptyRow,
  DemoDataTag,
} from "@/components/shared/primitives";
import { auditLogs, type AuditLogRow } from "@/lib/admin-mock";

const statusTone: Record<AuditLogRow["status"], "good" | "bad" | "warn"> = {
  success: "good",
  failed: "bad",
  warning: "warn",
};

function getActionIcon(action: string) {
  if (action.startsWith("auth")) return User;
  if (action.startsWith("user")) return Shield;
  if (action.startsWith("subscription") || action.startsWith("payment")) return DollarSign;
  return FileText;
}

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      auditLogs.filter((log) => {
        const matchesSearch =
          log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.resource.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesAction = actionFilter === "all" || log.action.startsWith(actionFilter);
        const matchesStatus = statusFilter === "all" || log.status === statusFilter;
        return matchesSearch && matchesAction && matchesStatus;
      }),
    [searchQuery, actionFilter, statusFilter]
  );

  const failedCount = auditLogs.filter((l) => l.status === "failed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mandrok Admin · Security"
        title="Audit Logs"
        description="Every authenticated action taken across the platform, in order."
        actions={<DemoDataTag />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KpiTile label="Events (24h)" value="2,847" />
        <KpiTile label="Failed actions (24h)" value={String(failedCount)} sublabel="Needs review" />
        <KpiTile label="Active sessions" value="156" sublabel="Right now" />
      </div>

      <SectionCard padded={false}>
        <div className="grid grid-cols-1 gap-3 border-b border-[var(--mnd-hairline)] p-4 md:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mnd-steel-dim)]" />
            <input
              type="text"
              placeholder="Search logs…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mnd-input h-10 w-full pl-9 pr-3 text-sm"
            />
          </div>
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="mnd-input h-10 px-3 text-sm"
          >
            <option value="all">All actions</option>
            <option value="auth">Authentication</option>
            <option value="user">User management</option>
            <option value="estimate">Estimates</option>
            <option value="subscription">Subscriptions</option>
            <option value="payment">Payments</option>
            <option value="settings">Settings</option>
            <option value="file">File operations</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mnd-input h-10 px-3 text-sm"
          >
            <option value="all">All status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--mnd-hairline)] text-left">
                <th className="mnd-kicker px-5 py-3 font-medium">Timestamp</th>
                <th className="mnd-kicker px-5 py-3 font-medium">User</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Action</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Resource</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Status</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--mnd-hairline)]">
              {filtered.map((log) => {
                const ActionIcon = getActionIcon(log.action);
                return (
                  <tr key={log.id} className="hover:bg-[var(--mnd-surface-2)]/60">
                    <td className="mnd-font-mono px-5 py-3.5 text-xs text-[var(--mnd-steel)]">
                      {new Date(log.timestamp).toLocaleString("en-US")}
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[var(--mnd-white)]">{log.userName}</p>
                      <p className="text-xs text-[var(--mnd-steel-dim)]">{log.userEmail}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <ActionIcon className="h-3.5 w-3.5 text-[var(--mnd-steel)]" />
                        <span className="mnd-font-mono text-xs text-[var(--mnd-stone)]">{log.action}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <p className="text-[var(--mnd-stone)]">{log.resource}</p>
                      <p className="mnd-font-mono text-xs text-[var(--mnd-steel-dim)]">{log.resourceId}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusTag tone={statusTone[log.status]}>
                        {log.status[0].toUpperCase() + log.status.slice(1)}
                      </StatusTag>
                    </td>
                    <td className="px-5 py-3.5 text-[var(--mnd-steel)]">{log.details}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyRow>No log entries match these filters.</EmptyRow>}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--mnd-hairline)] px-5 py-3.5">
          <p className="text-xs text-[var(--mnd-steel)]">
            Showing {filtered.length} of {auditLogs.length} events
          </p>
          <div className="flex gap-2">
            <button className="mnd-btn-ghost px-3 py-1.5 text-xs" disabled>
              Previous
            </button>
            <button className="mnd-btn-ghost px-3 py-1.5 text-xs" disabled>
              Next
            </button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
