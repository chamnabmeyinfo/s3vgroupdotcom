import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getPrismaClient } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { QuoteStatusUpdater } from "@/components/admin/quote-status-updater";
import { format } from "date-fns";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function QuoteDetailPage({ params }: PageProps) {
  const session = await auth();
  if (!session) redirect("/auth/signin");

  const { id } = await params;
  const prisma = await getPrismaClient();
  
  if (!prisma) {
    redirect("/admin/quotes");
  }

  const quote = await prisma.quoteRequest.findUnique({
    where: { id },
  });

  if (!quote) {
    redirect("/admin/quotes");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#0b3a63]">Quote Request</h1>
          <p className="text-sm text-[#475467]">
            Submitted {format(new Date(quote.createdAt), "MMMM d, yyyy 'at' h:mm a")}
          </p>
        </div>
        <Button variant="secondary" asChild>
          <Link href="/admin/quotes">← Back to Quotes</Link>
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="p-6 lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-[#0b3a63]">Contact Information</h2>
          <dl className="grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-[#475467]">Company</dt>
              <dd className="mt-1 text-base font-semibold text-[#0b3a63]">{quote.companyName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-[#475467]">Contact Name</dt>
              <dd className="mt-1 text-base font-semibold text-[#0b3a63]">{quote.contactName}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-[#475467]">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${quote.email}`} className="text-base font-semibold text-[#0b3a63] hover:text-[#ff8a00] hover:underline">
                  {quote.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-[#475467]">Phone</dt>
              <dd className="mt-1">
                {quote.phone ? (
                  <a href={`tel:${quote.phone}`} className="text-base font-semibold text-[#0b3a63] hover:text-[#ff8a00] hover:underline">
                    {quote.phone}
                  </a>
                ) : (
                  <span className="text-[#94a3b8]">Not provided</span>
                )}
              </dd>
            </div>
          </dl>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium text-[#475467]">Project Details</h3>
            <div className="rounded-lg bg-[#f8fafc] p-4">
              <p className="whitespace-pre-wrap text-sm text-[#0b3a63]">
                {quote.message || "No message provided"}
              </p>
            </div>
          </div>

          {quote.items && (
            <div className="mt-6">
              <h3 className="mb-2 text-sm font-medium text-[#475467]">Requested Items</h3>
              <pre className="rounded-lg bg-[#f8fafc] p-4 text-xs">
                {JSON.stringify(quote.items, null, 2)}
              </pre>
            </div>
          )}
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-[#0b3a63]">Status</h2>
            <QuoteStatusUpdater quoteId={quote.id} currentStatus={quote.status} />
          </Card>

          <Card className="p-6">
            <h2 className="mb-4 text-lg font-semibold text-[#0b3a63]">Metadata</h2>
            <dl className="space-y-3">
              <div>
                <dt className="text-sm font-medium text-[#475467]">Quote ID</dt>
                <dd className="mt-1 font-mono text-xs text-[#0b3a63]">{quote.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#475467]">Source</dt>
                <dd className="mt-1 text-sm text-[#0b3a63]">{quote.source || "Website"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#475467]">Created</dt>
                <dd className="mt-1 text-sm text-[#0b3a63]">
                  {format(new Date(quote.createdAt), "MMM d, yyyy h:mm a")}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-[#475467]">Last Updated</dt>
                <dd className="mt-1 text-sm text-[#0b3a63]">
                  {format(new Date(quote.updatedAt), "MMM d, yyyy h:mm a")}
                </dd>
              </div>
            </dl>
          </Card>
        </div>
      </div>
    </div>
  );
}

