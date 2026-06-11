import HeroSection from "@/components/HeroSection";
import DecorativeElements from "@/components/DecorativeElements";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";

import TestimonialsSection from "@/components/TestimonialsSection";

import FAQSection from "@/components/FAQSection";
import FinalCTASection from "@/components/FinalCTASection";
import ReviewsSection from "@/components/ReviewsSection";
import Footer from "@/components/Footer";
import SiteHeader from "@/components/SiteHeader";
import SocialProofNotifications from "@/components/SocialProofNotifications";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <SocialProofNotifications />
      <DecorativeElements />
      <SiteHeader />
      <div className="pt-0">
        <HeroSection />
        <ProblemSection />
        <SolutionSection />
        <ReviewsSection />
        <FeaturesSection />
        <HowItWorksSection />
        
        <TestimonialsSection />
        
        <FAQSection />
        <FinalCTASection />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
