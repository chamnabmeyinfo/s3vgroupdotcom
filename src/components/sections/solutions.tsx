import { ArrowUpRight } from "lucide-react";
import type { SolutionStory } from "@/types/catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

type SolutionsSectionProps = {
  solutions: SolutionStory[];
};

export function SolutionsSection({ solutions }: SolutionsSectionProps) {
  return (
    <section id="solutions" className="bg-[#0b1120] py-20 text-white">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Solutions"
          title="Engineered packages per industry"
          description="We combine equipment, software, and service to meet compliance and throughput targets across sectors."
          align="center"
        />
        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <article
              key={solution.id}
              className="rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <p className="text-sm uppercase tracking-[0.3em] text-white/60">
                {solution.industries.join(" • ")}
              </p>
              <h3 className="mt-4 text-2xl font-semibold">{solution.title}</h3>
              <p className="mt-3 text-sm text-white/70">{solution.description}</p>
              <a
                href="#quote"
                className="mt-6 inline-flex items-center text-sm font-semibold text-[#ffb347]"
              >
                {solution.ctaLabel}
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

