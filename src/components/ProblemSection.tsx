import { useEffect, useRef, useState, useCallback } from "react";

const nanayImages = [
  "https://i.imgur.com/TmSbjd7.png",
  "https://i.imgur.com/HMe7Mda.png",
  "https://i.imgur.com/1INjtp8.png",
  "https://i.imgur.com/BGhvXEX.png",
];

const flipCards = [
  { front: "https://i.imgur.com/HVVP2rl.png", back: "https://i.imgur.com/LAX4Rvg.png" },
  { front: "https://i.imgur.com/4slvFWo.png", back: "https://i.imgur.com/6tgBHJ5.png" },
  { front: "https://i.imgur.com/rMgVhvm.png", back: "https://i.imgur.com/kmwojyU.png" },
  { front: "https://i.imgur.com/NyCVtRR.png", back: "https://i.imgur.com/pWJtx1H.png" },
];

const floatingIcons = [
  { emoji: "😫", top: "10%", left: "5%", delay: "0s", duration: "3s" },
  { emoji: "☕", top: "70%", left: "8%", delay: "1s", duration: "3.5s" },
  { emoji: "⏰", top: "40%", left: "85%", delay: "0.5s", duration: "4s" },
];

const FlipCard = ({
  front,
  back,
  scrollFlipped,
}: {
  front: string;
  back: string;
  scrollFlipped?: boolean;
}) => {
  const [hoverFlipped, setHoverFlipped] = useState(false);

  // On mobile, use scroll-driven flip; on desktop, use hover/click
  const isFlipped = scrollFlipped !== undefined ? scrollFlipped : hoverFlipped;

  return (
    <div
      className="flip-card cursor-pointer"
      onMouseEnter={() => scrollFlipped === undefined && setHoverFlipped(true)}
      onMouseLeave={() => scrollFlipped === undefined && setHoverFlipped(false)}
      onClick={() => scrollFlipped === undefined && setHoverFlipped((prev) => !prev)}
    >
      <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-face flip-card-front">
          <img src={front} alt="Card front" className="w-full rounded-xl" />
        </div>
        <div className="flip-card-face flip-card-back">
          <img src={back} alt="Card back" className="w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
};

const ProblemSection = () => {
  const [visible, setVisible] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [activeFlipIndex, setActiveFlipIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-triggered flip on mobile: flip whichever card is closest to vertical center
  useEffect(() => {
    if (!isMobile) {
      setActiveFlipIndex(null);
      return;
    }

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;
      let closestIndex: number | null = null;
      let closestDistance = Infinity;

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        // Only flip when card center is very close to viewport center (within 15%)
        if (distance < window.innerHeight * 0.15 && distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      });

      setActiveFlipIndex(closestIndex);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % nanayImages.length);
        setFadeIn(true);
      }, 800);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundImage: "url('https://i.imgur.com/NJJLdta.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-white/40 z-0" />
      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-6">
        {/* Mobile-only: Badge + Heading + Paragraph on top */}
        <div className="block lg:hidden text-center mb-6">
          <div className="flex justify-center">
            <span
              className="inline-block text-sm px-4 py-2 rounded-[20px] mb-4 font-semibold"
              style={{
                background: "#E8F4FC",
                color: "#5BA4D9",
                animation: "badgePulse 2s ease-in-out infinite",
              }}
            >
              😫 The Struggle Is Real
            </span>
          </div>
          <h2
            className="text-[28px] font-bold leading-tight mb-3"
            style={{
              color: "#1F2937",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            Tired of Holding the Bottle for 20 Minutes Straight?
          </h2>
          <p
            className="text-base mb-4"
            style={{
              color: "#6B7280",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}
          >
            Tired arms. Cold food. Crying baby. Sounds familiar?
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-center">
          {/* LEFT — Emotional Image */}
          <div className="w-full lg:w-1/2 flex justify-center items-center relative min-h-[380px] lg:min-h-[500px]">
            <img
              src={nanayImages[currentImg]}
              alt="Tired parent holding a bottle"
              loading="lazy"
              width={768}
              height={1024}
              className="absolute inset-0 w-full h-full object-contain z-10"
              style={{
                animation: "breatheZoom 8s ease-in-out infinite",
                opacity: fadeIn ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            />
            {floatingIcons.map((fi, i) => (
              <span
                key={i}
                className="absolute text-2xl opacity-30 pointer-events-none select-none z-20"
                style={{
                  top: fi.top,
                  left: fi.left,
                  animation: `floatIcon ${fi.duration} ease-in-out ${fi.delay} infinite`,
                }}
              >
                {fi.emoji}
              </span>
            ))}
          </div>

          {/* RIGHT — Content + Flip Cards */}
          <div className="w-full lg:w-1/2">
            {/* Desktop-only: Badge + Heading + Paragraph */}
            <div className="hidden lg:block">
              <div className="flex justify-center">
                <span
                  className="inline-block text-sm px-4 py-2 rounded-[20px] mb-4 font-semibold"
                  style={{
                    background: "#E8F4FC",
                    color: "#5BA4D9",
                    animation: "badgePulse 2s ease-in-out infinite",
                  }}
                >
                  😫 The Struggle Is Real
                </span>
              </div>

              <h2
                className="text-[36px] font-bold leading-tight mb-3 text-center"
                style={{
                  color: "#1F2937",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(30px)",
                  transition: "opacity 0.6s ease, transform 0.6s ease",
                }}
              >
                Tired of Holding the Bottle for 20 Minutes Straight?
              </h2>

              <p
                className="text-base mb-8 text-center"
                style={{
                  color: "#6B7280",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateX(0)" : "translateX(30px)",
                  transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                }}
              >
                Tired arms. Cold food. Crying baby. Sounds familiar?
              </p>
            </div>

            {/* Flip Cards — 2x2 Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 max-w-[300px] mx-auto lg:max-w-none">
              {flipCards.map((card, index) => (
                <div
                  key={index}
                  ref={(el) => { cardRefs.current[index] = el; }}
                >
                  <FlipCard
                    front={card.front}
                    back={card.back}
                    scrollFlipped={isMobile ? activeFlipIndex === index : undefined}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes breatheZoom {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes badgePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .flip-card {
          perspective: 1000px;
        }
        .flip-card-inner {
          position: relative;
          width: 100%;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .flip-card-face {
          width: 100%;
          backface-visibility: hidden;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .flip-card-front {
          position: relative;
        }
        .flip-card-back {
          position: absolute;
          top: 0;
          left: 0;
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default ProblemSection;
