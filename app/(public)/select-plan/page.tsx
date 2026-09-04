"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export default function SelectPlanPage() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<string | null>("6_month");

  const plans = [
    {
      id: "monthly",
      name: "Monthly",
      price: 1599,
      period: "month",
      trial: 30,
      bonus: null,
      isPopular: false,
      description: "Perfect for trying out the platform",
    },
    {
      id: "6_month",
      name: "6 Month",
      price: 9594,
      originalPrice: 9594 + 1599,
      period: "one-time",
      trial: 30,
      bonus: 1,
      isPopular: true,
      description: "Best value for growing teams",
    },
    {
      id: "12_month",
      name: "12 Month",
      price: 19188,
      originalPrice: 19188 + (1599 * 3),
      period: "one-time",
      trial: 30,
      bonus: 3,
      isPopular: false,
      description: "Maximum savings for committed users",
    },
  ];

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleContinue = () => {
    if (!selectedPlan) return;

    // Store selected plan
    localStorage.setItem("selected_plan", selectedPlan);

    // In real app, would redirect to payment
    // For demo, go directly to dashboard
    router.push("/payment");
  };

  return (
    <div className="min-h-screen bg-[#080C18] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <Image
              src="/logo.svg"
              alt="DataDelimited"
              width={200}
              height={50}
              className="h-10 w-auto mx-auto mb-6"
            />
          </Link>
        </div>

        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <div className="flex items-center">
              <CheckCircle2 className="text-emerald-400 mr-2" size={20} />
              <span className="text-white font-medium">Registration</span>
            </div>
            <div className="w-8 h-0.5 bg-emerald-400" />
            <div className="flex items-center">
              <CheckCircle2 className="text-emerald-400 mr-2" size={20} />
              <span className="text-white font-medium">Email Verified</span>
            </div>
            <div className="w-8 h-0.5 bg-emerald-400" />
            <div className="flex items-center">
              <CheckCircle2 className="text-emerald-400 mr-2" size={20} />
              <span className="text-white font-medium">Phone Verified</span>
            </div>
            <div className="w-8 h-0.5 bg-[#2B334A]" />
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[#F59E0B] flex items-center justify-center mr-2">
                <span className="text-white text-xs font-bold">4</span>
              </div>
              <span className="text-white font-medium">Plan Selection</span>
            </div>
            <div className="w-8 h-0.5 bg-[#2B334A]" />
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[#151C2F] border border-[#2B334A] flex items-center justify-center mr-2">
                <span className="text-[#6B7280] text-xs font-bold">5</span>
              </div>
              <span className="text-[#6B7280]">Payment</span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-[#B4B9C9] text-lg max-w-2xl mx-auto">
            All plans include a 30-day free trial. No credit card required to start.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative cursor-pointer transition-all bg-[#151C2F] border-2 rounded-2xl p-6 ${
                selectedPlan === plan.id
                  ? "border-[#F59E0B] shadow-lg shadow-orange-500/20"
                  : plan.isPopular
                  ? "border-[#14B8A6]/50"
                  : "border-[#2B334A] hover:border-[#2B334A]/80"
              }`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="px-4 py-1 bg-gradient-to-r from-[#14B8A6] to-[#06B6D4] text-white text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              {selectedPlan === plan.id && (
                <div className="absolute -top-4 right-4">
                  <div className="w-8 h-8 rounded-full bg-[#F59E0B] flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="text-white" size={20} />
                  </div>
                </div>
              )}

              <div className="text-center pb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-[#B4B9C9] text-sm">{plan.description}</p>
                <div className="mt-6">
                  {plan.originalPrice && (
                    <div className="text-[#6B7280] line-through text-lg mb-1">
                      {formatCurrency(plan.originalPrice)}
                    </div>
                  )}
                  <div>
                    <span className="text-4xl font-bold text-white">
                      {formatCurrency(plan.price)}
                    </span>
                    <span className="text-[#B4B9C9]">/{plan.period}</span>
                  </div>
                  {plan.bonus && (
                    <div className="mt-3 inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-full">
                      +{plan.bonus} Month{plan.bonus > 1 ? "s" : ""} Free
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="text-center pb-4 border-b border-[#2B334A]">
                  <div className="inline-block px-3 py-1 bg-[#14B8A6]/10 border border-[#14B8A6]/20 text-[#14B8A6] text-xs font-semibold rounded-full">
                    {plan.trial} Days Free Trial
                  </div>
                </div>

                <ul className="space-y-3">
                  {[
                    "Unlimited STEP file uploads",
                    "AI feature recognition",
                    "Instant estimate generation",
                    "Detailed cost breakdown",
                    "Machining strategy analysis",
                    "PDF & Excel export",
                    "Estimate history & search",
                    "Email support",
                  ].map((feature, i) => (
                    <li key={i} className="flex items-start text-[#B4B9C9] text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <div className="text-center">
          <button
            className="px-12 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedPlan}
            onClick={handleContinue}
          >
            Continue to Payment
          </button>
          <p className="text-[#6B7280] text-sm mt-4">
            You won't be charged until your 30-day trial ends
          </p>
        </div>

        {/* Features Summary */}
        <div className="mt-12 bg-[#151C2F]/50 border border-[#2B334A]/50 rounded-2xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-[#F59E0B] mb-2">30 Days</div>
              <p className="text-[#B4B9C9] text-sm">Free Trial Period</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F59E0B] mb-2">Unlimited</div>
              <p className="text-[#B4B9C9] text-sm">File Uploads</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-[#F59E0B] mb-2">Cancel Anytime</div>
              <p className="text-[#B4B9C9] text-sm">No Long-term Commitment</p>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center mt-8">
          <Link href="/verify-phone" className="text-[#B4B9C9] hover:text-white text-sm transition-colors">
            ← Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}
