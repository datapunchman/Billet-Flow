"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  PageHeader,
  SectionCard,
  KpiTile,
  StatusTag,
  MeterBar,
  EmptyRow,
  DemoDataTag,
} from "@/components/shared/primitives";
import { adminSubscriptions, type AdminSubscriptionRow } from "@/lib/admin-mock";

const statusTone: Record<AdminSubscriptionRow["status"], "good" | "neutral" | "bad" | "warn"> = {
  active: "good",
  cancelled: "neutral",
  expired: "bad",
  payment_failed: "warn",
};

const statusLabel: Record<AdminSubscriptionRow["status"], string> = {
  active: "Active",
  cancelled: "Cancelled",
  expired: "Expired",
  payment_failed: "Payment failed",
};

const planLabel: Record<AdminSubscriptionRow["plan"], string> = {
  monthly: "Monthly",
  "6-month": "6 Month",
  "12-month": "12 Month",
};

export default function SubscriptionsManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [planFilter, setPlanFilter] = useState<string>("all");

  const filtered = useMemo(
    () =>
      adminSubscriptions.filter((sub) => {
        const matchesSearch =
          sub.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sub.userEmail.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
        const matchesPlan = planFilter === "all" || sub.plan === planFilter;
        return matchesSearch && matchesStatus && matchesPlan;
      }),
    [searchQuery, statusFilter, planFilter]
  );

  const monthlyRevenue = adminSubscriptions
    .filter((s) => s.status === "active")
    .reduce((sum, s) => sum + s.amount, 0);
  const activeCount = adminSubscriptions.filter((s) => s.status === "active").length;
  const cancelledCount = adminSubscriptions.filter((s) => s.status === "cancelled").length;
  const failedCount = adminSubscriptions.filter((s) => s.status === "payment_failed").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mandrok Admin · Billing"
        title="Subscription Management"
        description="Monitor plan status, usage against quota and billing exceptions."
        actions={<DemoDataTag />}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile label="Monthly Revenue" value={`$${monthlyRevenue.toLocaleString("en-US")}`} sublabel="From active plans" />
        <KpiTile label="Active" value={String(activeCount)} sublabel="Billing normally" />
        <KpiTile label="Cancelled" value={String(cancelledCount)} sublabel="No longer renewing" />
        <KpiTile label="Payment Failed" value={String(failedCount)} sublabel="Needs follow-up" />
      </div>

      <SectionCard padded={false}>
        <div className="grid grid-cols-1 gap-3 border-b border-[var(--mnd-hairline)] p-4 md:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mnd-steel-dim)]" />
            <input
              type="text"
              placeholder="Search by account…"
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
            <option value="cancelled">Cancelled</option>
            <option value="expired">Expired</option>
            <option value="payment_failed">Payment failed</option>
          </select>
          <select
            value={planFilter}
            onChange={(e) => setPlanFilter(e.target.value)}
            className="mnd-input h-10 px-3 text-sm"
          >
            <option value="all">All plans</option>
            <option value="monthly">Monthly</option>
            <option value="6-month">6 Month</option>
            <option value="12-month">12 Month</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--mnd-hairline)] text-left">
                <th className="mnd-kicker px-5 py-3 font-medium">Account</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Plan</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Status</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Amount</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Estimate usage</th>
                <th className="mnd-kicker px-5 py-3 font-medium">Next billing</th>
                <th className="mnd-kicker px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--mnd-hairline)]">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-[var(--mnd-surface-2)]/60">
                  <td className="px-5 py-3.5">
                    <p className="font-medium text-[var(--mnd-white)]">{sub.userName}</p>
                    <p className="text-xs text-[var(--mnd-steel-dim)]">{sub.userEmail}</p>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--mnd-stone)]">{planLabel[sub.plan]}</td>
                  <td className="px-5 py-3.5">
                    <StatusTag tone={statusTone[sub.status]}>{statusLabel[sub.status]}</StatusTag>
                  </td>
                  <td className="mnd-font-mono px-5 py-3.5 text-[var(--mnd-white)]">${sub.amount}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-24">
                        <MeterBar value={sub.estimatesUsed} max={sub.estimatesLimit} tone="accent" />
                      </div>
                      <span className="mnd-font-mono text-xs text-[var(--mnd-steel)]">
                        {sub.estimatesUsed}/{sub.estimatesLimit}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-[var(--mnd-steel)]">
                    {sub.nextBillingDate !== "-" ? new Date(sub.nextBillingDate).toLocaleDateString("en-US") : "—"}
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="text-xs font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
                      View details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <EmptyRow>No subscriptions match these filters.</EmptyRow>}
        </div>
      </SectionCard>
    </div>
  );
}
