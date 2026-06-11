import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Lock, LogOut, Package, Search, RefreshCw, ChevronDown, ChevronUp, Pencil, Trash2, ShieldBan, ShieldCheck, Ban } from "lucide-react";

const ADMIN_PASSWORD = "bebelle2026";

interface BlockedIP {
  id: string;
  ip_address: string;
  reason: string | null;
  blocked_at: string;
}

interface Order {
  id: string;
  order_ref: string;
  full_name: string;
  phone: string;
  address: string;
  province: string | null;
  city: string | null;
  barangay: string | null;
  landmark: string | null;
  pack_label: string;
  qty: number;
  price: number;
  status: string;
  created_at: string;
  ip_address: string | null;
}

const Admin = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [blockedIPs, setBlockedIPs] = useState<BlockedIP[]>([]);
  const [showBlockedPanel, setShowBlockedPanel] = useState(false);
  const [manualBlockIP, setManualBlockIP] = useState("");
  const [blockReason, setBlockReason] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("bebelle-admin-auth");
    if (saved === "true") setAuthenticated(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchOrders();
      fetchBlockedIPs();
    }
  }, [authenticated]);

  const fetchBlockedIPs = async () => {
    const { data } = await (supabase as any).from("blocked_ips").select("*").order("blocked_at", { ascending: false });
    setBlockedIPs((data as any) || []);
  };

  const blockIP = async (ip: string, reason?: string) => {
    if (!ip) return;
    const existing = blockedIPs.find(b => b.ip_address === ip);
    if (existing) return alert("This IP is already blocked.");
    const { error } = await (supabase as any).from("blocked_ips").insert({ ip_address: ip, reason: reason || null });
    if (error) {
      console.error("Block IP error:", error.message);
    } else {
      fetchBlockedIPs();
    }
  };

  const unblockIP = async (id: string) => {
    if (!confirm("Are you sure you want to unblock this IP?")) return;
    const { error } = await (supabase as any).from("blocked_ips").delete().eq("id", id);
    if (error) {
      console.error("Unblock IP error:", error.message);
    } else {
      setBlockedIPs(prev => prev.filter(b => b.id !== id));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      sessionStorage.setItem("bebelle-admin-auth", "true");
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("bebelle-admin-auth");
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const { data, error } = await (supabase as any)
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Fetch orders error:", error.message);
      } else {
        setOrders((data as any) || []);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setLoading(false);
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-PH", {
      year: "numeric", month: "short", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  };

  const filteredOrders = orders.filter((o) => {
    const q = search.toLowerCase();
    return (
      o.full_name.toLowerCase().includes(q) ||
      o.phone.includes(q) ||
      o.order_ref.toLowerCase().includes(q) ||
      (o.province || "").toLowerCase().includes(q) ||
      (o.city || "").toLowerCase().includes(q) ||
      (o.barangay || "").toLowerCase().includes(q)
    );
  });

  const STATUS_OPTIONS = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await (supabase as any).from("orders").update({ status: newStatus }).eq("id", id);
    if (error) {
      console.error("Update status error:", error.message);
    } else {
      setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    const { error } = await (supabase as any).from("orders").delete().eq("id", id);
    if (error) {
      console.error("Delete order error:", error.message);
    } else {
      setOrders((prev) => prev.filter((o) => o.id !== id));
      if (expandedId === id) setExpandedId(null);
    }
  };
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#5BA4D9]/10 via-white to-[#5BA4D9]/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <img src="https://i.imgur.com/7PYSMnC.png" alt="Bebelle" className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Bebelle Admin
            </h1>
            <p className="text-gray-500 text-sm mt-1">Enter your password to continue</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6 p-3 bg-[#5BA4D9]/5 rounded-xl">
              <Lock className="w-5 h-5 text-[#5BA4D9]" />
              <span className="text-sm text-gray-600 font-medium">Secure Admin Access</span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  placeholder="Enter admin password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5BA4D9] focus:ring-2 focus:ring-[#5BA4D9]/20 outline-none transition-all text-gray-800"
                  autoFocus
                />
              </div>
              {error && <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</p>}
              <button type="submit" className="w-full py-3 bg-[#5BA4D9] hover:bg-[#4a93c8] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#5BA4D9]/25">
                Sign In
              </button>
            </div>
          </form>
          <a href="/" className="block text-center mt-4 text-sm text-gray-400 hover:text-[#5BA4D9] transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    );
  }

  // ─── Admin Dashboard ───
  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="https://i.imgur.com/7PYSMnC.png" alt="Bebelle" className="w-8 h-8" />
            <div>
              <h1 className="text-lg font-bold text-gray-800">Bebelle Admin</h1>
              <p className="text-xs text-gray-400">Order Management</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Stats */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#5BA4D9]/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-[#5BA4D9]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{orders.length}</p>
                <p className="text-xs text-gray-400">Total Orders</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowBlockedPanel(!showBlockedPanel)}
            className={`rounded-xl p-5 border shadow-sm flex items-center gap-3 transition-all ${showBlockedPanel ? "bg-red-50 border-red-200" : "bg-white border-gray-100 hover:border-red-200"}`}
          >
            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
              <ShieldBan className="w-5 h-5 text-red-500" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-gray-800">{blockedIPs.length}</p>
              <p className="text-xs text-gray-400">Blocked IPs</p>
            </div>
          </button>
        </div>

        {/* Blocked IPs Panel */}
        {showBlockedPanel && (
          <div className="bg-white rounded-xl border border-red-100 shadow-sm mb-6 p-5">
            <h2 className="text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ShieldBan className="w-4 h-4 text-red-500" />
              Blocked IP Addresses
            </h2>
            {/* Manual block form */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <input
                type="text"
                placeholder="Enter IP address to block..."
                value={manualBlockIP}
                onChange={(e) => setManualBlockIP(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-red-300"
              />
              <input
                type="text"
                placeholder="Reason (optional)"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-red-300"
              />
              <button
                onClick={() => { blockIP(manualBlockIP, blockReason); setManualBlockIP(""); setBlockReason(""); }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition-all whitespace-nowrap"
              >
                Block IP
              </button>
            </div>
            {/* Blocked list */}
            {blockedIPs.length === 0 ? (
              <p className="text-gray-400 text-sm text-center py-4">No blocked IPs</p>
            ) : (
              <div className="space-y-2">
                {blockedIPs.map((b) => (
                  <div key={b.id} className="flex items-center justify-between bg-red-50 rounded-lg px-4 py-2.5 border border-red-100">
                    <div className="flex items-center gap-3">
                      <Ban className="w-4 h-4 text-red-400" />
                      <span className="font-mono text-sm text-gray-800">{b.ip_address}</span>
                      {b.reason && <span className="text-xs text-gray-500">— {b.reason}</span>}
                      <span className="text-[10px] text-gray-400">
                        {new Date(b.blocked_at).toLocaleDateString("en-PH", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <button
                      onClick={() => unblockIP(b.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold hover:bg-green-200 transition-all"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search & Refresh */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, phone, order ref, province..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5BA4D9] focus:ring-2 focus:ring-[#5BA4D9]/20 outline-none text-sm"
            />
          </div>
          <button
            onClick={fetchOrders}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-all"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            onClick={() => setEditMode(!editMode)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              editMode
                ? "bg-[#5BA4D9] text-white shadow-lg shadow-[#5BA4D9]/25"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Pencil className="w-4 h-4" />
            {editMode ? "Exit Edit" : "Edit"}
          </button>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="w-8 px-2 py-2"></th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Date</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Ref</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Customer</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Phone</th>
                  <th className="text-left px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Pack</th>
                  <th className="text-center px-2 py-2 font-semibold text-gray-600 whitespace-nowrap">Qty</th>
                  <th className="text-right px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Price</th>
                  <th className="text-center px-3 py-2 font-semibold text-gray-600 whitespace-nowrap">Status</th>
                  {editMode && <th className="text-center px-2 py-2 font-semibold text-gray-600 whitespace-nowrap">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length === 0 ? (
                   <tr>
                    <td colSpan={editMode ? 10 : 9} className="text-center py-12 text-gray-400 text-sm">
                      {loading ? "Loading orders..." : "No orders found"}
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((o) => {
                    const isExpanded = expandedId === o.id;
                    return (
                      <>
                        <tr
                          key={o.id}
                          onClick={() => setExpandedId(isExpanded ? null : o.id)}
                          className="border-b border-gray-50 hover:bg-[#5BA4D9]/5 transition-colors cursor-pointer"
                        >
                          <td className="px-2 py-2 text-center text-gray-400">
                            {isExpanded ? <ChevronUp className="w-3.5 h-3.5 inline" /> : <ChevronDown className="w-3.5 h-3.5 inline" />}
                          </td>
                          <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{formatDate(o.created_at)}</td>
                          <td className="px-3 py-2">
                            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[10px]">{o.order_ref}</span>
                          </td>
                          <td className="px-3 py-2 font-medium text-gray-800 whitespace-nowrap">
                            <span className="flex items-center gap-1.5">
                              {o.full_name}
                              {o.ip_address && (() => {
                                const count = orders.filter(ord => ord.ip_address === o.ip_address).length;
                                return count > 1 ? (
                                  <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[9px] font-semibold bg-red-100 text-red-700 border border-red-200">
                                    ⚠️ {count}x IP
                                  </span>
                                ) : null;
                              })()}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-gray-600 whitespace-nowrap">{o.phone}</td>
                          <td className="px-3 py-2">
                            <span className="bg-[#5BA4D9]/10 text-[#5BA4D9] font-semibold px-1.5 py-0.5 rounded text-[10px] whitespace-nowrap">
                              {o.pack_label}
                            </span>
                          </td>
                          <td className="px-2 py-2 text-center text-gray-800 font-semibold">{o.qty}</td>
                          <td className="px-3 py-2 text-right text-gray-800 font-semibold whitespace-nowrap">₱{Number(o.price).toLocaleString()}</td>
                          <td className="px-3 py-2 text-center">
                            {editMode ? (
                              <select
                                value={o.status}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => { e.stopPropagation(); updateStatus(o.id, e.target.value); }}
                                className="text-[10px] font-semibold px-1.5 py-1 rounded-lg border border-gray-200 bg-white outline-none cursor-pointer"
                              >
                                {STATUS_OPTIONS.map((s) => (
                                  <option key={s} value={s}>{s}</option>
                                ))}
                              </select>
                            ) : (
                              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-lg ${
                                o.status === "pending"
                                  ? "bg-amber-50 text-amber-600"
                                  : o.status === "completed" || o.status === "delivered"
                                  ? "bg-green-50 text-green-600"
                                  : o.status === "cancelled"
                                  ? "bg-red-50 text-red-500"
                                  : "bg-gray-100 text-gray-500"
                              }`}>
                                {o.status}
                              </span>
                            )}
                          </td>
                          {editMode && (
                            <td className="px-2 py-2 text-center">
                              <button
                                onClick={(e) => { e.stopPropagation(); deleteOrder(o.id); }}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                title="Delete order"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          )}
                        </tr>
                        {isExpanded && (
                          <tr key={`${o.id}-detail`} className="bg-[#5BA4D9]/[0.03]">
                            <td colSpan={editMode ? 10 : 9} className="px-6 py-4">
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-xs">
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Full Name</p>
                                  <p className="text-gray-800">{o.full_name}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Phone</p>
                                  <p className="text-gray-800">{o.phone}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Address</p>
                                  <p className="text-gray-800">{o.address}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Province</p>
                                  <p className="text-gray-800">{o.province || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">City / Municipality</p>
                                  <p className="text-gray-800">{o.city || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Barangay</p>
                                  <p className="text-gray-800">{o.barangay || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Landmark</p>
                                  <p className="text-gray-800">{o.landmark || "—"}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Pack</p>
                                  <p className="text-gray-800">{o.pack_label} (×{o.qty})</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Price</p>
                                  <p className="text-gray-800 font-bold">₱{Number(o.price).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Order Date</p>
                                  <p className="text-gray-800">{formatDate(o.created_at)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Order Ref</p>
                                  <p className="text-gray-800 font-mono">{o.order_ref}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">Status</p>
                                  <p className="text-gray-800 capitalize">{o.status}</p>
                                </div>
                                <div>
                                  <p className="text-gray-400 font-semibold mb-0.5">IP Address</p>
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <p className="text-gray-800 font-mono">{o.ip_address || "—"}</p>
                                    {o.ip_address && (() => {
                                      const count = orders.filter(ord => ord.ip_address === o.ip_address).length;
                                      const isBlocked = blockedIPs.some(b => b.ip_address === o.ip_address);
                                      return (
                                        <>
                                          {count > 1 ? (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                                              ⚠️ Used {count}x
                                            </span>
                                          ) : (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 border border-green-200">
                                              Unique
                                            </span>
                                          )}
                                          {isBlocked ? (
                                            <span className="inline-flex items-center gap-1.5 flex-nowrap">
                                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-800 text-white">
                                                <Ban className="w-3 h-3" /> Blocked
                                              </span>
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  const entry = blockedIPs.find(b => b.ip_address === o.ip_address);
                                                  if (entry) unblockIP(entry.id);
                                                }}
                                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-500 text-white hover:bg-green-600 transition-all"
                                              >
                                                <ShieldCheck className="w-3 h-3" /> Unblock
                                              </button>
                                            </span>
                                          ) : (
                                            <button
                                              onClick={(e) => { e.stopPropagation(); blockIP(o.ip_address!, "Blocked from order " + o.order_ref); }}
                                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-all"
                                            >
                                              <ShieldBan className="w-3 h-3" /> Block
                                            </button>
                                          )}
                                        </>
                                      );
                                    })()}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
