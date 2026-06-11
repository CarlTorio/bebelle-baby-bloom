import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Plus, Minus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const promoImages = [
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/1%20(2).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/2%20(2).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/3%20(2).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/4%20(2).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/5%20(1).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/6%20(1).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/7%20(1).webp",
  "https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Last%20Section/8%20(1).webp",
];

const faqs = [
  {
    q: "Is the Bebelle bottle safe for my baby?",
    a: "Absolutely! Bebelle is made from 100% BPA-free, food-grade silicone that meets international safety standards. All materials are non-toxic, odorless, and have been scientifically tested for baby use. Your little one's safety is our top priority.",
  },
  {
    q: "What age is this bottle suitable for?",
    a: "Bebelle is designed for babies 3 months and up. The soft, breast-like nipple and flexible straw system work perfectly as your baby develops their feeding independence. Always supervise your baby during feeding.",
  },
  {
    q: "How does the hands-free feature work?",
    a: "The secret is our 360° gravity ball and flexible straw system. The weighted ball follows the milk to the lowest point of the bottle, allowing your baby to drink from any position — lying down, sitting up, or even tilted sideways. No need to hold the bottle at a specific angle!",
  },
  {
    q: "Will this help with colic and gas?",
    a: "Yes! Bebelle features a built-in anti-colic vent system that reduces the amount of air your baby swallows during feeding. This helps minimize gas, colic discomfort, and those fussy post-feeding moments. Many parents report calmer babies after switching to Bebelle.",
  },
  {
    q: "Is it easy to clean?",
    a: "Super easy! Bebelle is fully detachable — the bottle, straw, nipple, and gravity ball all come apart for thorough cleaning. We include a cleaning brush in every package. All parts are dishwasher-safe (top rack) for busy parents.",
  },
  {
    q: "Does using a hands-free bottle affect bonding with my baby?",
    a: "Not at all! Bebelle gives you hands-free moments, but bonding happens through eye contact, talking, singing, and being present with your baby — not just holding a bottle. Many parents find they can be MORE present because they're less fatigued and stressed.",
  },
  {
    q: "What if my baby doesn't like it?",
    a: "We offer a 7-day money-back guarantee. If your baby doesn't take to Bebelle or you're not satisfied for any reason, simply contact us for a full refund — no questions asked. We're confident most babies love it, but we've got you covered either way.",
  },
  {
    q: "How long does shipping take?",
    a: "We offer FREE shipping nationwide! Metro Manila orders typically arrive within 2-3 business days. Provincial orders take 5-7 business days. You'll receive a tracking number once your order ships so you can follow your Bebelle's journey.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState<boolean[]>(new Array(faqs.length).fill(false));
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  // Cycle through all 8 images one by one; group changes when crossing boundary
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((i) => (i + 1) % promoImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const promoPage = Math.floor(activeIndex / 4);
  const currentImages = promoImages.slice(promoPage * 4, promoPage * 4 + 4);
  const featuredImage = promoImages[activeIndex];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, isMobile ? idx * 250 : idx * 80);
          }
        });
      },
      { threshold: 0.1, rootMargin: isMobile ? "-30% 0px -30% 0px" : "0px" }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section id="faq" className="py-10 md:py-12 bg-[#E8F4FC] relative overflow-hidden">
      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <span className="inline-block bg-[#B8E0F7] text-foreground text-[12px] px-3 py-1 rounded-[16px]">
            ❓ Got Questions?
          </span>
          <h2 className="text-[22px] md:text-[28px] font-bold text-foreground mt-3 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-[14px] text-muted-foreground mt-2 mb-8">
            Everything you need to know about Bebelle
          </p>
        </div>

        <div className="flex gap-10 items-start">
          {/* Promo image grid */}
          <div className="hidden lg:block w-[50%] sticky top-32">
            {/* Main large preview */}
            <div key={`main-${activeIndex}`} className="rounded-2xl overflow-hidden shadow-lg mb-3 animate-fade-in">
              <img
                src={featuredImage}
                alt={`Bebelle promo featured`}
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
              />
            </div>
            {/* 4 smaller thumbnails - 2x2 grid */}
            <div className="grid grid-cols-2 gap-2">
              {currentImages.map((src, i) => {
                const globalIdx = promoPage * 4 + i;
                return (
                  <div
                    key={`${promoPage}-${i}`}
                    className={`rounded-xl overflow-hidden shadow-sm animate-fade-in cursor-pointer transition-all duration-300 ${globalIdx === activeIndex ? "ring-2 ring-[#5BA4D9] scale-[1.03]" : "opacity-70 hover:opacity-100"}`}
                    onClick={() => setActiveIndex(globalIdx)}
                  >
                    <img
                      src={src}
                      alt={`Bebelle promo ${globalIdx + 1}`}
                      className="w-full h-auto object-cover aspect-square"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4">
              {[0, 1].map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveIndex(p * 4)}
                  className={`h-2 rounded-full transition-all duration-300 ${p === promoPage ? "w-6 bg-[#5BA4D9]" : "w-2 bg-[#B8E0F7]"}`}
                  aria-label={`Promo page ${p + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Accordion */}
          <div className="w-full lg:w-[60%]">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`bg-white rounded-xl p-4 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.04)] cursor-pointer transition-all duration-300
                    ${isOpen ? "border-l-4 border-l-[#5BA4D9] shadow-[0_8px_24px_rgba(91,164,217,0.12)]" : "border-l-4 border-l-transparent"}
                    ${visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
                  `}
                  style={{ transition: isMobile ? "opacity 0.7s ease, transform 0.7s ease, box-shadow 0.3s ease, border-color 0.3s ease" : "opacity 0.4s ease, transform 0.4s ease, box-shadow 0.3s ease, border-color 0.3s ease" }}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className={`text-[14px] font-semibold transition-colors duration-200 ${isOpen ? "text-[#5BA4D9]" : "text-foreground hover:text-[#5BA4D9]"}`}>
                      {faq.q}
                    </h3>
                    <div className="w-6 h-6 rounded-full bg-[#B8E0F7] flex items-center justify-center flex-shrink-0">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#5BA4D9]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#5BA4D9]" />
                      )}
                    </div>
                  </div>
                  <div
                    className="overflow-hidden transition-all duration-300 ease-in-out"
                    style={{ maxHeight: isOpen ? "300px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="pt-3 mt-3 border-t border-border">
                      <p className="text-[13px] text-muted-foreground leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="bg-white rounded-xl p-4 mt-5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#5BA4D9]" />
                <span className="text-[13px] text-foreground">Still have questions? We're here to help!</span>
              </div>
              <Button className="rounded-full bg-[#5BA4D9] hover:bg-[#4A93C8] text-white font-bold text-[13px] px-5 py-2">
                Contact Us
              </Button>
            </div>

            <div className="mt-6 text-center">
              <Button onClick={() => { window.scrollTo(0, 0); window.location.href = '/shop'; }} className="cta-btn bg-[#5BA4D9] hover:bg-[#4A93C8] text-white font-bold text-lg px-12 py-6 rounded-full shadow-[0_8px_24px_rgba(91,164,217,0.4)] transition-all duration-300 animate-[pulse-cta_3s_ease-in-out_infinite]">
                Order My Bebelle Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
