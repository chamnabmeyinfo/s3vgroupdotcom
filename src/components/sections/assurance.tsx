import { ShieldCheck, Wrench, Medal } from "lucide-react";
import { Container } from "@/components/ui/container";

const assurances = [
  {
    icon: ShieldCheck,
    title: "Government certified calibration lab",
    description: "ISO/IEC 17025 compliant metrology services.",
  },
  {
    icon: Wrench,
    title: "Nationwide deployment & service",
    description: "On-site engineers in Phnom Penh, Siem Reap, Battambang.",
  },
  {
    icon: Medal,
    title: "Warranty up to 36 months",
    description: "Extended coverage with remote diagnostics included.",
  },
];

export function AssuranceStrip() {
  return (
    <section className="bg-white">
      <Container className="grid gap-4 py-8 lg:grid-cols-3">
        {assurances.map((item) => (
          <div
            key={item.title}
            className="flex gap-4 rounded-3xl border border-[#0b3a63]/10 bg-[#f8fafc] p-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#0b3a63]">
              <item.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0b3a63]">
                {item.title}
              </p>
              <p className="text-xs text-[#475467]">{item.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </section>
  );
}

