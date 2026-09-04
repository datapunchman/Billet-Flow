import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ProductMockup } from "./ProductMockup";

export function Hero() {
  return (
    <section className="relative pt-32 pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-orange-600/5" />

      <Container className="relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Content (5 columns) */}
          <div className="lg:col-span-5">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#151C2F]/60 border border-[#2B334A]/50 backdrop-blur-sm mb-6">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span className="text-sm font-semibold text-white">AI-Powered Manufacturing Estimates</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Transform Your{" "}
              <span className="bg-gradient-to-r from-[#F59E0B] via-[#F97316] to-[#F59E0B] bg-clip-text text-transparent">
                CNC Estimation
              </span>{" "}
              Process
            </h1>

            {/* Description */}
            <p className="text-xl text-[#B4B9C9] mb-10 leading-relaxed">
              Generate accurate manufacturing estimates in seconds using advanced AI.
              Upload your STEP files and get instant cost breakdowns, machining strategies, and detailed reports.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link href="/register">
                <button className="px-8 py-4 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold text-base hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto">
                  Start Free 30-Day Trial
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#features">
                <button className="px-8 py-4 bg-[#151C2F] border border-[#2B334A] text-white rounded-xl font-semibold text-base hover:bg-[#1a2333] transition-all w-full sm:w-auto">
                  Watch Demo
                </button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm">
              <span className="flex items-center gap-2 text-[#B4B9C9]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                No credit card required
              </span>
              <span className="flex items-center gap-2 text-[#B4B9C9]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                30-day free trial
              </span>
              <span className="flex items-center gap-2 text-[#B4B9C9]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                Cancel anytime
              </span>
            </div>
          </div>

          {/* Right Column - Product Mockup (7 columns) */}
          <div className="lg:col-span-7">
            <ProductMockup />
          </div>
        </div>
      </Container>
    </section>
  );
}
