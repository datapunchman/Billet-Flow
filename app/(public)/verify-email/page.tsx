"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockApi } from "@/lib/mock-api";
import { Mail, CheckCircle2, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem("registration_email");
    if (!storedEmail) {
      router.push("/register");
      return;
    }
    setEmail(storedEmail);

    // Check for verification token in URL (from email link)
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      verifyEmail(token);
    }
  }, []);

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, canResend]);

  useEffect(() => {
    if (isVerified) {
      const timer = setTimeout(() => {
        router.push("/verify-phone");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVerified, router]);

  const verifyEmail = async (token: string) => {
    try {
      const response = await mockApi.verifyEmail(token);
      if (response.success) {
        setIsVerified(true);
        setMessage({ type: "success", text: "Email verified successfully!" });
      } else {
        setMessage({ type: "error", text: response.error || "Verification failed" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Verification failed" });
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    setMessage(null);

    try {
      // Simulate resend API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setMessage({ type: "success", text: "Verification email sent!" });
      setCanResend(false);
      setCountdown(60);
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to resend email" });
    } finally {
      setIsResending(false);
    }
  };

  if (isVerified) {
    return (
      <div className="min-h-screen bg-[#080C18] flex items-center justify-center p-6">
        <div className="w-full max-w-[480px] text-center">
          <div className="mb-8">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="text-emerald-400" size={48} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Email Verified!</h1>
            <p className="text-[#B4B9C9]">Your email has been confirmed successfully.</p>
          </div>

          <div className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-8">
            <p className="text-[#B4B9C9] mb-4">
              Redirecting to phone verification in 3 seconds...
            </p>
            <button
              onClick={() => router.push("/verify-phone")}
              className="w-full py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              Continue to Phone Verification
            </button>
          </div>
        </div>
      </div>
    );
  }

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
        </div>

        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-full bg-[#151C2F] border border-[#2B334A] flex items-center justify-center mx-auto mb-4 relative">
            <Mail className="text-[#14B8A6]" size={40} />
            <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#F59E0B] flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Email</h1>
          <p className="text-[#B4B9C9]">
            We've sent a verification link to
            <br />
            <span className="text-white font-medium">{email}</span>
          </p>
        </div>

        <div className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-8">
          <div className="space-y-4">
            {message && (
              <Alert className={`${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            <p className="text-[#B4B9C9] text-sm text-center">
              Please check your inbox and click the verification link to continue.
            </p>

            {/* Resend Email */}
            <div className="text-center pt-4">
              <p className="text-[#6B7280] text-sm mb-3">
                {canResend ? "Didn't receive the email?" : `Resend available in ${countdown}s`}
              </p>
              <button
                className="w-full px-6 py-3 bg-[#080C18] border border-[#2B334A] text-white rounded-xl font-semibold hover:bg-[#1a2333] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!canResend || isResending}
                onClick={handleResendEmail}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Sending...
                  </>
                ) : (
                  "Resend Verification Email"
                )}
              </button>
            </div>

            {/* Change Email */}
            <div className="text-center pt-2">
              <Link
                href="/register"
                className="text-[#F59E0B] hover:text-[#F97316] text-sm transition-colors"
              >
                Change Email Address
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Mode */}
        <div className="mt-6 bg-[#151C2F]/50 border border-[#2B334A]/50 rounded-xl p-4">
          <p className="text-[#6B7280] text-sm font-semibold mb-2">Demo Mode</p>
          <p className="text-[#6B7280] text-xs mb-3">
            Click "Continue to Phone Verification" below to skip email verification.
          </p>
          <button
            className="w-full px-4 py-2 bg-[#080C18] border border-[#2B334A] text-[#B4B9C9] rounded-lg text-sm hover:bg-[#1a2333] hover:text-white transition-all"
            onClick={() => router.push("/verify-phone")}
          >
            Continue to Phone Verification (Demo)
          </button>
        </div>
      </div>
    </div>
  );
}
