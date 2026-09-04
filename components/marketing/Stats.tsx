import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function Stats() {
  const stats = [
    { label: "Estimates Generated", value: "10k+" },
    { label: "Accuracy Rate", value: "95%" },
    { label: "Avg. Processing", value: "2 min" },
    { label: "Active Users", value: "1,000+" },
  ];

  return (
    <Section className="py-16 border-y border-[#2B334A]/30">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-[#6B7280]">{stat.label}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
