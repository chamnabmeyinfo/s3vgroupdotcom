import { getPrismaClient } from "@/lib/prisma";
import {
  mockProducts,
  mockCategories,
  mockSolutions,
} from "@/lib/data/mock-data";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

async function getDashboardData() {
  const prisma = await getPrismaClient();
  if (!prisma) {
    return {
      productCount: mockProducts.length,
      categoryCount: mockCategories.length,
      solutionCount: mockSolutions.length,
      quotesToday: 0,
      latestQuotes: [],
    };
  }

  const [productCount, categoryCount, quotesToday, latestQuotes] =
    await Promise.all([
      prisma.product.count(),
      prisma.category.count(),
      prisma.quoteRequest.count({
        where: {
          createdAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
          },
        },
      }),
      prisma.quoteRequest.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          companyName: true,
          contactName: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  return {
    productCount,
    categoryCount,
    solutionCount: mockSolutions.length,
    quotesToday,
    latestQuotes,
  };
}

export default async function AdminDashboard() {
  const data = await getDashboardData();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
          Dashboard
        </p>
        <h1 className="text-3xl font-semibold text-[#0b3a63]">
          Operations overview
        </h1>
        <p className="text-sm text-[#475467]">
          Snapshot of catalog and quote activity.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <StatCard label="Products" value={data.productCount} />
        <StatCard label="Categories" value={data.categoryCount} />
        <StatCard label="Solutions" value={data.solutionCount} />
        <StatCard label="Quotes today" value={data.quotesToday} />
      </div>

      <Card className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#0b3a63]">
              Latest quote requests
            </h2>
            <p className="text-sm text-[#64748b]">
              Showing the five most recent entries.
            </p>
          </div>
        </div>
        <div className="divide-y divide-[#e2e8f0]">
          {data.latestQuotes.length === 0 && (
            <p className="py-6 text-sm text-[#64748b]">
              No quote requests yet today.
            </p>
          )}
          {data.latestQuotes.map((quote) => (
            <div key={quote.id} className="flex items-center justify-between py-4">
              <div>
                <p className="font-medium text-[#0b3a63]">
                  {quote.companyName}
                </p>
                <p className="text-sm text-[#64748b]">
                  {quote.contactName ?? "Contact"} •{" "}
                  {format(new Date(quote.createdAt), "MMM d, h:mm a")}
                </p>
              </div>
              <span className="rounded-full bg-[#e2e8f0] px-3 py-1 text-xs font-semibold text-[#0b3a63]">
                {quote.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-4">
      <p className="text-xs uppercase tracking-[0.3em] text-[#94a3b8]">
        {label}
      </p>
      <p className="mt-2 text-3xl font-semibold text-[#0b3a63]">{value}</p>
    </Card>
  );
}

