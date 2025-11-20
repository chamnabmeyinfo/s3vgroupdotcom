import { Card } from "@/components/ui/card";

export default function TeamPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
          People
        </p>
        <h1 className="text-3xl font-semibold text-[#0b3a63]">Team</h1>
        <p className="text-sm text-[#475467]">
          Add leadership, service engineers, and commercial contacts.
        </p>
      </div>
      <Card className="p-6 text-sm text-[#475467]">
        Team management will appear here in the next iteration (profiles, roles,
        and ordering). For now this placeholder confirms routing and auth.
      </Card>
    </div>
  );
}

