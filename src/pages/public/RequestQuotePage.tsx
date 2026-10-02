import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { 
  Send, 
  Upload, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  Users, 
  IndianRupee,
  Camera,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { EventCategory } from '../../types';

export const RequestQuotePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitLead, siteSettings, processAndUploadImage } = useStore();

  const [formData, setFormData] = useState({
    name: user?.full_name || '',
    mobile: user?.mobile || '',
    email: user?.email || '',
    event_type: (searchParams.get('type') || searchParams.get('category') || 'Wedding') as EventCategory,
    event_date: '2026-12-20',
    location: 'Hyderabad',
    guest_count: '100-200',
    budget_range: '₹50,000 - ₹1,00,000',
    style: searchParams.get('style') || 'Royal',
    requirements: searchParams.get('reference') ? `Interested in similar setup to: ${searchParams.get('reference')}` : '',
  });

  const [referenceImages, setReferenceImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadId, setLeadId] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsUploading(true);
    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        const base64Url = await processAndUploadImage(file, 'event-references');
        setReferenceImages(prev => [...prev, base64Url]);
      } catch (err) {
        console.error('Image upload failed', err);
      }
    }
    setIsUploading(false);
  };

  const removeImage = (index: number) => {
    setReferenceImages(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) {
      alert('Please enter your name and mobile number.');
      return;
    }

    const res = await submitLead({
      ...formData,
      reference_images: referenceImages,
    });

    if (res.success) {
      setLeadId(res.leadId);
      setIsSubmitted(true);
    }
  };

  const cleanNumber = (siteSettings.contact_whatsapp || '919876543210').replace(/\D/g, '');
  const waCustomText = `Hi SMS Events and Decors, I have submitted a quote request for my ${formData.event_type} on ${formData.event_date} at ${formData.location}. Please check and provide quotation.`;
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waCustomText)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Personalized Proposal
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 mt-3 mb-2">
          Request a Custom Quotation
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 font-sans">
          Tell us about your celebration details and we'll craft an itemized estimate with design concepts.
        </p>
      </div>

      {isSubmitted ? (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-300 shadow-luxury text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gold-100 text-gold-700 flex items-center justify-center mx-auto shadow-gold-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal-900">
            Thank you! Your event request has been received.
          </h2>
          <p className="text-sm text-charcoal-600 max-w-lg mx-auto">
            We will contact you on <span className="font-semibold text-charcoal-900">{formData.mobile}</span> with customized decoration design options and itemized quotation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>

            {user && (
              <Link
                to="/dashboard/enquiries"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-charcoal-300 text-charcoal-800 font-semibold text-xs uppercase tracking-wider hover:bg-ivory-100"
              >
                View My Enquiry
              </Link>
            )}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-gold-200/80 shadow-luxury space-y-8">
          
          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 border-b border-ivory-300 pb-2">
              1. Your Contact Information
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Reddy"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. ramesh@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          </div>

          {/* Event Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 border-b border-ivory-300 pb-2">
              2. Event Parameters
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Celebration Type *
                </label>
                <select
                  value={formData.event_type}
                  onChange={(e) => setFormData({ ...formData, event_type: e.target.value as any })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                >
                  {['Wedding', 'Engagement', 'Birthday', 'Baby Shower', 'Haldi', 'Mehendi', 'Anniversary', 'Traditional Celebrations', 'Corporate Events', 'Home Events', 'Customized Celebrations'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Event Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.event_date}
                  onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Venue / Location in Hyderabad *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Banjara Hills Banquet / Residence"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Guest Count
                </label>
                <select
                  value={formData.guest_count}
                  onChange={(e) => setFormData({ ...formData, guest_count: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                >
                  {['Under 50', '50–100', '100–200', '200–500', '500+'].map(g => (
                    <option key={g} value={g}>{g} Guests</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Budget Expectation
                </label>
                <select
                  value={formData.budget_range}
                  onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                >
                  {['₹10K–₹25K', '₹25K–₹50K', '₹50K–₹1L', '₹1L+'].map(b => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Decor Style
                </label>
                <select
                  value={formData.style}
                  onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                >
                  {['Royal', 'Floral', 'Minimal', 'Traditional', 'Luxury', 'Modern', 'Pastel', 'Rustic', 'Colorful'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>

            </div>
          </div>

          {/* Requirements & Reference Photos */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900 border-b border-ivory-300 pb-2">
              3. Requirements & Reference Images
            </h3>
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Specific Elements / Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention specific flowers, stage backdrop dimensions, photo booth requirements, couple names, etc."
                value={formData.requirements}
                onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            {/* Reference Images Upload (Supports Phone Camera / Gallery) */}
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Upload Reference Photos or Pinterest Screenshots (Optional)
              </label>
              
              <div className="flex flex-wrap items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-dashed border-gold-400 bg-gold-50/50 hover:bg-gold-50 text-xs font-bold text-gold-900 uppercase tracking-wider transition-colors">
                  <Camera className="w-4 h-4 text-gold-700" />
                  <span>{isUploading ? 'Uploading...' : '+ Add Photos'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>

                {referenceImages.map((img, idx) => (
                  <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-gold-300 shadow-sm">
                    <img src={img} alt="Reference" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/70 text-white flex items-center justify-center text-[10px]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-102 active:scale-98"
          >
            <Send className="w-4 h-4" />
            <span>Request My Quotation</span>
          </button>

        </form>
      )}

    </div>
  );
};
