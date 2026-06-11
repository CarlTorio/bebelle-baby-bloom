import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Volume2, VolumeX, ShoppingCart } from "lucide-react";

const videos = [
  {
    number: "1",
    src: "https://i.imgur.com/gR6s4pk.mp4",
    title: "Prepare the Bottle",
  },
  {
    number: "2",
    src: "https://i.imgur.com/xKvN6WU.mp4",
    title: "Attach the Straw",
  },
  {
    number: "3",
    src: "https://i.imgur.com/n1Kqp3Z.mp4",
    title: "Position & Feed",
  },
  {
    number: "4",
    src: "https://i.imgur.com/1Lwr1Qu.mp4",
    title: "Hands-Free Magic",
  },
  {
    number: "5",
    src: "https://i.imgur.com/ZmKccGq.mp4",
    title: "Happy Baby, Happy You",
  },
];

const START_TIME = 7 * 60 + 30; // 7 minutes 30 seconds
const RESET_AT = 10; // reset at 10 seconds

const formatTime = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

const HowItWorksSection = () => {
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(videos.map(() => false));
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [mutedStates, setMutedStates] = useState<boolean[]>(videos.map(() => true));
  const [isMobile, setIsMobile] = useState(false);

  // Shared countdown timer (same localStorage key as hero)
  const [countdown, setCountdown] = useState(() => {
    const saved = localStorage.getItem('bebelle-countdown-start');
    if (saved) {
      const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
      const remaining = START_TIME - elapsed;
      if (remaining > RESET_AT) return remaining;
    }
    localStorage.setItem('bebelle-countdown-start', String(Date.now()));
    return START_TIME;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        const next = prev - 1;
        if (next <= RESET_AT) {
          localStorage.setItem('bebelle-countdown-start', String(Date.now()));
          return START_TIME;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Desktop: section-level trigger
  useEffect(() => {
    if (isMobile) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile: per-card trigger when card reaches middle of screen
  useEffect(() => {
    if (!isMobile) return;
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, index) => {
      if (!ref) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards(prev => prev.map((v, i) => i === index ? true : v));
          }
        },
        { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isMobile]);

  const toggleMute = (index: number) => {
    setMutedStates(prev => prev.map((m, i) => i === index ? !m : true));
  };

  const scrollToPricing = () => {
    const el = document.getElementById("pricing");
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <section className="py-6 md:py-8 bg-white">
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="text-center mb-4 md:mb-6">
          <span className="inline-block bg-[#C5E8F7] text-foreground text-[13px] px-4 py-1.5 rounded-[20px]">
            🎬 Watch How It Works
          </span>
          <h2 className="text-[24px] md:text-[36px] font-bold text-foreground mt-4 leading-tight">
            See Bebelle in Action
          </h2>
          <p className="text-muted-foreground text-[15px] mt-2">
            Tap any video to hear sound 🔊
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-[1600px] mx-auto"
        >
          {videos.map((video, index) => {
            const isVisible = isMobile ? visibleCards[index] : visible;
            const delay = isMobile ? 0 : index * 200;
            return (
            <div
              key={index}
              ref={el => { cardRefs.current[index] = el; }}
              className={`flex flex-col items-center ${index === 4 ? 'hidden md:flex' : ''}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1) translateY(0)" : "scale(0.5) translateY(40px)",
                transition: isMobile
                  ? "opacity 1.2s cubic-bezier(0.34, 1.56, 0.64, 1), transform 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
                transitionDelay: isVisible ? `${delay}ms` : "0ms",
              }}
            >
              <div
                className="w-9 h-9 bg-[#5BA4D9] rounded-full flex items-center justify-center text-white font-bold text-[16px] shadow-md mb-3 z-10"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "scale(1)" : "scale(0)",
                  transition: isMobile
                    ? "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)"
                    : "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transitionDelay: isVisible ? `${delay + 300}ms` : "0ms",
                }}
              >
                {video.number}
              </div>

              <div
                onClick={() => toggleMute(index)}
                className="relative w-full aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer group"
                style={{
                  boxShadow: `0 0 16px 2px rgba(91, 164, 217, 0.35), 0 4px 12px rgba(0,0,0,0.08)`,
                  border: "3px solid rgba(91, 164, 217, 0.4)",
                }}
              >
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted={mutedStates[index]}
                  playsInline
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1.5 shadow-md transition-transform duration-200 group-hover:scale-110">
                  {mutedStates[index] ? (
                    <VolumeX className="w-4 h-4 text-[#5BA4D9]" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-[#5BA4D9]" />
                  )}
                </div>
              </div>

              <h3 className="font-extrabold text-[15px] md:text-[17px] text-foreground mt-3 text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                {video.title}
              </h3>
            </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-6 md:mt-8 flex flex-col items-center gap-2 md:gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3">
            <button
              onClick={() => { navigate("/shop"); window.scrollTo(0, 0); }}
              className="cta-btn relative overflow-hidden px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-bold text-[15px] md:text-lg shadow-[0_6px_20px_rgba(91,164,217,0.35)] transition-all"
              style={{ backgroundColor: "#5BA4D9" }}
            >
              <span className="relative z-10 flex items-center gap-1.5 md:gap-2">
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                Order Now — ₱999
              </span>
              <span className="absolute top-0 left-0 w-full h-full">
                <span className="absolute top-0 left-[-150%] w-[60%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-btn-shine" />
              </span>
            </button>

            <div className="flex items-center gap-2 md:gap-3 bg-[#FFF3EE] rounded-full px-3 py-1.5 md:px-5 md:py-3 shadow-sm">
              <span className="text-[#E74C3C] text-[11px] md:text-[14px] font-bold">
                🔥 33% OFF — <span className="line-through">₱1,499</span>
              </span>
              <span className="w-px h-4 md:h-5 bg-[#E74C3C]/20" />
              <span className="text-[11px] md:text-[15px] font-extrabold text-foreground tracking-[2px] md:tracking-[3px]">
                ⏰ {formatTime(countdown)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
