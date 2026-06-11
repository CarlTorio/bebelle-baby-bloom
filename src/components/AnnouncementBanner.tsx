const AnnouncementBanner = () => {
  const text = "🎉 33% OFF — Was ₱1,499, Now Only ₱999! 🚚 FREE Shipping Nationwide! ";

  return (
    <div className="fixed top-0 left-0 right-0 z-[1000] h-10 gradient-banner flex items-center overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="text-foreground text-sm font-medium mx-4">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
