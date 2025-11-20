import { Card } from "@/components/ui/card";

export default function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
          Case Studies
        </p>
        <h1 className="text-3xl font-semibold text-[#0b3a63]">Portfolio</h1>
        <p className="text-sm text-[#475467]">
          Showcase flagship installations and client success stories.
        </p>
      </div>
      <Card className="p-6 text-sm text-[#475467]">
        Portfolio management (projects, industries, assets) is coming next. This
        interim screen confirms routing and access control.
      </Card>
    </div>
  );
}

