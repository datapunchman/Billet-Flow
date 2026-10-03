"use client";

import { useMemo, useState } from "react";
import {
  Check,
  Zap,
  Crown,
  FileText,
  Clock,
  TrendingUp,
  Upload,
  User,
  Users,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageHeader, SectionCard, MeterBar, Pill } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

interface PlanRow {
  id: string;
  plan: string;
  group: boolean;
  licenses: number;
  /** Canonical billing description — unchanged from Plan Management (ADM-005). */
  billing: string;
  /** Presentational-only breakdown of `billing`, no new figures — same source amounts. */
  priceLabel: string | null;
  priceSuffix: string;
  bonus: string | null;
  trialDays: number;
  renewal: string;
}

// Mirrors the plan table in Plan Management (ADM-005). Bonus months, not
// discounts, are how longer commitments are rewarded (BR-004) — pricing
// changes here only affect future subscriptions (FR-044).
const planRows: PlanRow[] = [
  {
    id: "monthly",
    plan: "Monthly",
    group: false,
    licenses: 1,
    billing: "₹1,599 / month",
    priceLabel: "₹1,599",
    priceSuffix: "/ month",
    bonus: null,
    trialDays: 30,
    renewal: "Monthly",
  },
  {
    id: "6-month",
    plan: "6 Month",
    group: false,
    licenses: 1,
    billing: "6 months, one-time",
    priceLabel: null,
    priceSuffix: "6 months · one-time commitment",
    bonus: "+1 month",
    trialDays: 30,
    renewal: "Every 7 months",
  },
  {
    id: "12-month",
    plan: "12 Month",
    group: false,
    licenses: 1,
    billing: "12 months, one-time",
    priceLabel: null,
    priceSuffix: "12 months · one-time commitment",
    bonus: "+3 months",
    trialDays: 30,
    renewal: "Every 15 months",
  },
  {
    id: "group-monthly",
    plan: "Group Monthly",
    group: true,
    licenses: 5,
    billing: "₹5,999 / month",
    priceLabel: "₹5,999",
    priceSuffix: "/ month",
    bonus: null,
    trialDays: 30,
    renewal: "Monthly",
  },
  {
    id: "group-6-month",
    plan: "Group 6 Month",
    group: true,
    licenses: 5,
    billing: "₹5,999 × 6 = ₹35,994, one-time",
    priceLabel: "₹35,994",
    priceSuffix: "one-time · 6 months",
    bonus: "+1 month",
    trialDays: 30,
    renewal: "Every 7 months",
  },
  {
    id: "group-12-month",
    plan: "Group 12 Month",
    group: true,
    licenses: 5,
    billing: "₹5,999 × 12 = ₹71,988, one-time",
    priceLabel: "₹71,988",
    priceSuffix: "one-time · 12 months",
    bonus: "+2 months",
    trialDays: 30,
    renewal: "Every 14 months",
  },
];

