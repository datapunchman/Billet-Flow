"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations";
import { mockApi } from "@/lib/mock-api";
import { setAuthToken, setUser } from "@/lib/auth";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { MandrokMark } from "@/components/shared/MandrokMark";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApi.login(data.email, data.password);
      if (response.success && response.data) {
        setAuthToken(response.data.token);
        setUser(response.data.user);

        if (response.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/dashboard");
        }
      } else {
        setError(response.error || "Invalid credentials");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mnd-grid-bg relative flex min-h-screen items-center justify-center bg-[var(--mnd-black)] p-6">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(560px circle at 50% 0%, rgba(224,71,0,0.10), transparent 70%)",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <Link href="/login" className="inline-flex flex-col items-center gap-3">
            <MandrokMark className="h-11 w-11 text-[var(--mnd-white)]" />
            <span className="mnd-font-display text-lg font-semibold tracking-[0.08em] text-[var(--mnd-white)]">
              MANDROK
            </span>
          </Link>
          <h1 className="mnd-font-display mt-7 text-[28px] font-semibold text-[var(--mnd-white)]">
            Sign in to your console
          </h1>
          <p className="mt-1.5 text-sm text-[var(--mnd-steel)]">
            Precision, automated. Pick up where you left off.
          </p>
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
              <label htmlFor="email" className="mnd-kicker mb-2 block">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="mnd-input h-12 w-full px-4 text-sm placeholder:text-[var(--mnd-steel-dim)]"
                {...register("email")}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label htmlFor="password" className="mnd-kicker">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="mnd-input h-12 w-full px-4 pr-11 text-sm placeholder:text-[var(--mnd-steel-dim)]"
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
              {errors.password && (
                <p className="mt-1.5 text-xs text-[var(--mnd-bad)]">{errors.password.message}</p>
              )}
            </div>

            <label className="flex items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-[var(--mnd-hairline-strong)] bg-[var(--mnd-black)] accent-[var(--mnd-accent)]"
                {...register("rememberMe")}
                disabled={isLoading}
              />
              <span className="text-sm text-[var(--mnd-steel)]">Remember me</span>
            </label>

            <button
              type="submit"
              className="mnd-btn-accent flex h-12 w-full items-center justify-center gap-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--mnd-steel)]">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="font-medium text-[var(--mnd-accent)] hover:text-[var(--mnd-accent-hover)]">
                Sign Up
              </Link>
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 border-t border-[var(--mnd-hairline)] pt-5">
            <span className="mnd-kicker !text-[10px]">Powered by</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="DataDelimited" className="h-4 w-auto opacity-90" />
          </div>
        </div>

        {/* Demo credentials */}
        <div className="mnd-card mt-4 p-5">
          <p className="mnd-kicker mb-3">Demo Access</p>
          <div className="mnd-font-mono space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[var(--mnd-steel)]">User</span>
              <code className="text-[var(--mnd-stone)]">john.doe@example.com / password123</code>
            </div>
            <div className="flex items-center justify-between border-t border-[var(--mnd-hairline)] pt-2">
              <span className="text-[var(--mnd-steel)]">Admin</span>
              <code className="text-[var(--mnd-stone)]">admin@datadelimited.com / admin123</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
