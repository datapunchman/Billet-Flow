import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CheckCircle2 } from "lucide-react";

export function Pricing() {
  const plans = [
    {
      name: "Monthly",
      price: 99,
      period: "month",
      isPopular: false,
    },
    {
      name: "6 Month",
      price: 499,
      period: "6 months",
      savings: "Save 17%",
      isPopular: true,
    },
    {
      name: "Annual",
      price: 899,
      period: "year",
      savings: "Save 25%",
      isPopular: false,
    },
  ];

  const features = [
    "Unlimited STEP uploads",
    "AI feature recognition",
    "Instant estimates",
    "Cost breakdown",
    "PDF & Excel export",
    "Email support",
  ];

  return (
    <Section id="pricing">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-[#B4B9C9] max-w-2xl mx-auto">
            Choose the plan that works best for you
          </p>
        </div>

        {/* Pricing Cards Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`
                relative bg-[#151C2F] border rounded-2xl p-8 transition-all hover:-translate-y-2
                ${plan.isPopular ? "border-[#F59E0B]/50 shadow-lg shadow-orange-500/20" : "border-[#2B334A]"}
              `}
            >
              {/* Most Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white text-sm font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              {/* Plan Details */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                {plan.savings && (
                  <span className="inline-block px-3 py-1 bg-emerald-500/10 text-emerald-400 text-sm font-medium rounded-lg border border-emerald-500/20 mb-4">
                    {plan.savings}
                  </span>
                )}
                <div className="mb-6">
                  <span className="text-5xl font-bold text-white">${plan.price}</span>
                  <span className="text-[#6B7280]">/{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-[#B4B9C9]">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/register">
                <button
                  className={`
                    w-full py-4 rounded-xl font-semibold transition-all
                    ${
                      plan.isPopular
                        ? "bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white hover:shadow-lg hover:shadow-orange-500/30"
                        : "bg-[#1a2333] border border-[#2B334A] text-white hover:bg-[#202938]"
                    }
                  `}
                >
                  Start Free Trial
                </button>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