function bonusMonths(bonus: string | null) {
  if (!bonus) return 0;
  const match = bonus.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

const included = [
  { icon: Check, title: "AI Analysis", desc: "Advanced feature detection and cost optimization" },
  { icon: Zap, title: "Instant Results", desc: "Get estimates in seconds, not hours" },
  { icon: FileText, title: "Export Reports", desc: "Download detailed PDF and Excel reports" },
  { icon: Crown, title: "Priority Support", desc: "Get help when you need it" },
];

export default function SubscriptionPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [tier, setTier] = useState<"individual" | "group">("individual");

  const visibleRows = useMemo(
    () => planRows.filter((r) => r.group === (tier === "group")),
    [tier]
  );

  const bestValueId = useMemo(() => {
    const withBonus = visibleRows.filter((r) => r.bonus);
    if (withBonus.length === 0) return null;
    return withBonus.reduce((best, r) => (bonusMonths(r.bonus) > bonusMonths(best.bonus) ? r : best))
      .id;
  }, [visibleRows]);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <PageHeader
        eyebrow="Mandrok · Billing"
        title="Subscription & Plan"
        description="Unlock unlimited estimates and advanced manufacturing intelligence."
      />

      {/* Current plan status */}
      <SectionCard>
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex-1">
            <div className="mnd-kicker mb-2">Current Plan</div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--mnd-accent-soft)]">
                <Clock className="h-[22px] w-[22px] text-[var(--mnd-accent)]" />
              </div>
              <div>
                <h3 className="mnd-font-display text-xl font-semibold text-[var(--mnd-white)]">
                  Trial
                </h3>
                <p className="text-xs text-[var(--mnd-steel)]">
                  23 days remaining · expires September 26, 2026
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="mnd-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Upload className="h-4 w-4 text-[var(--mnd-steel)]" />
                  <span className="text-xs text-[var(--mnd-steel)]">Estimates used</span>
                </div>
                <p className="mnd-font-display text-xl font-semibold text-[var(--mnd-white)]">7 / 10</p>
                <div className="mt-3">
                  <MeterBar value={7} max={10} tone="accent" />
                </div>
              </div>

              <div className="mnd-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[var(--mnd-steel)]" />
                  <span className="text-xs text-[var(--mnd-steel)]">Storage used</span>
                </div>
                <p className="mnd-font-display text-xl font-semibold text-[var(--mnd-white)]">245 MB</p>
                <div className="mt-3">
                  <MeterBar value={49} max={100} tone="info" />
                </div>
              </div>

              <div className="mnd-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-[var(--mnd-steel)]" />
                  <span className="text-xs text-[var(--mnd-steel)]">Total saved</span>
                </div>
                <p className="mnd-font-display text-xl font-semibold text-[var(--mnd-white)]">$4,620</p>
                <p className="mt-1 text-xs text-[var(--mnd-steel-dim)]">vs. manual estimation</p>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* Plans */}
      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mnd-kicker mb-1.5">Plan Management · ADM-005</div>
            <h2 className="mnd-font-display text-xl font-semibold text-[var(--mnd-white)]">
              Choose a plan
            </h2>
            <p className="mt-1 text-sm text-[var(--mnd-steel)]">
              Longer commitments earn configurable bonus months, not discounts.
            </p>
          </div>

          {/* Tier toggle */}
          <div className="flex shrink-0 rounded-md border border-[var(--mnd-hairline-strong)] bg-[var(--mnd-surface)] p-1">
            <button
              onClick={() => setTier("individual")}
              className={cn(
                "flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors",
                tier === "individual"
                  ? "bg-[var(--mnd-surface-3)] text-[var(--mnd-white)]"
                  : "text-[var(--mnd-steel)] hover:text-[var(--mnd-stone)]"
              )}
            >
              <User className="h-3.5 w-3.5" />
              Individual
            </button>
            <button
              onClick={() => setTier("group")}
              className={cn(
                "flex items-center gap-2 rounded px-4 py-2 text-sm font-medium transition-colors",
                tier === "group"
                  ? "bg-[var(--mnd-surface-3)] text-[var(--mnd-white)]"
                  : "text-[var(--mnd-steel)] hover:text-[var(--mnd-stone)]"
              )}
            >
              <Users className="h-3.5 w-3.5" />
              Group
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {visibleRows.map((row) => {
            const chosen = selectedPlan === row.id;
            const isBest = row.id === bestValueId;
            return (
              <div
                key={row.id}
                className={cn(
                  "group relative flex flex-col rounded-lg border p-6 transition-all duration-200",
                  "hover:-translate-y-1 hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.6)]",
                  isBest
                    ? "border-[var(--mnd-accent)]/45 bg-[var(--mnd-surface-2)] hover:border-[var(--mnd-accent)]/70"
                    : "border-[var(--mnd-hairline-strong)] bg-[var(--mnd-surface)] hover:border-[var(--mnd-hairline-strong)]"
                )}
              >
                {isBest && (
                  <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded bg-[var(--mnd-accent)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white">
                    <Sparkles className="h-3 w-3" />
                    Best Value
                  </span>
                )}

                <div className="mb-5 flex items-center gap-2">
                  <h3 className="mnd-font-display text-lg font-semibold text-[var(--mnd-white)]">
                    {row.plan}
                  </h3>
                  {row.group && <Pill tone="info">5 seats</Pill>}
                </div>

                <div className="mb-1">
                  {row.priceLabel ? (
                    <div className="flex items-baseline gap-1.5">
                      <span className="mnd-font-display text-[34px] font-semibold leading-none text-[var(--mnd-white)]">
                        {row.priceLabel}
                      </span>
                      <span className="text-sm text-[var(--mnd-steel)]">{row.priceSuffix}</span>
                    </div>
                  ) : (
                    <div className="mnd-font-display text-lg font-semibold text-[var(--mnd-white)]">
                      {row.priceSuffix}
                    </div>
                  )}
                </div>
                <p className="mnd-font-mono mb-6 text-xs text-[var(--mnd-steel-dim)]">{row.billing}</p>

                <ul className="mb-7 flex-1 space-y-3 border-t border-[var(--mnd-hairline)] pt-5 text-sm">
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--mnd-steel)]">
                      <Users className="h-3.5 w-3.5" />
                      Licenses
                    </span>
                    <span className="text-[var(--mnd-stone)]">
                      {row.licenses} user{row.licenses > 1 ? "s" : ""}
                    </span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--mnd-steel)]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Bonus
                    </span>
                    {row.bonus ? (
                      <Pill tone="good">{row.bonus}</Pill>
                    ) : (
                      <span className="text-[var(--mnd-steel-dim)]">None</span>
                    )}
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--mnd-steel)]">
                      <Clock className="h-3.5 w-3.5" />
                      Trial
                    </span>
                    <span className="text-[var(--mnd-stone)]">{row.trialDays} days</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-[var(--mnd-steel)]">
                      <TrendingUp className="h-3.5 w-3.5" />
                      Renews
                    </span>
                    <span className="text-right text-[var(--mnd-stone)]">{row.renewal}</span>
                  </li>
                </ul>

                <button
                  onClick={() => setSelectedPlan(row.id)}
                  className={cn(
                    "flex w-full items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-all",
                    chosen ? "bg-[var(--mnd-accent-soft)] text-[var(--mnd-accent)]" : "mnd-btn-accent"
                  )}
                >
                  {chosen ? (
                    <>
                      <Check className="h-4 w-4" />
                      Selected
                    </>
                  ) : (
                    <>
                      Select plan
                      <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-xs leading-relaxed text-[var(--mnd-steel-dim)]">
          Renewal cadence includes bonus months (6-month plans renew after 7 months; Group 12-Month after 14 = 12 + 2).
          The Group Plan licenses five individually verified users under one organisation subscription. Prices, bonuses,
          visibility and trial duration are managed in Plan Management (ADM-005); pricing changes affect only future
          subscriptions (FR-044).
        </p>
      </div>

      {/* All plans include */}
      <SectionCard title="All Plans Include" eyebrow="Benefits">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {included.map((item) => (
            <div key={item.title} className="text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-md bg-[var(--mnd-surface-2)]">
                <item.icon className="h-5 w-5 text-[var(--mnd-accent)]" />
              </div>
              <h4 className="mb-1.5 text-sm font-semibold text-[var(--mnd-white)]">{item.title}</h4>
              <p className="text-xs text-[var(--mnd-steel)]">{item.desc}</p>
            </div>
          ))}
        </div>
      </SectionCard>

      <div className="mnd-card p-5 text-center text-sm text-[var(--mnd-steel)]">
        Have questions? Check our{" "}
        <a href="#" className="font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
          FAQ
        </a>{" "}
        or{" "}
        <a href="#" className="font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
          contact support
        </a>
      </div>
    </div>
  );
}
