import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, Plus, Minus, Check, X, ShieldCheck, Menu, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import SocialProofNotifications from "@/components/SocialProofNotifications";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";

const problemArmFatigue = "https://bebelle-files.b-cdn.net/ChatGPT%20Image%20Jun%207%2C%202026%2C%2007_03_36%20PM.png";
const problemColdMeals = "https://bebelle-files.b-cdn.net/ChatGPT%20Image%20Jun%207%2C%202026%2C%2007_03_39%20PM.png";
const problemColic = "https://bebelle-files.b-cdn.net/ChatGPT%20Image%20Jun%207%2C%202026%2C%2007_07_28%20PM.png";
const problemNoHands = "https://bebelle-files.b-cdn.net/ChatGPT%20Image%20Jun%207%2C%202026%2C%2007_07_32%20PM.png";
import problemMobile1 from "@/assets/problem-mobile-1.png";
import problemMobile2 from "@/assets/problem-mobile-2.png";
import problemMobile3 from "@/assets/problem-mobile-3.png";
import problemMobile4 from "@/assets/problem-mobile-4.png";
import babyHandsfree from "@/assets/shop/baby-handsfree.jpg";
const scienceHandsfree = "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/Section%20%233/Hands%20Free%20Design%20(1).webp";
const scienceAnticolic = "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/Section%20%233/Anti-colic%20System%20(1).webp";
const scienceGravity = "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/Section%20%233/360%20Gravity%20Ball%20(1).webp";
const scienceSafe = "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/Section%20%233/Safe%20Materials%20(1).webp";
import comparisonBaby from "@/assets/shop/comparison-baby.jpg";

/* ── Gallery images ── */
const galleryImages = [
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/1%20(2).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/2%20(2).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/3%20(2).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/4%20(2).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/5%20(1).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/6%20(1).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/7%20(1).webp",
  "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/8%20(1).webp",
];

/* ── E-Book Data ── */
const ebookData = [
  { id: 1, title: "Healthy Baby Sleep Habits", image: "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/E-Books/Healthy%20Baby%20Sleep%20Habits.webp", worth: "499 USD" },
  { id: 2, title: "Independent Feeding Guide", image: "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/E-Books/Independent%20Feeding%20Guide.webp", worth: "399 USD" },
  { id: 3, title: "Reducing Baby Colic Naturally", image: "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/E-Books/Reducing%20Baby%20Colic%20Naturally.webp", worth: "450 USD" },
  { id: 4, title: "Baby Nutrition Blueprint", image: "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/E-Books/BAby%20Nutrition%20Blueprint.webp", worth: "550 USD" },
  { id: 5, title: "The Busy Parent's Hack Guide", image: "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/E-Books/The%20Busy%20Parent's%20Hack%20Guide.webp", worth: "300 USD" },
  { id: 6, title: "Baby Developmental Milestones", image: "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/E-Books/Baby%20Developement%20Milestones.webp", worth: "350 USD" },
];

/* ── Packages ── */
const packages = [
  {
    id: "starter",
    title: "Starter Pack",
    titleColor: "#5BA4D9",
    subtitle: "1 Bebelle Bottle",
    subtext: "",
    images: ["https://i.imgur.com/Quujeth.png"],
    originalPrice: "25 USD",
    salePrice: "17 USD",
    salePriceColor: "#1F2937",
    savingsText: "Save 8 USD (32% OFF)",
    savingsBg: "#E0F2FE",
    savingsColor: "#059669",
    perBottle: "17 USD per bottle",
    badges: [{ text: "🔥 Save 8 USD", bg: "#059669" }],
    cartLabel: "ADD STARTER PACK TO CART — 17 USD",
    ebooks: 0,
    sku: "1BB"
  },
  {
    id: "duo",
    title: "Duo Pack",
    titleColor: "#5BA4D9",
    subtitle: "2 Bebelle Bottles",
    subtext: "Mix & match any colors",
    images: ["https://i.imgur.com/Quujeth.png", "https://i.imgur.com/WjjzQww.png"],
    originalPrice: "49 USD",
    salePrice: "33 USD",
    salePriceColor: "#5BA4D9",
    savingsText: "Save 16 USD (32% OFF)",
    savingsBg: "#5BA4D9",
    savingsColor: "#FFFFFF",
    perBottle: "Only 16.5 USD per bottle",
    badges: [
      { text: "⭐ Best Value", bg: "#5BA4D9" },
      { text: "🔥 Save 16 USD", bg: "#059669" },
    ],
    cartLabel: "ADD DUO PACK TO CART — 33 USD",
    ebooks: 3,
    sku: "2BB"
  },
  {
    id: "family",
    title: "Family Pack",
    titleColor: "#5BA4D9",
    subtitle: "3 Bebelle Bottles",
    subtext: "Perfect for home, travel & gifts",
    images: ["https://i.imgur.com/Quujeth.png", "https://i.imgur.com/WjjzQww.png", "https://i.imgur.com/Quujeth.png"],
    originalPrice: "74 USD",
    salePrice: "49 USD",
    salePriceColor: "#1F2937",
    savingsText: "Save 25 USD (33% OFF)",
    savingsBg: "#FEE2E2",
    savingsColor: "#5BA4D9",
    perBottle: "Only 16.3 USD per bottle",
    badges: [
      { text: "🎁 Most Popular", bg: "#5BA4D9" },
      { text: "🔥 Save 25 USD", bg: "#059669" },
    ],
    cartLabel: "ADD FAMILY PACK TO CART — 49 USD",
    ebooks: 6,
    sku: "3BB"
  },
];

/* ── FAQ ── */
const faqs = [
  { q: "How long before I see results?", a: "Most parents notice a difference in feeding convenience and baby's comfort from the very first use of the Bebelle bottle." },
  { q: "Is Bebelle safe to use daily?", a: "Yes, it is made from 100% BPA-free, food-grade silicone and is designed for daily use through all feeding stages." },
  { q: "Will my baby notice the difference?", a: "Absolutely! The ergonomic design and hands-free system make feeding more relaxed and natural for babies." },
  { q: "What if it doesn't work for me?", a: "We offer a 7-day money-back guarantee. If you or your baby aren't completely happy, we'll refund every USD." },
  { q: "How discreet is the shipping?", a: "We ship in plain, secure packaging to ensure your order arrives safely and privately." },
  { q: "Can I use Bebelle with other feeding systems?", a: "Bebelle is a complete standalone system designed for maximum compatibility with standard breast milk and formula." },
  { q: "When is the best time of day to use it?", a: "Bebelle is perfect for any feeding time, especially during busy periods when you need your hands free or when the baby is most active." },
  { q: "How long will one bottle last?", a: "With proper care and cleaning, a Bebelle bottle is built to last through your baby's entire feeding journey." },
];

