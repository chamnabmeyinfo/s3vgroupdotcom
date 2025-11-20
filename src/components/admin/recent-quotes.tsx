"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, ExternalLink } from "lucide-react";

type Quote = {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  status: string;
  createdAt: string;
};

export function RecentQuotes() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setQuotes(data.quotes.recent || []);
        }
      } catch (error) {
        console.error("Failed to fetch quotes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuotes();
    // Refresh every 30 seconds
    const interval = setInterval(fetchQuotes, 30000);
    return () => clearInterval(interval);
  }, []);

  const getStatusVariant = (status: string) => {
    const variants: Record<string, "default" | "success" | "secondary" | "warning"> = {
      NEW: "warning",
      IN_PROGRESS: "secondary",
      RESOLVED: "success",
      CLOSED: "default",
    };
    return variants[status] || "default";
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
          ))}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Recent Quote Requests
          </h3>
          <p className="text-sm text-gray-500">
            Latest {quotes.length} quote submissions
          </p>
        </div>
        <Link
          href="/admin/quotes"
          className="text-sm font-medium text-[#0b3a63] hover:underline flex items-center gap-1"
        >
          View all <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-4">
        {quotes.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No quote requests yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Quote requests from the website will appear here
            </p>
          </div>
        ) : (
          quotes.map((quote) => (
            <Link
              key={quote.id}
              href={`/admin/quotes/${quote.id}`}
              className="block p-4 rounded-lg border border-gray-200 hover:border-[#0b3a63] hover:bg-[#0b3a63]/5 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-gray-900">
                      {quote.companyName}
                    </p>
                    <Badge variant={getStatusVariant(quote.status)}>
                      {quote.status.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      {quote.contactName}
                    </span>
                    <span>{quote.email}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {format(new Date(quote.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </Card>
  );
}

