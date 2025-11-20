import { Card } from "@/components/ui/card";
import { DatabaseStatus } from "@/components/admin/database-status";
import { DashboardStats } from "@/components/admin/dashboard-stats";
import { QuoteChart } from "@/components/admin/quote-chart";
import { RecentQuotes } from "@/components/admin/recent-quotes";
import { getPrismaClient } from "@/lib/prisma";
import {
  Package,
  FolderTree,
  FileText,
  Users,
  Briefcase,
  Activity,
} from "lucide-react";
import Link from "next/link";

async function getQuickStats() {
  const prisma = await getPrismaClient();
  if (!prisma) {
    return {
      productCount: 0,
      categoryCount: 0,
      quoteCount: 0,
      teamCount: 0,
      portfolioCount: 0,
    };
  }

  try {
    const [productCount, categoryCount, quoteCount, teamCount, portfolioCount] =
      await Promise.all([
        prisma.product.count(),
        prisma.category.count(),
        prisma.quoteRequest.count(),
        prisma.teamMember.count({ where: { status: "ACTIVE" } }),
        prisma.portfolioProject.count({ where: { status: "PUBLISHED" } }),
      ]);

    return {
      productCount,
      categoryCount,
      quoteCount,
      teamCount,
      portfolioCount,
    };
  } catch (error) {
    console.error("[admin] Failed to fetch quick stats:", error);
    return {
      productCount: 0,
      categoryCount: 0,
      quoteCount: 0,
      teamCount: 0,
      portfolioCount: 0,
    };
  }
}

export default async function AdminDashboard() {
  const quickStats = await getQuickStats();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[#94a3b8]">
            Dashboard
          </p>
          <h1 className="text-3xl font-semibold text-[#0b3a63] mt-1">
            Operations Overview
          </h1>
          <p className="text-sm text-[#475467] mt-2">
            Real-time insights into your catalog, quotes, and team activity.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/products/new"
            className="px-4 py-2 text-sm font-medium text-white bg-[#0b3a63] rounded-lg hover:bg-[#0a2d4d] transition-colors"
          >
            + New Product
          </Link>
        </div>
      </div>

      {/* Database Status */}
      <DatabaseStatus />

      {/* Quick Access Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <QuickAccessCard
          icon={<Package className="h-5 w-5" />}
          title="Products"
          count={quickStats.productCount}
          href="/admin/products"
          color="blue"
        />
        <QuickAccessCard
          icon={<FolderTree className="h-5 w-5" />}
          title="Categories"
          count={quickStats.categoryCount}
          href="/admin/categories"
          color="green"
        />
        <QuickAccessCard
          icon={<FileText className="h-5 w-5" />}
          title="Quotes"
          count={quickStats.quoteCount}
          href="/admin/quotes"
          color="purple"
        />
        <QuickAccessCard
          icon={<Users className="h-5 w-5" />}
          title="Team"
          count={quickStats.teamCount}
          href="/admin/team"
          color="orange"
        />
        <QuickAccessCard
          icon={<Briefcase className="h-5 w-5" />}
          title="Portfolio"
          count={quickStats.portfolioCount}
          href="/admin/portfolio"
          color="pink"
        />
        <QuickAccessCard
          icon={<Activity className="h-5 w-5" />}
          title="Analytics"
          count="View"
          href="/admin"
          color="indigo"
        />
      </div>

      {/* Main Stats - Client Component (fetches from API) */}
      <DashboardStats />

      {/* Charts Section */}
      <QuoteChart />

      {/* Recent Quotes and Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentQuotes />
        <ActivityFeed />
      </div>

      {/* Empty State Warning */}
      {quickStats.productCount === 0 && quickStats.categoryCount === 0 && (
        <Card className="p-6 bg-gradient-to-r from-[#fef3c7] to-[#fde68a] border-[#f59e0b]">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-[#92400e] mb-2">
                🚀 Get Started
              </h3>
              <p className="text-sm text-[#78350f] mb-4">
                Your database is empty. Start building your catalog by creating
                categories first, then add products to showcase your offerings.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admin/categories/new"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0b3a63] rounded-lg hover:bg-[#0a2d4d] transition-colors"
                >
                  + Create Category
                </Link>
                <Link
                  href="/admin/products/new"
                  className="px-4 py-2 text-sm font-medium text-[#0b3a63] bg-white rounded-lg hover:bg-gray-50 transition-colors border border-[#0b3a63]"
                >
                  + Create Product
                </Link>
                <Link
                  href="/admin/team/new"
                  className="px-4 py-2 text-sm font-medium text-[#0b3a63] bg-white rounded-lg hover:bg-gray-50 transition-colors border border-[#0b3a63]"
                >
                  + Add Team Member
                </Link>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

function QuickAccessCard({
  icon,
  title,
  count,
  href,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  count: number | string;
  href: string;
  color: string;
}) {
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-600",
      green: "bg-green-100 text-green-600",
      purple: "bg-purple-100 text-purple-600",
      orange: "bg-orange-100 text-orange-600",
      pink: "bg-pink-100 text-pink-600",
      indigo: "bg-indigo-100 text-indigo-600",
    };
    return colors[color] || "bg-gray-100 text-gray-600";
  };

  return (
    <Link href={href}>
      <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl ${getColorClasses(color)}`}>
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {typeof count === "number" ? count.toLocaleString() : count}
              </p>
            </div>
          </div>
          <div className="text-gray-400 group-hover:text-[#0b3a63] transition-colors">
            →
          </div>
        </div>
      </Card>
    </Link>
  );
}

function ActivityFeed() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Recent Activity
      </h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
          <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
          <div className="flex-1">
            <p className="text-sm text-gray-900">
              Dashboard loaded successfully
            </p>
            <p className="text-xs text-gray-500 mt-1">Just now</p>
          </div>
        </div>
        <div className="text-center py-4">
          <p className="text-sm text-gray-500">
            Activity feed will show recent changes here
          </p>
        </div>
      </div>
    </Card>
  );
}
