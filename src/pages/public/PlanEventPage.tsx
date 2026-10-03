import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  IndianRupee, 
  Palette, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Send,
  MessageCircle,
  Crown,
  Heart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';
import { EventCategory } from '../../types';

export const PlanEventPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { submitLead, siteSettings } = useStore();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [createdLeadId, setCreatedLeadId] = useState<string>('');

  // Form State
  const [eventType, setEventType] = useState<EventCategory>(
    (searchParams.get('category') as EventCategory) || 'Wedding'
  );
  const [eventDate, setEventDate] = useState<string>('2026-12-15');
  const [venueLocation, setVenueLocation] = useState<string>('Hyderabad (Banjara Hills / Jubilee Hills)');
  const [guestCount, setGuestCount] = useState<string>('100-200');
  const [budgetRange, setBudgetRange] = useState<string>('₹50K–₹1L');
  const [stylePreference, setStylePreference] = useState<string>(
    searchParams.get('style') || 'Royal'
  );
  const [notes, setNotes] = useState<string>('');

  // Contact details if not logged in
  const [customerName, setCustomerName] = useState<string>(user?.full_name || '');
  const [customerPhone, setCustomerPhone] = useState<string>(user?.mobile || '');
  const [customerEmail, setCustomerEmail] = useState<string>(user?.email || '');

  const totalSteps = 6;

  const categories: { label: EventCategory; icon: string }[] = [
    { label: 'Wedding', icon: '👑' },
    { label: 'Engagement', icon: '💍' },
    { label: 'Birthday', icon: '🎂' },
    { label: 'Baby Shower', icon: '👶' },
    { label: 'Haldi', icon: '🌼' },
    { label: 'Mehendi', icon: '🌿' },
    { label: 'Anniversary', icon: '🥂' },
    { label: 'Traditional Celebrations', icon: '🪔' },
    { label: 'Corporate Events', icon: '🏢' },
    { label: 'Home Events', icon: '🏡' },
    { label: 'Customized Celebrations', icon: '✨' },
  ];

  const guestOptions = ['Under 50', '50–100', '100–200', '200–500', '500+'];
  const budgetOptions = ['₹10K–₹25K', '₹25K–₹50K', '₹50K–₹1L', '₹1L+'];
  const styleOptions = [
    { name: 'Royal', desc: 'Regal velvet, gold pillars & crystal chandeliers' },
    { name: 'Floral', desc: 'Fresh cascading roses, orchids & carnations' },
    { name: 'Traditional', desc: 'Marigold torans, brass urlis & sacred motifs' },
    { name: 'Luxury', desc: 'Mirrored stages, acrylic crystal arches' },
    { name: 'Minimal', desc: 'Clean geometric lines & subtle warm glow' },
    { name: 'Pastel', desc: 'Blush pink, mint sage & dreamy clouds' },
    { name: 'Modern', desc: 'Neon typography, asymmetric architectural sets' },
    { name: 'Rustic', desc: 'Boho macrame, wooden logs & pampas grass' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone) {
      alert('Please enter your Name and Mobile Number to receive the quotation.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await submitLead({
        name: customerName,
        mobile: customerPhone,
        email: customerEmail,
        event_type: eventType,
        event_date: eventDate,
        location: venueLocation,
        guest_count: guestCount,
        budget_range: budgetRange,
        style: stylePreference,
        requirements: notes || `Planned ${eventType} celebration in ${venueLocation} for ${guestCount} guests. Style: ${stylePreference}.`,
      });

      if (res.success) {
        setCreatedLeadId(res.leadId);
        setIsCompleted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const cleanNumber = (siteSettings.contact_whatsapp || '919876543210').replace(/\D/g, '');
  const waCustomText = `Hi SMS Events and Decors, I have planned my event on your website:\n\n• Event: ${eventType}\n• Date: ${eventDate}\n• Location: ${venueLocation}\n• Guests: ${guestCount}\n• Style: ${stylePreference}\n• Budget: ${budgetRange}\n\nPlease share quotation and design concepts!`;
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waCustomText)}`;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      {/* Title */}
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Interactive Planner
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-charcoal-900 mt-3 mb-2">
          Design Your Celebration
        </h1>
        <p className="text-xs sm:text-sm text-charcoal-600 font-sans">
          Step by step visual creator — customized for venues across Hyderabad.
        </p>
      </div>

      {isCompleted ? (
        /* SUCCESS COMPLETION SCREEN */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-300 shadow-luxury text-center space-y-6 animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-gold-100 border border-gold-400 text-gold-700 flex items-center justify-center mx-auto shadow-gold-glow">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal-900">
            Thank You, {customerName}!
          </h2>
          <p className="text-sm text-charcoal-600 max-w-lg mx-auto">
            Your celebration plan has been received. Our senior decor stylist will review your venue details and send an itemized quotation shortly.
          </p>

          {/* Event Summary Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-ivory-100 border border-gold-200 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-ivory-300 pb-2">
              <span className="text-charcoal-500 font-semibold">Event Type:</span>
              <span className="font-bold text-charcoal-900">{eventType}</span>
            </div>
            <div className="flex justify-between border-b border-ivory-300 pb-2">
              <span className="text-charcoal-500 font-semibold">Event Date:</span>
              <span className="font-bold text-charcoal-900">{eventDate}</span>
            </div>
            <div className="flex justify-between border-b border-ivory-300 pb-2">
              <span className="text-charcoal-500 font-semibold">Venue / Location:</span>
              <span className="font-bold text-charcoal-900">{venueLocation}</span>
            </div>
            <div className="flex justify-between border-b border-ivory-300 pb-2">
              <span className="text-charcoal-500 font-semibold">Guest Count:</span>
              <span className="font-bold text-charcoal-900">{guestCount} Guests</span>
            </div>
            <div className="flex justify-between border-b border-ivory-300 pb-2">
              <span className="text-charcoal-500 font-semibold">Decor Style:</span>
              <span className="font-bold text-charcoal-900">{stylePreference}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-charcoal-500 font-semibold">Budget Range:</span>
              <span className="font-bold text-gold-800">{budgetRange}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Discuss on WhatsApp</span>
            </a>
            <button
              onClick={() => navigate(user ? '/dashboard/enquiries' : '/portfolio')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-charcoal-300 text-charcoal-800 font-semibold text-xs uppercase tracking-wider hover:bg-ivory-100"
            >
              {user ? 'View My Enquiries' : 'Browse More Work'}
            </button>
          </div>
        </div>
      ) : (
        /* STEP BY STEP FORM */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gold-200/80 shadow-luxury">
          
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between text-xs font-bold text-gold-800 uppercase tracking-wider mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-ivory-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: EVENT TYPE */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  What are you celebrating?
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">Select the event category</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setEventType(cat.label)}
                    className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                      eventType === cat.label
                        ? 'border-gold-500 bg-gold-50/70 shadow-md font-bold text-charcoal-950 scale-102'
                        : 'border-gold-200 bg-ivory-50 text-charcoal-700 hover:border-gold-400'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-xs">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: EVENT DATE */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  When is your celebration?
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">Approximate date or confirmed muhurtham</p>
              </div>

              <div className="max-w-md">
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gold-300 bg-ivory-50 text-charcoal-900 font-medium text-sm focus:outline-none focus:border-gold-500"
                />
              </div>
            </div>
          )}

          {/* STEP 3: VENUE / LOCATION */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  Where is your event?
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">Venue name, banquet hall, or area in Hyderabad</p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="e.g., Novotel Hitec City / Private Villa Jubilee Hills / Home Terrace"
                  value={venueLocation}
                  onChange={(e) => setVenueLocation(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border border-gold-300 bg-ivory-50 text-charcoal-900 text-sm focus:outline-none focus:border-gold-500"
                />

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs text-charcoal-500 font-medium self-center">Popular Locations:</span>
                  {['Hyderabad', 'Warangal', 'Vijayawada', 'Guntur', 'Khammam', 'Karimnagar', 'Secunderabad', 'Home / Outdoor'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setVenueLocation(loc.includes('Home') ? loc : `${loc}, Venue / Residence`)}
                      className="px-3 py-1 rounded-full bg-ivory-100 hover:bg-gold-100 border border-gold-200 text-xs text-charcoal-700 font-medium transition-colors"
                    >
                      + {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: GUEST COUNT */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  How many guests are expected?
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">Helps determine backdrop width & entrance dimensions</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {guestOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setGuestCount(opt)}
                    className={`py-4 px-3 rounded-2xl border text-center transition-all ${
                      guestCount === opt
                        ? 'border-gold-500 bg-gold-50 shadow-md font-bold text-charcoal-950 scale-102'
                        : 'border-gold-200 bg-ivory-50 text-charcoal-700 hover:border-gold-300'
                    }`}
                  >
                    <Users className="w-5 h-5 mx-auto mb-2 text-gold-600" />
                    <span className="text-xs sm:text-sm font-semibold">{opt} Guests</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: BUDGET RANGE */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  What is your approximate budget?
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">We optimize floral varieties to match your investment</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {budgetOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setBudgetRange(opt)}
                    className={`py-5 px-3 rounded-2xl border text-center transition-all ${
                      budgetRange === opt
                        ? 'border-gold-500 bg-gold-50 shadow-md font-bold text-charcoal-950 scale-102'
                        : 'border-gold-200 bg-ivory-50 text-charcoal-700 hover:border-gold-300'
                    }`}
                  >
                    <IndianRupee className="w-5 h-5 mx-auto mb-2 text-gold-600" />
                    <span className="text-xs sm:text-sm font-bold">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: STYLE & CONTACT / QUOTE SUBMISSION */}
          {currentStep === 6 && (
            <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-serif text-2xl font-bold text-charcoal-900">
                  Preferred Decoration Style & Final Details
                </h3>
                <p className="text-xs text-charcoal-500 mt-1">Choose an aesthetic and provide contact info for your quote</p>
              </div>

              {/* Style Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {styleOptions.map((st) => (
                  <button
                    key={st.name}
                    type="button"
                    onClick={() => setStylePreference(st.name)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      stylePreference === st.name
                        ? 'border-gold-500 bg-gold-50 font-bold text-charcoal-950 shadow-sm'
                        : 'border-gold-200 bg-ivory-50 text-charcoal-700'
                    }`}
                  >
                    <span className="text-xs font-bold block">{st.name}</span>
                    <span className="text-[10px] text-charcoal-500 line-clamp-1">{st.desc}</span>
                  </button>
                ))}
              </div>

              {/* Summary Pill Strip */}
              <div className="p-4 rounded-2xl bg-ivory-100 border border-gold-200 text-xs text-charcoal-800 space-y-1">
                <span className="font-bold text-gold-800 uppercase tracking-wide">Summary:</span>
                <p>✦ {eventType} • {eventDate} • {venueLocation}</p>
                <p>✦ {guestCount} Guests • Style: {stylePreference} • Budget: {budgetRange}</p>
              </div>

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
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
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. priya@example.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gold-300 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                  Additional Notes or Specific Elements (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="Any special requests (e.g. flower preference, couple name lights, jhoola)..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gold-300 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting Your Event Plan...' : 'Request My Quotation'}</span>
              </button>
            </form>
          )}

          {/* BACK & NEXT NAVIGATION BUTTONS */}
          {currentStep < 6 && (
            <div className="flex items-center justify-between pt-8 border-t border-ivory-200 mt-8">
              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                disabled={currentStep === 1}
                className="px-5 py-2.5 rounded-full border border-gold-300 text-charcoal-700 text-xs font-bold uppercase tracking-wider hover:bg-ivory-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                onClick={() => setCurrentStep(prev => Math.min(prev + 1, 6))}
                className="px-8 py-3 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
