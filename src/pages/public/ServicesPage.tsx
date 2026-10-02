import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Crown, Sun, PartyPopper, Heart, Smile, Building2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { LuxuryPlaceholder } from '../../components/ui/LuxuryPlaceholder';

export const ServicesPage: React.FC = () => {
  const { services } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Our Full Capabilities
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-6">
          Bespoke Event Styling Services
        </h1>
        <p className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
          From sacred temple mandapams and energetic haldi lawns to whimsical birthday wonderland setups, our skilled artisans bring your dream celebrations to life across Hyderabad.
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-12">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.id}
              className={`bg-white rounded-3xl p-6 sm:p-10 border border-gold-200/80 shadow-luxury flex flex-col ${
                isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 items-center`}
            >
              {/* Visual Card */}
              <div className="w-full lg:w-1/2">
                <LuxuryPlaceholder
                  category={service.category}
                  title={service.title}
                  subtitle={service.short_desc}
                  aspectRatio="video"
                />
              </div>

              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-gold-600" />
                  <span>{service.category}</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                  {service.title}
                </h2>

                <p className="text-sm text-charcoal-600 leading-relaxed font-sans">
                  {service.full_desc || service.short_desc}
                </p>

                <div className="pt-4 flex flex-wrap gap-4">
                  <Link
                    to={`/plan-event?service=${encodeURIComponent(service.title)}`}
                    className="px-6 py-3 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                  >
                    <span>Plan This Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    to={`/portfolio?category=${encodeURIComponent(service.category)}`}
                    className="px-6 py-3 rounded-full border border-gold-400 text-charcoal-800 hover:bg-gold-50 text-xs font-semibold uppercase tracking-wider transition-colors"
                  >
                    View Real Work
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Vision CTA */}
      <div className="rounded-3xl bg-ivory-200/80 p-8 sm:p-12 text-center border border-gold-300">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900 mb-3">
          Have a Custom Pinterest Moodboard or Theme?
        </h3>
        <p className="text-sm text-charcoal-600 max-w-xl mx-auto mb-6">
          Share your reference images and venue dimensions with us. We will generate a customized concept proposal and quote.
        </p>
        <Link
          to="/request-quote"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all"
        >
          <span>Submit Custom Request</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
