import type { ServiceOffering } from "@/types/catalog";
import { SectionHeading } from "@/components/ui/section-heading";
import { Container } from "@/components/ui/container";

type ServicesSectionProps = {
  services: ServiceOffering[];
};

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section id="services" className="bg-white py-20">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Services"
          title="Everything required for a reliable install"
          description="From civil works to operator training, we stay accountable across the equipment lifecycle."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="rounded-3xl border border-[#0b3a63]/10 bg-[#f8fafc] p-6"
            >
              <h3 className="text-2xl font-semibold text-[#0b3a63]">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-[#475467]">
                {service.description}
              </p>
              <ul className="mt-4 space-y-2 text-sm text-[#0b3a63]">
                {service.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#ff8a00]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

