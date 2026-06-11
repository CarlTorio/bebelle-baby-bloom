const CloudShape = ({ className }: { className: string }) => (
  <svg className={className} viewBox="0 0 120 60" fill="currentColor">
    <ellipse cx="35" cy="40" rx="30" ry="18" />
    <ellipse cx="65" cy="35" rx="25" ry="22" />
    <ellipse cx="90" cy="40" rx="22" ry="16" />
    <ellipse cx="60" cy="25" rx="18" ry="15" />
  </svg>
);

const DecorativeElements = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
    {/* Clouds */}
    <CloudShape className="absolute top-[5%] left-[10%] w-32 h-16 text-white opacity-30" />
    <CloudShape className="absolute top-[15%] right-[5%] w-28 h-14 text-white opacity-25" />
    <CloudShape className="absolute top-[35%] left-[70%] w-24 h-12 text-white opacity-20" />
    <CloudShape className="absolute top-[55%] left-[3%] w-20 h-10 text-white opacity-25" />
    <CloudShape className="absolute top-[75%] right-[15%] w-26 h-13 text-white opacity-20" />
    <CloudShape className="absolute top-[90%] left-[40%] w-24 h-12 text-white opacity-15" />

    {/* Circles */}
    <div className="absolute top-[20%] left-[5%] w-14 h-14 rounded-full bg-primary opacity-10" />
    <div className="absolute top-[45%] right-[8%] w-8 h-8 rounded-full bg-secondary opacity-15" />
    <div className="absolute top-[70%] left-[12%] w-10 h-10 rounded-full bg-accent-mint opacity-10" />
    <div className="absolute top-[25%] right-[15%] w-16 h-16 rounded-full bg-primary opacity-8" />
    <div className="absolute top-[85%] right-[20%] w-6 h-6 rounded-full bg-primary opacity-10" />

    {/* Stars / sparkles */}
    <svg className="absolute top-[10%] right-[25%] w-5 h-5 text-white opacity-30" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <svg className="absolute top-[60%] left-[3%] w-4 h-4 text-white opacity-25" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <svg className="absolute top-[30%] left-[50%] w-3 h-3 text-white opacity-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
    <svg className="absolute top-[80%] right-[30%] w-4 h-4 text-white opacity-20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>

    {/* Bubbles */}
    <div className="absolute top-[50%] left-[85%] w-8 h-8 rounded-full border-2 border-white opacity-15" />
    <div className="absolute top-[65%] left-[25%] w-6 h-6 rounded-full border-2 border-white opacity-10" />
  </div>
);

export default DecorativeElements;
