"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { PageHeader, SectionCard, DemoDataTag } from "@/components/shared/primitives";
import { cn } from "@/lib/utils";

const TABS = ["General", "Integrations", "Feature Flags"] as const;
type Tab = (typeof TABS)[number];

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mnd-kicker mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium text-[var(--mnd-white)]">{label}</p>
        <p className="text-xs text-[var(--mnd-steel)]">{description}</p>
      </div>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-[var(--mnd-accent)]" : "bg-[var(--mnd-surface-3)]"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform",
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}

export default function SystemSettings() {
  const [tab, setTab] = useState<Tab>("General");
  const [settings, setSettings] = useState({
    siteName: "DataDelimited CNC Estimator",
    supportEmail: "support@datadelimited.com",
    maxFileSize: 100,
    allowedFileTypes: ".step,.stp",
    trialDays: 30,
    estimateLimit: 10,
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "noreply@datadelimited.com",
    smtpPassword: "••••••••",
    stripePublicKey: "pk_test_••••••••",
    stripeSecretKey: "sk_test_••••••••",
    azureStorageAccount: "datadelimited",
    azureStorageKey: "••••••••",
    openaiApiKey: "sk-••••••••",
    maintenanceMode: false,
    allowSignups: true,
    requireEmailVerification: true,
  });

  const set = <K extends keyof typeof settings>(key: K, value: (typeof settings)[K]) =>
    setSettings((s) => ({ ...s, [key]: value }));

  const handleSave = () => {
    alert("Settings saved (demo — no backend write occurs).");
  };

  const inputClass = "mnd-input h-10 w-full px-3 text-sm";

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Mandrok Admin · Platform"
        title="System Settings"
        description="Platform configuration, connected services and feature flags."
        actions={
          <>
            <DemoDataTag />
            <button
              onClick={handleSave}
              className="mnd-btn-accent flex items-center gap-2 px-4 py-2 text-sm"
            >
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </>
        }
      />

      <div className="flex gap-1 border-b border-[var(--mnd-hairline)]">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "relative px-3 py-2.5 text-sm font-medium transition-colors",
              tab === t ? "text-[var(--mnd-white)]" : "text-[var(--mnd-steel)] hover:text-[var(--mnd-stone)]"
            )}
          >
            {t}
            {tab === t && (
              <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[var(--mnd-accent)]" />
            )}
          </button>
        ))}
      </div>

      {tab === "General" && (
        <SectionCard title="Platform" eyebrow="General">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Site Name">
                <input
                  className={inputClass}
                  value={settings.siteName}
                  onChange={(e) => set("siteName", e.target.value)}
                />
              </Field>
              <Field label="Support Email">
                <input
                  className={inputClass}
                  type="email"
                  value={settings.supportEmail}
                  onChange={(e) => set("supportEmail", e.target.value)}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Max File Size (MB)">
                <input
                  className={inputClass}
                  type="number"
                  value={settings.maxFileSize}
                  onChange={(e) => set("maxFileSize", parseInt(e.target.value) || 0)}
                />
              </Field>
              <Field label="Allowed File Types">
                <input
                  className={inputClass}
                  value={settings.allowedFileTypes}
                  onChange={(e) => set("allowedFileTypes", e.target.value)}
                />
              </Field>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Field label="Trial Period (days)">
                <input
                  className={inputClass}
                  type="number"
                  value={settings.trialDays}
                  onChange={(e) => set("trialDays", parseInt(e.target.value) || 0)}
                />
              </Field>
              <Field label="Trial Estimate Limit">
                <input
                  className={inputClass}
                  type="number"
                  value={settings.estimateLimit}
                  onChange={(e) => set("estimateLimit", parseInt(e.target.value) || 0)}
                />
              </Field>
            </div>
          </div>
        </SectionCard>
      )}

      {tab === "Integrations" && (
        <div className="space-y-6">
          <SectionCard title="Email (SMTP)" eyebrow="Notifications">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field label="SMTP Host">
                  <input className={inputClass} value={settings.smtpHost} onChange={(e) => set("smtpHost", e.target.value)} />
                </Field>
                <Field label="SMTP Port">
                  <input
                    className={inputClass}
                    type="number"
                    value={settings.smtpPort}
                    onChange={(e) => set("smtpPort", parseInt(e.target.value) || 0)}
                  />
                </Field>
              </div>
              <Field label="SMTP Username">
                <input className={inputClass} value={settings.smtpUsername} onChange={(e) => set("smtpUsername", e.target.value)} />
              </Field>
              <Field label="SMTP Password">
                <input className={inputClass} type="password" value={settings.smtpPassword} onChange={(e) => set("smtpPassword", e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Payments (Stripe)" eyebrow="Billing">
            <div className="space-y-4">
              <Field label="Publishable Key">
                <input className={inputClass} value={settings.stripePublicKey} onChange={(e) => set("stripePublicKey", e.target.value)} />
              </Field>
              <Field label="Secret Key">
                <input className={inputClass} type="password" value={settings.stripeSecretKey} onChange={(e) => set("stripeSecretKey", e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Storage (Azure Blob)" eyebrow="Infrastructure">
            <div className="space-y-4">
              <Field label="Storage Account">
                <input className={inputClass} value={settings.azureStorageAccount} onChange={(e) => set("azureStorageAccount", e.target.value)} />
              </Field>
              <Field label="Access Key">
                <input className={inputClass} type="password" value={settings.azureStorageKey} onChange={(e) => set("azureStorageKey", e.target.value)} />
              </Field>
            </div>
          </SectionCard>

          <SectionCard title="Feature Recognition (OpenAI)" eyebrow="AI">
            <Field label="API Key">
              <input className={inputClass} type="password" value={settings.openaiApiKey} onChange={(e) => set("openaiApiKey", e.target.value)} />
            </Field>
          </SectionCard>
        </div>
      )}

      {tab === "Feature Flags" && (
        <SectionCard title="Feature Flags" eyebrow="Platform">
          <div className="divide-y divide-[var(--mnd-hairline)]">
            <Toggle
              label="Maintenance Mode"
              description="Disable user access for scheduled maintenance"
              checked={settings.maintenanceMode}
              onChange={(v) => set("maintenanceMode", v)}
            />
            <Toggle
              label="Allow New Signups"
              description="Enable new user registration"
              checked={settings.allowSignups}
              onChange={(v) => set("allowSignups", v)}
            />
            <Toggle
              label="Require Email Verification"
              description="Users must verify email before accessing the platform"
              checked={settings.requireEmailVerification}
              onChange={(v) => set("requireEmailVerification", v)}
            />
          </div>
        </SectionCard>
      )}
    </div>
  );
}
