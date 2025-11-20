"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type QuoteChartData = {
  quotes: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    byStatus: Array<{ status: string; count: number }>;
  };
};

export function QuoteChart() {
  const [data, setData] = useState<QuoteChartData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const stats = await response.json();
          setData({
            quotes: stats.quotes,
          });
        }
      } catch (error) {
        console.error("Failed to fetch chart data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <Card className="p-6">
        <div className="h-64 flex items-center justify-center">
          <div className="animate-pulse text-gray-400">Loading chart...</div>
        </div>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  // Prepare data for line chart (quote trends)
  const trendData = [
    { period: "Today", quotes: data.quotes.today },
    { period: "This Week", quotes: data.quotes.thisWeek },
    { period: "This Month", quotes: data.quotes.thisMonth },
  ];

  // Prepare data for bar chart (status breakdown)
  const statusData = data.quotes.byStatus.map((item) => ({
    status: item.status.replace(/_/g, " "),
    count: item.count,
  }));

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Quote Trends Line Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quote Trends
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="quotes"
              stroke="#0b3a63"
              strokeWidth={2}
              name="Quotes"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Status Breakdown Bar Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Quotes by Status
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="status" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#0b3a63" name="Count" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

