"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ChevronDown, ChevronUp } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What file formats are supported?",
      answer: "We support STEP files (.step and .stp formats), which are standard CAD exchange formats supported by all major CAD software including SolidWorks, AutoCAD, Fusion 360, and CATIA.",
    },
    {
      question: "How accurate are the estimates?",
      answer: "Our AI-powered estimates are typically within 10-15% of actual manufacturing costs. Accuracy improves as our system learns from real-world data.",
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes! You can cancel your subscription at any time. For monthly plans, you'll have access until the end of your billing period.",
    },
    {
      question: "What happens after trial ends?",
      answer: "After your 30-day trial ends, your chosen subscription will automatically begin. You can cancel before the trial ends to avoid any charges.",
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All files are encrypted in transit and at rest. We use industry-standard security practices and host on Microsoft Azure.",
    },
  ];

  return (
    <Section id="faq" className="bg-[#080C18]/50">
      <Container size="narrow">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-[#B4B9C9]">Everything you need to know</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#151C2F] border border-[#2B334A] rounded-xl overflow-hidden">
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#1a2333]/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-white text-lg pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="text-[#F59E0B] flex-shrink-0 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-[#6B7280] flex-shrink-0 w-5 h-5" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-[#B4B9C9] leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
