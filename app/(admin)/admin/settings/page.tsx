"use client";

import { useState } from "react";
import { Save, RefreshCw } from "lucide-react";

export default function SystemSettings() {
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

  const handleSave = () => {
    // Mock save
    alert("Settings saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">System Settings</h1>
          <p className="text-[#94a3b8]">Configure platform settings and integrations</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#ff6b35] to-[#f7931e] text-white rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      {/* General Settings */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg">
        <div className="p-6 border-b border-[#2d3748]">
          <h2 className="text-xl font-bold text-white">General Settings</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) =>
                setSettings({ ...settings, siteName: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Support Email
            </label>
            <input
              type="email"
              value={settings.supportEmail}
              onChange={(e) =>
                setSettings({ ...settings, supportEmail: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Max File Size (MB)
              </label>
              <input
                type="number"
                value={settings.maxFileSize}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maxFileSize: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Allowed File Types
              </label>
              <input
                type="text"
                value={settings.allowedFileTypes}
                onChange={(e) =>
                  setSettings({ ...settings, allowedFileTypes: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Trial Period (days)
              </label>
              <input
                type="number"
                value={settings.trialDays}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    trialDays: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                Trial Estimate Limit
              </label>
              <input
                type="number"
                value={settings.estimateLimit}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    estimateLimit: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Settings */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg">
        <div className="p-6 border-b border-[#2d3748]">
          <h2 className="text-xl font-bold text-white">Email Settings (SMTP)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                SMTP Host
              </label>
              <input
                type="text"
                value={settings.smtpHost}
                onChange={(e) =>
                  setSettings({ ...settings, smtpHost: e.target.value })
                }
                className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#94a3b8] mb-2">
                SMTP Port
              </label>
              <input
                type="number"
                value={settings.smtpPort}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    smtpPort: parseInt(e.target.value),
                  })
                }
                className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              SMTP Username
            </label>
            <input
              type="text"
              value={settings.smtpUsername}
              onChange={(e) =>
                setSettings({ ...settings, smtpUsername: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              SMTP Password
            </label>
            <input
              type="password"
              value={settings.smtpPassword}
              onChange={(e) =>
                setSettings({ ...settings, smtpPassword: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg">
        <div className="p-6 border-b border-[#2d3748]">
          <h2 className="text-xl font-bold text-white">Payment Settings (Stripe)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Stripe Public Key
            </label>
            <input
              type="text"
              value={settings.stripePublicKey}
              onChange={(e) =>
                setSettings({ ...settings, stripePublicKey: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Stripe Secret Key
            </label>
            <input
              type="password"
              value={settings.stripeSecretKey}
              onChange={(e) =>
                setSettings({ ...settings, stripeSecretKey: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>
        </div>
      </div>

      {/* Storage Settings */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg">
        <div className="p-6 border-b border-[#2d3748]">
          <h2 className="text-xl font-bold text-white">Storage Settings (Azure)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Storage Account Name
            </label>
            <input
              type="text"
              value={settings.azureStorageAccount}
              onChange={(e) =>
                setSettings({ ...settings, azureStorageAccount: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              Storage Access Key
            </label>
            <input
              type="password"
              value={settings.azureStorageKey}
              onChange={(e) =>
                setSettings({ ...settings, azureStorageKey: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>
        </div>
      </div>

      {/* AI Settings */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg">
        <div className="p-6 border-b border-[#2d3748]">
          <h2 className="text-xl font-bold text-white">AI Settings (OpenAI)</h2>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#94a3b8] mb-2">
              OpenAI API Key
            </label>
            <input
              type="password"
              value={settings.openaiApiKey}
              onChange={(e) =>
                setSettings({ ...settings, openaiApiKey: e.target.value })
              }
              className="w-full px-4 py-2 bg-[#0a0e27] border border-[#2d3748] rounded-lg text-white focus:outline-none focus:border-[#ff6b35]"
            />
          </div>
        </div>
      </div>

      {/* Feature Flags */}
      <div className="bg-[#1a1f35] border border-[#2d3748] rounded-lg">
        <div className="p-6 border-b border-[#2d3748]">
          <h2 className="text-xl font-bold text-white">Feature Flags</h2>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Maintenance Mode</p>
              <p className="text-sm text-[#94a3b8]">
                Disable user access for maintenance
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maintenanceMode: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#2d3748] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#ff6b35] peer-checked:to-[#f7931e]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Allow New Signups</p>
              <p className="text-sm text-[#94a3b8]">
                Enable new user registration
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.allowSignups}
                onChange={(e) =>
                  setSettings({ ...settings, allowSignups: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#2d3748] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#ff6b35] peer-checked:to-[#f7931e]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Require Email Verification</p>
              <p className="text-sm text-[#94a3b8]">
                Users must verify email before access
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    requireEmailVerification: e.target.checked,
                  })
                }
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-[#2d3748] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-[#ff6b35] peer-checked:to-[#f7931e]"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
