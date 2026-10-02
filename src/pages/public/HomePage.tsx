import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  Crown,
  ChevronRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { EVENT_CATEGORIES, DECORATION_STYLES } from '../../lib/constants';
import { LuxuryPlaceholder } from '../../components/ui/LuxuryPlaceholder';
import { BeforeAfterSlider } from '../../components/ui/BeforeAfterSlider';

export const HomePage: React.FC = () => {
  const { beforeAfter, siteSettings } = useStore();
  const navigate = useNavigate();
  const [activeInspirationTab, setActiveInspirationTab] = useState<'wedding' | 'birthday' | 'haldi'>('wedding');

  const heroBeforeAfter = beforeAfter[0] || {
    id: 'hero-ba',
    title: 'Gachibowli Convention Hall Transformation',
    event_type: 'Wedding',
    venue_location: 'Gachibowli, Hyderabad',
    description: 'Transformation of a bare concrete stage into a 30ft luxury floral palace.',
    before_image: '',
    after_image: '',
    is_published: true,
    sort_order: 1,
    created_at: '',
  };

  const inspirationItems = {
    wedding: [
      { title: 'Grand Floral Mandapam', sub: 'Traditional Sacred Architecture' },
      { title: 'Royal Entrance Tunnel', sub: 'Chandelier & Fairy Light Walkway' },
      { title: 'Couple Reception Stage', sub: 'Blush Velvet & 24ft Flower Wall' },
      { title: 'Personalized Photo Booth', sub: 'Custom Monogram Ring Decor' },
    ],
    birthday: [
      { title: 'Theme Backdrop & Cutouts', sub: 'Immersive 3D Stage Sets' },
      { title: 'Organic Balloon Sculptures', sub: 'Pastel Chrome Cloud Garland' },
      { title: 'Cake Table Styling', sub: 'Pedestal Stands & Floral Accents' },
      { title: 'Grand Welcome Arch', sub: 'Themed Lighted Entryway' },
    ],
    haldi: [
      { title: 'Heritage Brass Urli Setup', sub: 'Traditional Groom & Bride Seating' },
      { title: 'Yellow Marigold Canopies', sub: 'Vibrant Floral Curtains & Bells' },
      { title: 'Decorated Floral Jhoola', sub: 'Marigold Wrapped Swing for Photos' },
      { title: 'Festive Rangoli & Props', sub: 'Banana Trunks & Brass Lamps' },
    ],
  };

  return (
    <div className="space-y-20 md:space-y-32">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-8 pb-16 overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-terracotta-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-100 border border-gold-300/80 text-gold-900 text-xs font-bold tracking-widest uppercase mb-6 shadow-sm animate-fade-in">
            <MapPin className="w-3.5 h-3.5 text-gold-700" />
            <span>{siteSettings.service_area}</span>
          </div>

          {/* Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-charcoal-950 leading-[1.08] mb-6">
            We Turn Celebrations <br className="hidden sm:inline" />
            <span className="text-gold-gradient italic font-normal">Into Experiences.</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-charcoal-600 max-w-2xl font-sans font-normal leading-relaxed mb-10">
            {siteSettings.hero_subheading}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              to="/portfolio"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 font-bold text-sm uppercase tracking-wider shadow-luxury transition-all duration-300 hover:shadow-luxury-hover hover:scale-105 active:scale-95 border border-gold-500/30 flex items-center justify-center gap-2"
            >
              <span>Explore Our Work</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/plan-event"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-sm uppercase tracking-wider shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Plan Your Event</span>
            </Link>
          </div>

          {/* Trust Metric Counters */}
          <div className="grid grid-cols-3 gap-6 sm:gap-12 mt-16 pt-10 border-t border-gold-200/80 w-full max-w-2xl">
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">{siteSettings.events_completed}</p>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-charcoal-500 font-semibold mt-0.5">Events Decorated</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">{siteSettings.experience_years}</p>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-charcoal-500 font-semibold mt-0.5">Years Experience</p>
            </div>
            <div>
              <p className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">100%</p>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-charcoal-500 font-semibold mt-0.5">Bespoke Styling</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. EVENT CATEGORIES ("What We Create") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
              Our Specializations
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 mt-1">
              What We Create
            </h2>
          </div>
          <p className="text-sm text-charcoal-600 max-w-md mt-2 md:mt-0">
            From intimate home setups to grand 1000-guest luxury wedding mandapams, we bring dreams into visual reality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {EVENT_CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => navigate(`/portfolio?category=${encodeURIComponent(category.name)}`)}
              className="group cursor-pointer bg-white rounded-2xl p-3 border border-gold-200/80 shadow-luxury transition-all duration-500 hover:-translate-y-1.5 hover:shadow-luxury-hover hover:border-gold-400 flex flex-col justify-between"
            >
              <div>
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <LuxuryPlaceholder
                    category={category.name}
                    title={category.name}
                    subtitle={category.tagline}
                    aspectRatio="video"
                    showBadge={false}
                  />
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-charcoal-950/80 backdrop-blur-md text-gold-300 text-[10px] font-bold uppercase tracking-wider border border-white/10">
                    {category.badge}
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors px-1">
                  {category.name}
                </h3>
                <p className="text-xs text-charcoal-600 font-sans mt-1.5 line-clamp-2 px-1">
                  {category.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-ivory-200 flex items-center justify-between text-xs font-semibold text-gold-700 px-1">
                <span>Explore Designs</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEFORE / AFTER TRANSFORMATION SLIDER */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
            Real Magic In Action
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal-900 mt-1 mb-3">
            From Empty Space to Unforgettable.
          </h2>
          <p className="text-sm text-charcoal-600">
            See how our setup specialists turn ordinary venues and bare walls into royal celebratory wonderlands.
          </p>
        </div>

        <div className="bg-white p-4 sm:p-8 rounded-3xl border border-gold-200/80 shadow-luxury">
          <BeforeAfterSlider item={heroBeforeAfter} />
        </div>
      </section>

      {/* 4. DECORATION STYLE EXPLORER ("Find Your Style") */}
      <section className="bg-charcoal-950 text-ivory-100 py-20 border-y border-gold-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
              Design Aesthetics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-ivory-50 mt-1 mb-3">
              Find Your Style
            </h2>
            <p className="text-sm text-charcoal-400 font-sans">
              Every couple and family has a distinct aesthetic. Explore our 9 signature decoration styles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DECORATION_STYLES.map((style) => (
              <div
                key={style.id}
                onClick={() => navigate(`/styles`)}
                className="group cursor-pointer bg-charcoal-900/90 rounded-2xl p-5 border border-charcoal-800 hover:border-gold-500/60 shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-serif text-2xl font-bold text-ivory-50 group-hover:text-gold-400 transition-colors">
                      {style.name}
                    </h3>
                    <Crown className="w-5 h-5 text-gold-500" />
                  </div>
                  <p className="text-xs text-charcoal-300 leading-relaxed mb-4">
                    {style.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {style.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-charcoal-950 text-gold-300 border border-charcoal-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-gold-400 group-hover:underline">
                    <span>View Style Gallery</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. EVENT INSPIRATION ZONES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
            Zone by Zone Inspiration
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-1 mb-3">
            Every Detail, Perfectly Crafted
          </h2>
          <p className="text-sm text-charcoal-600">
            Explore dedicated setups for each area of your celebration venue.
          </p>

          {/* Tabs */}
          <div className="inline-flex p-1 bg-ivory-200 rounded-full border border-gold-300/40 mt-6">
            {(['wedding', 'birthday', 'haldi'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveInspirationTab(tab)}
                className={`px-6 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all ${
                  activeInspirationTab === tab
                    ? 'bg-charcoal-900 text-ivory-50 shadow-md'
                    : 'text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                {tab === 'wedding' ? 'Weddings & Reception' : tab === 'birthday' ? 'Birthdays' : 'Haldi & Mehendi'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {inspirationItems[activeInspirationTab].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 border border-gold-200/80 shadow-luxury flex flex-col justify-between group hover:border-gold-400 transition-all"
            >
              <div>
                <LuxuryPlaceholder
                  category={activeInspirationTab === 'wedding' ? 'Wedding' : activeInspirationTab === 'birthday' ? 'Birthday' : 'Haldi'}
                  title={item.title}
                  subtitle={item.sub}
                  aspectRatio="square"
                  showBadge={false}
                />
                <h4 className="font-serif text-lg font-bold text-charcoal-900 mt-3 group-hover:text-gold-700 transition-colors">
                  {item.title}
                </h4>
                <p className="text-xs text-charcoal-500 mt-0.5">
                  {item.sub}
                </p>
              </div>
              <Link
                to="/plan-event"
                className="mt-4 pt-3 border-t border-ivory-200 text-xs font-semibold text-gold-700 flex items-center justify-between"
              >
                <span>Add to My Event</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE PLANNER CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="rounded-3xl bg-gradient-to-br from-charcoal-950 via-charcoal-900 to-charcoal-950 p-8 sm:p-14 border border-gold-500/30 text-center relative overflow-hidden shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-terracotta-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-gold-400 font-bold px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              6-Step Visual Planner
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-50 mb-4 leading-tight">
              Ready to Plan Your Dream Celebration?
            </h2>
            <p className="text-sm sm:text-base text-charcoal-300 font-sans max-w-xl mb-8 leading-relaxed">
              Select your event date, Hyderabad venue, guest count, and preferred decor style in under 2 minutes for an instant bespoke quote.
            </p>

            <Link
              to="/plan-event"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Event Planner</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
