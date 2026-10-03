import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const MobileStickyCTA: React.FC = () => {
  const { siteSettings } = useStore();
  const cleanNumber = (siteSettings.contact_whatsapp || '917995644101').replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hi SMS Events & Decors, I want to discuss decoration for my upcoming event in Hyderabad.")}`;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-charcoal-950/95 backdrop-blur-md border-t border-gold-500/30 px-3 py-2.5 shadow-2xl">
      <div className="grid grid-cols-3 gap-2">
        {/* WhatsApp */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-semibold text-xs transition-colors shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>WhatsApp</span>
        </a>

        {/* Call */}
        <a
          href="tel:+917995644101"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-charcoal-800 active:bg-charcoal-700 text-ivory-100 font-semibold text-xs border border-charcoal-700 transition-colors"
        >
          <PhoneCall className="w-4 h-4 text-gold-400" />
          <span>Call Now</span>
        </a>

        {/* Get Quote / Plan */}
        <Link
          to="/plan-event"
          className="flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-xl bg-gold-500 active:bg-gold-600 text-charcoal-950 font-bold text-xs shadow-gold-glow transition-colors"
        >
          <Sparkles className="w-4 h-4" />
          <span>Plan Event</span>
        </Link>
      </div>
    </div>
  );
};
