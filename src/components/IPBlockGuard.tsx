import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface IPBlockGuardProps {
  children: React.ReactNode;
}

const IPBlockGuard = ({ children }: IPBlockGuardProps) => {
  const [status, setStatus] = useState<"checking" | "allowed" | "blocked">("checking");

  useEffect(() => {
    const checkIP = async () => {
      try {
        // Get visitor IP
        const res = await fetch("https://api.ipify.org?format=json");
        const { ip } = await res.json();

        // Check if blocked
        const { data } = await (supabase as any)
          .from("blocked_ips")
          .select("id")
          .eq("ip_address", ip)
          .maybeSingle();

        setStatus(data ? "blocked" : "allowed");
      } catch {
        // If IP check fails, allow access
        setStatus("allowed");
      }
    };
    checkIP();
  }, []);

  if (status === "checking") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-3 border-[#5BA4D9] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "blocked") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Access Restricted
          </h1>
          <p className="text-gray-500 text-sm">
            Your access to this website has been restricted. If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default IPBlockGuard;
