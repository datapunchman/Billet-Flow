"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User, Mail, Phone, Building, Save, Lock, AlertCircle, CheckCircle2 } from "lucide-react";
import { PageHeader, SectionCard } from "@/components/shared/primitives";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  company: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ProfileFormData = z.infer<typeof profileSchema>;
type PasswordFormData = z.infer<typeof passwordSchema>;

function FieldIcon({
  icon: Icon,
  type,
  placeholder,
  registration,
  error,
}: {
  icon: React.ComponentType<{ className?: string }>;
  type: string;
  placeholder: string;
  registration: any;
  error?: string;
}) {
  return (
    <div>
      <div className="relative">
        <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--mnd-steel-dim)]" />
        <input
          type={type}
          {...registration}
          className="mnd-input h-11 w-full pl-10 pr-3 text-sm placeholder:text-[var(--mnd-steel-dim)]"
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-[var(--mnd-bad)]">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

export default function ProfilePage() {
  const [profileSaved, setProfileSaved] = useState(false);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      company: "Acme Manufacturing",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    console.log("Profile updated:", data);
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const onPasswordSubmit = (data: PasswordFormData) => {
    console.log("Password updated");
    setPasswordSaved(true);
    resetPassword();
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <PageHeader
        eyebrow="Mandrok · Account"
        title="Profile Settings"
        description="Manage your account information and preferences."
      />

      {/* Account status */}
      <SectionCard>
        <div className="flex items-start justify-between gap-6">
          <div>
            <h3 className="mnd-font-display mb-3 text-base font-semibold text-[var(--mnd-white)]">
              Account Status
            </h3>
            <div className="flex items-center gap-2">
              <span className="rounded border border-[var(--mnd-accent-line)] bg-[var(--mnd-accent-soft)] px-2.5 py-1 text-xs font-medium text-[var(--mnd-accent)]">
                Trial Account
              </span>
              <span className="text-sm text-[var(--mnd-steel)]">23 days remaining</span>
            </div>
            <p className="mt-2 text-sm text-[var(--mnd-steel-dim)]">Member since January 15, 2026</p>
          </div>
          <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-md bg-[var(--mnd-surface-2)] sm:flex">
            <User className="h-6 w-6 text-[var(--mnd-accent)]" />
          </div>
        </div>
      </SectionCard>

      {/* Profile information */}
      <SectionCard title="Profile Information" eyebrow="Details">
        <form onSubmit={handleProfileSubmit(onProfileSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label className="mnd-kicker mb-1.5 block">Full Name</label>
              <FieldIcon
                icon={User}
                type="text"
                placeholder="Enter your name"
                registration={registerProfile("name")}
                error={profileErrors.name?.message}
              />
            </div>
            <div>
              <label className="mnd-kicker mb-1.5 block">Email Address</label>
              <FieldIcon
                icon={Mail}
                type="email"
                placeholder="Enter your email"
                registration={registerProfile("email")}
                error={profileErrors.email?.message}
              />
            </div>
            <div>
              <label className="mnd-kicker mb-1.5 block">Phone Number</label>
              <FieldIcon
                icon={Phone}
                type="tel"
                placeholder="Enter your phone"
                registration={registerProfile("phone")}
                error={profileErrors.phone?.message}
              />
            </div>
            <div>
              <label className="mnd-kicker mb-1.5 block">Company (optional)</label>
              <FieldIcon
                icon={Building}
                type="text"
                placeholder="Enter company name"
                registration={registerProfile("company")}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 border-t border-[var(--mnd-hairline)] pt-5">
            {profileSaved && (
              <div className="flex items-center gap-1.5 text-sm text-[var(--mnd-good)]">
                <CheckCircle2 className="h-4 w-4" />
                Profile updated successfully
              </div>
            )}
            <button type="submit" className="mnd-btn-accent flex items-center gap-2 px-5 py-2.5 text-sm">
              <Save className="h-4 w-4" />
              Save Changes
            </button>
          </div>
        </form>
      </SectionCard>

      {/* Change password */}
      <SectionCard title="Change Password" eyebrow="Security">
        <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-5">
          <div>
            <label className="mnd-kicker mb-1.5 block">Current Password</label>
            <FieldIcon
              icon={Lock}
              type="password"
              placeholder="Enter current password"
              registration={registerPassword("currentPassword")}
              error={passwordErrors.currentPassword?.message}
            />
          </div>
          <div>
            <label className="mnd-kicker mb-1.5 block">New Password</label>
            <FieldIcon
              icon={Lock}
              type="password"
              placeholder="Enter new password"
              registration={registerPassword("newPassword")}
              error={passwordErrors.newPassword?.message}
            />
          </div>
          <div>
            <label className="mnd-kicker mb-1.5 block">Confirm New Password</label>
            <FieldIcon
              icon={Lock}
              type="password"
              placeholder="Confirm new password"
              registration={registerPassword("confirmPassword")}
              error={passwordErrors.confirmPassword?.message}
            />
          </div>

          <div className="flex items-center justify-end gap-4 border-t border-[var(--mnd-hairline)] pt-5">
            {passwordSaved && (
              <div className="flex items-center gap-1.5 text-sm text-[var(--mnd-good)]">
                <CheckCircle2 className="h-4 w-4" />
                Password updated successfully
              </div>
            )}
            <button type="submit" className="mnd-btn-accent flex items-center gap-2 px-5 py-2.5 text-sm">
              <Lock className="h-4 w-4" />
              Update Password
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}
