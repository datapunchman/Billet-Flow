"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Page header                                                         */
/* ------------------------------------------------------------------ */
export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <div className="mnd-kicker mb-2">{eyebrow}</div>}
        <h1 className="mnd-font-display text-[28px] font-semibold leading-tight text-[var(--mnd-white)]">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-[var(--mnd-steel)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section card — replaces the generic rounded-2xl gradient cards       */
/* ------------------------------------------------------------------ */
export function SectionCard({
  title,
  eyebrow,
  actions,
  children,
  className,
  padded = true,
}: {
  title?: string;
  eyebrow?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <div className={cn("mnd-card overflow-hidden", className)}>
      {(title || actions) && (
        <div className="flex items-center justify-between border-b border-[var(--mnd-hairline)] px-5 py-4">
          <div>
            {eyebrow && <div className="mnd-kicker mb-1">{eyebrow}</div>}
            {title && (
              <h2 className="mnd-font-display text-[15px] font-semibold text-[var(--mnd-white)]">
                {title}
              </h2>
            )}
          </div>
          {actions}
        </div>
      )}
      <div className={padded ? "p-5" : ""}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* KPI tile                                                             */
/* ------------------------------------------------------------------ */
export function KpiTile({
  label,
  value,
  sublabel,
  delta,
  deltaLabel,
}: {
  label: string;
  value: string;
  sublabel?: string;
  delta?: number;
  deltaLabel?: string;
}) {
  const positive = (delta ?? 0) >= 0;
  return (
    <div className="mnd-card p-5">
      <div className="mnd-kicker">{label}</div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="mnd-font-display text-[26px] font-semibold text-[var(--mnd-white)]">
          {value}
        </span>
        {delta !== undefined && (
          <span
            className={cn(
              "mnd-font-mono flex items-center gap-0.5 text-[11px] font-medium",
              positive ? "text-[var(--mnd-good)]" : "text-[var(--mnd-bad)]"
            )}
          >
            {positive ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            {Math.abs(delta)}%
          </span>
        )}
      </div>
      {sublabel && (
        <div className="mt-1.5 text-xs text-[var(--mnd-steel-dim)]">{sublabel}</div>
      )}
      {deltaLabel && !sublabel && (
        <div className="mt-1.5 text-xs text-[var(--mnd-steel-dim)]">{deltaLabel}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Status dot + text — replaces the colorful pill-everywhere pattern    */
/* ------------------------------------------------------------------ */
type Tone = "good" | "warn" | "bad" | "info" | "neutral";

const toneColor: Record<Tone, string> = {
  good: "var(--mnd-good)",
  warn: "var(--mnd-warn)",
  bad: "var(--mnd-bad)",
  info: "var(--mnd-info)",
  neutral: "var(--mnd-steel)",
};

export function StatusTag({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium"
      style={{ color: toneColor[tone] }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: toneColor[tone] }}
      />
      {children}
    </span>
  );
}

export function Pill({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className="inline-flex items-center rounded px-2 py-0.5 text-[11px] font-medium"
      style={{
        color: toneColor[tone],
        backgroundColor: `color-mix(in srgb, ${toneColor[tone]} 14%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Progress bar — thin, technical, flat accent                         */
/* ------------------------------------------------------------------ */
export function MeterBar({
  value,
  max = 100,
  tone = "accent",
}: {
  value: number;
  max?: number;
  tone?: "accent" | Tone;
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const color = tone === "accent" ? "var(--mnd-accent)" : toneColor[tone];
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--mnd-surface-3)]">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Empty state                                                          */
/* ------------------------------------------------------------------ */
export function EmptyRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 py-12 text-center">
      <p className="text-sm text-[var(--mnd-steel)]">{children}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Demo-data notice — keeps mock data honestly labelled                 */
/* ------------------------------------------------------------------ */
export function DemoDataTag() {
  return (
    <span className="mnd-kicker inline-flex items-center gap-1.5 rounded border border-[var(--mnd-hairline-strong)] px-2 py-1 !text-[var(--mnd-steel-dim)]">
      <span className="h-1 w-1 rounded-full bg-[var(--mnd-steel-dim)]" />
      Demo data
    </span>
  );
}
