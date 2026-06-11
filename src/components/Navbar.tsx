import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", target: "top" },
  { label: "Features", target: "features" },
  { label: "Pricing", target: "pricing" },
];

const rightLinks = [
  { label: "Reviews", target: "reviews" },
  { label: "FAQ", target: "faq" },
];

const allLinks = [...navLinks, ...rightLinks];

const sectionIds = ["top", "features", "pricing", "reviews", "faq"];

const scrollTo = (id: string) => {
  if (id === "top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120;
      const y = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }
};

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 400);

      let current = "top";
      for (const id of sectionIds) {
        if (id === "top") continue;
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) current = id;
        }
      }
      if (window.scrollY < 200) current = "top";
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NavButton = ({ label, target }: { label: string; target: string }) => (
    <button
      onClick={() => { scrollTo(target); setMobileOpen(false); }}
      className={`relative text-[15px] font-medium transition-colors pb-1 ${
        activeSection === target ? "text-primary" : "text-foreground hover:text-primary"
      }`}
    >
      {label}
      {activeSection === target && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
      )}
    </button>
  );

  return (
    <nav
      className={`sticky top-10 z-40 bg-card/95 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex items-center transition-all duration-300 ${
        scrolled ? "h-[60px]" : "h-[70px]"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left links - desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <NavButton key={l.label} {...l} />
          ))}
        </div>

        {/* Logo */}
        <button onClick={() => scrollTo("top")} className="flex-shrink-0">
          <img
            src="https://i.imgur.com/ndMOEWD.png"
            alt="Bebelle"
            className={`w-auto transition-all duration-300 ${scrolled ? "h-10" : "h-[50px]"}`}
          />
        </button>

        {/* Right links + CTA - desktop */}
        <div className="hidden md:flex items-center gap-6">
          {rightLinks.map((l) => (
            <NavButton key={l.label} {...l} />
          ))}
          <button
            onClick={() => scrollTo("pricing")}
            className="cta-btn bg-cta text-primary-foreground font-bold text-sm px-6 py-2.5 rounded-full hover:bg-cta-hover transition-all"
          >
            Order Now
          </button>
        </div>

        {/* Mobile: Order Now + Hamburger */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => scrollTo("pricing")}
            className="cta-btn bg-cta text-primary-foreground font-bold text-xs px-4 py-2 rounded-full"
          >
            Order Now
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 bg-card shadow-lg md:hidden py-4 px-6 flex flex-col gap-4">
          {allLinks.map((l) => (
            <NavButton key={l.label} {...l} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
