import { Phone, MapPin, Mail } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { QuoteForm } from "@/components/sections/quote-form";

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#f5f7fa] py-20">
      <Container className="space-y-12">
        <SectionHeading
          eyebrow="Contact"
          title="Talk to an applications engineer"
          description="Request sizing help, on-site surveys, or pricing. We respond within one business day."
        />
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-6 rounded-3xl border border-[#0b3a63]/10 bg-white p-6">
            <ContactRow icon={<Phone className="h-5 w-5" />} label="Call" value={`${siteConfig.contact.phonePrimary} / ${siteConfig.contact.phoneSecondary}`} />
            <ContactRow icon={<Mail className="h-5 w-5" />} label="Email" value={siteConfig.contact.email} />
            <ContactRow icon={<MapPin className="h-5 w-5" />} label="Visit" value={siteConfig.contact.address} />
            <div className="rounded-2xl bg-[#0b3a63]/5 p-4 text-sm text-[#0b3a63]">
              Available {siteConfig.contact.hours}. After-hours hotline for contracted clients.
            </div>
          </div>
          <QuoteForm />
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0b3a63]/10 text-[#0b3a63]">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold text-[#475467]">{label}</p>
        <p className="text-lg font-semibold text-[#0b3a63]">{value}</p>
      </div>
    </div>
  );
}

