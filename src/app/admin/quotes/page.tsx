import { Card } from "@/components/ui/card";
import { getPrismaClient } from "@/lib/prisma";
import { QuoteStatusUpdater } from "@/components/admin/quote-status-updater";
import { format } from "date-fns";
import Link from "next/link";

async function getQuotes() {
  const prisma = await getPrismaClient();
  if (!prisma) return [];
  return prisma.quoteRequest.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
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
          Track inbound requests and support follow-up ({quotes.length} total).
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-[#475467]">
              <tr>
                <th className="px-6 py-3 font-medium">Company</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Phone</th>
                <th className="px-6 py-3 font-medium">Message</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Submitted</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
              {quotes.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-[#64748b]">
                    No quote requests yet. Submissions will appear here.
                  </td>
                </tr>
              )}
              {quotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">
                    {quote.companyName}
                  </td>
                  <td className="px-6 py-4">{quote.contactName}</td>
                  <td className="px-6 py-4 text-[#475467]">
                    <a href={`mailto:${quote.email}`} className="hover:text-[#0b3a63] hover:underline">
                      {quote.email}
                    </a>
                  </td>
                  <td className="px-6 py-4 text-[#475467]">
                    {quote.phone ? (
                      <a href={`tel:${quote.phone}`} className="hover:text-[#0b3a63] hover:underline">
                        {quote.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="truncate text-[#475467]" title={quote.message || ""}>
                      {quote.message || "—"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <QuoteStatusUpdater quoteId={quote.id} currentStatus={quote.status} />
                  </td>
                  <td className="px-6 py-4 text-[#475467]">
                    {format(new Date(quote.createdAt), "MMM d, h:mm a")}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      href={`/admin/quotes/${quote.id}`}
                      className="text-sm font-medium text-[#0b3a63] hover:text-[#ff8a00]"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
