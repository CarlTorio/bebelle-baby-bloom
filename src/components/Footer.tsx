import { useNavigate } from "react-router-dom";
import { Mail, MapPin, Store } from "lucide-react";

const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.8-.1 3.61.2 5.24.93 1.37.63 2.47 1.62 3.19 2.83.72 1.21 1.06 2.59 1.01 3.97v7.81c-.01.12-.02.23-.05.34-.06.27-.17.52-.33.73-.16.21-.36.39-.59.52-.23.13-.48.21-.74.23-.26.02-.52-.02-.77-.11-.25-.09-.48-.23-.67-.41-.19-.18-.34-.4-.44-.64-.1-.24-.15-.5-.15-.77V7.76c-.03-.45-.18-.88-.43-1.25-.25-.37-.6-.66-1-.84-.4-.18-.84-.25-1.28-.2-.44.05-.85.23-1.19.5-.34.27-.59.63-.72 1.04-.13.41-.14.85-.03 1.27.11.42.33.8.63 1.1.3.3.68.52 1.1.63.42.11.86.1 1.27-.03.41-.13.77-.38 1.04-.72.27-.34.45-.75.5-1.19.05-.44-.02-.88-.2-1.28-.18-.4-.47-.75-.84-1-.37-.25-.8-.4-1.25-.43h-.02c-.45.03-.88.18-1.25.43-.37.25-.66.6-.84 1-.18.4-.25.84-.2 1.28.05.44.23.85.5 1.19.27.34.63.59 1.04.72.41.13.85.14 1.27.03.42-.11.8-.33 1.1-.63.3-.3.52-.68.63-1.1.11-.42.1-.86-.03-1.27-.13-.41-.38-.77-.72-1.04-.34-.27-.75-.45-1.19-.5-.44-.05-.88.02-1.28.2-.4.18-.75.47-1 .84-.25.37-.4.8-.43 1.25v7.81c-.01.12-.02.23-.05.34-.06.27-.17.52-.33.73-.16.21-.36.39-.59.52-.23.13-.48.21-.74.23-.26.02-.52-.02-.77-.11-.25-.09-.48-.23-.67-.41-.19-.18-.34-.4-.44-.64-.1-.24-.15-.5-.15-.77V7.76c-.03-.45-.18-.88-.43-1.25-.25-.37-.6-.66-1-.84-.4-.18-.84-.25-1.28-.2-.44.05-.85.23-1.19.5-.34.27-.59.63-.72 1.04-.13.41-.14.85-.03 1.27.11.42.33.8.63 1.1.3.3.68.52 1.1.63.42.11.86.1 1.27-.03.41-.13.77-.38 1.04-.72.27-.34.45-.75.5-1.19.05-.44-.02-.88-.2-1.28-.18-.4-.47-.75-.84-1-.37-.25-.8-.4-1.25-.43z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Footer = () => {
  const navigate = useNavigate();

  const handleNav = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const linkClass = "text-white/70 hover:text-white transition-colors hover:underline underline-offset-4";
  const headingClass = "text-[11px] uppercase tracking-widest text-white/40 font-semibold mb-4";

  return (
    <footer style={{ backgroundColor: "#1F2937" }} className="relative z-10 pt-16 pb-8">
      <div className="max-w-5xl mx-auto px-6">
        {/* Top Row — 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 text-center md:text-left">
          {/* Column 1 — Brand */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="https://i.imgur.com/ndMOEWD.png"
              alt="Bebelle"
              className="h-12 w-auto mb-3"
              loading="lazy"
            />
            <p className="text-[13px] text-white/60 italic mb-4">
              Hands-Free Feeding, Full-Heart Parenting.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FacebookIcon />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <p className={headingClass}>Quick Links</p>
            <nav className="flex flex-col gap-2.5">
              <button onClick={() => handleNav("/")} className={linkClass + " text-[14px] bg-transparent border-none cursor-pointer p-0"}>Home</button>
              <button onClick={() => handleNav("/shop")} className={linkClass + " text-[14px] bg-transparent border-none cursor-pointer p-0"}>Shop</button>
              <button onClick={() => handleNav("/blog")} className={linkClass + " text-[14px] bg-transparent border-none cursor-pointer p-0"}>Blog</button>
              <button onClick={() => handleNav("/faq")} className={linkClass + " text-[14px] bg-transparent border-none cursor-pointer p-0"}>FAQ</button>
              <button onClick={() => handleNav("/contact")} className={linkClass + " text-[14px] bg-transparent border-none cursor-pointer p-0"}>Contact Us</button>
            </nav>
          </div>

          {/* Column 3 — Contact */}
          <div className="flex flex-col items-center md:items-start">
            <p className={headingClass}>Contact Us</p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:cabueva.jpvmercado@gmail.com"
                className="flex items-center gap-2 text-[14px] text-white/70 hover:text-white transition-colors hover:underline underline-offset-4"
              >
                <Mail className="w-4 h-4 text-white/50 shrink-0" />
                cabueva.jpvmercado@gmail.com
              </a>
              <div className="flex items-start gap-2 text-[14px] text-white/70">
                <MapPin className="w-4 h-4 text-white/50 shrink-0 mt-0.5" />
                <span>Sheridan, WY 82801, USA</span>
              </div>
              <a
                href="https://bebelle.store"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[14px] text-white/70 hover:text-white transition-colors hover:underline underline-offset-4"
              >
                <Store className="w-4 h-4 text-white/50 shrink-0" />
                bebelle.store
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-white/10" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <p className="text-[13px] text-white/50">
            © 2025 Bebelle Philippines. All rights reserved.
          </p>
          <p className="text-[13px] text-white/50">
            Powered by Stallion Growth and Commerce LLC
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
