import React from 'react';
import { Sparkles, Crown, Heart, PartyPopper, Sun, Smile, Building2, Home, Camera } from 'lucide-react';
import { EventCategory } from '../../types';

interface LuxuryPlaceholderProps {
  category?: EventCategory | string;
  title?: string;
  subtitle?: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'wide' | 'auto';
  className?: string;
  imageSrc?: string;
  showBadge?: boolean;
}

const getCategoryDetails = (category?: string) => {
  switch (category) {
    case 'Wedding':
      return {
        icon: Crown,
        gradient: 'from-[#2C1D11] via-[#1E140C] to-[#120B06]',
        accent: '#D4AF37',
        sub: 'Royal Mandapam & Stage Decor',
      };
    case 'Engagement':
      return {
        icon: Heart,
        gradient: 'from-[#331C24] via-[#241319] to-[#140A0E]',
        accent: '#E5A4B2',
        sub: 'Floral Backdrop & Ring Ceremony',
      };
    case 'Birthday':
      return {
        icon: PartyPopper,
        gradient: 'from-[#1E2638] via-[#141926] to-[#0A0D14]',
        accent: '#A5B4FC',
        sub: 'Themed Balloon Art & Stage Sets',
      };
    case 'Haldi':
      return {
        icon: Sun,
        gradient: 'from-[#382E10] via-[#292109] to-[#141003]',
        accent: '#FCD34D',
        sub: 'Marigold Canopies & Brass Urli',
      };
    case 'Mehendi':
      return {
        icon: Sparkles,
        gradient: 'from-[#192E21] via-[#101F16] to-[#070F0A]',
        accent: '#86EFAC',
        sub: 'Boho Drapes & Floral Swings',
      };
    case 'Baby Shower':
      return {
        icon: Smile,
        gradient: 'from-[#33261C] via-[#241B13] to-[#140E0A]',
        accent: '#FDBA74',
        sub: 'Pastel Dreams & Blessed Cradles',
      };
    case 'Corporate Events':
      return {
        icon: Building2,
        gradient: 'from-[#1F2937] via-[#171F2A] to-[#0D1219]',
        accent: '#94A3B8',
        sub: 'Branded Stage & Gala Lighting',
      };
    case 'Home Events':
      return {
        icon: Home,
        gradient: 'from-[#292524] via-[#1C1917] to-[#0C0A09]',
        accent: '#D6D3D1',
        sub: 'Intimate Living Space Transformations',
      };
    default:
      return {
        icon: Sparkles,
        gradient: 'from-[#2B231D] via-[#1C1713] to-[#0F0C0A]',
        accent: '#C5A880',
        sub: 'Bespoke Luxury Event Styling',
      };
  }
};

export const LuxuryPlaceholder: React.FC<LuxuryPlaceholderProps> = ({
  category,
  title,
  subtitle,
  aspectRatio = 'video',
  className = '',
  imageSrc,
  showBadge = true,
}) => {
  // If an actual photo URL is supplied, display the real image!
  if (imageSrc && imageSrc.trim() !== '') {
    return (
      <div className={`relative overflow-hidden group w-full ${className}`}>
        <img
          src={imageSrc}
          alt={title || category || 'Event Decor'}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>
    );
  }

  const { icon: Icon, gradient, accent, sub } = getCategoryDetails(category);

  const aspectClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    wide: 'aspect-[21/9]',
    auto: 'h-full min-h-[220px]',
  }[aspectRatio];

  return (
    <div
      className={`relative w-full ${aspectClasses} overflow-hidden rounded-xl bg-gradient-to-br ${gradient} border border-gold-500/20 shadow-luxury flex flex-col items-center justify-center p-6 text-center select-none group transition-all duration-500 hover:border-gold-500/50 hover:shadow-luxury-hover ${className}`}
    >
      {/* Decorative luxury gold grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${accent} 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Decorative Corner Filigrees */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-gold-400/40 rounded-tl" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-gold-400/40 rounded-tr" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-gold-400/40 rounded-bl" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-gold-400/40 rounded-br" />

      {/* Subtle glowing halo behind icon */}
      <div 
        className="absolute w-28 h-28 rounded-full blur-2xl opacity-20 pointer-events-none transition-transform duration-700 group-hover:scale-125"
        style={{ backgroundColor: accent }}
      />

      {/* Icon Badge */}
      <div 
        className="relative z-10 w-14 h-14 rounded-full flex items-center justify-center mb-3 transition-transform duration-500 group-hover:scale-110 shadow-lg border border-white/10"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: accent
        }}
      >
        <Icon className="w-7 h-7" />
      </div>

      {/* Category / Title */}
      <div className="relative z-10 max-w-[85%]">
        {showBadge && category && (
          <span 
            className="inline-block text-[11px] font-semibold tracking-widest uppercase px-2.5 py-0.5 rounded-full mb-1.5 border border-white/10 bg-white/5"
            style={{ color: accent }}
          >
            {category}
          </span>
        )}
        <h4 className="font-serif text-ivory-50 text-base md:text-lg font-medium leading-snug line-clamp-1">
          {title || category || 'SMS Events and Decors'}
        </h4>
        <p className="text-ivory-300/70 text-xs mt-1 font-sans line-clamp-1">
          {subtitle || sub}
        </p>
      </div>

      {/* Aesthetic watermark branding */}
      <div className="absolute bottom-2.5 flex items-center gap-1 text-[10px] text-ivory-400/40 tracking-wider uppercase font-medium">
        <Sparkles className="w-3 h-3 text-gold-400/50" />
        <span>SMS Events & Decors</span>
      </div>
    </div>
  );
};
