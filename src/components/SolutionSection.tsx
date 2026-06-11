import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const useMobileScrollReveal = (count: number, isMobile: boolean) => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(new Array(count).fill(false));

  const setRef = useCallback((index: number) => (el: HTMLDivElement | null) => {
    refs.current[index] = el;
  }, []);

  useEffect(() => {
    if (!isMobile) return;
    const observers: IntersectionObserver[] = [];
    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisible(prev => { const n = [...prev]; n[i] = true; return n; });
            obs.unobserve(el);
          }
        },
        { threshold: 0.5, rootMargin: "-35% 0px -35% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isMobile]);

  return { setRef, visible };
};

const benefits = [
  { icon: "🙌", text: "Hands-free feeding — finally multitask while baby eats", color: "#5BA4D9" },
  { icon: "💨", text: "Anti-colic vent reduces air intake and tummy troubles", color: "#4ECDC4" },
  { icon: "🔄", text: "360° gravity ball works at any drinking angle", color: "#FFB84D" },
  { icon: "🛡️", text: "BPA-free, food-grade silicone — 100% safe", color: "#A78BFA" },
];

const CloudSVG = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 120 60" fill="currentColor">
    <ellipse cx="35" cy="40" rx="30" ry="18" />
    <ellipse cx="65" cy="35" rx="25" ry="22" />
    <ellipse cx="90" cy="40" rx="22" ry="16" />
    <ellipse cx="55" cy="25" rx="18" ry="14" />
  </svg>
);

