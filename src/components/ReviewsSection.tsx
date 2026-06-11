import { Star } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const reviews = [
  {
    name: "Maria C.",
    rating: 5,
    text: "This is a lifesaver! I can finally eat my breakfast while my baby feeds himself. The quality is amazing and very easy to clean.",
    location: "New York, NY",
    avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/295111157_10158190887101324_9150188131926326887_n.webp"
  },
  {
    name: "Jessica T.",
    rating: 5,
    text: "The anti-colic feature really works. My baby used to be so gassy, but not anymore since we switched to Bebelle.",
    location: "Austin, TX",
    avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/356860763_10160192732201849_247548115966416222_n.webp"
  },
  {
    name: "Sarah M.",
    rating: 5,
    text: "Ordered the 3-bottle pack and it's the best investment for my sanity. Highly recommended for busy moms!",
    location: "Los Angeles, CA",
    avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/533252066_10234610459455997_7537675449811374361_n.webp"
  },
  {
    name: "Anna L.",
    rating: 5,
    text: "Truly a game changer for multi-tasking parents. My little one loves it and it's so secure!",
    location: "Chicago, IL",
    avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/601834205_10163738097162365_2784188688330205800_n.webp"
  },
  {
    name: "Robert S.",
    rating: 5,
    text: "I was skeptical at first, but it really makes feeding time stress-free. Great build quality too.",
    location: "Miami, FL",
    avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/491706592_529249310247569_2360326538220367249_n.webp"
  },
  {
    name: "Elena G.",
    rating: 5,
    text: "Best baby product I've bought this year. It's safe, convenient, and my baby adjusted to it instantly.",
    location: "Seattle, WA",
    avatar: "https://bebelle-files.b-cdn.net/Testimonials%20Profiles/80867678_10218197596708824_3094487167552978944_n.webp"
  }
];

const ReviewsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-20 bg-[#F0F9FF] relative overflow-hidden">
      {/* Decorative Stars */}
      <div className="absolute top-10 left-[10%] text-yellow-300 opacity-40 animate-pulse">⭐</div>
      <div className="absolute bottom-10 right-[10%] text-yellow-300 opacity-40 animate-pulse">⭐</div>
      
      <div className="max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <div className="flex justify-center mb-4">
            <span className="inline-block bg-[#E8F4FC] text-[#5BA4D9] text-sm px-4 py-1.5 rounded-full font-semibold uppercase tracking-wider">
              Testimonials
            </span>
          </div>
          <h2 className="text-[28px] md:text-[42px] font-extrabold text-[#1F2937] mb-4 leading-tight">
            Loved by Thousands of Parents
          </h2>
          <div className="flex items-center justify-center gap-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span className="font-bold text-[#4B5563]">4.9/5 Rating</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {reviews.map((review, i) => (
            <div 
              key={i} 
              className="bg-white p-8 rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-0.5 mb-4">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                ))}
              </div>
              <p className="text-[#4B5563] text-lg leading-relaxed italic mb-8">"{review.text}"</p>
              <div className="flex items-center gap-4">
                <img 
                  src={review.avatar} 
                  alt={review.name} 
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#B8E0F7] shadow-sm"
                />
                <div>
                  <div className="font-bold text-[#1F2937]">{review.name}</div>
                  <div className="text-sm text-[#9CA3AF] font-medium">{review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
