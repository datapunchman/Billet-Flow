import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Upload, Brain, Zap, FileText } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: 1,
      title: "Upload STEP file",
      description: "Drag and drop your CAD file",
      icon: Upload,
    },
    {
      step: 2,
      title: "AI analyzes features",
      description: "Detects holes, pockets, threads",
      icon: Brain,
    },
    {
      step: 3,
      title: "Get instant estimates",
      description: "Detailed cost and time breakdown",
      icon: Zap,
    },
    {
      step: 4,
      title: "Download reports",
      description: "Export as PDF or Excel",
      icon: FileText,
    },
  ];

  return (
    <Section id="how-it-works" className="bg-[#080C18]/50">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">How It Works</h2>
          <p className="text-xl text-[#B4B9C9]">Get from CAD file to estimate in 4 simple steps</p>
        </div>

        {/* Steps Grid - 4 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((item) => (
            <div key={item.step} className="text-center relative">
              {/* Connecting line - only show on desktop between steps */}
              {item.step < 4 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-[#2B334A] to-transparent z-0" />
              )}

              {/* Step circle */}
              <div className="w-16 h-16 bg-gradient-to-br from-[#F59E0B] to-[#F97316] rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white shadow-lg relative z-10">
                {item.step}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-[#B4B9C9]">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
