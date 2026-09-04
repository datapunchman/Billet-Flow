import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Brain, Zap, FileText, Clock, DollarSign, Shield } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: Brain,
      title: "AI Feature Recognition",
      description: "Advanced AI algorithms automatically detect and classify machining features from your STEP files.",
      gradient: "from-purple-500 to-indigo-500",
    },
    {
      icon: Zap,
      title: "Instant Estimates",
      description: "Get accurate cost breakdowns, machining time, and material requirements in seconds.",
      gradient: "from-[#F59E0B] to-[#F97316]",
    },
    {
      icon: FileText,
      title: "STEP File Support",
      description: "Upload standard STEP (.step, .stp) files directly from your CAD software.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Clock,
      title: "Strategy Optimization",
      description: "AI-powered optimization of machining strategies for cost and time efficiency.",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: DollarSign,
      title: "Cost Analysis",
      description: "Detailed cost breakdown including materials, labor, machine time, and setup costs.",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-level encryption and secure cloud storage for all your project files.",
      gradient: "from-purple-500 to-pink-500",
    },
  ];

  return (
    <Section id="features">
      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-[#B4B9C9] max-w-2xl mx-auto">
            Everything you need for accurate CNC estimates
          </p>
        </div>

        {/* Feature Cards Grid - 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#151C2F] border border-[#2B334A] rounded-2xl p-8 hover:border-[#2B334A]/80 transition-all hover:-translate-y-1"
            >
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-[#B4B9C9] leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
