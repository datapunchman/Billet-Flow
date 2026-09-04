import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <Section>
      <Container size="narrow">
        <div className="bg-gradient-to-br from-[#151C2F] to-[#080C18] border border-[#2B334A] rounded-3xl p-12 text-center relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#F59E0B]/5 to-purple-600/5" />

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-[#B4B9C9] mb-8 max-w-2xl mx-auto">
              Join 1,000+ manufacturers using DataDelimited to streamline their estimation process
            </p>
            <Link href="/register">
              <button className="px-10 py-5 bg-gradient-to-r from-[#F59E0B] to-[#F97316] text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-0.5 inline-flex items-center gap-2">
                Start Free Trial Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <p className="text-sm text-[#6B7280] mt-6">
              No credit card required • 30-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
