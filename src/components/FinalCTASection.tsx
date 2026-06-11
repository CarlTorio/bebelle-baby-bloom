import { useEffect, useState } from "react";
import { ArrowRight, Truck, ShieldCheck, RefreshCcw, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTASection = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="relative overflow-hidden text-center" style={{ background: "url('https://i.imgur.com/QPNUSq9.jpeg') center top/100% auto no-repeat" }}>
        {/* Cloud decorations */}
        <svg className="absolute top-[10%] left-[5%] w-28 h-14 text-white opacity-20" viewBox="0 0 120 60" fill="currentColor">
          <ellipse cx="35" cy="40" rx="30" ry="18" />
          <ellipse cx="65" cy="35" rx="25" ry="22" />
          <ellipse cx="90" cy="40" rx="22" ry="16" />
        </svg>
        <svg className="absolute bottom-[15%] right-[8%] w-24 h-12 text-white opacity-15" viewBox="0 0 120 60" fill="currentColor">
          <ellipse cx="35" cy="40" rx="30" ry="18" />
          <ellipse cx="65" cy="35" rx="25" ry="22" />
          <ellipse cx="90" cy="40" rx="22" ry="16" />
        </svg>

        {/* Sparkles */}
        <div className="absolute top-[20%] right-[15%] w-2 h-2 rounded-full bg-white opacity-40" />
        <div className="absolute top-[40%] left-[12%] w-1.5 h-1.5 rounded-full bg-white opacity-30" />
        <div className="absolute bottom-[30%] right-[25%] w-1 h-1 rounded-full bg-white opacity-35" />
        <div className="absolute top-[60%] left-[30%] w-2 h-2 rounded-full bg-white opacity-25" />

      </section>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-[100] w-12 h-12 rounded-full bg-[#5BA4D9] text-white flex items-center justify-center shadow-[0_4px_16px_rgba(91,164,217,0.4)] hover:bg-[#4A93C8] hover:-translate-y-0.5 transition-all duration-300 ${showScrollTop ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </>
  );
};

export default FinalCTASection;
