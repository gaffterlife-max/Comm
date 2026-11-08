import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ResetHomeButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 280px
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-22 lg:bottom-7 right-3.5 sm:right-7 z-40 animate-fadeIn">
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label="Reset to home / top"
        className="group flex items-center justify-center gap-1.5 min-h-[44px] min-w-[44px] py-2.5 px-3 sm:py-3 sm:px-4 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all cursor-pointer border border-amber-500/30 backdrop-blur-xs"
      >
        <ArrowUp className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-0.5" />
        <span className="hidden xs:inline font-sans font-extrabold tracking-wide text-[11px] sm:text-xs">
          Home
        </span>
      </button>
    </div>
  );
};
