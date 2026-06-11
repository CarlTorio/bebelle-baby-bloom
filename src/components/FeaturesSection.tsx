import React from "react";

const FeaturesSection = () => {
  return (
    <section id="features" className="relative w-full">
      {/* Background/Parallax Section */}
      <div className="relative w-full">
        {/* Mobile View with Window Effect */}
        <div className="md:hidden relative h-[500px] overflow-hidden">
          <div 
            className="absolute inset-0 w-full h-full bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://bebelle-files.b-cdn.net/MobileView/Untitled%20design%20(3).webp")',
              backgroundAttachment: 'fixed',
              WebkitBackgroundSize: 'cover',
            }}
          />
          {/* Overlay to ensure content above/below can "pass over" */}
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_20px_20px_-20px_rgba(0,0,0,0.1),inset_0_-20px_20px_-20px_rgba(0,0,0,0.1)]" />
        </div>

        {/* Desktop View Background */}
        <div
          className="hidden md:block w-full h-[650px] bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: 'url("https://bebelle-files.b-cdn.net/Home%20Page%20-%20Last%20Section/Section%205/Section%205%20-1.webp")',
          }}
        />
      </div>

      {/* Moving logos - This section will scroll OVER the fixed background */}
      <div className="relative z-10 py-5 bg-[#E8F4FC] overflow-hidden border-t border-blue-50">
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

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        /* Mobile parallax fix for some browsers */
        @supports (-webkit-overflow-scrolling: touch) {
          .bg-fixed {
            background-attachment: scroll;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturesSection;
