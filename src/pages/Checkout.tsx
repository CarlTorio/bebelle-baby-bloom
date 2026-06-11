import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ShieldCheck, Truck, Clock, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  fetchVariations,
  submitOrder, type VariationEntry,
} from "@/services/pancakeService";

const STATES = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia", 
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", 
  "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", 
  "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina", 
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

/* ── Package data (shared with Shop) ── */
const packs = [
  { id: "starter", label: "Get One",   sku: "1BB", qty: 1, subtitle: "1 Bebelle Bottle",  price: 17,  original: 25, save: "32%", saveAmt: 8 },
  { id: "duo",     label: "Get Two",   sku: "2BB", qty: 2, subtitle: "2 Bebelle Bottles", price: 33, original: 49, save: "32%", saveAmt: 16 },
  { id: "family",  label: "Get Three", sku: "3BB", qty: 3, subtitle: "3 Bebelle Bottles", price: 49, original: 74, save: "33%", saveAmt: 25 },
];

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialPack = Math.min(Math.max(Number(searchParams.get("pack") || 1), 0), 2);

  const [selectedPack, setSelectedPack] = useState(initialPack);
  const [orderPlaced, setOrderPlaced] = useState(false);

  /* Pancake state */
  const [skuMap, setSkuMap] = useState<Record<string, VariationEntry>>({});
  const [submitError, setSubmitError] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const vars = await fetchVariations();
        setSkuMap(vars);
      } catch (e) {
        console.error("Pancake init error:", e);
      }
    })();
  }, []);

  /* Form state */
  const [form, setForm] = useState({
    fullName: "", phone: "", address: "",
    city: "", state: "", zipCode: "",
    landmark: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pack = packs[selectedPack];

  /* Countdown timer (synced with hero/shop via localStorage) */
  const START_TIME = 7 * 60 + 30; // 7 minutes 30 seconds
  const RESET_AT = 10; // reset at 10 seconds
  const [countdown, setCountdown] = useState(() => {
    const saved = localStorage.getItem("bebelle-countdown-start");
    if (saved) {
      const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
      const remaining = START_TIME - elapsed;
      if (remaining > RESET_AT) return remaining;
    }
    localStorage.setItem("bebelle-countdown-start", String(Date.now()));
    return START_TIME;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        const next = prev - 1;
        if (next <= RESET_AT) {
          localStorage.setItem("bebelle-countdown-start", String(Date.now()));
          return START_TIME;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return { h: h.toString().padStart(2, "0"), m: m.toString().padStart(2, "0"), s: sec.toString().padStart(2, "0") };
  };
  const time = formatTime(countdown);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state) e.state = "State is required";
    if (!form.zipCode.trim()) e.zipCode = "ZIP Code is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setSubmitError("");
    if (!validate()) return;

    const entry = skuMap[pack.sku];
    if (!entry) {
      setSubmitError(
        `Product variation not found for SKU "${pack.sku}". Available: ${Object.keys(skuMap).join(", ") || "none"}`
      );
      return;
    }

    setIsSubmitting(true);

    // Fetch user IP address
    let ipAddress = "";
    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      ipAddress = ipData.ip || "";
    } catch { /* silently ignore */ }

    const orderRef = Date.now().toString(36);
    const order = {
      id: orderRef,
      date: new Date().toISOString(),
      pack: pack.label,
      qty: pack.qty,
      subtitle: pack.subtitle,
      price: pack.price,
      customer: {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zipCode: form.zipCode,
        landmark: form.landmark,
      },
    };
    const prev = JSON.parse(localStorage.getItem("bebelle-orders") || "[]");
    prev.push(order);
    localStorage.setItem("bebelle-orders", JSON.stringify(prev));

    // Save order to Supabase database
    try {
      const { error: dbError } = await (supabase as any).from("orders").insert({
        order_ref: orderRef,
        full_name: form.fullName,
        phone: form.phone,
        address: form.address,
        province: form.state,
        city: form.city,
        barangay: form.zipCode,
        landmark: form.landmark,
        pack_label: pack.label,
        qty: pack.qty,
        price: pack.price,
        ip_address: ipAddress || null,
      } as any);
      if (dbError) {
        console.error("Supabase order save error:", dbError.message);
      }
    } catch (err) {
      console.error("Supabase order save error:", err);
    }

    // Send order to Pancake POS
    try {
      await submitOrder({
        fullName: form.fullName,
        phone: form.phone,
        streetAddress: form.address,
        provinceId: form.state,
        provinceName: form.state,
        districtId: form.city,
        districtName: form.city,
        communeId: form.zipCode,
        communeName: form.zipCode,
        landmark: form.landmark,
        paymentMethod: "cod",
        price: pack.price,
        websiteOrderId: orderRef,
        productId: entry.productId,
        variationId: entry.variationId,
        bundleLabel: pack.label,
      });
      navigate("/order-success");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      console.error("Pancake order error:", error);
      setSubmitError((error as Error).message || "Failed to submit order. Please try again.");
      setIsSubmitting(false);
    }
  };

  /* ── ORDER CONFIRMATION ── */
  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#F0F9FF", fontFamily: "'Nunito', sans-serif" }}>
        <div className="max-w-[500px] w-full bg-white rounded-2xl p-8 text-center" style={{ boxShadow: "0 10px 40px rgba(91,164,217,0.15)" }}>
          <div className="flex justify-center mb-5">
            <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-[60px] w-auto" />
          </div>
          <h1 className="text-[24px] font-bold text-[#1F2937] mb-2">Order Placed Successfully! 🎉</h1>
          <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-2">
            Thank you for ordering <span className="font-bold text-[#5BA4D9]">{pack.subtitle}</span>!
          </p>
          <p className="text-[14px] text-[#6B7280] mb-6">
            We will call/text you to confirm your order within 24 hours.
          </p>
          <div className="bg-[#F0F9FF] rounded-xl p-4 mb-6 text-left">
            <p className="text-[13px] text-[#6B7280]"><span className="font-semibold text-[#1F2937]">Name:</span> {form.fullName}</p>
            <p className="text-[13px] text-[#6B7280]"><span className="font-semibold text-[#1F2937]">Phone:</span> {form.phone}</p>
            <p className="text-[13px] text-[#6B7280]"><span className="font-semibold text-[#1F2937]">Address:</span> {form.address}, {form.city}, {form.state} {form.zipCode}</p>
            <p className="text-[13px] text-[#6B7280] mt-2"><span className="font-semibold text-[#1F2937]">Pack:</span> {pack.subtitle}</p>
            <p className="text-[13px] text-[#6B7280]"><span className="font-semibold text-[#1F2937]">Total:</span> {pack.price} USD</p>
          </div>
          <button
            onClick={() => { navigate("/"); window.scrollTo(0, 0); }}
            className="w-full text-white font-bold text-[15px] py-4 rounded-[30px] transition-all hover:opacity-90"
            style={{ backgroundColor: "#5BA4D9" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  /* ── CHECKOUT PAGE ── */
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F0F9FF", fontFamily: "'Nunito', sans-serif" }}>
      {/* Header */}
      <div className="bg-white py-4 px-6 text-center" style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}>
        <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-[40px] w-auto mx-auto" />
      </div>

      <div className="max-w-[1000px] mx-auto px-4 py-8">
        {/* ── Mobile Order Summary (top) ── */}
        <div className="lg:hidden mb-6">
          <div className="bg-white rounded-2xl p-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h3 className="text-[16px] font-bold text-[#1F2937] mb-4">Order Summary</h3>
            <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
              <div className="w-[60px] h-[60px] rounded-xl bg-[#F0F9FF] flex items-center justify-center overflow-hidden">
                <img src="https://i.imgur.com/Quujeth.png" alt="Bebelle" className="h-[50px] object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-[#1F2937]">Bebelle Bottle</p>
                <select
                  value={selectedPack}
                  onChange={(e) => setSelectedPack(Number(e.target.value))}
                  className="mt-1 text-[12px] text-[#5BA4D9] font-semibold bg-[#F0F9FF] border border-[#E0F2FE] rounded-lg px-2 py-1 outline-none cursor-pointer"
                >
                  {packs.map((p, i) => (
                    <option key={p.id} value={i}>{p.subtitle} — {p.price} USD</option>
                  ))}
                </select>
              </div>
              <p className="text-[15px] font-extrabold text-[#1F2937]">{pack.price} USD</p>
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6B7280]">Subtotal</span>
                <span className="text-[#1F2937] font-semibold">{pack.price} USD</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6B7280]">Shipping</span>
                <span className="text-[#059669] font-semibold">FREE</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-[#6B7280]">You Save</span>
                <span className="text-[#EA580C] font-bold">-{pack.saveAmt} USD</span>
              </div>
              <div className="border-t border-[#E5E7EB] pt-3 mt-1 flex justify-between">
                <span className="text-[15px] font-bold text-[#1F2937]">Total</span>
                <span className="text-[22px] font-extrabold text-[#5BA4D9]">{pack.price} USD</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* ── LEFT: Form ── */}
          <div className="flex-1">
            <h2 className="text-[16px] font-bold text-[#1F2937] mb-4">Shipping Information</h2>
            <div className="flex flex-col gap-3">
              {/* Full Name */}
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  maxLength={100}
                  className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors"
                  style={{ borderColor: errors.fullName ? "#EF4444" : "#E5E7EB" }}
                />
                {errors.fullName && <p className="text-[11px] text-[#EF4444] mt-1">{errors.fullName}</p>}
              </div>
              {/* Phone */}
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  maxLength={15}
                  className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors"
                  style={{ borderColor: errors.phone ? "#EF4444" : "#E5E7EB" }}
                />
                {errors.phone && <p className="text-[11px] text-[#EF4444] mt-1">{errors.phone}</p>}
              </div>
              {/* Street Address */}
              <div>
                <input
                  type="text"
                  placeholder="Street Address"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  maxLength={200}
                  className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors"
                  style={{ borderColor: errors.address ? "#EF4444" : "#E5E7EB" }}
                />
                {errors.address && <p className="text-[11px] text-[#EF4444] mt-1">{errors.address}</p>}
              </div>
              {/* City */}
              <div>
                <input
                  type="text"
                  placeholder="City"
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors"
                  style={{ borderColor: errors.city ? "#EF4444" : "#E5E7EB" }}
                />
                {errors.city && <p className="text-[11px] text-[#EF4444] mt-1">{errors.city}</p>}
              </div>
              {/* State & Zip Code */}
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <select
                    value={form.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors appearance-none bg-white"
                    style={{ borderColor: errors.state ? "#EF4444" : "#E5E7EB", color: form.state ? "#1F2937" : "#9CA3AF" }}
                  >
                    <option value="" disabled>State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
                  {errors.state && <p className="text-[11px] text-[#EF4444] mt-1">{errors.state}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={form.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border text-[14px] outline-none transition-colors"
                    style={{ borderColor: errors.zipCode ? "#EF4444" : "#E5E7EB" }}
                  />
                  {errors.zipCode && <p className="text-[11px] text-[#EF4444] mt-1">{errors.zipCode}</p>}
                </div>
              </div>
              {/* Landmark */}
              <input
                type="text"
                placeholder="Landmark (optional)"
                value={form.landmark}
                onChange={(e) => handleChange("landmark", e.target.value)}
                maxLength={200}
                className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-[14px] outline-none"
              />
            </div>

            {/* Payment */}
            <h2 className="text-[16px] font-bold text-[#1F2937] mt-6 mb-3">Payment Method</h2>
            <div className="bg-white rounded-xl border-2 border-[#5BA4D9] px-4 py-3 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full border-2 border-[#5BA4D9] flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#5BA4D9]" />
              </div>
              <Truck className="w-5 h-5 text-[#5BA4D9]" />
              <span className="text-[14px] font-semibold text-[#1F2937]">Cash on Delivery (COD)</span>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`cta-btn w-full mt-8 text-white font-bold text-[17px] py-5 rounded-[30px] uppercase tracking-wider relative overflow-hidden ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'animate-pulse-cta'}`}
              style={{ backgroundColor: "#5BA4D9", boxShadow: "0 8px 25px rgba(91,164,217,0.5)" }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-btn-shine" />
              <span className="relative z-10">{isSubmitting ? 'Processing...' : 'Place My Order Now'}</span>
            </button>
            <p className="text-[12px] text-[#6B7280] text-center mt-2 italic">
              "We will call/text you to confirm your order within 24 hours."
            </p>

            {/* Error display */}
            {submitError && (
              <div className="mt-4 p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl text-[13px] text-[#EF4444]">
                {submitError}
              </div>
            )}
          </div>

          {/* ── RIGHT: Desktop Summary ── */}
          <div className="hidden lg:block w-[350px]">
            <div className="sticky top-24 bg-white rounded-2xl p-6" style={{ boxShadow: "0 4px 25px rgba(0,0,0,0.06)" }}>
              <h3 className="text-[18px] font-bold text-[#1F2937] mb-6">Order Summary</h3>
              
              <div className="flex gap-4 mb-6 pb-6 border-b border-[#E5E7EB]">
                <div className="w-20 h-20 rounded-xl bg-[#F0F9FF] flex items-center justify-center overflow-hidden flex-shrink-0">
                  <img src="https://i.imgur.com/Quujeth.png" alt="Bebelle" className="h-16 object-contain" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#1F2937]">Bebelle Bottle</p>
                  <p className="text-[13px] text-[#6B7280] mt-1">{pack.subtitle}</p>
                  <p className="text-[15px] font-extrabold text-[#5BA4D9] mt-2">{pack.price} USD</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6B7280]">Price</span>
                  <span className="text-[#1F2937] font-semibold">{pack.price} USD</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6B7280]">Shipping</span>
                  <span className="text-[#059669] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-[14px]">
                  <span className="text-[#6B7280]">Savings</span>
                  <span className="text-[#EA580C] font-bold">-{pack.saveAmt} USD</span>
                </div>
                <div className="border-t border-[#E5E7EB] pt-4 mt-2 flex justify-between items-center">
                  <span className="text-[16px] font-bold text-[#1F2937]">Total</span>
                  <span className="text-[24px] font-extrabold text-[#5BA4D9]">{pack.price} USD</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E5E7EB] space-y-3">
                <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                  <ShieldCheck className="w-4 h-4 text-[#059669]" />
                  <span>Secure 256-bit SSL encrypted payment.</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] text-[#6B7280]">
                  <Clock className="w-4 h-4 text-[#5BA4D9]" />
                  <span>Delivery within 3-5 business days.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;