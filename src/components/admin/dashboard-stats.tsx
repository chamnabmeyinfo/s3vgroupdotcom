"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Package,
  FolderTree,
  FileText,
  TrendingUp,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import Link from "next/link";

type StatsData = {
  overview: {
    totalProducts: number;
    totalCategories: number;
    totalQuotes: number;
    publishedProducts: number;
    draftProducts: number;
  };
  quotes: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    byStatus: Array<{ status: string; count: number }>;
    recent: Array<{
      id: string;
      companyName: string;
      contactName: string;
      email: string;
      status: string;
      createdAt: string;
    }>;
  };
  products: {
    byCategory: Array<{ category: string; count: number }>;
  };
};

export function DashboardStats() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch("/api/admin/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    // Refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card className="p-6 bg-red-50 border-red-200">
        <p className="text-sm text-red-600">
          {error || "Failed to load statistics"}
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Main Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Package className="h-5 w-5" />}
          label="Total Products"
          value={stats.overview.totalProducts}
          subtitle={`${stats.overview.publishedProducts} published, ${stats.overview.draftProducts} drafts`}
          href="/admin/products"
          color="blue"
        />
        <StatCard
          icon={<FolderTree className="h-5 w-5" />}
          label="Categories"
          value={stats.overview.totalCategories}
          href="/admin/categories"
          color="green"
        />
        <StatCard
          icon={<FileText className="h-5 w-5" />}
          label="Total Quotes"
          value={stats.overview.totalQuotes}
          subtitle={`${stats.quotes.thisMonth} this month`}
          href="/admin/quotes"
          color="purple"
        />
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="Quotes Today"
          value={stats.quotes.today}
          subtitle={`${stats.quotes.thisWeek} this week`}
          href="/admin/quotes"
          color="orange"
        />
      </div>

      {/* Quote Status Breakdown */}
      <div className="grid gap-4 md:grid-cols-4">
        {stats.quotes.byStatus.map((statusItem) => {
          const statusConfig = {
            NEW: { icon: Clock, bgColor: "bg-yellow-100", iconColor: "text-yellow-600", label: "New" },
            IN_PROGRESS: { icon: Clock, bgColor: "bg-blue-100", iconColor: "text-blue-600", label: "In Progress" },
            RESOLVED: { icon: CheckCircle2, bgColor: "bg-green-100", iconColor: "text-green-600", label: "Resolved" },
            CLOSED: { icon: XCircle, bgColor: "bg-gray-100", iconColor: "text-gray-600", label: "Closed" },
          }[statusItem.status] || { icon: FileText, bgColor: "bg-gray-100", iconColor: "text-gray-600", label: statusItem.status };

          const Icon = statusConfig.icon;
          return (
            <Card key={statusItem.status} className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${statusConfig.bgColor}`}>
                  <Icon className={`h-4 w-4 ${statusConfig.iconColor}`} />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{statusConfig.label}</p>
                  <p className="text-xl font-semibold text-gray-900">
                    {statusItem.count}
                  </p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  subtitle,
  href,
  color = "blue",
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  subtitle?: string;
  href?: string;
  color?: "blue" | "green" | "purple" | "orange";
}) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  const content = (
    <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
              {icon}
            </div>
            <p className="text-sm font-medium text-gray-600">{label}</p>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </Card>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

