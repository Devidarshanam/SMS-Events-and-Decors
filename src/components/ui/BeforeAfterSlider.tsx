import React, { useState, useRef, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles, Building2 } from 'lucide-react';
import { BeforeAfterItem } from '../../types';

interface BeforeAfterSliderProps {
  item: BeforeAfterItem;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ item, className = '' }) => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 5), 95);
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className={`flex flex-col ${className}`}>
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-gold-500/30 shadow-luxury"
      >
        {/* AFTER LAYER (FULL BACKGROUND) */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#2D1B14] via-[#1A100B] to-[#0D0704] flex items-center justify-center p-8 text-center">
          {item.after_image ? (
            <img
              src={item.after_image}
              alt={`${item.title} - After Decor`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center justify-center max-w-md text-ivory-100 z-0">
              <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center mb-4 text-gold-400 shadow-gold-glow animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 mb-2">
                AFTER TRANSFORMATION
              </span>
              <h4 className="font-serif text-xl md:text-2xl font-bold text-ivory-50 mb-2">
                Grand Royal Celebration Setup
              </h4>
              <p className="text-xs md:text-sm text-ivory-300/80 font-sans">
                Full 30ft fresh floral wall, crystal chandeliers, royal velvet couple seating & warm atmospheric lighting.
              </p>
            </div>
          )}

          {/* After Badge */}
          <div className="absolute top-4 right-4 z-10 px-3.5 py-1.5 rounded-full bg-gold-600/90 text-ivory-50 text-xs font-semibold tracking-wider uppercase backdrop-blur-md shadow-md">
            AFTER ✨
          </div>
        </div>

        {/* BEFORE LAYER (CLIPPED) */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-[#242424] via-[#181818] to-[#0F0F0F] flex items-center justify-center p-8 text-center"
          style={{ width: `${sliderPos}%` }}
        >
          {item.before_image ? (
            <img
              src={item.before_image}
              alt={`${item.title} - Before Decor`}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              style={{ width: containerRef.current?.offsetWidth || '100%' }}
            />
          ) : (
            <div 
              className="flex flex-col items-center justify-center max-w-md text-charcoal-300 pointer-events-none"
              style={{ width: containerRef.current?.offsetWidth ? `${containerRef.current.offsetWidth * 0.7}px` : 'auto' }}
            >
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-charcoal-400">
                <Building2 className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-widest text-charcoal-400 font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-2">
                BEFORE
              </span>
              <h4 className="font-serif text-lg md:text-xl font-medium text-charcoal-200 mb-1">
                Bare Empty Convention Hall
              </h4>
              <p className="text-xs text-charcoal-400 font-sans">
                Empty concrete floor and standard venue walls prior to styling.
              </p>
            </div>
          )}

          {/* Before Badge */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full bg-black/70 text-charcoal-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md border border-white/10 shadow-md">
            BEFORE 🏗️
          </div>
        </div>

        {/* DRAG HANDLE DIVIDER */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-gold-400 shadow-[0_0_15px_rgba(229,205,135,0.8)] cursor-ew-resize z-20 flex items-center justify-center"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="w-10 h-10 -ml-[19px] rounded-full bg-gold-500 text-charcoal-950 flex items-center justify-center shadow-gold-glow border-2 border-ivory-50 transition-transform hover:scale-110 active:scale-95">
            <ChevronsLeftRight className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>
      </div>

      {/* Slider Meta & Caption */}
      <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-2 text-sm">
        <div>
          <h4 className="font-serif text-lg font-semibold text-charcoal-900">
            {item.title}
          </h4>
          <p className="text-xs text-charcoal-600">
            {item.venue_location} • {item.description}
          </p>
        </div>
        <div className="text-xs text-gold-700 font-medium bg-gold-50 px-3 py-1 rounded-full border border-gold-200 self-start md:self-auto flex items-center gap-1.5">
          <ChevronsLeftRight className="w-3.5 h-3.5" />
          <span>Drag slider to reveal transformation</span>
        </div>
      </div>
    </div>
  );
};