/* ── Testimonials ── */
const testimonials = [
  { quote: "This is a lifesaver! I can finally eat my breakfast while my baby feeds himself. The quality is amazing and very easy to clean.", initials: "MC", color: "#87CEEB", name: "Maria C.", details: "New York, NY", verified: true, avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/295111157_10158190887101324_9150188131926326887_n.webp" },
  { quote: "The anti-colic feature really works. My baby used to be so gassy, but not anymore since we switched to Bebelle.", initials: "JT", color: "#B8E0F7", name: "Jessica T.", details: "Austin, TX", verified: true, avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/356860763_10160192732201849_247548115966416222_n.webp" },
  { quote: "Ordered the 3-bottle pack and it's the best investment for my sanity. Highly recommended for busy moms!", initials: "SM", color: "#5BA4D9", name: "Sarah M.", details: "Los Angeles, CA", verified: true, avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/533252066_10234610459455997_7537675449811374361_n.webp" },
  { quote: "Truly a game changer for multi-tasking parents. My little one loves it and it's so secure!", initials: "AL", color: "#A8D8F0", name: "Anna L.", details: "Chicago, IL", verified: true, avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/601834205_10163738097162365_2784188688330205800_n.webp" },
  { quote: "I was skeptical at first, but it really makes feeding time stress-free. Great build quality too.", initials: "RS", color: "#7EC8E3", name: "Robert S.", details: "Miami, FL", verified: true, avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/491706592_529249310247569_2360326538220367249_n.webp" },
];

/* ── Science tabs ── */
const scienceTabs = [
  {
    label: "Hands-Free Design",
    image: scienceHandsfree,
    title: "Revolutionary Hands-Free Feeding",
    desc: "Bebelle's unique design allows your baby to feed independently at any angle. The ergonomic shape is easy for tiny hands to grip, giving parents freedom during feeding time.",
    subTitle: "How Bebelle Helps",
    subDesc: "The bottle's balanced weight distribution and flexible straw system means your baby can drink comfortably whether lying down, sitting, or moving around. No more holding the bottle at awkward angles!",
  },
  {
    label: "Anti-Colic System",
    image: scienceAnticolic,
    title: "Advanced Anti-Colic Venting",
    desc: "Our dual-vent system prevents air from mixing with milk, significantly reducing colic, gas, and spit-up. Clinical-grade air channeling keeps your baby comfortable.",
    subTitle: "How Bebelle Helps",
    subDesc: "Air enters through the base vent and exits through the top, creating a vacuum-free feeding experience. This means less swallowed air and a happier, more comfortable baby after every feeding.",
  },
  {
    label: "360° Gravity Ball",
    image: scienceGravity,
    title: "360° Weighted Gravity Ball",
    desc: "The stainless steel gravity ball at the end of the flexible straw follows the liquid to the lowest point, ensuring your baby gets every last drop regardless of the bottle's angle.",
    subTitle: "How Bebelle Helps",
    subDesc: "Whether your baby is lying on their back, sitting up, or even tilting the bottle sideways — the gravity ball ensures continuous, uninterrupted flow. No more repositioning!",
  },
  {
    label: "Safe Materials",
    image: scienceSafe,
    title: "100% BPA-Free & Food-Grade",
    desc: "Every Bebelle component is made from premium food-grade silicone and PPSU plastic that's free from BPA, BPS, phthalates, and other harmful chemicals.",
    subTitle: "How Bebelle Helps",
    subDesc: "Our materials exceed international safety standards including FDA, LFGB, and SGS certifications. You can sterilize Bebelle with confidence — it's built to keep your baby safe.",
  },
];

const brandTabs = [
  {
    id: "real-couples",
    label: "Real Parents",
    title: "Real parents, real stories.",
    subtitle: "Hear what real Filipino parents are saying about Bebelle.",
    type: "video-grid",
    items: [
      { name: "Aliyah", detail: "23 years old", image: "https://prrjyforguhxcouhkzqs.supabase.co/storage/v1/object/public/Video%20-%20Image%20Hosting/462304660_10232906753042043_4213095900130379163_n.jpg", video: "https://i.imgur.com/xKvN6WU.mp4" },
      { name: "John & Maureen", detail: "3 years Together", image: "https://prrjyforguhxcouhkzqs.supabaseate.co/storage/v1/object/public/Video%20-%20Image%20Hosting/490220423_4521559561403998_5038172264857155928_n.jpg", video: "https://i.imgur.com/n1Kqp3Z.mp4" },
      { name: "Roy & Angela", detail: "6 years Together", image: "https://prrjyforguhxcouhkzqs.supabase.co/storage/v1/object/public/Video%20-%20Image%20Hosting/628046045_2192212838217579_3198828815448898068_n.jpg", video: "https://i.imgur.com/1Lwr1Qu.mp4" },
      { name: "Angelo", detail: "33 years old", image: "https://prrjyforguhxcouhkzqs.supabase.co/storage/v1/object/public/Video%20-%20Image%20Hosting/569098131_4044764352336776_4285860324043709645_n.jpg", video: "https://i.imgur.com/gR6s4pk.mp4" }
    ]
  },
  {
    id: "clinical-results",
    label: "Safety",
    title: "Tested for your baby's safety.",
    subtitle: "Built with premium materials and quality standards.",
    type: "stats",
    stats: [
      { label: "BPA-Free Materials", value: 100 },
      { label: "Anti-Colic Success", value: 95 },
      { label: "Heat Resistance", value: 98 },
      { label: "Safe Handling", value: 92 }
    ],
    footerInfo: [
      { label: "MATERIAL GRADE", detail: "Food-Grade PPSU", icon: "💎" },
      { label: "EASY CARE", detail: "Sterilizable", icon: "⚡" }
    ],
    guarantee: {
      days: 30,
      text: "Don't feel the quality? We refund every USD. No questions asked."
    }
  },
  {
    id: "how-to-use",
    label: "How To Use",
    title: "Simple feeding routine.",
    subtitle: "Follow these steps for a happy, hands-free feeding experience.",
    type: "routine",
    sections: [
      {
        header: "PREPARATION",
        items: [
          { label: "Fill & Assemble", detail: "Standard bottle prep", value: "Step 1", subValue: "Quick Setup" },
          { label: "Secure Straw", detail: "Attach gravity ball", value: "Step 2", subValue: "Anti-Colic" }
        ]
      },
      {
        header: "FEEDING TIME",
        items: [
          { label: "Position Baby", detail: "Any angle works", value: "Hands-Free", subValue: "Relaxing" },
          { label: "Easy Cleanup", detail: "Sterilizer safe", value: "Finished", subValue: "Easy Care" }
        ]
      }
    ],
    tips: [
      "Ensure all parts are clean before assembly.",
      "Weighted straw follows the liquid automatically.",
      "Dishwasher and UV sterilizer safe."
    ],
    guarantee: {
      days: 30,
      text: "Need help? Our support team is here for you 24/7."
    }
  },
  {
    id: "why-bebelle",
    label: "Why Bebelle",
    title: "Take your parenting to the next level.",
    type: "list",
    points: [
      "Boosts independence and motor skills",
      "Restores confidence and freedom to parents",
      "Deepens the bond without the arm fatigue",
      "Improves mood and reduces feeding stress",
      "Promotes better, more comfortable digestion",
      "100% natural feeding experience, no fuss"
    ],
    guarantee: {
      days: 7,
      text: "We offer a money-back guarantee if it doesn't work for your baby."
    }
  },
  {
    id: "faq",
    label: "FAQ",
    title: "Common questions answered.",
    type: "faq-list",
    faqs: [
      { q: "Is it safe?", a: "Yes, 100% food-grade and BPA-free" },
      { q: "What age?", a: "Recommended for 3+ months" },
      { q: "Is it easy to clean?", a: "Yes, fully disassemblable" },
      { q: "Does it leak?", a: "Anti-leak design prevents spills" },
      { q: "Shipping time?", a: "3-5 business days nationwide" }
    ],
    guarantee: {
      days: 7,
      text: "Still have questions? Our team is ready to help you out."
    }
  }
];

/* ── Problem cards ── */
const problems = [
  { image: problemArmFatigue, mobileImage: problemArmFatigue, title: "Arm Fatigue", desc: "Holding a bottle for 20+ minutes per feeding causes constant arm and back pain." },
  { image: problemColdMeals, mobileImage: problemColdMeals, title: "Cold Meals", desc: "Your food gets cold because both hands are occupied during baby's feeding time." },
  { image: problemColic, mobileImage: problemColic, title: "Colic Problems", desc: "Traditional bottles let air mix with milk, causing painful gas and colic in babies." },
  { image: problemNoHands, mobileImage: problemNoHands, title: "Zero Hands Free", desc: "You can't do anything else — no eating, working, or resting while feeding." },
];

/* ── Problem Slider Component ── */
const ProblemSlider = ({ problems }: { problems: { image: string; mobileImage: string; title: string; desc: string }[] }) => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % problems.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [problems.length]);

  return (
    <>
    {/* Moving logos marquee */}
    <div className="py-5 bg-[#E8F4FC] overflow-hidden">
      <div className="flex w-max" style={{ animation: 'marquee 20s linear infinite' }}>
        {[...Array(4)].flatMap((_, setIndex) =>
          [
            "https://i.imgur.com/rFl9sSb.png",
            "https://i.imgur.com/4SV8VhX.png",
            "https://i.imgur.com/ea7KZCc.png",
            "https://i.imgur.com/ujv676D.png",
            "https://i.imgur.com/xgNrrKw.png",
          ].map((src, i) => (
            <img
              key={`${setIndex}-${i}`}
              src={src}
              alt="Partner logo"
              className="h-8 mx-8 object-contain opacity-70"
            />
          ))
        )}
      </div>
    </div>

    <section style={{ backgroundColor: "#F8FAFC", padding: "60px 0" }}>
      <div className="max-w-[1100px] mx-auto px-6">
        <h2 className="text-[28px] font-bold text-[#1F2937] text-center mb-10">The Real Reason Why Parents Are Exhausted</h2>
        <div className="relative overflow-hidden rounded-2xl bg-white mx-auto max-w-[900px]" style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
          {problems.map((p, i) => (
            <div
              key={i}
              className="w-full transition-all duration-700 ease-in-out"
              style={{
                position: i === current ? "relative" : "absolute",
                top: 0,
                left: 0,
                opacity: i === current ? 1 : 0,
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              <img src={isMobile ? p.mobileImage : p.image} alt={p.title} className="w-full object-contain" loading="lazy" />
            </div>
          ))}
          {/* Mobile arrows */}
          {isMobile && (
            <>
              <button
                onClick={() => setCurrent(prev => (prev - 1 + problems.length) % problems.length)}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              >
                <ChevronLeft className="w-5 h-5 text-[#1F2937]" />
              </button>
              <button
                onClick={() => setCurrent(prev => (prev + 1) % problems.length)}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md"
              >
                <ChevronRight className="w-5 h-5 text-[#1F2937]" />
              </button>
            </>
          )}
          {/* Dots */}
          <div className="flex justify-center gap-2 py-4">
            {problems.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                style={{ backgroundColor: i === current ? "#5BA4D9" : "#D1D5DB" }}
              />
            ))}
          </div>
        </div>
        <p className="text-center text-[15px] text-[#6B7280] italic mt-8">
          "You don't have to worry anymore — because with Bebelle, everything changes."
        </p>
      </div>
    </section>
    </>
  );
};


const comparison = [
  { feature: "Hands-Free Design", bebelle: true, others: false, othersText: "Manual Holding" },
  { feature: "Anti-Colic System", bebelle: true, others: false, othersText: "Air Intake" },
  { feature: "360° Any Angle", bebelle: true, others: false, othersText: "Fixed Position" },
  { feature: "BPA-Free", bebelle: true, others: false, othersText: "Unknown Materials" },
  { feature: "Easy to Clean", bebelle: true, others: false, othersText: "Hard to Disassemble" },
  { feature: "Safe for 3m+", bebelle: true, others: false, othersText: "Limited Age Range" },
];

const Shop = () => {
  const [activeImage, setActiveImage] = useState(0);
  const [selectedPack, setSelectedPack] = useState(1);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const [scienceTab, setScienceTab] = useState(0);
  const [activeBrandTab, setActiveBrandTab] = useState(0); // Real Parents as default
  const [scienceAutoPlay, setScienceAutoPlay] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [shopIsMobile, setShopIsMobile] = useState(false);
  const [navOpacity, setNavOpacity] = useState(1);
  const touchRef = useRef(0);
  const thumbRowRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => setShopIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile: fade out nav on scroll
  useEffect(() => {
    if (!shopIsMobile) { setNavOpacity(1); return; }
    const handleScroll = () => {
      const y = window.scrollY;
      setNavOpacity(Math.max(0, 1 - y / 200));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shopIsMobile]);

  /* ── Auto-scroll mobile thumbnails to keep active visible ── */
  useEffect(() => {
    if (thumbRowRef.current) {
      const container = thumbRowRef.current;
      const activeThumb = container.children[activeImage] as HTMLElement;
      if (activeThumb) {
        const scrollLeft = activeThumb.offsetLeft - container.offsetWidth / 2 + activeThumb.offsetWidth / 2;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      }
    }
  }, [activeImage]);

  /* ── Science tab auto-cycle ── */
  useEffect(() => {
    if (!scienceAutoPlay) return;
    const interval = setInterval(() => {
      setScienceTab(prev => (prev + 1) % scienceTabs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [scienceAutoPlay]);


  const SHOP_START_TIME = 7 * 60 + 30; // 7 minutes 30 seconds
  const SHOP_RESET_AT = 10; // reset at 10 seconds

  const [shopCountdown, setShopCountdown] = useState(() => {
    const saved = localStorage.getItem('bebelle-countdown-start');
    if (saved) {
      const elapsed = Math.floor((Date.now() - Number(saved)) / 1000);
      const remaining = SHOP_START_TIME - elapsed;
      if (remaining > SHOP_RESET_AT) return remaining;
    }
    localStorage.setItem('bebelle-countdown-start', String(Date.now()));
    return SHOP_START_TIME;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShopCountdown(prev => {
        const next = prev - 1;
        if (next <= SHOP_RESET_AT) {
          localStorage.setItem('bebelle-countdown-start', String(Date.now()));
          return SHOP_START_TIME;
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

  /* ── Left column sticky logic: stick only after bottom of left is visible ── */
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftStickyStyle, setLeftStickyStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleScroll = () => {
      if (!leftColRef.current || window.innerWidth < 1024) {
        setLeftStickyStyle({});
        return;
      }
      const leftH = leftColRef.current.offsetHeight;
      const viewportH = window.innerHeight;
      const navH = 70;
      const sectionPadTop = 40;
      // The top value needed so that when sticky, the bottom of left aligns with viewport bottom
      const stickyTop = viewportH - leftH - sectionPadTop;
      // Only stick if left column is taller than viewport minus nav
      if (leftH > viewportH - navH - sectionPadTop) {
        setLeftStickyStyle({ position: 'sticky' as const, top: `${stickyTop}px`, alignSelf: 'flex-start' });
      } else {
        setLeftStickyStyle({ position: 'sticky' as const, top: `${navH + 20}px`, alignSelf: 'flex-start' });
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => { window.removeEventListener('scroll', handleScroll); window.removeEventListener('resize', handleScroll); };
  }, []);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setCardsToShow(1);
      else if (window.innerWidth < 1024) setCardsToShow(2);
      else setCardsToShow(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  /* Auto-slide gallery */
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const maxTestimonial = testimonials.length - cardsToShow;

  return (
    <div className="min-h-screen" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* ═══ SECTION 1: NAVIGATION BAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] bg-white transition-opacity duration-300" style={{ height: "70px", boxShadow: "0 2px 10px rgba(0,0,0,0.05)", opacity: shopIsMobile ? navOpacity : 1, pointerEvents: shopIsMobile && navOpacity === 0 ? "none" : "auto" }}>
        <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
          <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-[45px] w-auto cursor-pointer" onClick={() => navigate("/")} />
          <div className="hidden md:flex items-center gap-8">
            {[
              { label: "Home", action: () => { navigate("/"); window.scrollTo(0, 0); } },
              { label: "Benefits", action: () => document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" }) },
              { label: "Story", action: () => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }) },
              { label: "FAQ", action: () => document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }) },
            ].map((link) => (
              <button key={link.label} onClick={link.action} className="text-[15px] font-medium text-[#1F2937] hover:text-[#5BA4D9] transition-colors">{link.label}</button>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-slate-50" onClick={() => setMobileNavOpen(true)}>
              <Menu className="w-6 h-6 text-[#1F2937]" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu (Matched with Home page style) */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-[2000] md:hidden bg-white animate-in fade-in duration-300 overflow-hidden" style={{ fontFamily: "'Nunito', sans-serif" }}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <img src="https://i.imgur.com/ndMOEWD.png" alt="Bebelle" className="h-12 w-auto object-contain" />
              <button 
                onClick={() => setMobileNavOpen(false)}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-foreground"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
              {[
                { label: "Home", action: () => { navigate("/"); window.scrollTo(0, 0); } },
                { label: "Benefits", action: () => { document.getElementById("benefits")?.scrollIntoView({ behavior: "smooth" }); } },
                { label: "Story", action: () => { document.getElementById("story")?.scrollIntoView({ behavior: "smooth" }); } },
                { label: "FAQ", action: () => { document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" }); } },
              ].map((link, index) => (
                <button
                  key={link.label}
                  onClick={() => { 
                    link.action();
                    setMobileNavOpen(false); 
                  }}
                  className="text-center text-[32px] font-bold tracking-tight text-[#1F2937] hover:scale-110 transition-transform active:scale-95 animate-in slide-in-from-bottom-4 duration-500 fill-mode-both"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => { 
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  setMobileNavOpen(false); 
                }}
                className="mt-8 px-10 py-5 rounded-full text-white font-black text-xl shadow-[0_10px_25px_rgba(91,164,217,0.3)] hover:scale-105 transition-all active:scale-95 animate-in zoom-in-75 duration-500 fill-mode-both"
                style={{ 
                  backgroundColor: "#5BA4D9",
                  animationDelay: `400ms`
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

      {/* ═══ SECTION 2: HERO PRODUCT ═══ */}
      <section style={{ backgroundColor: "#F0F9FF", marginTop: "70px", padding: "40px 0 60px" }}>
        <div className="max-w-[1200px] mx-auto px-6 md:px-[60px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-[60px] items-start">
            {/* LEFT: Image Gallery */}
            <div ref={leftColRef} className="w-full lg:w-1/2 lg:self-start" style={leftStickyStyle}>
              {/* Main image */}
              <div className="relative aspect-square bg-white rounded-[20px] md:rounded-[20px] border-[3px] border-[#E0F2FE] overflow-hidden" style={{ boxShadow: "0 10px 40px rgba(135,206,235,0.15)" }}>
                <button onClick={() => setActiveImage((p) => (p - 1 + galleryImages.length) % galleryImages.length)} className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 md:bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F0F9FF] transition-colors">
                  <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[#6B7280]" />
                </button>
                <button onClick={() => setActiveImage((p) => (p + 1) % galleryImages.length)} className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/80 md:bg-white border border-[#E5E7EB] flex items-center justify-center hover:bg-[#F0F9FF] transition-colors">
                  <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[#6B7280]" />
                </button>
                <img src={galleryImages[activeImage]} alt="Bebelle product" className="w-full h-full object-cover transition-opacity duration-500" />
              </div>

              {/* Thumbnails - mobile: horizontal scroll row of 5 visible | desktop: 2-col grid */}
              <div className="hidden md:grid grid-cols-2 gap-3 mt-4">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="aspect-square rounded-xl border-2 overflow-hidden transition-all duration-200 cursor-pointer"
                    style={{
                      borderColor: activeImage === i ? "#5BA4D9" : "#E0F2FE",
                      transform: activeImage === i ? "scale(1.03)" : "scale(1)",
                      boxShadow: activeImage === i ? "0 0 12px rgba(91,164,217,0.3)" : "none",
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
              <div ref={thumbRowRef} className="flex md:hidden gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className="flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all duration-200"
                    style={{
                      width: "calc((100% - 8px * 4) / 5)",
                      aspectRatio: "1",
                      borderColor: activeImage === i ? "#5BA4D9" : "#E0F2FE",
                      opacity: activeImage === i ? 1 : 0.6,
                      transform: activeImage === i ? "scale(1.05)" : "scale(1)",
                    }}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="w-full lg:w-1/2">
              <div className="mb-4">
                <h1 className="text-[32px] md:text-[40px] font-extrabold text-black leading-[1.1] tracking-tight">
                  Bebelle <span className="text-[#5BA4D9]">Hands-Free</span> Feeding Bottle
                </h1>
              </div>
              <div className="flex items-center gap-[6px] mt-2 mb-4">
                <span className="text-sm font-[500] text-[#1F2937]">4.9</span>
                <div className="flex gap-[6px]">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-[17px] h-[17px] bg-[#00B67A] rounded-[2px] flex items-center justify-center">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  ))}
                </div>
                <span className="text-sm font-[500] text-[#00B67A]">Excellent</span>
                <span className="text-sm text-[#6B7280]">· 500+ reviews</span>
              </div>
              <p className="text-[15px] text-[#6B7280] leading-[1.7] mb-5">
                <span className="hidden md:inline">A product that will help tired parents find relief from endless bottle-holding, sore arms, and constant fatigue. Don't just survive feedings — enjoy them! Bebelle gives you your hands back while your baby feeds comfortably at any angle.</span>
                <span className="md:hidden">Say goodbye to sore arms and endless bottle-holding. Bebelle gives you your hands back while baby feeds comfortably at any angle.</span>
              </p>
              {/* Urgency Timer */}
              <div className="flex items-center justify-center bg-[#FFF7ED] border-[2px] border-[#FFB74D] rounded-[18px] px-4 py-5 mb-6 gap-4">
                <span className="text-[15px] md:text-[18px] font-black text-[#EA580C] tracking-wide">
                  SALE ENDS IN:
                </span>
                <span className="text-[24px] md:text-[30px] font-black text-[#EA580C] tracking-[2px] tabular-nums leading-none">
                  {formatTime(shopCountdown)}
                </span>
              </div>

              {/* ── GET MORE & SAVE MORE ── */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px bg-[#E0F2FE]" />
                <p className="text-[13px] font-bold text-[#1F2937] tracking-wide uppercase">Get More & Save More</p>
                <div className="flex-1 h-px bg-[#E0F2FE]" />
              </div>

              <div className="flex flex-col gap-3">
                {packages.map((pkg, i) => (
                  <div key={pkg.id} className="flex flex-col gap-2">
                    <button
                      onClick={() => setSelectedPack(i)}
                      className="relative w-full bg-white rounded-xl px-4 py-4 border-2 transition-all duration-200 cursor-pointer text-left"
                      style={{
                        borderColor: selectedPack === i ? "#5BA4D9" : "#E0F2FE",
                        backgroundColor: selectedPack === i ? "#F0F9FF" : "white",
                        boxShadow: selectedPack === i ? "0 4px 16px rgba(91,164,217,0.15)" : "none",
                      }}
                    >
                      {/* Most Popular badge */}
                      {i === 1 && (
                        <span className="absolute -top-3 -right-2 bg-[#5BA4D9] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                      )}
                      {/* Top row: radio + label + save badge + price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                            style={{ borderColor: selectedPack === i ? "#5BA4D9" : "#D1D5DB" }}>
                            {selectedPack === i && <div className="w-2.5 h-2.5 rounded-full bg-[#5BA4D9]" />}
                          </div>
                          <span className="text-[15px] font-extrabold text-[#1F2937] uppercase tracking-wide">
                            {i === 0 ? "Get One" : i === 1 ? "Get Two" : "Get Three"}
                          </span>
                          <span className="hidden md:inline text-[11px] font-bold text-white px-2.5 py-0.5 rounded" style={{ backgroundColor: "#5BA4D9" }}>
                            SAVE 33%
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[16px] text-[#9CA3AF] line-through">{pkg.originalPrice}</span>
                          <span className="text-[24px] font-extrabold text-[#1F2937]">{pkg.salePrice}</span>
                        </div>
                      </div>
                    </button>

                    {/* Upgrade Hint for Get One */}
                    {i === 0 && selectedPack === 0 && (
                      <div className="bg-[#FFF9E6] border border-dashed border-[#FFD54F] rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[14px] font-bold text-[#856404] mb-1">
                          Unlock 3 more FREEBIES — worth 2,500 USD!
                        </p>
                        <p className="text-[12px] text-[#856404]/80 mb-3">
                          Only 999 USD more. Upgrade to Duo Pack and unlock everything.
                        </p>
                        <button 
                          onClick={() => setSelectedPack(1)}
                          className="w-full bg-[#5BA4D9] text-white text-[13px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-[#4A93C8] transition-colors flex items-center justify-center gap-2"
                        >
                          Upgrade to Duo Pack →
                        </button>
                      </div>
                    )}

                    {/* Upgrade Hint for Get Two */}
                    {i === 1 && selectedPack === 1 && (
                      <div className="bg-[#FFF9E6] border border-dashed border-[#FFD54F] rounded-xl p-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[14px] font-bold text-[#856404] mb-1">
                          Unlock 3 more FREEBIES — worth 2,500 USD!
                        </p>
                        <p className="text-[12px] text-[#856404]/80 mb-3">
                          Only 999 USD more. Upgrade to Family Pack and unlock everything.
                        </p>
                        <button 
                          onClick={() => setSelectedPack(2)}
                          className="w-full bg-[#5BA4D9] text-white text-[13px] font-bold py-2.5 rounded-lg shadow-sm hover:bg-[#4A93C8] transition-colors flex items-center justify-center gap-2"
                        >
                          Upgrade to Family Pack →
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* ── FREEBIES UNLOCK SECTION ── */}
              <div className="mt-8 bg-white border border-gray-100 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(91,164,217,0.12)] relative overflow-hidden">
                {/* Subtle background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#5BA4D9] opacity-[0.03] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#5BA4D9]/10 flex items-center justify-center text-lg">🎁</div>
                      <span className="text-[11px] font-black text-[#5BA4D9] uppercase tracking-[0.2em]">Limited Offer</span>
                    </div>
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-[#1F2937] leading-tight">
                      You're getting these <span className="text-[#5BA4D9] italic font-serif">Free</span>
                    </h3>
                  </div>
                  <div className="bg-[#5BA4D9]/5 px-4 py-2 rounded-2xl border border-[#5BA4D9]/10">
                    <p className="text-[14px] font-black text-[#5BA4D9]">
                      {packages[selectedPack].ebooks} of 6 <span className="text-[#94A3B8] font-medium mx-1">|</span> Worth 2,500 USD
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 sm:gap-6 relative z-10">
                  {ebookData.map((ebook, idx) => {
                    const isLocked = idx >= packages[selectedPack].ebooks;
                    return (
                      <div 
                        key={ebook.id} 
                        className="group flex flex-col items-center cursor-pointer"
                        onClick={() => {
                          if (idx >= 3 && selectedPack < 2) {
                            setSelectedPack(2);
                          } else if (idx < 3 && selectedPack === 0) {
                            setSelectedPack(1);
                          }
                        }}
                      >
                        <div className={`relative aspect-[3/4] w-full rounded-[20px] overflow-hidden border-2 transition-all duration-500 ${
                          isLocked 
                            ? "border-gray-50 bg-gray-50 group-hover:border-[#5BA4D9]/30 group-hover:bg-white" 
                            : "border-white bg-white shadow-[0_10px_30px_rgba(91,164,217,0.15)] scale-100 group-hover:scale-[1.03] group-hover:shadow-[0_15px_35px_rgba(91,164,217,0.2)]"
                        }`}>
                          <img 
                            src={ebook.image} 
                            alt={ebook.title} 
                            className={`w-full h-full object-cover transition-all duration-700 ${isLocked ? "opacity-20 grayscale" : "opacity-100"}`}
                          />
                          {isLocked && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <div className="bg-white/90 w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-transform group-hover:scale-110">
                                <Plus className="w-5 h-5 text-[#5BA4D9]" strokeWidth={3} />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="mt-4 text-center">
                          <p className={`text-[12px] leading-[1.3] font-bold transition-colors duration-300 ${isLocked ? "text-gray-300 group-hover:text-gray-400" : "text-[#1F2937]"}`}>{ebook.title}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Upgrade hint inside the box */}
                {selectedPack < 2 && (
                  <div className="mt-10 p-5 rounded-3xl bg-[#FFF9E6] border border-[#FFD54F]/30 flex flex-row items-center justify-between gap-4 relative z-10 group cursor-pointer"
                       onClick={() => setSelectedPack(selectedPack + 1)}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-sm transition-transform group-hover:scale-110">✨</div>
                      <div>
                        <p className="text-[15px] font-bold text-[#1F2937]">Unlock {selectedPack === 0 ? "3 more" : "all"} Bonuses</p>
                        <p className="text-[12px] text-gray-500">Upgrade to <span className="font-bold text-[#5BA4D9]">{selectedPack === 0 ? "Duo Pack" : "Family Pack"}</span></p>
                      </div>
                    </div>
                    <div className="bg-[#5BA4D9] text-white px-5 py-3 rounded-full text-[13px] font-bold shadow-md shadow-[#5BA4D9]/20 group-hover:bg-[#4A93C8] transition-all flex items-center gap-2 shrink-0">
                      Upgrade Now
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                )}
                
                {selectedPack === 2 && (
                  <div className="mt-10 p-5 rounded-2xl bg-[#ECFDF5] border border-[#10B981]/20 flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">💎</div>
                    <div>
                      <p className="text-[15px] font-bold text-[#065F46]">Elite VIP Status Unlocked</p>
                      <p className="text-[12px] text-[#059669]">You are receiving all 6 exclusive bonuses with your order!</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Now CTA */}
              <button
                onClick={() => { navigate(`/checkout?pack=${selectedPack}`); window.scrollTo(0, 0); }}
                className="cta-btn animate-pulse-cta w-full mt-6 text-white font-bold text-[18px] py-5 rounded-[30px] uppercase tracking-wider relative overflow-hidden"
                style={{ backgroundColor: "#5BA4D9", boxShadow: "0 8px 25px rgba(91,164,217,0.5)" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-btn-shine" />
                <span className="relative z-10">🛒 Order Now</span>
              </button>

              {/* Trust Badges under Checkout */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {[
                  { icon: "💳", label: "COD Available", hideMobile: false },
                  { icon: "🔄", label: "7-Day Money-Back", hideMobile: false },
                  { icon: "🛡️", label: "Quality Guaranteed", hideMobile: true },
                ].map((b) => (
                  <span 
                    key={b.label} 
                    className={`inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5BA4D9] border border-[#5BA4D9]/20 rounded-full px-4 py-2 bg-[#5BA4D9]/5 ${b.hideMobile ? 'hidden sm:inline-flex' : 'inline-flex'}`}
                  >
                    {b.icon} {b.label}
                  </span>
                ))}
              </div>
              {/* Removed stock availability message per user request */}


              {/* ── Brand Details Tabs ── */}
              <div className="mt-20">
                <div className="mb-10 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#5BA4D9]" />
                    <span className="text-[11px] font-black text-[#5BA4D9] uppercase tracking-[0.2em]">Discovery Center</span>
                  </div>
                  <h2 className="text-[32px] font-bold text-[#1F2937]">Tell me <span className="text-[#5BA4D9] italic font-serif">About...</span></h2>
                </div>
                
                <div className="flex overflow-x-auto gap-0.5 scrollbar-hide no-scrollbar relative z-10 pb-1">
                  {brandTabs.map((tab, idx) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveBrandTab(idx)}
                      className={`flex-shrink-0 px-2.5 sm:px-4 py-2.5 rounded-t-xl text-[11px] sm:text-[13px] font-bold transition-all duration-300 relative border-t border-l border-r ${
                        activeBrandTab === idx 
                          ? "bg-white text-[#5BA4D9] shadow-[0_-4px_12px_rgba(0,0,0,0.05)] border-gray-100 z-20" 
                          : "bg-[#F3F4F6] text-[#9CA3AF] border-transparent hover:bg-gray-200 z-10 translate-y-1"
                      }`}
                    >
                      {tab.label}
                      {activeBrandTab === idx && (
                        <div className="absolute -bottom-[2px] left-0 right-0 h-[4px] bg-white z-30" />
                      )}
                    </button>
                  ))}
                </div>
                
                <div className="bg-white rounded-b-2xl rounded-tr-2xl p-6 shadow-xl border border-gray-100 min-h-[400px] relative z-0 -mt-[1px]">
                      {brandTabs[activeBrandTab].type === "faq-list" ? (
                        <div className="animate-in fade-in duration-500">
                          <h3 className="text-[20px] font-bold text-[#1F2937] mb-6 leading-tight">
                            Common <span className="text-[#5BA4D9] italic">questions answered.</span>
                          </h3>
                          
                          <div className="space-y-4 mb-8">
                            {brandTabs[activeBrandTab].faqs?.map((faq, i) => (
                              <div key={i} className="flex items-start gap-3 group">
                                <div className="w-5 h-5 rounded-full bg-[#5BA4D9] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-[#5BA4D9]/20">
                                  <Check className="w-3 h-3 text-white" />
                                </div>
                                <div className="space-y-1">
                                  <p className="text-[14px] text-[#1F2937] font-bold leading-tight">
                                    {faq.q}
                                  </p>
                                  <p className="text-[13px] text-[#6B7280] leading-tight group-hover:text-[#4B5563] transition-colors">
                                    {faq.a}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Upgraded Double-Barrel Guarantee */}
                          {brandTabs[activeBrandTab].guarantee && (
                            <div className="mt-8 relative">
                              <div className="bg-white border-2 border-[#10B981]/20 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] relative z-10 overflow-hidden">
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl"></div>
                                <div className="flex flex-col items-center text-center space-y-4">
                                  <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center relative">
                                    <ShieldCheck className="w-8 h-8 text-[#10B981]" strokeWidth={2.5} />
                                    <div className="absolute inset-0 rounded-full border-2 border-[#10B981]/20 animate-ping opacity-20"></div>
                                  </div>
                                  <div className="space-y-1">
                                    <span className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em]">Risk-Free Trial</span>
                                    <h4 className="text-[20px] font-bold text-[#1F2937]">The {brandTabs[activeBrandTab].guarantee.days}-Day <span className="text-[#10B981] italic font-serif">Promise</span></h4>
                                  </div>
                                  <p className="text-[13px] text-[#4B5563] leading-relaxed max-w-[280px]">
                                    {brandTabs[activeBrandTab].guarantee.text} <span className="font-bold text-[#1F2937]">No questions asked.</span>
                                  </p>
                                </div>
                              </div>
                              <div className="absolute -bottom-2 left-6 right-6 h-10 bg-[#10B981]/10 rounded-[32px] -z-10 blur-sm"></div>
                            </div>
                          )}
                        </div>
                      ) : brandTabs[activeBrandTab].type === "video-grid" ? (
                    <div className="animate-in fade-in duration-500">
                      <h3 className="text-[24px] font-black text-[#1F2937] mb-1">
                        {brandTabs[activeBrandTab].title.split(",").map((part, i) => (
                          <span key={i} className={i === 1 ? "text-[#5BA4D9] italic" : ""}>
                            {part}{i === 0 && ","}
                          </span>
                        ))}
                      </h3>
                      <p className="text-[14px] text-[#9CA3AF] mb-8">{brandTabs[activeBrandTab].subtitle}</p>
                      
                      <div className="grid grid-cols-2 gap-3">
                        {brandTabs[activeBrandTab].items?.map((item, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div className="aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-gray-100 mb-2 relative group cursor-pointer"
                                 onClick={() => {
                                   if (item.video) {
                                     const modal = document.createElement('div');
                                     modal.className = 'fixed inset-0 z-[999] flex items-center justify-center bg-black/90 p-4 animate-in fade-in duration-300';
                                     modal.innerHTML = `
                                       <div class="relative w-full max-w-sm aspect-[9/16] bg-black rounded-3xl overflow-hidden shadow-2xl">
                                         <video src="${item.video}" autoplay controls playsinline class="w-full h-full object-contain"></video>
                                         <button class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white flex items-center justify-center hover:bg-white/20 transition-colors" onclick="this.closest('.fixed').remove()">
                                           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                         </button>
                                       </div>
                                     `;
                                     modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
                                     document.body.appendChild(modal);
                                   }
                                 }}>
                              {item.video ? (
                                <video 
                                  src={item.video} 
                                  autoPlay 
                                  muted 
                                  loop 
                                  playsInline 
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  poster={item.image}
                                />
                              ) : (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                              )}
                              <div className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none">
                                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/20">
                                  <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                </div>
                              </div>
                            </div>
                            <p className="text-[14px] font-black text-[#5BA4D9]">{item.name}</p>
                            <p className="text-[11px] text-[#9CA3AF] font-bold">{item.detail}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : brandTabs[activeBrandTab].type === "stats" ? (
                    <div className="animate-in fade-in duration-500">
                      <div className="flex items-center justify-between mb-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#5BA4D9] border border-[#5BA4D9]/20 rounded-full px-3 py-1 bg-[#5BA4D9]/5">
                          <Check className="w-3 h-3" /> CERTIFIED QUALITY STANDARDS
                        </span>
                        <div className="text-right">
                          <p className="text-[20px] font-black text-[#5BA4D9] leading-none">100%</p>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Certified Safe</p>
                        </div>
                      </div>
                      
                      <h3 className="text-[24px] font-bold text-[#1F2937] mb-1">
                        Safety & <span className="text-[#5BA4D9] italic">Quality</span> First.
                      </h3>
                      <p className="text-[14px] text-gray-400 mb-8">{brandTabs[activeBrandTab].subtitle}</p>

                      <div className="space-y-5 mb-8">
                        {brandTabs[activeBrandTab].stats?.map((stat, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex justify-between items-end">
                              <span className="text-[14px] font-bold text-[#1F2937]">{stat.label}</span>
                              <span className="text-[16px] font-black text-[#5BA4D9]">{stat.value}%</span>
                            </div>
                            <div className="h-2.5 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#5BA4D9] rounded-full transition-all duration-1000 ease-out" 
                                style={{ width: `${stat.value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <button className="text-[13px] font-bold text-[#5BA4D9] flex items-center gap-1 mb-8 hover:underline">
                        View third-party study report <ChevronRight className="w-3 h-3" />
                      </button>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {brandTabs[activeBrandTab].footerInfo?.map((info, i) => (
                          <div key={i} className="bg-[#F9FAFB] p-3 rounded-xl flex items-center gap-3 border border-gray-50">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[18px] shadow-sm">
                              {info.icon}
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">{info.label}</p>
                              <p className="text-[13px] font-black text-[#1F2937]">{info.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Upgraded Double-Barrel Guarantee */}
                      <div className="mt-8 relative">
                        {/* Main Card */}
                        <div className="bg-white border-2 border-[#10B981]/20 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] relative z-10 overflow-hidden">
                          <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl"></div>
                          <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center relative">
                              <ShieldCheck className="w-8 h-8 text-[#10B981]" strokeWidth={2.5} />
                              <div className="absolute inset-0 rounded-full border-2 border-[#10B981]/20 animate-ping opacity-20"></div>
                            </div>
                            <div className="space-y-1">
                              <span className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em]">Risk-Free Trial</span>
                              <h4 className="text-[20px] font-bold text-[#1F2937]">The {brandTabs[activeBrandTab].guarantee?.days}-Day <span className="text-[#10B981] italic font-serif">Promise</span></h4>
                            </div>
                            <p className="text-[13px] text-[#4B5563] leading-relaxed max-w-[280px]">
                              {brandTabs[activeBrandTab].guarantee?.text || "We refund every USD if you're not satisfied."} <span className="font-bold text-[#1F2937]">No questions asked.</span>
                            </p>
                          </div>
                        </div>
                        <div className="absolute -bottom-2 left-6 right-6 h-10 bg-[#10B981]/10 rounded-[32px] -z-10 blur-sm"></div>
                      </div>
                    </div>
                    ) : brandTabs[activeBrandTab].type === "routine" ? (
                    <div className="animate-in fade-in duration-500">
                      <h3 className="text-[24px] font-bold text-[#1F2937] mb-1">
                        Simple <span className="text-[#5BA4D9] italic">feeding</span> routine.
                      </h3>
                      <p className="text-[14px] text-gray-400 mb-6">{brandTabs[activeBrandTab].subtitle}</p>

                      <div className="border border-[#E0F2FE] rounded-2xl overflow-hidden mb-6">
                        <div className="bg-[#F8FAFC] px-4 py-2 border-b border-[#E0F2FE] flex justify-between">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">When</span>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phase</span>
                        </div>
                        
                        {brandTabs[activeBrandTab].sections?.map((section, sIdx) => (
                          <div key={sIdx}>
                            <div className="bg-[#F0F9FF] px-4 py-2 border-b border-[#E0F2FE]">
                              <span className="text-[11px] font-black text-[#5BA4D9] uppercase tracking-wider">{section.header}</span>
                            </div>
                            {section.items.map((item, iIdx) => (
                              <div key={iIdx} className="px-4 py-4 flex justify-between items-center bg-white border-b border-[#E0F2FE] last:border-b-0">
                                <div>
                                  <p className="text-[14px] font-bold text-[#1F2937]">{item.label}</p>
                                  <p className="text-[12px] text-gray-400">{item.detail}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-[14px] font-bold text-[#5BA4D9]">{item.value}</p>
                                  <p className="text-[11px] text-gray-400">{item.subValue}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 mb-8">
                        {brandTabs[activeBrandTab].tips?.map((tip, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#5BA4D9]" />
                            <p className="text-[13px] text-gray-500">{tip}</p>
                          </div>
                        ))}
                      </div>

                      {/* Upgraded Double-Barrel Guarantee for Routine */}
                      {brandTabs[activeBrandTab].guarantee && (
                        <div className="mt-8 relative">
                          <div className="bg-white border-2 border-[#10B981]/20 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] relative z-10 overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl"></div>
                            <div className="flex flex-col items-center text-center space-y-4">
                              <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center relative">
                                <ShieldCheck className="w-8 h-8 text-[#10B981]" strokeWidth={2.5} />
                                <div className="absolute inset-0 rounded-full border-2 border-[#10B981]/20 animate-ping opacity-20"></div>
                              </div>
                              <div className="space-y-1">
                                <span className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em]">Risk-Free Trial</span>
                                <h4 className="text-[20px] font-bold text-[#1F2937]">The {brandTabs[activeBrandTab].guarantee.days}-Day <span className="text-[#10B981] italic font-serif">Promise</span></h4>
                              </div>
                              <p className="text-[13px] text-[#4B5563] leading-relaxed max-w-[280px]">
                                {brandTabs[activeBrandTab].guarantee.text} <span className="font-bold text-[#1F2937]">No questions asked.</span>
                              </p>
                            </div>
                          </div>
                          <div className="absolute -bottom-2 left-6 right-6 h-10 bg-[#10B981]/10 rounded-[32px] -z-10 blur-sm"></div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="animate-in fade-in duration-500">
                      <h3 className="text-[20px] font-bold text-[#1F2937] mb-6 leading-tight">
                        {brandTabs[activeBrandTab].title.split(" ").map((word, i) => {
                          const words = brandTabs[activeBrandTab].title.split(" ");
                          const isLastTwo = i >= words.length - 2;
                          return (
                            <span key={i} className={isLastTwo ? "text-[#5BA4D9] italic" : ""}>
                              {word}{" "}
                            </span>
                          );
                        })}
                      </h3>
                      
                      <div className="space-y-4">
                        {brandTabs[activeBrandTab].points?.map((point, i) => (
                          <div key={i} className="flex items-start gap-3 group">
                            <div className="w-5 h-5 rounded-full bg-[#5BA4D9] flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm shadow-[#5BA4D9]/20">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <p className="text-[14px] text-[#4B5563] font-medium leading-tight group-hover:text-[#1F2937] transition-colors">
                              {point}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Upgraded Double-Barrel Guarantee */}
                      {brandTabs[activeBrandTab].guarantee && (
                        <div className="mt-10 relative">
                          {/* Main Card */}
                          <div className="bg-white border-2 border-[#10B981]/20 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] relative z-10 overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl"></div>
                            
                            <div className="flex flex-col items-center text-center space-y-4">
                              <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center relative">
                                <ShieldCheck className="w-8 h-8 text-[#10B981]" strokeWidth={2.5} />
                                <div className="absolute inset-0 rounded-full border-2 border-[#10B981]/20 animate-ping opacity-20"></div>
                              </div>
                              
                              <div className="space-y-1">
                                <span className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em]">Risk-Free Trial</span>
                                <h4 className="text-[20px] font-bold text-[#1F2937]">The {brandTabs[activeBrandTab].guarantee.days}-Day <span className="text-[#10B981] italic font-serif">Promise</span></h4>
                              </div>
                              
                              <p className="text-[13px] text-[#4B5563] leading-relaxed max-w-[280px]">
                                {brandTabs[activeBrandTab].guarantee.text} <span className="font-bold text-[#1F2937]">No questions asked.</span>
                              </p>
                              
                            </div>
                          </div>
                          
                          {/* Secondary "Double Barrel" Effect (Stacked layer) */}
                          <div className="absolute -bottom-2 left-6 right-6 h-10 bg-[#10B981]/10 rounded-[32px] -z-10 blur-sm"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              
              <div className="mt-12 mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5BA4D9]" />
                  <span className="text-[11px] font-black text-[#5BA4D9] uppercase tracking-[0.2em]">Customer Stories</span>
                </div>
                
                <div className="space-y-4">
                  {testimonials.slice(0, 5).map((t, i) => (
                    <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300">
                      <div className="flex gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-[#FFD700] text-[#FFD700]" />
                        ))}
                      </div>
                      <p className="text-[14px] text-[#4B5563] leading-relaxed mb-4 italic">"{t.quote}"</p>
                      <div className="flex items-center gap-3">
                        <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" />
                        <div>
                          <p className="font-bold text-[14px] text-[#1F2937] leading-none mb-1">{t.name}</p>
                          <p className="text-[11px] text-[#10B981] font-bold flex items-center gap-1">
                            Verified Buyer <span className="text-[10px]">✓</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Upgraded Bebelle Guarantee ── */}
                <div className="mt-10 relative">
                  <div className="bg-white border-2 border-[#10B981]/20 rounded-[32px] p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] relative z-10 overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#10B981]/5 rounded-full blur-3xl"></div>
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-[#10B981]/10 flex items-center justify-center relative">
                        <ShieldCheck className="w-8 h-8 text-[#10B981]" strokeWidth={2.5} />
                        <div className="absolute inset-0 rounded-full border-2 border-[#10B981]/20 animate-ping opacity-20"></div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[11px] font-black text-[#10B981] uppercase tracking-[0.2em]">Risk-Free Trial</span>
                        <h4 className="text-[20px] font-bold text-[#1F2937]">The {brandTabs[activeBrandTab].guarantee?.days || 7}-Day <span className="text-[#10B981] italic font-serif">Promise</span></h4>
                      </div>
                      <p className="text-[13px] text-[#4B5563] leading-relaxed max-w-[280px]">
                        {brandTabs[activeBrandTab].guarantee?.text || "We offer a money-back guarantee if it doesn't work for your baby."} <span className="font-bold text-[#1F2937]">No questions asked.</span>
                      </p>
                    </div>
                  </div>
                  <div className="absolute -bottom-2 left-6 right-6 h-10 bg-[#10B981]/10 rounded-[32px] -z-10 blur-sm"></div>
                </div>
              </div>


            </div>
          </div>
        </div>
      </section>



      {/* ═══ SECTION 5: PROBLEM SECTION (Auto-sliding) ═══ */}
      <ProblemSlider problems={problems} />

      {/* ═══ SECTION 4: SCIENCE BEHIND BEBELLE ═══ */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(180deg, #E8F4FC 0%, #F0F9FF 50%, #FFFFFF 100%)", padding: "80px 0" }}>
        {/* Floating decorations */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Clouds */}
          <svg className="absolute top-[8%] left-[5%] w-24 h-12 text-white opacity-40" style={{ animation: "floatCloud 7s ease-in-out infinite" }} viewBox="0 0 120 60" fill="currentColor"><ellipse cx="35" cy="40" rx="30" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="22"/><ellipse cx="90" cy="40" rx="22" ry="16"/><ellipse cx="60" cy="25" rx="18" ry="15"/></svg>
          <svg className="absolute top-[60%] right-[3%] w-20 h-10 text-white opacity-35" style={{ animation: "floatCloud 9s ease-in-out infinite 2s" }} viewBox="0 0 120 60" fill="currentColor"><ellipse cx="35" cy="40" rx="30" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="22"/><ellipse cx="90" cy="40" rx="22" ry="16"/><ellipse cx="60" cy="25" rx="18" ry="15"/></svg>
          <svg className="absolute bottom-[10%] left-[8%] w-16 h-8 text-white opacity-30" style={{ animation: "floatCloud 8s ease-in-out infinite 1s" }} viewBox="0 0 120 60" fill="currentColor"><ellipse cx="35" cy="40" rx="30" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="22"/><ellipse cx="90" cy="40" rx="22" ry="16"/><ellipse cx="60" cy="25" rx="18" ry="15"/></svg>
          {/* Stars */}
          <span className="absolute top-[12%] right-[12%] text-[#FFD700] text-lg" style={{ animation: "twinkle 2s ease-in-out infinite" }}>⭐</span>
          <span className="absolute top-[30%] left-[3%] text-[#FFD700] text-sm" style={{ animation: "twinkle 2.5s ease-in-out infinite 0.5s" }}>⭐</span>
          <span className="absolute bottom-[20%] right-[8%] text-[#FFD700] text-xs" style={{ animation: "twinkle 3s ease-in-out infinite 1s" }}>✨</span>
          <span className="absolute top-[50%] left-[15%] text-[#FFD700] text-xs" style={{ animation: "twinkle 2s ease-in-out infinite 1.5s" }}>✨</span>
          <span className="absolute top-[5%] left-[45%] text-[#FFD700] text-sm" style={{ animation: "twinkle 2.8s ease-in-out infinite 0.3s" }}>⭐</span>
          {/* Hearts */}
          <span className="absolute top-[20%] right-[20%] text-[#5BA4D9] text-sm opacity-40" style={{ animation: "floatCloud 5s ease-in-out infinite" }}>💙</span>
          <span className="absolute bottom-[15%] left-[25%] text-[#5BA4D9] text-xs opacity-30" style={{ animation: "floatCloud 6s ease-in-out infinite 1s" }}>💙</span>
          {/* Bubbles */}
          <div className="absolute top-[40%] right-[6%] w-6 h-6 rounded-full border-2 border-[#5BA4D9] opacity-15" style={{ animation: "floatCloud 7s ease-in-out infinite 2s" }} />
          <div className="absolute bottom-[30%] left-[4%] w-4 h-4 rounded-full border-2 border-[#B8E0F7] opacity-20" style={{ animation: "floatCloud 5s ease-in-out infinite" }} />
        </div>

        <div className="max-w-[1000px] mx-auto px-6 relative z-10">
          {/* Badge + Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-semibold text-white px-4 py-1.5 rounded-full mb-4" style={{ backgroundColor: "#5BA4D9" }}>✨ Discover the Magic</span>
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#1F2937] mt-1 font-body">Introducing Bebelle Hands-Free Feeding System</h2>
          </div>

          {/* Tab buttons with icons - desktop: all visible, mobile: single with arrows */}
          {shopIsMobile ? (
            <div className="mb-10 grid grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-3 px-2">
              <button
                onClick={() => { setScienceAutoPlay(false); setScienceTab(prev => (prev - 1 + scienceTabs.length) % scienceTabs.length); }}
                className="justify-self-start bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md border border-[#E5E7EB]"
              >
                <ChevronLeft className="w-5 h-5 text-[#1F2937]" />
              </button>
              <button
                className="w-full min-w-0 text-sm font-semibold px-4 py-[10px] rounded-full border-2 transition-all duration-300 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: "#5BA4D9",
                  color: "white",
                  borderColor: "#5BA4D9",
                  boxShadow: "0 6px 20px rgba(91, 164, 217, 0.35)",
                }}
              >
                <span className="shrink-0 text-base">{["🙌", "💨", "🔄", "🛡️"][scienceTab]}</span>
                <span className="truncate">{scienceTabs[scienceTab].label}</span>
              </button>
              <button
                onClick={() => { setScienceAutoPlay(false); setScienceTab(prev => (prev + 1) % scienceTabs.length); }}
                className="justify-self-end bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center shadow-md border border-[#E5E7EB]"
              >
                <ChevronRight className="w-5 h-5 text-[#1F2937]" />
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {scienceTabs.map((tab, i) => {
                const icons = ["🙌", "💨", "🔄", "🛡️"];
                const isActive = scienceTab === i;
                return (
                  <button
                    key={i}
                    onClick={() => { setScienceAutoPlay(false); setScienceTab(i); }}
                    className="text-sm font-semibold px-5 py-[10px] rounded-full border-2 transition-all duration-300 flex items-center gap-2"
                    style={{
                      backgroundColor: isActive ? "#5BA4D9" : "white",
                      color: isActive ? "white" : "#6B7280",
                      borderColor: isActive ? "#5BA4D9" : "#E5E7EB",
                      boxShadow: isActive ? "0 6px 20px rgba(91, 164, 217, 0.35)" : "0 4px 12px rgba(91, 164, 217, 0.1)",
                      transform: isActive ? "translateY(-2px)" : "translateY(0)",
                    }}
                    onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(91, 164, 217, 0.3)"; } }}
                    onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(91, 164, 217, 0.1)"; } }}
                  >
                    <span className="text-base">{icons[i]}</span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}

          {/* Content area */}
          <div className="flex flex-col md:flex-row gap-10 items-center" key={scienceTab} style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
            {/* Image with playful frame */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="rounded-3xl border-[3px] border-[#B8E0F7] bg-white p-3" style={{ boxShadow: "0 12px 40px rgba(91, 164, 217, 0.15)" }}>
                  <img src={scienceTabs[scienceTab].image} alt={scienceTabs[scienceTab].label} className="w-[300px] h-[300px] object-cover rounded-2xl" style={{ animation: "float 4s ease-in-out infinite" }} loading="lazy" />
                </div>
                {/* Corner decorations */}
                <span className="absolute -top-3 -right-3 text-[#FFD700] text-sm" style={{ animation: "twinkle 2s ease-in-out infinite" }}>⭐</span>
                <span className="absolute -bottom-2 -left-2 text-[#5BA4D9] text-xs opacity-50">💙</span>
              </div>
            </div>

            {/* Text card */}
            <div className="w-full md:w-1/2 rounded-2xl p-7" style={{ backgroundColor: "#F8FBFE", boxShadow: "0 8px 30px rgba(91, 164, 217, 0.1)" }}>
              <h3 className="text-[20px] font-bold text-[#1F2937] mb-4 flex items-center gap-2">
                <span className="text-[#5BA4D9]">✦</span> {scienceTabs[scienceTab].title}
              </h3>
              <div className="space-y-2 mb-5">
                {scienceTabs[scienceTab].desc.split(". ").filter(Boolean).map((sentence, idx) => (
                  <p key={idx} className="text-[15px] text-[#4B5563] leading-[1.7] flex items-start gap-2">
                    <span className="text-[#5BA4D9] mt-0.5 flex-shrink-0">💙</span>
                    {sentence.endsWith(".") ? sentence : sentence + "."}
                  </p>
                ))}
              </div>
              <h4 className="text-[16px] font-semibold text-[#5BA4D9] mb-2 flex items-center gap-1">{scienceTabs[scienceTab].subTitle} <span>→</span></h4>
              <p className="text-[15px] text-[#4B5563] leading-[1.7]">{scienceTabs[scienceTab].subDesc}</p>
            </div>
          </div>
        </div>

        {/* Inline keyframes */}
        <style>{`
          @keyframes floatCloud { 0%, 100% { transform: translateX(0) translateY(0); } 50% { transform: translateX(10px) translateY(-5px); } }
          @keyframes twinkle { 0%, 100% { opacity: 0.5; transform: scale(1); } 50% { opacity: 1; transform: scale(1.2); } }
          @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
          @keyframes fadeSlideIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>

      {/* ═══ SECTION 6: WHY CHOOSE BEBELLE & WHAT TO EXPECT ═══ */}
      <section className="relative overflow-hidden flex flex-col items-center py-16 px-4 gap-6" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 50%, #FFFFFF 100%)" }}>
        {/* Floating decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="absolute top-[6%] right-[4%] w-20 h-10 text-white opacity-40" style={{ animation: "floatCloud 8s ease-in-out infinite" }} viewBox="0 0 120 60" fill="currentColor"><ellipse cx="35" cy="40" rx="30" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="22"/><ellipse cx="90" cy="40" rx="22" ry="16"/><ellipse cx="60" cy="25" rx="18" ry="15"/></svg>
          <svg className="absolute bottom-[8%] left-[3%] w-16 h-8 text-white opacity-35" style={{ animation: "floatCloud 9s ease-in-out infinite 1.5s" }} viewBox="0 0 120 60" fill="currentColor"><ellipse cx="35" cy="40" rx="30" ry="18"/><ellipse cx="65" cy="35" rx="25" ry="22"/><ellipse cx="90" cy="40" rx="22" ry="16"/><ellipse cx="60" cy="25" rx="18" ry="15"/></svg>
          <span className="absolute top-[10%] left-[8%] text-[#FFD700] text-lg" style={{ animation: "twinkle 2s ease-in-out infinite" }}>⭐</span>
          <span className="absolute top-[5%] right-[15%] text-[#FFD700] text-sm" style={{ animation: "twinkle 2.5s ease-in-out infinite 0.7s" }}>✨</span>
          <span className="absolute bottom-[12%] right-[6%] text-[#FFD700] text-xs" style={{ animation: "twinkle 3s ease-in-out infinite 1s" }}>⭐</span>
          <span className="absolute bottom-[5%] left-[20%] text-[#FFD700] text-sm" style={{ animation: "twinkle 2.2s ease-in-out infinite 0.4s" }}>✨</span>
          <span className="absolute top-[45%] right-[18%] text-[#5BA4D9] text-sm opacity-40" style={{ animation: "floatCloud 5s ease-in-out infinite" }}>💙</span>
          <span className="absolute bottom-[25%] left-[10%] text-[#5BA4D9] text-xs opacity-30" style={{ animation: "floatCloud 6s ease-in-out infinite 1s" }}>💙</span>
          <div className="absolute top-[35%] left-[2%] w-5 h-5 rounded-full border-2 border-[#B8E0F7] opacity-20" style={{ animation: "floatCloud 7s ease-in-out infinite 2s" }} />
          <div className="absolute bottom-[18%] right-[3%] w-4 h-4 rounded-full border-2 border-[#5BA4D9] opacity-15" style={{ animation: "floatCloud 5s ease-in-out infinite" }} />
        </div>

        <img src={shopIsMobile ? "https://bebelle-files.b-cdn.net/MobileView/ChatGPT%20Image%20Jun%2010%2C%202026%2C%2001_39_09%20AM.webp" : "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/Section%20%234/Section%20%234%20-1.webp"} alt="Why Choose Bebelle comparison" className="block w-full max-w-4xl h-auto rounded-2xl relative z-10" style={{ border: "3px solid #B8E0F7", boxShadow: "0 8px 30px rgba(91, 164, 217, 0.15)" }} loading="lazy" />
        <img src={shopIsMobile ? "https://i.imgur.com/vsbt11a.png" : "https://bebelle-files.b-cdn.net/Shop%20Page%20-%20Section%20%231/Section%20%234/Section%20%234%20-%202.webp"} alt="What to Expect with Bebelle" className="block w-full max-w-4xl h-auto rounded-2xl relative z-10" style={{ border: "3px solid #B8E0F7", boxShadow: "0 8px 30px rgba(91, 164, 217, 0.15)" }} loading="lazy" />
      </section>

      {/* ═══ SECTION: TESTIMONIALS ═══ */}
      <ReviewsSection />



      {/* ═══ SECTION 10: FINAL CTA ═══ */}
      <section className="relative overflow-hidden text-center py-20" style={{ background: "linear-gradient(180deg, #FFFFFF 0%, #E8F4FC 70%, #D0E8F7 100%)" }}>
        {/* Decorative clouds */}
        <svg className="absolute top-[8%] left-[5%] w-28 h-14 text-[#D4EEFB] opacity-60" viewBox="0 0 120 60" fill="currentColor">
          <ellipse cx="35" cy="40" rx="30" ry="18" /><ellipse cx="65" cy="35" rx="25" ry="22" /><ellipse cx="90" cy="40" rx="22" ry="16" />
        </svg>
        <svg className="absolute top-[12%] right-[8%] w-24 h-12 text-[#D4EEFB] opacity-50" viewBox="0 0 120 60" fill="currentColor">
          <ellipse cx="35" cy="40" rx="30" ry="18" /><ellipse cx="65" cy="35" rx="25" ry="22" /><ellipse cx="90" cy="40" rx="22" ry="16" />
        </svg>
        <svg className="absolute bottom-[15%] left-[10%] w-20 h-10 text-[#D4EEFB] opacity-40" viewBox="0 0 120 60" fill="currentColor">
          <ellipse cx="35" cy="40" rx="30" ry="18" /><ellipse cx="65" cy="35" rx="25" ry="22" /><ellipse cx="90" cy="40" rx="22" ry="16" />
        </svg>

        {/* Gold stars with twinkle */}
        {[
          { top: "8%", right: "15%", size: 28, delay: "0s" },
          { top: "20%", left: "12%", size: 22, delay: "0.5s" },
          { bottom: "22%", right: "10%", size: 26, delay: "1s" },
          { top: "35%", right: "25%", size: 18, delay: "1.5s" },
          { bottom: "30%", left: "20%", size: 20, delay: "0.8s" },
        ].map((s, i) => (
          <span
            key={i}
            className="absolute z-[1]"
            style={{
              top: s.top, bottom: (s as any).bottom, left: (s as any).left, right: (s as any).right,
              fontSize: s.size,
              color: "#FFD700",
              animation: `twinkle 2s ease-in-out ${s.delay} infinite`,
            }}
          >⭐</span>
        ))}

        {/* Sky blue hearts */}
        {[
          { top: "18%", right: "20%", size: 18 },
          { bottom: "25%", left: "8%", size: 16 },
          { top: "50%", right: "5%", size: 14 },
        ].map((h, i) => (
          <span
            key={i}
            className="absolute z-[1] opacity-40"
            style={{ top: h.top, bottom: (h as any).bottom, left: (h as any).left, right: (h as any).right, fontSize: h.size, color: "#5BA4D9" }}
          >💙</span>
        ))}

        {/* Content */}
        <div className="relative z-10 max-w-[650px] mx-auto px-6">
          <h2 className="text-[28px] md:text-[32px] font-bold leading-[1.4] mb-8" style={{ color: "#1F2937", fontFamily: "'Nunito', sans-serif" }}>
            Don't let the exhaustion continue. Start hands-free feeding today.
          </h2>

          {/* Trust badges as pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              { icon: "✓", text: "500+ Happy Parents" },
              { icon: "✓", text: "Fast Nationwide Shipping" },
              { icon: "✓", text: "7-Day Money-Back Guarantee" },
            ].map((b) => (
              <span
                key={b.text}
                className="inline-flex items-center gap-2 text-sm font-medium rounded-full px-5 py-2.5 shadow-sm"
                style={{ background: "#F0F9FF", border: "1px solid #B8E0F7", color: "#1F2937" }}
              >
                <span style={{ color: "#5BA4D9", fontWeight: 700 }}>{b.icon}</span>
                {b.text}
              </span>
            ))}
          </div>

          {/* CTA Button with pulse */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-bold text-lg text-white px-12 py-4 rounded-full transition-all hover:-translate-y-1 hover:scale-[1.02]"
            style={{
              background: "linear-gradient(135deg, #5BA4D9 0%, #87CEEB 100%)",
              boxShadow: "0 8px 24px rgba(91, 164, 217, 0.4)",
              animation: "ctaPulse 2s infinite",
            }}
          >
            Add to Cart
          </button>

          <div className={`mt-5 flex items-center justify-center bg-[#FFF7ED] border-2 border-[#FDBA74] rounded-xl ${shopIsMobile ? 'gap-1.5 px-3 py-2' : 'gap-3 px-6 py-4'}`}>
            <span className={`font-bold text-[#EA580C] ${shopIsMobile ? 'text-[11px]' : 'text-[15px]'}`}>🔥 Hurry! Sale ends in</span>
            <div className="flex gap-1">
              {formatTime(shopCountdown).split(":").map((unit, i) => (
                <span key={i} className="flex items-center gap-1">
                  {i > 0 && <span className={`text-[#EA580C] font-bold ${shopIsMobile ? 'text-sm' : 'text-lg'}`}>:</span>}
                  <span className={`bg-[#EA580C] text-white font-mono font-extrabold rounded-md text-center ${shopIsMobile ? 'text-[13px] px-1.5 py-1 min-w-[28px]' : 'text-[18px] px-2.5 py-1.5 min-w-[36px]'}`}>{unit}</span>
                </span>
              ))}
            </div>
            <span className={`font-bold text-[#EA580C] ${shopIsMobile ? 'text-[11px]' : 'text-[15px]'}`}>— Order now!</span>
          </div>
        </div>

        <style>{`
          @keyframes twinkle {
            0%, 100% { opacity: 0.7; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.15); }
          }
          @keyframes ctaPulse {
            0%, 100% { box-shadow: 0 8px 24px rgba(91, 164, 217, 0.4); }
            50% { box-shadow: 0 8px 32px rgba(91, 164, 217, 0.65); }
          }
        `}</style>
      </section>

      <Footer />
      <SocialProofNotifications />

      {/* ── Mobile sticky bottom bar ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-[#E0F2FE] px-4 py-3 flex items-center gap-3" style={{ boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}>
        <div className="flex-1 min-w-0 flex items-center gap-3">
          <p className="text-[13px] font-bold text-[#1F2937] truncate">
            {packages[selectedPack].subtitle} — {packages[selectedPack].salePrice}
          </p>
          <div className="w-[1px] h-4 bg-[#D1D5DB]" />
          <p className="text-[11px] text-[#9CA3AF] line-through">{packages[selectedPack].originalPrice}</p>
        </div>
        <button
          onClick={() => { navigate(`/checkout?pack=${selectedPack}`); window.scrollTo(0, 0); }}
          className="flex-shrink-0 text-white font-bold text-[14px] px-6 py-3 rounded-xl transition-all"
          style={{
            background: "linear-gradient(135deg, #5BA4D9 0%, #87CEEB 100%)",
            boxShadow: "0 4px 16px rgba(91, 164, 217, 0.4)",
          }}
        >
          CHECKOUT
        </button>
      </div>
      {/* Bottom spacer for sticky bar */}
      <div className="h-[72px] md:hidden" />
    </div>
  );
};

export default Shop;
