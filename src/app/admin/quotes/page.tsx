import { Card } from "@/components/ui/card";
import { getPrismaClient } from "@/lib/prisma";

async function getQuotes() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });
}

export default async function QuotesPage() {
  const quotes = await getQuotes();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
          Pipeline
        </p>
        <h1 className="text-3xl font-semibold text-[#0b3a63]">Quotes</h1>
        <p className="text-sm text-[#475467]">
          Track inbound requests and support follow-up.
        </p>
      </div>
      <Card className="divide-y divide-[#e2e8f0]">
        {quotes.length === 0 && (
          <p className="p-6 text-sm text-[#64748b]">
            No quote data yet. Requests submitted on the public site will appear
            here.
          </p>
        )}
        {quotes.map((quote) => (
          <div key={quote.id} className="flex items-center justify-between p-6">
            <div>
              <p className="font-semibold text-[#0b3a63]">
                {quote.companyName}
              </p>
              <p className="text-sm text-[#475467]">
                {quote.contactName} • {quote.email}
              </p>
            </div>
            <span className="rounded-full bg-[#e2e8f0] px-3 py-1 text-xs font-semibold text-[#0b3a63]">
              {quote.status}
            </span>
          </div>
        ))}
      </Card>
    </div>
  );
}

