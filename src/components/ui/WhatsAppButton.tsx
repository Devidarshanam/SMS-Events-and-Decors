import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

interface WhatsAppButtonProps {
  customMessage?: string;
  className?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ customMessage, className = '' }) => {
  const { siteSettings } = useStore();
  const [isOpen, setIsOpen] = useState(false);

  const cleanNumber = (siteSettings.contact_whatsapp || '919876543210').replace(/\D/g, '');
  const defaultText = customMessage || "Hi SMS Events and Decors, I'm interested in your event decoration services in Hyderabad. I would like to discuss design options and get a quotation.";
  const encodedMsg = encodeURIComponent(defaultText);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedMsg}`;

  return (
    <div className={`fixed bottom-24 right-5 md:bottom-8 md:right-8 z-40 flex flex-col items-end ${className}`}>
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-72 bg-white rounded-2xl shadow-luxury-hover border border-gold-300/60 p-4 animate-fade-in relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 text-charcoal-400 hover:text-charcoal-700 p-1"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3 mb-2.5">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
              SMS
            </div>
            <div>
              <h5 className="font-semibold text-charcoal-900 text-sm">SMS Events & Decors</h5>
              <span className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                Online | Quick Response
              </span>
            </div>
          </div>

          <p className="text-xs text-charcoal-600 mb-3 bg-ivory-100 p-2.5 rounded-lg border border-ivory-300">
            👋 Need instant pricing or decoration ideas for your celebration in Hyderabad? Chat with us directly on WhatsApp!
          </p>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact on WhatsApp"
        className="group relative w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white"
      >
        <div className="absolute -inset-1 bg-emerald-500/40 rounded-full blur animate-pulse" />
        <MessageCircle className="w-7 h-7 relative z-10 fill-current" />
      </button>
    </div>
  );
};
