import { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const testimonials = [
  {
    quote: "This is a lifesaver! I can finally eat my breakfast while my baby feeds himself. The quality is amazing and very easy to clean.",
    photo: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/295111157_10158190887101324_9150188131926326887_n.webp",
    name: "Maria C.",
    details: "Mom of 6-month-old • New York, NY",
  },
  {
    quote: "The anti-colic feature really works. My baby used to be so gassy, but not anymore since we switched to Bebelle.",
    photo: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/356860763_10160192732201849_247548115966416222_n.webp",
    name: "Jessica T.",
    details: "Mom of twins • Austin, TX",
  },
  {
    quote: "Ordered the 3-bottle pack and it's the best investment for my sanity. Highly recommended for busy moms!",
    photo: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/533252066_10234610459455997_7537675449811374361_n.webp",
    name: "Sarah M.",
    details: "Dad of 8-month-old • Los Angeles, CA",
  },
  {
    quote: "Truly a game changer for multi-tasking parents. My little one loves it and it's so secure!",
    photo: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/601834205_10163738097162365_2784188688330205800_n.webp",
    name: "Anna L.",
    details: "Tita of 3 • Chicago, IL",
  },
  {
    quote: "I was skeptical at first, but it really makes feeding time stress-free. Great build quality too.",
    photo: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/491706592_529249310247569_2360326538220367249_n.webp",
    name: "Robert S.",
    details: "Mom of 2 • Miami, FL",
  },
  {
    quote: "Best baby product I've bought this year. It's safe, convenient, and my baby adjusted to it instantly.",
    photo: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/80867678_10218197596708824_3094487167552978944_n.webp",
    name: "Elena G.",
    details: "Verified Buyer • Seattle, WA",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);
  const isMobile = useIsMobile();

  const maxIndex = testimonials.length - 1;
  const prev = () => setCurrent((c) => Math.max(0, c - 1));
  const next = () => setCurrent((c) => Math.min(maxIndex, c + 1));

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [maxIndex]);

  const bgImage = isMobile ? 'url("https://bebelle-files.b-cdn.net/MobileView/Untitled%20design%202%20(2).webp")' : 'url("https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Section%20%236/Section%206%20-1.webp")';

  return (
    <section id="reviews" className="py-10 md:py-32 relative overflow-hidden rounded-[40px] mx-4 md:mx-8 my-4" style={{ backgroundImage: bgImage, backgroundSize: isMobile ? '100% 100%' : 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className={`flex flex-col gap-4 md:gap-8 items-center ${isMobile ? 'justify-end h-full mt-auto pt-52' : ''}`} style={{ marginLeft: isMobile ? '0' : '60%' }}>
          {/* Heading & rating */}
          <div className="text-center">
            <span className="inline-block bg-[#B8E0F7] text-foreground text-[11px] md:text-[13px] px-3 md:px-4 py-1 md:py-1.5 rounded-[16px] mb-2 md:mb-3">
              💬 Real Parents, Real Stories
            </span>
            <h2 className="text-[20px] md:text-[32px] font-bold text-foreground leading-tight">
              What Parents Are Saying
            </h2>
            <p className="text-[12px] md:text-[14px] text-muted-foreground mt-1 md:mt-2 mb-2 md:mb-4">
              Join 500+ happy Filipino families who made the switch to Bebelle
            </p>
            {/* Rating compact */}
            <div className="inline-flex items-center bg-white rounded-2xl px-3 md:px-5 py-2 md:py-3.5 shadow-sm gap-2 md:gap-3">
              <span className="text-[22px] md:text-[30px] font-bold text-foreground leading-none">4.9</span>
              <div className="w-px h-6 md:h-8 bg-border" />
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#FFD700] text-[#FFD700]" />
                  ))}
                </div>
                <p className="text-[10px] md:text-[12px] text-muted-foreground">500+ verified reviews</p>
              </div>
            </div>
          </div>

          {/* Testimonial cards - below rating on all views */}
          <div className="w-full md:w-[80%]">
            <div
              className="overflow-hidden"
              onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const diff = touchStartX.current - e.changedTouches[0].clientX;
                if (diff > 50) next();
                else if (diff < -50) prev();
              }}
            >
              <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {testimonials.map((t, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-full bg-white rounded-2xl p-4 md:p-6 shadow-md flex flex-col justify-between"
                    style={{ minHeight: isMobile ? "170px" : "220px" }}
                  >
                    <div>
                      <div className="flex gap-0.5 mb-2 md:mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3 h-3 md:w-4 md:h-4 fill-[#FFD700] text-[#FFD700]" />
                        ))}
                      </div>
                      <p className="text-[13px] md:text-[15px] text-foreground leading-relaxed italic">"{t.quote}"</p>
                    </div>
                    <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-5">
                      <img
                        src={t.photo}
                        alt={t.name}
                        className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover border-2 border-[#B8E0F7]"
                        loading="lazy"
                        width={44}
                        height={44}
                      />
                      <div>
                        <p className="font-bold text-[12px] md:text-[14px] text-foreground">{t.name}</p>
                        <p className="text-[10px] md:text-[12px] text-muted-foreground">{t.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-1.5 mt-4 md:mt-5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-6 bg-[#5BA4D9]" : "w-2 bg-white/60"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
