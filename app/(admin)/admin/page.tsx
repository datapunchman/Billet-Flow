"use client";

import Link from "next/link";
import {
  Users,
  DollarSign,
  AlertTriangle,
  ArrowRight,
  Activity,
  Layers,
  Clock,
} from "lucide-react";
import {
  PageHeader,
  SectionCard,
  KpiTile,
  StatusTag,
  Pill,
  MeterBar,
  DemoDataTag,
  EmptyRow,
} from "@/components/shared/primitives";
import { adminStats, getRecentAnalyses, getAdminAlerts } from "@/lib/admin-mock";

const formatNumber = (num: number) => new Intl.NumberFormat("en-US").format(num);

const statusTone = {
  completed: "good",
  processing: "info",
  failed: "bad",
} as const;

export default function AdminDashboard() {
  const analyses = getRecentAnalyses();
  const alerts = getAdminAlerts();

  const completed = analyses.filter((a) => a.status === "completed").length;
  const processing = analyses.filter((a) => a.status === "processing").length;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mandrok Admin · Operations"
        title="Operations Overview"
        description="Platform-wide activity across accounts, estimates and manufacturing analyses."
        actions={<DemoDataTag />}
      />

      {/* KPI strip */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiTile
          label="Total Users"
          value={formatNumber(adminStats.totalUsers)}
          delta={12.5}
          sublabel={`${formatNumber(adminStats.activeUsers)} active`}
        />
        <KpiTile
          label="Monthly Revenue"
          value={`$${formatNumber(adminStats.monthlyRevenue)}`}
          delta={8.2}
          sublabel={`$${formatNumber(adminStats.totalRevenue)} lifetime`}
        />
        <KpiTile
          label="Active Subscriptions"
          value={formatNumber(adminStats.activeSubscriptions)}
          delta={5.8}
          sublabel={`${adminStats.trialUsers} on trial`}
        />
        <KpiTile
          label="Estimates Generated"
          value={formatNumber(adminStats.totalEstimates)}
          sublabel={`${adminStats.estimatesToday} today · avg. 140/day`}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
        {/* Recent CAD / part analyses */}
        <SectionCard
          eyebrow="Manufacturing Activity"
          title="Recent CAD / Part Analyses"
          actions={
            <Link
              href="/admin/users"
              className="flex items-center gap-1 text-xs font-medium text-[var(--mnd-steel)] hover:text-[var(--mnd-white)]"
            >
              All accounts <ArrowRight className="h-3 w-3" />
            </Link>
          }
          padded={false}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--mnd-hairline)] text-left">
                  <th className="mnd-kicker px-5 py-3 font-medium">Part / Project</th>
                  <th className="mnd-kicker px-5 py-3 font-medium">Material</th>
                  <th className="mnd-kicker px-5 py-3 font-medium">Status</th>
                  <th className="mnd-kicker px-5 py-3 font-medium">Machining</th>
                  <th className="mnd-kicker px-5 py-3 text-right font-medium">Est. Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--mnd-hairline)]">
                {analyses.map((a) => (
                  <tr key={a.id} className="hover:bg-[var(--mnd-surface-2)]/60">
                    <td className="px-5 py-3.5">
                      <p className="font-medium text-[var(--mnd-white)]">{a.projectName}</p>
                      <p className="mnd-font-mono text-xs text-[var(--mnd-steel-dim)]">
                        {a.fileName}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-[var(--mnd-stone)]">{a.material}</td>
                    <td className="px-5 py-3.5">
                      <StatusTag tone={statusTone[a.status as keyof typeof statusTone] ?? "neutral"}>
                        {a.status === "completed"
                          ? "Completed"
                          : a.status === "processing"
                          ? "Processing"
                          : "Failed"}
                      </StatusTag>
                    </td>
                    <td className="mnd-font-mono px-5 py-3.5 text-[var(--mnd-stone)]">
                      {a.machiningMinutes ? `${a.machiningMinutes} min` : "—"}
                    </td>
                    <td className="mnd-font-mono px-5 py-3.5 text-right text-[var(--mnd-white)]">
                      {a.totalCost ? `$${formatNumber(a.totalCost)}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* Alerts & exceptions */}
        <SectionCard eyebrow="Requires Attention" title="Alerts & Exceptions" padded={false}>
          {alerts.length === 0 ? (
            <EmptyRow>No open exceptions — platform is healthy.</EmptyRow>
          ) : (
            <ul className="divide-y divide-[var(--mnd-hairline)]">
              {alerts.map((alert) => (
                <li key={alert.id} className="flex items-start gap-3 px-5 py-3.5">
                  <AlertTriangle
                    className="mt-0.5 h-3.5 w-3.5 shrink-0"
                    style={{
                      color: alert.tone === "bad" ? "var(--mnd-bad)" : "var(--mnd-warn)",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--mnd-white)]">{alert.title}</p>
                    <p className="truncate text-xs text-[var(--mnd-steel)]">{alert.detail}</p>
                  </div>
                  <span className="mnd-font-mono shrink-0 text-[10px] text-[var(--mnd-steel-dim)]">
                    {alert.timestamp}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Estimation activity breakdown */}
        <SectionCard eyebrow="Pipeline" title="Estimation Activity">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[var(--mnd-stone)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--mnd-good)]" /> Completed
              </span>
              <span className="mnd-font-mono text-[var(--mnd-white)]">{completed}</span>
            </div>
            <MeterBar value={completed} max={analyses.length || 1} tone="good" />

            <div className="flex items-center justify-between pt-1 text-sm">
              <span className="flex items-center gap-2 text-[var(--mnd-stone)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--mnd-info)]" /> Processing
              </span>
              <span className="mnd-font-mono text-[var(--mnd-white)]">{processing}</span>
            </div>
            <MeterBar value={processing} max={analyses.length || 1} tone="info" />
          </div>
          <div className="mt-5 flex items-center gap-2 border-t border-[var(--mnd-hairline)] pt-4 text-xs text-[var(--mnd-steel-dim)]">
            <Layers className="h-3.5 w-3.5" />
            {analyses.length} tracked analyses across all accounts
          </div>
        </SectionCard>

        {/* System health */}
        <SectionCard eyebrow="Platform" title="System Health">
          <div className="space-y-4">
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-[var(--mnd-steel)]">API response time</span>
                <span className="mnd-font-mono text-[var(--mnd-white)]">124ms</span>
              </div>
              <MeterBar value={15} max={100} tone="good" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-[var(--mnd-steel)]">Database load</span>
                <span className="mnd-font-mono text-[var(--mnd-white)]">72%</span>
              </div>
              <MeterBar value={72} max={100} tone="info" />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-[var(--mnd-steel)]">Storage used</span>
                <span className="mnd-font-mono text-[var(--mnd-white)]">2.4 / 5 TB</span>
              </div>
              <MeterBar value={48} max={100} tone="accent" />
            </div>
          </div>
        </SectionCard>

        {/* Quick links */}
        <SectionCard eyebrow="Shortcuts" title="Administration">
          <div className="space-y-1">
            {[
              { href: "/admin/users", label: "Manage users", icon: Users },
              { href: "/admin/subscriptions", label: "Review subscriptions", icon: DollarSign },
              { href: "/admin/audit", label: "Inspect audit trail", icon: Activity },
              { href: "/admin/settings", label: "Platform settings", icon: Clock },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between rounded-md px-2.5 py-2.5 text-sm text-[var(--mnd-stone)] transition-colors hover:bg-[var(--mnd-surface-2)] hover:text-[var(--mnd-white)]"
              >
                <span className="flex items-center gap-2.5">
                  <link.icon className="h-4 w-4 text-[var(--mnd-steel)]" />
                  {link.label}
                </span>
                <ArrowRight className="h-3.5 w-3.5 text-[var(--mnd-steel-dim)]" />
              </Link>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
