"use client";

import { useState } from "react";
import { Check, Zap, Crown, Rocket, Clock, TrendingUp, Upload, FileText } from "lucide-react";

interface Plan {
  id: string;
  name: string;
  price: number;
  period: string;
  savings?: string;
  isPopular?: boolean;
  gradient: string;
  icon: any;
  features: string[];
}

export default function SubscriptionPage() {
  const [plans] = useState<Plan[]>([
    {
      id: "monthly",
      name: "Monthly",
      price: 99,
      period: "month",
      gradient: "from-blue-500 to-cyan-500",
      icon: Zap,
      features: [
        "100 estimates per month",
        "All file formats supported",
        "Basic AI analysis",
        "Email support",
        "Standard processing speed",
        "PDF export",
      ],
    },
    {
      id: "6-month",
      name: "6 Month Plan",
      price: 499,
      period: "6 months",
      savings: "Save 17%",
      isPopular: true,
      gradient: "from-orange-500 to-pink-500",
      icon: Crown,
      features: [
        "300 estimates (50/month)",
        "All file formats supported",
        "Advanced AI analysis",
        "Priority email support",
        "Fast processing speed",
        "PDF & Excel export",
        "+1 month free",
      ],
    },
    {
      id: "12-month",
      name: "Annual Plan",
      price: 899,
      period: "12 months",
      savings: "Save 25%",
      gradient: "from-purple-500 to-indigo-500",
      icon: Rocket,
      features: [
        "500 estimates (42/month)",
        "All file formats supported",
        "Premium AI analysis",
        "24/7 priority support",
        "Instant processing",
        "All export formats",
        "+3 months free",
        "Dedicated account manager",
      ],
    },
  ]);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-3">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-400">
          Unlock unlimited estimates and advanced features
        </p>
      </div>

      {/* Current Plan Status */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-8">
        <div className="flex items-start justify-between flex-wrap gap-6">
          <div>
            <h3 className="text-2xl font-bold text-white mb-3">Current Plan: Trial</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">23 days remaining</p>
                  <p className="text-sm text-gray-400">Trial expires on September 26, 2026</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Upload className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-400">Estimates Used</span>
                  </div>
                  <p className="text-2xl font-bold text-white">7 / 10</p>
                  <div className="mt-3 h-2 bg-[#1a1b1e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: "70%" }}
                    />
                  </div>
                </div>

                <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-cyan-400" />
                    <span className="text-sm text-gray-400">Storage Used</span>
                  </div>
                  <p className="text-2xl font-bold text-white">245 MB</p>
                  <div className="mt-3 h-2 bg-[#1a1b1e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                      style={{ width: "49%" }}
                    />
                  </div>
                </div>

                <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-400">Total Saved</span>
                  </div>
                  <p className="text-2xl font-bold text-white">$4,620</p>
                  <p className="text-xs text-gray-500 mt-2">vs manual estimation</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className={`
                relative bg-[#13141a] border rounded-2xl overflow-hidden
                transition-all hover:-translate-y-2
                ${plan.isPopular ? "border-orange-500/50 shadow-lg shadow-orange-500/20" : "border-[#1f2937]/50"}
              `}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center py-2 text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className={`p-8 ${plan.isPopular ? "pt-14" : ""}`}>
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${plan.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg stat-icon`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>

                {/* Savings Badge */}
                {plan.savings && (
                  <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-lg border border-green-500/20 mb-4">
                    {plan.savings}
                  </span>
                )}

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-gray-400">/ {plan.period}</span>
                  </div>
                  {plan.period !== "month" && (
                    <p className="text-sm text-gray-500 mt-2">
                      ${(plan.price / parseInt(plan.period.split(" ")[0])).toFixed(2)} per month
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-400" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <button
                  className={`
                    w-full py-4 rounded-xl font-semibold text-white transition-all
                    ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg hover:shadow-orange-500/30"
                        : "bg-[#1a1b1e] hover:bg-[#1f2937] border border-[#1f2937]/50"
                    }
                  `}
                >
                  {plan.isPopular ? "Upgrade Now" : "Select Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Benefits Section */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          All Plans Include
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Check className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">AI Analysis</h4>
            <p className="text-sm text-gray-400">Advanced feature detection and cost optimization</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Instant Results</h4>
            <p className="text-sm text-gray-400">Get estimates in seconds, not hours</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Export Reports</h4>
            <p className="text-sm text-gray-400">Download detailed PDF and Excel reports</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <h4 className="font-semibold text-white mb-2">Priority Support</h4>
            <p className="text-sm text-gray-400">Get help when you need it</p>
          </div>
        </div>
      </div>

      {/* FAQ Note */}
      <div className="bg-[#13141a] border border-[#1f2937]/50 rounded-2xl p-6 text-center">
        <p className="text-gray-400">
          Have questions? Check our{" "}
          <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
            FAQ
          </a>{" "}
          or{" "}
          <a href="#" className="text-orange-500 hover:text-orange-400 font-medium">
            contact support
          </a>
        </p>
      </div>
    </div>
  );
}
