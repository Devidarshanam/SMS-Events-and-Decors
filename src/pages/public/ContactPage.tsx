import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  Send, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { siteSettings, submitLead } = useStore();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [sent, setSent] = useState(false);

  const cleanNumber = (siteSettings.contact_whatsapp || '919876543210').replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent("Hi SMS Events and Decors, I would like to enquire about decoration for my upcoming event in Hyderabad.")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    await submitLead({
      name: formData.name,
      mobile: formData.phone,
      email: formData.email,
      event_type: 'Customized Celebrations',
      location: 'Hyderabad',
      requirements: formData.message,
    });
    setSent(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Get in Touch
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-4">
          Let’s Discuss Your Celebration
        </h1>
        <p className="text-base text-charcoal-600 font-sans">
          Have an upcoming wedding, engagement, or birthday in Hyderabad? Reach out directly via call, WhatsApp, or send an enquiry.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white p-6 rounded-3xl border border-gold-200/80 shadow-luxury space-y-6">
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              SMS Events and Decors
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal-700">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal-900">Studio & Workshop:</p>
                  <p className="text-charcoal-600">{siteSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal-900">Consultation Hours:</p>
                  <p className="text-charcoal-600">Monday – Sunday: 9:00 AM – 9:00 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal-900">Direct Phone:</p>
                  <a href={`tel:${siteSettings.contact_phone}`} className="text-gold-800 font-semibold hover:underline">
                    {siteSettings.contact_phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-charcoal-900">Email Address:</p>
                  <a href={`mailto:${siteSettings.contact_email}`} className="text-gold-800 font-semibold hover:underline">
                    {siteSettings.contact_email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${siteSettings.contact_phone}`}
                className="py-3 px-4 rounded-xl bg-charcoal-900 text-ivory-50 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md hover:bg-gold-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5 shadow-md hover:bg-emerald-700 transition-colors"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Media Links */}
            <div className="pt-4 border-t border-ivory-200">
              <p className="text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-3">
                Follow Our Latest Work:
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={siteSettings.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-ivory-100 hover:bg-gold-100 text-charcoal-800 hover:text-gold-800 transition-colors border border-gold-200"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.facebook_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-ivory-100 hover:bg-gold-100 text-charcoal-800 hover:text-gold-800 transition-colors border border-gold-200"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={siteSettings.youtube_url}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-full bg-ivory-100 hover:bg-gold-100 text-charcoal-800 hover:text-gold-800 transition-colors border border-gold-200"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-gold-200/80 shadow-luxury">
          {sent ? (
            <div className="text-center py-12 space-y-4 animate-fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-charcoal-900">Message Received!</h3>
              <p className="text-xs sm:text-sm text-charcoal-600 max-w-md mx-auto">
                Thank you for contacting SMS Events and Decors. Our event coordinator will call you back within a few hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  We usually respond within 30 minutes during business hours.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sneha Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. sneha@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Your Message or Event Details *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about the event type, venue, date, or any specific questions..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
