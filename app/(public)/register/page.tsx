"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { mockApi } from "@/lib/mock-api";
import { Eye, EyeOff, Loader2, X, Tag, ArrowRight } from "lucide-react";
import { MandrokMark } from "@/components/shared/MandrokMark";

const strengthMap = [
  { score: 0, label: "Very Weak", color: "var(--mnd-bad)" },
  { score: 1, label: "Weak", color: "var(--mnd-warn)" },
  { score: 2, label: "Fair", color: "var(--mnd-warn)" },
  { score: 3, label: "Good", color: "var(--mnd-good)" },
  { score: 4, label: "Strong", color: "var(--mnd-good)" },
  { score: 5, label: "Very Strong", color: "var(--mnd-good)" },
];

function getPasswordStrength(pwd: string) {
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;
  return strengthMap[score];
}

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState<{ success: boolean; message: string } | null>(null);
  const [couponChecking, setCouponChecking] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");
  const passwordStrength = password ? getPasswordStrength(password) : null;

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApi.register(data);
      if (response.success) {
        localStorage.setItem("registration_email", data.email);
        router.push("/verify-email");
      } else {
        setError(response.error || "Registration failed");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const validateCoupon = async () => {
    setCouponChecking(true);
    setCouponResult(null);
    try {
      const response = await mockApi.validateCoupon(couponCode);
      setCouponResult({
        success: response.success,
        message: response.success
          ? `Valid — ${response.data?.discountValue} extra trial days applied.`
          : response.error || "Invalid coupon code",
      });
    } finally {
      setCouponChecking(false);
    }
  };

  const inputClass =
    "mnd-input h-12 w-full px-4 text-sm placeholder:text-[var(--mnd-steel-dim)]";

  return (
    <div className="mnd-grid-bg relative flex min-h-screen items-center justify-center bg-[var(--mnd-black)] p-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(560px circle at 50% 0%, rgba(224,71,0,0.10), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-[480px] py-10">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link href="/login" className="inline-flex flex-col items-center gap-3">
            <MandrokMark className="h-11 w-11 text-[var(--mnd-white)]" />
            <span className="mnd-font-display text-lg font-semibold tracking-[0.08em] text-[var(--mnd-white)]">
              MANDROK
            </span>
          </Link>
          <h1 className="mnd-font-display mt-7 text-[28px] font-semibold text-[var(--mnd-white)]">
            Create your account
          </h1>
          <p className="mt-1.5 text-sm text-[var(--mnd-steel)]">Start your 30-day free trial today.</p>
        </div>

        {/* Card */}
        <div className="mnd-card p-8">
          {error && (
            <div className="mb-6 rounded-md border border-[var(--mnd-bad)]/30 bg-[var(--mnd-bad-soft)] p-3.5">
              <p className="text-sm text-[var(--mnd-bad)]">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="name" className="mnd-kicker mb-2 block">
                Full Name
              </label>
              <input id="name" type="text" placeholder="John Doe" className={inputClass} {...register("name")} disabled={isLoading} />
              {errors.name && <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="mnd-kicker mb-2 block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className={inputClass}
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="mnd-kicker mb-2 block">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="+919876543210"
                className={inputClass}
                {...register("phone")}
                disabled={isLoading}
              />
              {errors.phone ? (
                <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.phone.message}</p>
              ) : (
                <p className="mt-1.5 text-xs text-[var(--mnd-steel-dim)]">Format: +91XXXXXXXXXX</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="mnd-kicker mb-2 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                  {...register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--mnd-steel)] hover:text-[var(--mnd-white)]"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.password.message}</p>}
              {passwordStrength && (
                <div className="mt-2.5">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="text-[var(--mnd-steel)]">Password strength</span>
                    <span className="font-medium" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-[var(--mnd-surface-3)]">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: passwordStrength.color,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mnd-kicker mb-2 block">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`${inputClass} pr-11`}
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--mnd-steel)] hover:text-[var(--mnd-white)]"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-start gap-3">
              <input
                id="agreeToTerms"
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-[var(--mnd-hairline-strong)] bg-[var(--mnd-black)] accent-[var(--mnd-accent)]"
                {...register("agreeToTerms")}
                disabled={isLoading}
              />
              <label htmlFor="agreeToTerms" className="text-sm text-[var(--mnd-steel)]">
                I agree to the{" "}
                <Link href="/terms" className="text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="text-xs text-[var(--mnd-bad)]">{errors.agreeToTerms.message}</p>
            )}

            <button
              type="submit"
              className="mnd-btn-accent flex h-12 w-full items-center justify-center gap-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-5 text-center">
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]"
              onClick={() => setShowCouponModal(true)}
            >
              <Tag className="h-3.5 w-3.5" />
              Have a coupon?
            </button>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-[var(--mnd-steel)]">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
                Log in
              </Link>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-[var(--mnd-hairline)] pt-5">
            <span className="mnd-kicker !text-[10px]">Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="DataDelimited" className="h-4 w-auto opacity-90" />
          </div>
        </div>
      </div>

      {/* Coupon modal */}
      {showCouponModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setShowCouponModal(false)}
        >
          <div className="mnd-card w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="mnd-font-display text-lg font-semibold text-[var(--mnd-white)]">
                Enter Coupon Code
              </h3>
              <button
                onClick={() => setShowCouponModal(false)}
                className="rounded p-1 text-[var(--mnd-steel)] hover:text-[var(--mnd-white)]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-5 text-sm text-[var(--mnd-steel)]">
              If you have a coupon code, enter it here to skip payment.
            </p>

            <label className="mnd-kicker mb-1.5 block">Coupon Code</label>
            <input
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value);
                setCouponResult(null);
              }}
              placeholder="WELCOME50"
              className="mnd-font-mono mnd-input h-11 w-full px-4 text-sm uppercase"
            />

            {couponResult && (
              <p
                className="mt-2.5 text-xs"
                style={{ color: couponResult.success ? "var(--mnd-good)" : "var(--mnd-bad)" }}
              >
                {couponResult.message}
              </p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowCouponModal(false)}
                className="mnd-btn-ghost flex-1 py-2.5 text-sm font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={validateCoupon}
                disabled={!couponCode || couponChecking}
                className="mnd-btn-accent flex-1 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
              >
                {couponChecking ? "Checking…" : "Validate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
