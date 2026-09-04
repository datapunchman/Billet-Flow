"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { mockApi } from "@/lib/mock-api";
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle, Tag } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCouponModal, setShowCouponModal] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    const strengthMap = [
      { score: 0, label: "Very Weak", color: "bg-error" },
      { score: 1, label: "Weak", color: "bg-warning" },
      { score: 2, label: "Fair", color: "bg-warning" },
      { score: 3, label: "Good", color: "bg-success" },
      { score: 4, label: "Strong", color: "bg-success" },
      { score: 5, label: "Very Strong", color: "bg-success" },
    ];

    return strengthMap[score];
  };

  const passwordStrength = password ? getPasswordStrength(password) : null;

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await mockApi.register(data);
      if (response.success) {
        // Store email for verification page
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

  return (
    <div className="min-h-screen bg-[#080C18] flex items-center justify-center p-6">
      <div className="w-full max-w-[480px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo.svg"
              alt="DataDelimited"
              width={200}
              height={50}
              className="h-10 w-auto mx-auto"
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-[#B4B9C9]">Start your 30-day free trial today</p>
        </div>

        <div className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-8">
          <CardContent className="p-0">
            {error && (
              <Alert className="mb-6 bg-red-500/10 border-red-500/50 text-red-400">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-[#080C18] border border-[#2B334A] rounded-xl text-white placeholder-[#6B7280] transition-colors focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                  {...register("name")}
                  disabled={isLoading}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 bg-[#080C18] border border-[#2B334A] rounded-xl text-white placeholder-[#6B7280] transition-colors focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                  {...register("email")}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+919876543210"
                  className="w-full px-4 py-3 bg-[#080C18] border border-[#2B334A] rounded-xl text-white placeholder-[#6B7280] transition-colors focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                  {...register("phone")}
                  disabled={isLoading}
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
                <p className="text-[#6B7280] text-xs mt-1">Format: +91XXXXXXXXXX</p>
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#080C18] border border-[#2B334A] rounded-xl text-white placeholder-[#6B7280] transition-colors focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                    {...register("password")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
                {passwordStrength && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-[#B4B9C9]">Password Strength:</span>
                      <span className={`font-medium ${passwordStrength.color.replace('bg-', 'text-')}`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="h-2 bg-[#080C18] rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all`}
                        style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-white mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 bg-[#080C18] border border-[#2B334A] rounded-xl text-white placeholder-[#6B7280] transition-colors focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                    {...register("confirmPassword")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <input
                  id="agreeToTerms"
                  type="checkbox"
                  className="mt-1 h-4 w-4 rounded border-[#2B334A] bg-[#080C18] text-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                  {...register("agreeToTerms")}
                  disabled={isLoading}
                />
                <label htmlFor="agreeToTerms" className="text-sm text-[#B4B9C9]">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#F59E0B] hover:text-[#F97316] transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.agreeToTerms && (
                <p className="text-red-400 text-sm">{errors.agreeToTerms.message}</p>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            {/* Coupon Link */}
            <div className="mt-6 text-center">
              <button
                type="button"
                className="text-[#F59E0B] hover:text-[#F97316] text-sm font-medium inline-flex items-center transition-colors"
                onClick={() => setShowCouponModal(true)}
              >
                <Tag size={16} className="mr-1" />
                Have a Coupon?
              </button>
            </div>

            {/* Login Link */}
            <div className="mt-4 text-center">
              <p className="text-[#B4B9C9] text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-[#F59E0B] hover:text-[#F97316] font-medium transition-colors">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </div>
      </div>

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-md bg-[#151C2F] border border-[#2B334A] rounded-2xl shadow-2xl">
            <div className="p-6 border-b border-[#2B334A]/50">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">Enter Coupon Code</h3>
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="text-[#6B7280] hover:text-white transition-colors"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <p className="text-[#B4B9C9] text-sm mt-2">
                If you have a coupon code, enter it here to skip payment.
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Coupon Code
                </label>
                <Input
                  placeholder="Enter coupon code"
                  className="w-full px-4 py-3 bg-[#080C18] border border-[#2B334A] rounded-xl text-white placeholder-[#6B7280] transition-colors focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowCouponModal(false)}
                  className="flex-1 px-6 py-3 bg-[#080C18] border border-[#2B334A] text-white rounded-xl font-semibold hover:bg-[#1a2333] transition-all"
                >
                  Cancel
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                  Validate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
