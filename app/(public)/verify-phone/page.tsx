"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { mockApi } from "@/lib/mock-api";
import { Smartphone, CheckCircle2, Loader2 } from "lucide-react";

export default function VerifyPhonePage() {
  const router = useRouter();
  const [phone, setPhone] = useState<string>("");
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("registration_email");
    if (!storedEmail) {
      router.push("/register");
      return;
    }

    // Mock phone from registration
    setPhone("+919876543210");

    // Focus first input
    inputRefs.current[0]?.focus();
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
        router.push("/select-plan");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVerified, router]);

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all filled
    if (newOtp.every((digit) => digit !== "") && !isVerifying) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("").concat(Array(6).fill("")).slice(0, 6);
    setOtp(newOtp);

    // Focus last filled input
    const lastIndex = Math.min(pastedData.length, 5);
    inputRefs.current[lastIndex]?.focus();

    // Auto-verify if complete
    if (pastedData.length === 6) {
      verifyOtp(pastedData);
    }
  };

  const verifyOtp = async (otpValue: string) => {
    setIsVerifying(true);
    setMessage(null);

    try {
      const response = await mockApi.verifyPhoneOTP(phone, otpValue);
      if (response.success) {
        setIsVerified(true);
        setMessage({ type: "success", text: "Phone verified successfully!" });
      } else {
        setMessage({ type: "error", text: response.error || "Invalid OTP" });
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Verification failed" });
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResending(true);
    setMessage(null);
    setOtp(["", "", "", "", "", ""]);

    try {
      const response = await mockApi.sendPhoneOTP(phone);
      if (response.success) {
        setMessage({ type: "success", text: "OTP sent to your phone!" });
        setCanResend(false);
        setCountdown(30);
        inputRefs.current[0]?.focus();
      } else {
        setMessage({ type: "error", text: response.error || "Failed to send OTP" });
      }
    } catch (err: any) {
      setMessage({ type: "error", text: "Failed to send OTP" });
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
            <h1 className="text-3xl font-bold text-white mb-2">Phone Verified!</h1>
            <p className="text-[#B4B9C9]">Your phone number has been confirmed successfully.</p>
          </div>

          <div className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-8">
            <p className="text-[#B4B9C9] mb-4">
              Redirecting to plan selection in 3 seconds...
            </p>
            <button
              onClick={() => router.push("/select-plan")}
              className="w-full py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all"
            >
              Continue to Plan Selection
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
          <div className="w-20 h-20 rounded-full bg-[#151C2F] border border-[#2B334A] flex items-center justify-center mx-auto mb-4">
            <Smartphone className="text-[#14B8A6]" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Verify Your Phone</h1>
          <p className="text-[#B4B9C9]">
            Enter the 6-digit code sent to
            <br />
            <span className="text-white font-medium">{phone}</span>
          </p>
        </div>

        <div className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-8">
          <div className="space-y-6">
            {message && (
              <Alert className={`${message.type === "success" ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400" : "bg-red-500/10 border-red-500/50 text-red-400"}`}>
                <AlertDescription>{message.text}</AlertDescription>
              </Alert>
            )}

            {/* OTP Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-4 text-center">
                Enter OTP
              </label>
              <div className="flex justify-center gap-3" onPaste={handlePaste}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-14 h-16 text-center text-2xl font-bold bg-[#080C18] border-2 border-[#2B334A] rounded-xl text-white transition-all focus:outline-none focus:border-[#F59E0B] focus:ring-2 focus:ring-[#F59E0B]/20 disabled:opacity-50"
                    disabled={isVerifying}
                  />
                ))}
              </div>
            </div>

            {isVerifying && (
              <div className="flex items-center justify-center text-[#B4B9C9]">
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Verifying...
              </div>
            )}

            {/* Resend OTP */}
            <div className="text-center pt-4 border-t border-[#2B334A]/50">
              <p className="text-[#6B7280] text-sm mb-3">
                {canResend ? "Didn't receive the code?" : `Resend available in ${countdown}s`}
              </p>
              <button
                className="w-full px-6 py-3 bg-[#080C18] border border-[#2B334A] text-white rounded-xl font-semibold hover:bg-[#1a2333] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!canResend || isResending}
                onClick={handleResendOtp}
              >
                {isResending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                    Sending...
                  </>
                ) : (
                  "Resend OTP"
                )}
              </button>
            </div>

            {/* Change Phone */}
            <div className="text-center">
              <Link
                href="/register"
                className="text-[#F59E0B] hover:text-[#F97316] text-sm transition-colors"
              >
                Change Phone Number
              </Link>
            </div>
          </div>
        </div>

        {/* Demo Mode */}
        <div className="mt-6 bg-[#151C2F]/50 border border-[#2B334A]/50 rounded-xl p-4">
          <p className="text-[#6B7280] text-sm font-semibold mb-2">Demo Mode</p>
          <p className="text-[#6B7280] text-xs mb-3">
            Enter any 6-digit code (e.g., 123456) to verify.
          </p>
          <button
            className="w-full px-4 py-2 bg-[#080C18] border border-[#2B334A] text-[#B4B9C9] rounded-lg text-sm hover:bg-[#1a2333] hover:text-white transition-all"
            onClick={() => {
              setOtp(["1", "2", "3", "4", "5", "6"]);
              verifyOtp("123456");
            }}
          >
            Auto-fill Demo OTP
          </button>
        </div>
      </div>
    </div>
  );
}
