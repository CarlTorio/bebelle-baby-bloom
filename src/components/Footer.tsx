import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer style={{ backgroundColor: "#1F2937" }} className="relative z-10 pt-16 pb-10 mt-0">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-transparent md:bg-white/15 rounded-xl px-5 py-3 inline-block">
            <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-14 w-auto" loading="lazy" />
          </div>
        </div>

        {/* Address */}
        <div className="mb-5">
          <p className="text-[12px] uppercase tracking-wider text-white/50 font-semibold mb-1">Our Location</p>
          <p className="text-[14px] text-white/80">30 N Gould St Ste R, Sheridan, WY 82801</p>
        </div>

        {/* Company Info */}
        <div className="mb-6">
          <p className="text-[14px] font-semibold text-white/90 mb-3">Stallion Growth and Commerce LLC</p>
          <div className="flex flex-col items-center gap-2">
            <a href="mailto:cabueva.jpvmercado@gmail.com" className="flex items-center gap-2 text-[14px] text-white/70 hover:text-[#5BA4D9] transition-colors">
              <Mail className="w-4 h-4" />
              cabueva.jpvmercado@gmail.com
            </a>
            <a href="tel:13074001963" className="flex items-center gap-2 text-[14px] text-white/70 hover:text-[#5BA4D9] transition-colors">
              <Phone className="w-4 h-4" />
              (307) 400-1963
            </a>
          </div>
        </div>

        {/* Description */}
        <p className="text-[16px] text-white/90 leading-relaxed max-w-[500px] mx-auto mb-4">
          Hands-Free Feeding, Full-Heart Parenting.
        </p>
        <p className="text-[14px] text-white/75 leading-relaxed max-w-[520px] mx-auto mb-8">
          Bebelle is the trusted hands-free baby bottle designed for modern parents. Safe, BPA-free, and built to give you peace of mind while keeping your little one happy and well-fed. Loved by 500+ families.
        </p>

        {/* CTA Button */}
        <Button onClick={() => { navigate("/shop"); window.scrollTo(0, 0); }} className="cta-btn bg-white text-[#5BA4D9] font-bold text-lg px-12 py-6 rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:bg-white/90 animate-[pulse-cta_3s_ease-in-out_infinite]">
          Order My Bebelle Now
        </Button>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col items-center gap-1">
          <p className="text-[13px] text-white/60">© 2026 Bebelle. All rights reserved.</p>
          <p className="text-[13px] text-white/60">Made with ❤️ for modern families</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
