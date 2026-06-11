import { Truck, ShieldCheck, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import bottleYellow from "@/assets/bottle-yellow.png";

const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #B8E0F7, #C5E8F7)" }}>
      {/* Cloud decorations */}
      <svg className="absolute top-[5%] right-[8%] w-24 h-12 text-white opacity-30" viewBox="0 0 120 60" fill="currentColor">
        <ellipse cx="35" cy="40" rx="30" ry="18" />
        <ellipse cx="65" cy="35" rx="25" ry="22" />
        <ellipse cx="90" cy="40" rx="22" ry="16" />
      </svg>
      <svg className="absolute bottom-[10%] left-[5%] w-20 h-10 text-white opacity-25" viewBox="0 0 120 60" fill="currentColor">
        <ellipse cx="35" cy="40" rx="30" ry="18" />
        <ellipse cx="65" cy="35" rx="25" ry="22" />
      </svg>
      <div className="absolute top-[15%] left-[5%] w-20 h-20 rounded-full bg-white opacity-[0.08]" />
      <div className="absolute bottom-[15%] right-[8%] w-14 h-14 rounded-full bg-white opacity-[0.1]" />

      <div className="max-w-[1100px] mx-auto px-6 relative z-10">
        <div className="text-center">
          <span className="inline-block bg-[#87CEEB] text-white text-[13px] px-4 py-1.5 rounded-[20px]">
            💰 Best Deals
          </span>
          <h2 className="text-[26px] md:text-[36px] font-bold text-foreground mt-4 leading-tight">
            Choose Your Bebelle Package
          </h2>
          <p className="text-[17px] text-muted-foreground mt-4 mb-14 max-w-[600px] mx-auto">
            More bottles = more savings. Perfect for home, travel, and grandma's house!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {/* Starter */}
          <div className="bg-white rounded-3xl p-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(91,164,217,0.15)] transition-all duration-300">
            <p className="text-sm uppercase tracking-widest text-muted-foreground mb-2">Starter</p>
            <div className="flex justify-center my-5">
              <img src="https://i.imgur.com/Quujeth.png" alt="Blue bottle" className="h-[120px] object-contain" loading="lazy" />
            </div>
            <p className="text-base text-foreground mb-5">1 Bebelle Bottle</p>
            <p className="text-lg text-muted-foreground line-through">₱1,499</p>
            <p className="text-[42px] font-extrabold text-foreground my-2">₱999</p>
            <span className="inline-block bg-[#B8E0F7] text-foreground text-[13px] px-3.5 py-1.5 rounded-[20px] mb-6">
              Save ₱500 (33% OFF)
            </span>
            <p className="text-sm text-muted-foreground mb-6">₱999 per bottle</p>
            <Button
              variant="outline"
              className="w-full rounded-full border-2 border-[#87CEEB] text-[#5BA4D9] hover:bg-[#87CEEB] hover:text-white font-bold text-base py-6 transition-all"
            >
              Add to Cart
            </Button>
          </div>

          {/* Bundle — Most Popular */}
          <div className="relative bg-white rounded-3xl p-10 text-center shadow-[0_12px_40px_rgba(91,164,217,0.2)] border-[3px] border-[#5BA4D9] md:scale-[1.03] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(91,164,217,0.25)] transition-all duration-300">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5BA4D9] text-white text-xs font-bold uppercase px-5 py-2 rounded-[20px] shadow-[0_4px_12px_rgba(91,164,217,0.4)] whitespace-nowrap">
              ⭐ MOST POPULAR
            </span>
            <p className="text-sm uppercase tracking-widest text-[#5BA4D9] mb-2">Bundle</p>
            <div className="flex justify-center items-end my-5 gap-0">
              <img src="https://i.imgur.com/Quujeth.png" alt="Blue bottle" className="h-[100px] object-contain -mr-3 relative z-10" loading="lazy" />
              <img src="https://i.imgur.com/WjjzQww.png" alt="Red bottle" className="h-[100px] object-contain -ml-3" loading="lazy" />
            </div>
            <p className="text-base text-foreground">2 Bebelle Bottles</p>
            <p className="text-[13px] text-muted-foreground mb-5">Mix & match any colors</p>
            <p className="text-lg text-muted-foreground line-through">₱2,998</p>
            <p className="text-[42px] font-extrabold text-[#5BA4D9] my-2">₱1,998</p>
            <span className="inline-block bg-[#5BA4D9] text-white text-[13px] px-3.5 py-1.5 rounded-[20px] mb-6">
              Save ₱1,000 (33% OFF)
            </span>
            <p className="text-sm text-muted-foreground mb-6">Only ₱999 per bottle</p>
            <Button className="w-full rounded-full bg-[#5BA4D9] hover:bg-[#4A93C8] text-white font-bold text-base py-6 hover:scale-[1.02] transition-all">
              Add to Cart
            </Button>
          </div>

          {/* Family Pack */}
          <div className="relative bg-white rounded-3xl p-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.08)] border-2 border-[#87CEEB] hover:-translate-y-2 hover:shadow-[0_16px_40px_rgba(91,164,217,0.15)] transition-all duration-300">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#87CEEB] text-white text-xs font-bold uppercase px-5 py-2 rounded-[20px] shadow-[0_4px_12px_rgba(135,206,235,0.4)] whitespace-nowrap">
              🏆 BEST VALUE
            </span>
            <p className="text-sm uppercase tracking-widest text-[#87CEEB] mb-2">Family Pack</p>
            <div className="flex justify-center items-end my-5 gap-0">
              <img src="https://i.imgur.com/Quujeth.png" alt="Blue bottle" className="h-[90px] object-contain -mr-2 relative z-10 -rotate-6" loading="lazy" />
              <img src="https://i.imgur.com/WjjzQww.png" alt="Red bottle" className="h-[90px] object-contain relative z-20" loading="lazy" />
              <img src={bottleYellow} alt="Yellow bottle" className="h-[90px] object-contain -ml-2 rotate-6" loading="lazy" />
            </div>
            <p className="text-base text-foreground">3 Bebelle Bottles</p>
            <p className="text-[13px] text-muted-foreground mb-5">Perfect for home, travel & gifts</p>
            <p className="text-lg text-muted-foreground line-through">₱4,497</p>
            <p className="text-[42px] font-extrabold text-foreground my-2">₱2,997</p>
            <span className="inline-block bg-[#87CEEB] text-white text-[13px] px-3.5 py-1.5 rounded-[20px] mb-6">
              Save ₱1,500 (33% OFF)
            </span>
            <p className="text-sm text-muted-foreground font-semibold mb-6">Only ₱999 per bottle</p>
            <Button className="w-full rounded-full bg-[#87CEEB] hover:bg-[#5BA4D9] text-white font-bold text-base py-6 hover:scale-[1.02] transition-all">
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-12">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-[#5BA4D9]" />
            <span className="text-[15px] text-foreground">Free Shipping Nationwide</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#5BA4D9]" />
            <span className="text-[15px] text-foreground">7-Day Money-Back Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#5BA4D9]" />
            <span className="text-[15px] text-foreground">Secure Checkout</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
