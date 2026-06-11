import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const variants = [
  {
    id: "blue",
    label: "Sky Blue",
    images: ["https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Hero%20Section/3.png", "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Hero%20Section/Copy%20of%20Untitled%20(1000%20x%201250%20px).webp"],
    image: "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Hero%20Section/3.png",
    bg: "bg-[#B8E0F7]",
    ring: "ring-[#5BA4D9]",
    videoSrc: "https://bebelle-files.b-cdn.net/Videos/5%20MBDesktop%20view.mp4",
    mobileVideoSrc: "https://bebelle-files.b-cdn.net/Videos/5MB%20Mobile%20View.mp4",
    heroBg: null as string | null,
    cta: "#5BA4D9",
    ctaHover: "#4A93C8",
    outline: "#87CEEB",
    accent: "#5BA4D9",
  },
];

const HeroSection = () => {
  const navigate = useNavigate();
  const heroIsMobile = useIsMobile();
  const [selected, setSelected] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const v = variants[selected] ?? variants[0];
  const activeVideoSrc = heroIsMobile && v.mobileVideoSrc ? v.mobileVideoSrc : v.videoSrc;

  // Countdown timer: starts at 7:30, resets at 0:10
  const START_TIME = 7 * 60 + 30; // 7 minutes 30 seconds
  const RESET_AT = 10; // reset at 10 seconds

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

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  // Content visible only after video ends (or immediately if no video)
  const showContent = true; // Always show content immediately

  // Dispatch variant event for nav sync
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("bebelle-variant", { detail: variants[selected] }));
  }, [selected]);

  // Determine if this is a fresh page load (not SPA navigation)
  const isFreshLoad = useRef(() => {
    const key = 'bebelle-hero-visited';
    const visited = sessionStorage.getItem(key);
    sessionStorage.setItem(key, 'true');
    return !visited;
  });
  const shouldLock = useRef(false); // Removed scroll lock as per request

  // Auto-play video on load + lock scroll only on fresh page load
  useEffect(() => {
    if (!activeVideoSrc) return;

    if (shouldLock.current) {
      document.body.style.overflow = "hidden";
    }

    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = 0;
      vid.play().catch(() => {
        document.body.style.overflow = "";
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []); // only on mount

  // Video ended handler
  const handleVideoEnded = useCallback(() => {
    setVideoEnded(true);
    document.body.style.overflow = "";
  }, []);

  // Auto-cycle images after video ends
  useEffect(() => {
    if (!showContent || v.images.length <= 1) return;
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % v.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [showContent, v.images.length]);

  // When switching TO blue variant (has video), replay video (no scroll lock)
  const handleVariantSelect = (i: number) => {
    if (i === selected) return;
    setSelected(i);
    setImageIndex(0);

    const variant = variants[i];
    const variantVideo = heroIsMobile && variant.mobileVideoSrc ? variant.mobileVideoSrc : variant.videoSrc;
    if (variantVideo) {
      setVideoEnded(false);
      // Small delay to let React update the video src
      setTimeout(() => {
        const vid = videoRef.current;
        if (vid) {
          vid.currentTime = 0;
          vid.play().catch(() => {});
        }
      }, 100);
    }
  };

  // Cleanup scroll lock on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const hasVideo = !!activeVideoSrc;

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative z-10 h-screen min-h-[600px] pt-[120px] pb-16 px-4 md:px-8 lg:px-16 overflow-hidden flex flex-col justify-center"
    >
      {/* Video background — always rendered, hidden via CSS to avoid removeChild errors */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style={{ zIndex: 0, opacity: hasVideo ? 1 : 0, pointerEvents: hasVideo ? 'auto' : 'none' }}
        src={activeVideoSrc || undefined}
        muted
        autoPlay
        loop
        playsInline
        preload="auto"
      />

      {/* Static image background for variants without video */}
      {variants.map((variant, i) => {
        if (variant.videoSrc) return null; // skip video variants
        return (
          <div
            key={variant.id}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out"
            style={{
              backgroundImage: `url(${variant.heroBg})`,
              opacity: selected === i ? 1 : 0,
              zIndex: 0,
            }}
          />
        );
      })}

      {/* Hide video bg when showing image variant */}
      {!hasVideo && (
        <div className="absolute inset-0 bg-[#E8F4FC]" style={{ zIndex: 0, opacity: selected === 0 ? 0 : 0 }} />
      )}

      {/* Subtle overlay for text readability */}
      <div className="absolute inset-0 bg-white/10" style={{ zIndex: 1 }} />

      {/* Cloud wave at bottom */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-[60px] transition-colors duration-500"
        style={{ zIndex: 2, color: '#5ba4d9' }}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        fill="currentColor"
      >
        <path d="M0,60 L0,30 C120,5 240,45 360,25 C480,5 600,40 720,30 C840,20 960,45 1080,25 C1200,5 1320,35 1440,20 L1440,60 Z" />
      </svg>

      {/* Sparkles */}
      <div className={`absolute top-[15%] left-[10%] w-2 h-2 rounded-full bg-white transition-opacity duration-700 ${showContent ? 'opacity-50' : 'opacity-0'}`} style={{ zIndex: 2 }} />
      <div className={`absolute top-[25%] right-[20%] w-1.5 h-1.5 rounded-full bg-white transition-opacity duration-700 ${showContent ? 'opacity-40' : 'opacity-0'}`} style={{ zIndex: 2 }} />
      <div className={`absolute top-[40%] left-[30%] w-1 h-1 rounded-full bg-white transition-opacity duration-700 ${showContent ? 'opacity-30' : 'opacity-0'}`} style={{ zIndex: 2 }} />

      <div
        className="container mx-auto flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8 relative"
        style={{ zIndex: 3 }}
      >
        {/* Left - Text */}
        <div className="flex-1 md:max-w-[55%] md:pl-12 lg:pl-20">

          <h1
            className={`text-[44px] md:text-[72px] font-[900] leading-[1.1] mb-5 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}
            style={{
              color: '#FFFFFF',
              WebkitTextStroke: `5px ${v.accent}`,
              textShadow: `4px 4px 0px ${v.accent}, -2px -2px 0px ${v.accent}, 2px -2px 0px ${v.accent}, -2px 2px 0px ${v.accent}, 2px 2px 0px ${v.accent}, 5px 5px 0px rgba(0,0,0,0.12)`,
              paintOrder: 'stroke fill',
            }}
          >
            Hands-Free Feeding Bottle
          </h1>

          <p className={`${heroIsMobile ? 'text-sm mb-4' : 'text-lg mb-6'} text-muted-foreground leading-relaxed max-w-[500px] transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
            {heroIsMobile
              ? "Hands-free feeding your baby drinks while you relax."
              : "The 3-in-1 bottle that lets your baby feed independently so you can finally have your hands (and your sanity) back."}
          </p>

          {!heroIsMobile && (
            <button
              onClick={() => navigate('/shop')}
              className={`relative overflow-hidden transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'} inline-flex items-center justify-center rounded-full font-extrabold text-white shadow-xl hover:scale-[1.03] active:scale-95 group text-xl px-14 py-5 mb-6 min-w-[320px]`}
              style={{
                background: `linear-gradient(135deg, ${v.cta} 0%, ${v.accent} 50%, ${v.ctaHover} 100%)`,
                boxShadow: `0 12px 32px ${v.accent}66, inset 0 1px 0 rgba(255,255,255,0.4)`,
                letterSpacing: '0.5px',
              }}
            >
              <span className="relative z-10 flex items-center gap-2">
                Order Now
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute top-0 left-0 h-full w-1/3 animate-btn-shine"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                  filter: 'blur(2px)',
                }}
              />
            </button>
          )}








          {/* Product image - mobile only, below CTA */}
          {heroIsMobile && showContent && (
            <div className="flex flex-col items-center mb-4 transition-opacity duration-700">
              <div className="relative mb-4 flex items-center gap-2">
                <button
                  onClick={() => setImageIndex((prev) => (prev - 1 + v.images.length) % v.images.length)}
                  className="z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all"
                  style={{ color: v.accent }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
                </button>
                <div className="relative">
                  <div className="w-[240px] h-[240px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500" style={{ backgroundColor: `${v.accent}33` }} />
                  <img
                    src={v.images[imageIndex]}
                    alt={`${v.label} - ${imageIndex + 1}`}
                    className="relative z-10 h-[260px] w-auto object-contain animate-float transition-opacity duration-1000 ease-in-out"
                  />
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {v.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImageIndex(idx)}
                        className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                        style={{ backgroundColor: idx === imageIndex ? v.accent : `${v.accent}44` }}
                      />
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setImageIndex((prev) => (prev + 1) % v.images.length)}
                  className="z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all"
                  style={{ color: v.accent }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                </button>
              </div>
            </div>
          )}

          {heroIsMobile && (
            <div className="flex justify-center mb-4">
              <button
                onClick={() => navigate('/shop')}
                className={`relative overflow-hidden transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'} inline-flex items-center justify-center rounded-full font-extrabold text-white shadow-xl active:scale-95 group text-base px-10 py-4 w-[280px]`}
                style={{
                  background: `linear-gradient(135deg, ${v.cta} 0%, ${v.accent} 50%, ${v.ctaHover} 100%)`,
                  boxShadow: `0 12px 32px ${v.accent}66, inset 0 1px 0 rgba(255,255,255,0.4)`,
                  letterSpacing: '0.5px',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Order Now
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 h-full w-1/3 animate-btn-shine"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                    filter: 'blur(2px)',
                  }}
                />
              </button>
            </div>
          )}


          {/* Trust indicators */}
          <p className={`text-[17px] font-bold text-muted-foreground mt-6 transition-all duration-700 items-center gap-1 flex-wrap ${showContent ? 'opacity-100' : 'opacity-0'} ${heroIsMobile ? 'hidden' : 'flex'}`}>
            <CheckSquare size={20} strokeWidth={2.5} style={{ color: v.accent }} className="inline-block" /> BPA-Free &nbsp;•&nbsp;{" "}
            <CheckSquare size={20} strokeWidth={2.5} style={{ color: v.accent }} className="inline-block" /> Anti-Colic &nbsp;•&nbsp;{" "}
            <CheckSquare size={20} strokeWidth={2.5} style={{ color: v.accent }} className="inline-block" /> 500+ Happy Parents
          </p>
        </div>

        {/* Right - Product */}
        <div className={`flex-1 md:max-w-[45%] flex flex-col items-center mt-8 md:mt-12 ${heroIsMobile ? 'hidden' : ''}`}>
          <div className="relative mb-8 flex items-center gap-2">
            {/* Left arrow */}
            <button
              onClick={() => setImageIndex((prev) => (prev - 1 + v.images.length) % v.images.length)}
              className="z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all"
              style={{ color: v.accent }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            <div className="relative">
              <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors duration-500" style={{ backgroundColor: `${v.accent}33` }} />
              <img
                src={v.images[imageIndex]}
                alt={`${v.label} - ${imageIndex + 1}`}
                className="relative z-10 h-[340px] md:h-[400px] w-auto object-contain animate-float transition-opacity duration-1000 ease-in-out"
              />
              {/* Dots */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {v.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setImageIndex(idx)}
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{ backgroundColor: idx === imageIndex ? v.accent : `${v.accent}44` }}
                  />
                ))}
              </div>
            </div>

            {/* Right arrow */}
            <button
              onClick={() => setImageIndex((prev) => (prev + 1) % v.images.length)}
              className="z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white shadow-md flex items-center justify-center transition-all"
              style={{ color: v.accent }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
