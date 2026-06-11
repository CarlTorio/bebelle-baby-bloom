import { useEffect, useRef, useState } from "react";
import { ShieldCheck, FlaskConical, Truck, RefreshCcw } from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, bg: "bg-[#87CEEB]", title: "100% BPA-Free", desc: "Safe, non-toxic materials tested to international standards" },
  { icon: FlaskConical, bg: "bg-[#5BA4D9]", title: "Scientifically Tested", desc: "Lab-verified for safety and durability" },
  { icon: Truck, bg: "bg-[#7EC8E3]", title: "Free Nationwide Shipping", desc: "Fast delivery anywhere in the Philippines" },
  { icon: RefreshCcw, bg: "bg-[#A8D8F0]", title: "7-Day Money Back", desc: "Not satisfied? Full refund, no questions asked" },
];

const stats = [
  { target: 500, suffix: "+", label: "Happy Families" },
  { target: 4.9, suffix: "", label: "Average Rating", isDecimal: true },
  { target: 1200, suffix: "+", label: "Bottles Sold", hasComma: true },
  { target: 99, suffix: "%", label: "Would Recommend" },
];

const featuredLogos = ["MomPH", "BabyTalk", "ParentHub", "ManilaKids", "FamFirst"];

function useCountUp(target: number, isDecimal?: boolean, hasComma?: boolean) {
  const [value, setValue] = useState("0");
  const ref = useRef<HTMLDivElement>(null);
  const counted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted.current) {
          counted.current = true;
          const duration = 2000;
          const start = performance.now();
          const animate = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = eased * target;
            if (isDecimal) setValue(current.toFixed(1));
            else if (hasComma) setValue(Math.floor(current).toLocaleString());
            else setValue(Math.floor(current).toString());
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, isDecimal, hasComma]);

  return { ref, value };
}

const StatItem = ({ target, suffix, label, isDecimal, hasComma }: { target: number; suffix: string; label: string; isDecimal?: boolean; hasComma?: boolean }) => {
  const { ref, value } = useCountUp(target, isDecimal, hasComma);
  return (
    <div ref={ref} className="text-center">
      <p className="text-[42px] font-bold text-white">{value}{suffix}</p>
      <p className="text-sm text-white/90 mt-2">{label}</p>
    </div>
  );
};

const TrustSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1000px] mx-auto px-6">
        <h2 className="text-[24px] md:text-[32px] font-bold text-foreground text-center mb-12">
          Why Parents Trust Bebelle
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {trustBadges.map((b, i) => (
            <div key={i} className="bg-[#E8F4FC] rounded-2xl p-8 text-center">
              <div className={`w-[72px] h-[72px] rounded-full ${b.bg} flex items-center justify-center mx-auto`}>
                <b.icon className="w-9 h-9 text-white" />
              </div>
              <h3 className="font-bold text-lg text-foreground mt-4">{b.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats Counter */}
        <div className="mt-16 rounded-[20px] p-10 grid grid-cols-2 md:grid-cols-4 gap-8" style={{ background: "linear-gradient(135deg, #5BA4D9, #87CEEB)" }}>
          {stats.map((s, i) => (
            <div key={i} className="relative">
              <StatItem {...s} />
              {i < stats.length - 1 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-[50px] bg-white/30" />
              )}
            </div>
          ))}
        </div>

        {/* As Featured In */}
        <div className="mt-16 text-center">
          <p className="text-sm uppercase tracking-[2px] text-muted-foreground mb-6">As Featured In</p>
          <div className="flex flex-wrap justify-center gap-12">
            {featuredLogos.map((name) => (
              <div
                key={name}
                className="px-6 py-3 rounded-lg bg-[#E8F4FC] text-muted-foreground font-bold text-lg opacity-50 hover:opacity-80 transition-opacity select-none"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
