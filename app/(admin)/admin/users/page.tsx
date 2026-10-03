"use client";

import { useMemo, useState } from "react";
import {
  Search,
  UserPlus,
  Mail,
  Ban,
  Edit,
  Trash2,
} from "lucide-react";
import {
  PageHeader,
  SectionCard,
  KpiTile,
  StatusTag,
  EmptyRow,
  DemoDataTag,
} from "@/components/shared/primitives";
import { adminUsers, type AdminUserRow } from "@/lib/admin-mock";

const statusTone: Record<AdminUserRow["status"], "good" | "info" | "bad"> = {
  active: "good",
  trial: "info",
  suspended: "bad",
};

const statusLabel: Record<AdminUserRow["status"], string> = {
  active: "Active",
  trial: "Trial",
  suspended: "Suspended",
};

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredUsers = useMemo(
    () =>
      adminUsers.filter((user) => {
        const matchesSearch =
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || user.status === statusFilter;
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesStatus && matchesRole;
      }),
    [searchQuery, statusFilter, roleFilter]
  );

  const activeCount = adminUsers.filter((u) => u.status === "active").length;
  const trialCount = adminUsers.filter((u) => u.status === "trial").length;
  const suspendedCount = adminUsers.filter((u) => u.status === "suspended").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mandrok Admin · Accounts"
        title="User Management"
        description="Every account on the platform — subscriptions, usage and access control."
        actions={
          <>
            <DemoDataTag />
            <button className="mnd-btn-accent flex items-center gap-2 px-4 py-2 text-sm">
              <UserPlus className="h-4 w-4" />
              Add User
            </button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="Total Users" value={String(adminUsers.length)} sublabel="On the platform" />
        <KpiTile label="Active" value={String(activeCount)} sublabel="Paying, in good standing" />
        <KpiTile label="Trial" value={String(trialCount)} sublabel="Evaluating Mandrok" />
        <KpiTile label="Suspended" value={String(suspendedCount)} sublabel="Access revoked" />
      </div>

      <SectionCard padded={false}>
        <div className="grid grid-cols-1 gap-3 border-b border-[var(--mnd-hairline)] p-4 md:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mnd-steel-dim)]" />
            <input
              type="text"
              placeholder="Search by name or email…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mnd-input h-10 w-full pl-9 pr-3 text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="mnd-input h-10 px-3 text-sm"
          >
            <option value="all">All status</option>
            <option value="active">Active</option>
            <option value="trial">Trial</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="mnd-input h-10 px-3 text-sm"
          >
            <option value="all">All roles</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--mnd-hairline)] text-left">
                <th className="mnd-kicker px-5 py-3 font-medium">User</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Status</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Subscription</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Estimates</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Joined</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Last Active</th>
                <th className="mnd-kicker px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--mnd-hairline)]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[var(--mnd-surface-2)]/60">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[var(--mnd-white)]">{user.name}</p>
                    <p className="text-xs text-[var(--mnd-steel-dim)]">{user.email}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusTag tone={statusTone[user.status]}>{statusLabel[user.status]}</StatusTag>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--mnd-stone)]">{user.subscriptionPlan}</td>
                  <td className="mnd-font-mono px-5 py-3.5 text-[var(--mnd-stone)]">
                    {user.estimatesCount}
                  </td>
                  <td className="px-5 py-3.5 text-[var(--mnd-steel)]">
                    {new Date(user.joinedDate).toLocaleDateString("en-US")}
                  </td>
                  <td className="px-5 py-3.5 text-[var(--mnd-steel)]">{user.lastActive}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        className="rounded p-1.5 text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-3)] hover:text-[var(--mnd-white)]"
                        title="Send email"
                      >
                        <Mail className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded p-1.5 text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-3)] hover:text-[var(--mnd-white)]"
                        title="Edit user"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded p-1.5 text-[var(--mnd-steel)] hover:bg-[var(--mnd-surface-3)] hover:text-[var(--mnd-white)]"
                        title={user.status === "suspended" ? "Reinstate user" : "Suspend user"}
                      >
                        <Ban className="h-4 w-4" />
                      </button>
                      <button
                        className="rounded p-1.5 text-[var(--mnd-steel)] hover:bg-[var(--mnd-bad-soft)] hover:text-[var(--mnd-bad)]"
                        title="Delete user"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && <EmptyRow>No users match these filters.</EmptyRow>}
        </div>

        <div className="flex items-center justify-between border-t border-[var(--mnd-hairline)] px-5 py-3.5">
          <p className="text-xs text-[var(--mnd-steel)]">
            Showing {filteredUsers.length} of {adminUsers.length} users
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
