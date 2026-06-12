import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Package, Phone, MapPin, ArrowLeft } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();

  /* Read latest order from localStorage */
  const orders = JSON.parse(localStorage.getItem("bebelle-orders") || "[]");
  const order = orders.length > 0 ? orders[orders.length - 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        value: order?.price || 1799,
        currency: 'PHP',
        content_name: 'Bebelle Bottle',
        content_type: 'product'
      });
    }

    // Server-side CAPI call
    const sendCAPI = async () => {
      try {
        await fetch(
          "https://fhgovsymhevqsjtxhiui.supabase.co/functions/v1/meta-capi-purchase",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZoZ292c3ltaGV2cXNqdHhoaXVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0ODUxMTYsImV4cCI6MjA5MTA2MTExNn0.2Qr1h-3ylpXtw-KzRZM2sepyfzDERs2xttmd2GSFyX0"
            },
            body: JSON.stringify({
              value: order?.price || 1799,
              currency: "PHP",
              content_name: "Bebelle Bottle",
              event_source_url: window.location.href
            })
          }
        );
      } catch (error) {
        console.error("CAPI error:", error);
      }
    };
    sendCAPI();
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#F0F9FF", fontFamily: "'Nunito', sans-serif" }}>
        <div className="max-w-[500px] w-full bg-white rounded-2xl p-8 text-center" style={{ boxShadow: "0 10px 40px rgba(91,164,217,0.15)" }}>
          <h1 className="text-[22px] font-bold text-[#1F2937] mb-3">No order found</h1>
          <p className="text-[14px] text-[#6B7280] mb-6">It looks like you don't have an order yet. Start shopping now!</p>
          <button
            onClick={() => navigate("/")}
            className="w-full text-white font-bold text-[15px] py-4 rounded-[30px] transition-all hover:opacity-90"
            style={{ backgroundColor: "#5BA4D9" }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ backgroundColor: "#F0F9FF", fontFamily: "'Nunito', sans-serif" }}>
      <div className="max-w-[520px] mx-auto">
        {/* Success header */}
        <div className="bg-white rounded-2xl p-8 text-center mb-5" style={{ boxShadow: "0 10px 40px rgba(91,164,217,0.12)" }}>
          <div className="flex justify-center mb-4">
            <div className="w-[80px] h-[80px] rounded-full flex items-center justify-center" style={{ backgroundColor: "#ECFDF5" }}>
              <CheckCircle className="w-[44px] h-[44px] text-[#059669]" />
            </div>
          </div>
          <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-[45px] w-auto mx-auto mb-4" />
          <h1 className="text-[26px] font-extrabold text-[#1F2937] mb-2">Order Placed! 🎉</h1>
          <p className="text-[15px] text-[#6B7280] leading-[1.7]">
            Thank you for ordering the <span className="font-bold text-[#5BA4D9]">{order.subtitle}</span>!
          </p>
          <p className="text-[14px] text-[#6B7280] mt-1">
            We will call/text you to confirm within <span className="font-semibold text-[#1F2937]">24 hours</span>.
          </p>
        </div>

        {/* Order details */}
        <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 className="text-[16px] font-bold text-[#1F2937] mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#5BA4D9]" />
            Order Details
          </h2>
          <div className="flex items-center gap-3 pb-4 border-b border-[#E5E7EB]">
            <div className="w-[55px] h-[55px] rounded-xl bg-[#F0F9FF] flex items-center justify-center overflow-hidden">
              <img src="https://i.imgur.com/Quujeth.png" alt="Bebelle" className="h-[45px] object-contain" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-[#1F2937]">Bebelle Bottle</p>
              <p className="text-[12px] text-[#6B7280]">{order.subtitle}</p>
            </div>
            <p className="text-[18px] font-extrabold text-[#5BA4D9]">${order.price?.toLocaleString()}</p>
          </div>
          <div className="pt-3 flex flex-col gap-1.5">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#6B7280]">Shipping</span>
              <span className="text-[#059669] font-semibold">FREE</span>
            </div>
            <div className="flex justify-between text-[13px]">
              <span className="text-[#6B7280]">Payment</span>
              <span className="text-[#1F2937] font-semibold">Cash on Delivery</span>
            </div>
            <div className="border-t border-[#E5E7EB] pt-3 mt-1 flex justify-between">
              <span className="text-[15px] font-bold text-[#1F2937]">Total</span>
              <span className="text-[22px] font-extrabold text-[#5BA4D9]">${order.price?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Delivery info */}
        <div className="bg-white rounded-2xl p-6 mb-5" style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
          <h2 className="text-[16px] font-bold text-[#1F2937] mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#5BA4D9]" />
            Delivery Address
          </h2>
          <p className="text-[14px] font-semibold text-[#1F2937]">{order.customer?.fullName}</p>
          <p className="text-[13px] text-[#6B7280] mt-1">
            {order.customer?.address}, {order.customer?.barangay}, {order.customer?.city}, {order.customer?.province}
          </p>
          {order.customer?.landmark && (
            <p className="text-[13px] text-[#6B7280] mt-1">Landmark: {order.customer.landmark}</p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Phone className="w-4 h-4 text-[#5BA4D9]" />
            <span className="text-[13px] text-[#1F2937] font-medium">{order.customer?.phone}</span>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => { navigate("/"); window.scrollTo(0, 0); }}
          className="w-full text-white font-bold text-[16px] py-4 rounded-[30px] transition-all hover:opacity-90 flex items-center justify-center gap-2"
          style={{ backgroundColor: "#5BA4D9", boxShadow: "0 8px 25px rgba(91,164,217,0.4)" }}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderSuccess;