const SolutionSection = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { setRef: setBenefitRef, visible: benefitVisible } = useMobileScrollReveal(benefits.length, isMobile);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* PART 1: Brand Bar */}
      <div
        className="relative h-[60px] flex items-center justify-center gap-3"
        style={{
          background: "linear-gradient(135deg, #87CEEB, #B8E0F7)",
          borderRadius: "0 0 30px 30px",
        }}
      >
        <span className="hidden md:inline text-white/60 text-sm animate-[pulse_2s_ease-in-out_infinite]">✨</span>
        <CloudSVG className="hidden md:block w-8 h-4 text-white/40 animate-[floatSoft_4s_ease-in-out_infinite]" />

        <img
          src="https://i.imgur.com/ndMOEWD.png"
          alt="Bebelle logo"
          className="h-10 animate-[floatSoft_3s_ease-in-out_infinite]"
        />

        <span className="hidden md:inline text-white/50 mx-2">|</span>
        <span className="hidden md:inline text-white text-sm font-medium">
          Hands-Free Feeding, Full-Heart Parenting
        </span>

        <CloudSVG className="hidden md:block w-8 h-4 text-white/40 animate-[floatSoft_5s_ease-in-out_infinite_0.5s]" />
        <span className="hidden md:inline text-white/60 text-sm animate-[pulse_2.5s_ease-in-out_infinite_0.3s]">⭐</span>
      </div>

      {/* PART 2: Main Background with decorations */}
      <div
        ref={sectionRef}
        className="relative py-1 md:py-1"
        style={{ background: "linear-gradient(to bottom, #E8F4FC, #F0F9FF)" }}
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
          <CloudSVG className="absolute top-[8%] left-[5%] w-24 h-12 text-white opacity-40 animate-[floatSoft_5s_ease-in-out_infinite]" />
          <CloudSVG className="absolute top-[15%] right-[8%] w-20 h-10 text-white opacity-30 animate-[floatSoft_6s_ease-in-out_infinite_1s]" />
          <CloudSVG className="absolute bottom-[20%] left-[60%] w-16 h-8 text-white opacity-35 animate-[floatSoft_4.5s_ease-in-out_infinite_0.5s]" />

          {/* Stars */}
          <span className="absolute top-[10%] right-[20%] text-yellow-300/50 text-lg animate-[twinkle_2s_ease-in-out_infinite]">⭐</span>
          <span className="absolute top-[40%] left-[8%] text-yellow-300/40 text-sm animate-[twinkle_3s_ease-in-out_infinite_0.5s]">⭐</span>
          <span className="absolute bottom-[15%] right-[12%] text-yellow-300/35 text-base animate-[twinkle_2.5s_ease-in-out_infinite_1s]">⭐</span>

          {/* Hearts */}
          <span className="absolute top-[25%] left-[15%] text-sky-300/40 text-sm animate-[floatSoft_4s_ease-in-out_infinite_0.3s]">💙</span>
          <span className="absolute bottom-[30%] right-[25%] text-sky-300/30 text-xs animate-[floatSoft_5s_ease-in-out_infinite_1.5s]">💙</span>

          {/* Bubbles */}
          <div className="absolute top-[50%] left-[80%] w-6 h-6 rounded-full border-2 border-pink-200/30 animate-[floatSoft_5s_ease-in-out_infinite_0.8s]" />
          <div className="absolute top-[70%] left-[10%] w-4 h-4 rounded-full border-2 border-purple-200/25 animate-[floatSoft_4s_ease-in-out_infinite_1.2s]" />
          <div className="absolute top-[20%] left-[45%] w-5 h-5 rounded-full bg-sky-200/20 animate-[floatSoft_6s_ease-in-out_infinite_0.4s]" />

          {/* Sparkles */}
          <span className="absolute top-[35%] right-[5%] text-white/40 text-xs animate-[sparkle_1.5s_ease-in-out_infinite]">✨</span>
          <span className="absolute bottom-[40%] left-[30%] text-white/30 text-xs animate-[sparkle_2s_ease-in-out_infinite_0.7s]">✨</span>

          {/* Moon */}
          <span className="absolute top-[5%] right-[3%] text-yellow-200/30 text-2xl">🌙</span>
        </div>

        {/* PART 3: Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 mt-8 md:mt-12">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-[60px]">
            {/* LEFT — Product */}
            <div className="hidden md:flex w-full md:w-[45%] justify-center md:justify-center md:pl-8 order-2 md:order-1">
              <img
                src="https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Hero%20Section/Copy%20of%20Untitled%20(1000%20x%201250%20px).webp"
                alt="Bebelle bottle"
                className="h-[480px] object-contain transition-all duration-[800ms] ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateX(0)' : 'translateX(-50px)',
                  animation: isVisible ? 'floatProduct 4s ease-in-out infinite 1.5s' : 'none',
                }}
              />
            </div>

            {/* RIGHT — Content */}
            <div className="w-full md:w-[55%] flex flex-col items-center text-center order-1 md:order-2">

              {/* Headline */}
              <h2
                className="text-[28px] md:text-[40px] font-extrabold leading-[1.2] mb-5 transition-all duration-[600ms] ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                  transitionDelay: '0.2s',
                }}
              >
                <span className="text-foreground">Meet </span>
                <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="inline-block h-[36px] md:h-[50px] align-middle mx-1 -mt-2" />
                <span className="text-foreground"> — The 3-in-1 Hands-Free Bottle</span>
              </h2>

              {/* Description */}
              <p
                className="text-[17px] leading-[1.7] max-w-[500px] mb-8 transition-all duration-[600ms] ease-out"
                style={{
                  color: "#6B7280",
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '0.3s',
                }}
              >
                Bebelle combines a feeding bottle, anti-colic system, and flexible straw into one genius design.
                Your baby drinks comfortably at any angle while you finally get your hands back.
              </p>

              {/* Mobile-only product image */}
              <div className="flex md:hidden justify-center mb-6">
                <img
                  src="https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Hero%20Section/Copy%20of%20Untitled%20(1000%20x%201250%20px).webp"
                  alt="Bebelle bottle"
                  className="h-[380px] object-contain transition-all duration-[800ms] ease-out"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                    animation: isVisible ? 'floatProduct 4s ease-in-out infinite 1.5s' : 'none',
                  }}
                />
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-6">
                {benefits.map((benefit, i) => {
                  const cardVisible = isMobile ? benefitVisible[i] : isVisible;
                  return (
                  <div
                    key={i}
                    ref={isMobile ? setBenefitRef(i) : undefined}
                    className="flex items-center gap-4 bg-white rounded-2xl px-5 py-4 cursor-default transition-all duration-300 hover:translate-x-2 hover:shadow-lg"
                    style={{
                      borderLeft: `4px solid ${benefit.color}`,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                      opacity: cardVisible ? 1 : 0,
                      transform: cardVisible
                        ? 'translateY(0) scale(1)'
                        : isMobile
                          ? 'translateY(30px) scale(0.95)'
                          : 'translateX(30px)',
                      transition: isMobile
                        ? 'all 0.5s ease-out'
                        : `all 0.5s ease-out ${0.4 + i * 0.15}s`,
                    }}
                  >
                    <span
                      className="text-xl flex-shrink-0"
                      style={{
                        animation: cardVisible ? `popIn 0.4s ease-out 0.1s both` : 'none',
                      }}
                    >
                      {benefit.icon}
                    </span>
                    <span className="text-[15px] text-foreground">{benefit.text}</span>
                  </div>
                  );
                })}
              </div>

              {/* CTA */}
              <div
                className="transition-all duration-[600ms] ease-out"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: '1s',
                }}
              >
                <Button
                  className="text-white font-bold text-lg px-10 py-4 h-auto rounded-full transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(135deg, #5BA4D9, #87CEEB)",
                    boxShadow: "0 8px 24px rgba(91, 164, 217, 0.4)",
                    animation: isVisible ? 'ctaPulse 3s ease-in-out infinite 1.5s' : 'none',
                  }}
                  onClick={() => { navigate("/shop"); window.scrollTo(0, 0); }}
                >
                  Get Yours Now
                </Button>
              </div>

            </div>
          </div>

          {/* Bottom Banner */}
          <div className="w-full mt-12">
            <div className="flex flex-col md:flex-row items-stretch gap-4 md:gap-6">
              {/* Mobile: keep original images */}
              <img
                src="https://bebelle-files.b-cdn.net/MobileView/05b12404-6df4-49e2-9ab8-48c24fa42b9b.webp"
                alt="Bebelle banner left"
                className="w-full object-cover rounded-2xl shadow-lg md:hidden"
              />
              <img
                src="https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Section%204/Section%204%20-2.webp"
                alt="Free shipping banner"
                className="w-full object-cover rounded-2xl shadow-lg md:hidden"
              />
              {/* Desktop: new images side by side */}
              <img
                src="https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Section%204/Section%204%20-2.webp"
                alt="Bebelle banner left"
                className="hidden md:block md:w-[35%] object-cover rounded-3xl shadow-lg flex-shrink-0"
              />
              <img
                src="https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Section%204/Section%204%20-1.webp"
                alt="Bebelle banner right"
                className="hidden md:block md:w-[60%] object-cover rounded-3xl shadow-lg flex-shrink-0"
              />
            </div>
          </div>
        </div>
        <div
          className="w-full flex items-center justify-center mt-12 px-8 py-5"
          style={{
            background: "#92d2ed",
            borderRadius: "30px 30px 0 0",
          }}
        >
          <p className="text-white text-center text-lg md:text-xl font-extrabold italic tracking-wide" style={{ textShadow: "none", WebkitTextStroke: "0.5px rgba(0,0,0,0.15)" }}>
            "Every feeding moment is a chance to show your baby how much you love them."
          </p>
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes floatSoft {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes floatProduct {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        @keyframes ctaPulse {
          0%, 100% { box-shadow: 0 8px 24px rgba(91, 164, 217, 0.4); transform: scale(1); }
          50% { box-shadow: 0 8px 30px rgba(91, 164, 217, 0.7); transform: scale(1.03); }
        }
        @keyframes popIn {
          0% { transform: scale(0); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default SolutionSection;
