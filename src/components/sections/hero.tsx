import { ArrowUpRight, Shield, Zap } from "lucide-react";
import { siteConfig } from "@/lib/config/site";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-[#f5f7fa]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(11,58,99,0.08),_transparent_45%)]" />
      <Container className="relative grid gap-12 py-20 lg:grid-cols-2 lg:items-center">
        <div className="space-y-8">
          <Badge className="bg-white text-[#0b3a63]">
            National metrology partner since 2006
          </Badge>
          <h1 className="text-4xl font-semibold text-[#0b3a63] sm:text-5xl">
            Precision weighing and intralogistics for Cambodia’s fastest-growing
            industries.
          </h1>
          <p className="text-lg text-[#475467]">
            We design, deploy, and maintain truck scales, storage systems, and
            material handling equipment—backed by ISO-certified calibration and
            nationwide service teams.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <a href="#products">Browse Products</a>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <a href="#quote">
                Request Technical Assessment
                <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
          <dl className="grid gap-6 sm:grid-cols-3">
            {siteConfig.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-[#0b3a63]/10 bg-white/80 p-4 shadow-sm backdrop-blur">
                <dt className="text-sm text-[#475467]">{stat.label}</dt>
                <dd className="text-3xl font-semibold text-[#0b3a63]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="relative rounded-[32px] border border-white/60 bg-gradient-to-br from-[#0b3a63] to-[#102a43] p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/70">
                  Integrated suite
                </p>
                <p className="text-2xl font-semibold mt-2">
                  Scale + Storage + Service
                </p>
              </div>
              <Shield className="h-12 w-12 text-white/70" />
            </div>
            <div className="mt-8 space-y-5">
              <FeatureRow title="Calibration & certification" description="Accredited lab, remote diagnostics, and reporting." />
              <FeatureRow title="Material flow engineering" description="Layout, racking, conveyors, safety systems." />
              <FeatureRow title="Lifecycle service bundle" description="On-site service teams across Phnom Penh & provinces." />
            </div>
            <div className="mt-10 flex items-center gap-3 rounded-2xl bg-white/10 p-4">
              <Zap className="h-10 w-10 rounded-xl bg-white/20 p-2" />
              <div>
                <p className="text-sm text-white/70">Avg. deployment</p>
                <p className="text-xl font-semibold">45 days from sign-off</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureRow({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="border-l-4 border-[#ff8a00] pl-4">
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-sm text-white/80">{description}</p>
    </div>
  );
}

