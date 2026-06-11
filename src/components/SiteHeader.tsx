import { Search, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const sectionIds = ["top", "features", "pricing", "reviews"];

const scrollTo = (id: string) => {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
};

const leftLinks = [
  { label: "Home", target: "top" },
  { label: "Features", target: "features" },
  { label: "Shop", target: "shop" },
];

const rightLinks = [
  { label: "Reviews", target: "reviews" },
  { label: "Contact", target: "reviews" },
];

const allLinks = [...leftLinks, ...rightLinks];

const SiteHeader = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [accentColor, setAccentColor] = useState("#5BA4D9");
  const [accentHover, setAccentHover] = useState("#4A93C8");
  const [accentLight, setAccentLight] = useState("#D9F0FB");
  const [accentLightHover, setAccentLightHover] = useState("#C5E8F7");

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail?.cta) setAccentColor(detail.cta);
      if (detail?.ctaHover) setAccentHover(detail.ctaHover);
      if (detail?.outline) {
        setAccentLight(detail.id === 'red' ? '#FFE0D6' : '#D9F0FB');
        setAccentLightHover(detail.id === 'red' ? '#FFD0C2' : '#C5E8F7');
      }
    };
    window.addEventListener("bebelle-variant", handler);
    return () => window.removeEventListener("bebelle-variant", handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 100);
      // Fade out navbar only when hero is completely off screen
      const heroEl = document.getElementById('hero');
      if (heroEl) {
        const heroBottom = heroEl.getBoundingClientRect().bottom;
        setPastHero(heroBottom <= 0);
      } else {
        setPastHero(window.scrollY > window.innerHeight);
      }
      let current = "top";
      for (const id of sectionIds) {
        if (id === "top") continue;
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 250) current = id;
      }
      if (window.scrollY < 200) current = "top";
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavLink = ({ label, target }: { label: string; target: string }) => (
    <button
      onClick={() => { if (target === "shop") { navigate("/shop"); window.scrollTo(0, 0); } else { scrollTo(target); } setMobileOpen(false); }}
      className="text-[14px] font-medium transition-colors duration-200 whitespace-nowrap"
      style={{ color: activeSection === target ? accentColor : undefined }}
      onMouseEnter={(e) => { if (activeSection !== target) e.currentTarget.style.color = accentColor; }}
      onMouseLeave={(e) => { if (activeSection !== target) e.currentTarget.style.color = ''; }}
    >
      {label}
    </button>
  );

  return (
    <>
      <nav
        className="fixed left-0 right-0 z-[1000] flex items-center justify-center top-4 h-[70px] bg-transparent transition-all duration-500"
        style={{
          opacity: pastHero ? 0 : 1,
          transform: pastHero ? 'translateY(-20px)' : 'translateY(0)',
          pointerEvents: pastHero ? 'none' : 'auto',
        }}
      >
        <div className="max-w-[1200px] w-full mx-auto px-4 flex items-center justify-center">
          {/* Desktop pill */}
          <div className="hidden md:flex items-center bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.1)] gap-0">
            <button className="w-10 h-10 rounded-full flex items-center justify-center transition-colors mr-4 flex-shrink-0" style={{ backgroundColor: accentLight }} onMouseEnter={e => e.currentTarget.style.backgroundColor = accentLightHover} onMouseLeave={e => e.currentTarget.style.backgroundColor = accentLight}>
              <Search className="w-[18px] h-[18px] text-foreground" />
            </button>

            <div className="flex items-center gap-6 mr-6">
              {leftLinks.map((l) => (
                <NavLink key={l.label} {...l} />
              ))}
            </div>

            {/* Logo */}
            <div className="relative mx-4 flex-shrink-0">
              <img
                src="https://i.imgur.com/ndMOEWD.png"
                alt="Bebelle"
                className="h-[50px] w-auto object-contain"
              />
            </div>

            <div className="flex items-center gap-6 ml-6">
              {rightLinks.map((l) => (
                <NavLink key={l.label} {...l} />
              ))}
            </div>


            <button
              onClick={() => { navigate("/shop"); window.scrollTo(0, 0); }}
              className="ml-3 px-5 py-2.5 rounded-full text-white text-[13px] font-bold hover:scale-[1.02] transition-all shadow-[0_4px_12px_rgba(91,164,217,0.3)] flex-shrink-0"
              style={{ backgroundColor: accentColor }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = accentColor)}
            >
              Order Now
            </button>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden items-center justify-center w-full relative h-full">
            <button 
              onClick={() => setMobileOpen(true)} 
              className="w-10 h-10 rounded-full flex items-center justify-center absolute left-0" 
              style={{ backgroundColor: accentLight }}
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>

            <div className="bg-white/95 backdrop-blur-sm rounded-full px-6 py-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex items-center justify-center">
              <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-10 w-auto object-contain" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[2000] md:hidden bg-white animate-in fade-in duration-300 overflow-hidden">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-12 w-auto object-contain" />
              <button 
                onClick={() => setMobileOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
              {allLinks.map((l, index) => (
                <button
                  key={l.label}
                  onClick={() => { 
                    if (l.target === "shop") {
                      navigate("/shop");
                      window.scrollTo(0, 0);
                    } else {
                      scrollTo(l.target);
                    }
                    setMobileOpen(false); 
                  }}
                  className="text-center text-[32px] font-bold tracking-tight text-foreground hover:scale-110 transition-transform active:scale-95 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                  style={{ 
                    color: activeSection === l.target ? accentColor : undefined,
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {l.label}
                </button>
              ))}

              <button
                onClick={() => { 
                  navigate("/shop");
                  window.scrollTo(0, 0);
                  setMobileOpen(false); 
                }}
                className="mt-8 px-10 py-5 rounded-full text-white font-black text-xl shadow-[0_10px_25px_rgba(91,164,217,0.3)] hover:scale-105 transition-all active:scale-95 animate-in zoom-in-75 duration-500 fill-mode-both"
                style={{ 
                  backgroundColor: accentColor,
                  animationDelay: `${allLinks.length * 100}ms`
                }}
              >
                ORDER NOW
              </button>
            </div>

            {/* Bottom spacer */}
            <div className="h-20 flex items-center justify-center text-slate-300 text-sm font-medium">
              Modern Parenting Made Fun
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SiteHeader;