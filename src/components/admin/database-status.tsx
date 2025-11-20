"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export function DatabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "disconnected">("checking");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const response = await fetch("/api/admin/health");
        if (response.ok) {
          const data = await response.json();
          setStatus(data.connected ? "connected" : "disconnected");
          setError(data.error || null);
        } else {
          setStatus("disconnected");
          setError("Unable to connect to database");
        }
      } catch (err) {
        setStatus("disconnected");
        setError("Database connection failed");
      }
    }

    checkConnection();
  }, []);

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        {status === "checking" && (
          <>
            <Loader2 className="h-5 w-5 animate-spin text-[#0b3a63]" />
            <div>
              <p className="text-sm font-medium text-[#0b3a63]">Checking database connection...</p>
            </div>
          </>
        )}
        {status === "connected" && (
          <>
            <CheckCircle2 className="h-5 w-5 text-[#0f8a5f]" />
            <div>
              <p className="text-sm font-medium text-[#0f8a5f]">Database connected</p>
              <p className="text-xs text-[#64748b]">All systems operational</p>
            </div>
          </>
        )}
        {status === "disconnected" && (
          <>
            <XCircle className="h-5 w-5 text-[#b42318]" />
            <div>
              <p className="text-sm font-medium text-[#b42318]">Database disconnected</p>
              <p className="text-xs text-[#64748b]">
                {error || "Please check your DATABASE_URL environment variable"}
              </p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
}

