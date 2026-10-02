import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const TestimonialsPage: React.FC = () => {
  const { testimonials } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Client Stories & Reviews
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-4">
          Celebrations We Cherish
        </h1>
        <p className="text-base text-charcoal-600 font-sans">
          Genuine experiences shared by newlyweds, parents, and celebration hosts across Hyderabad.
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-white rounded-3xl p-8 border border-gold-200/80 shadow-luxury flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-1 text-gold-500 mb-4">
                {[...Array(test.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <blockquote className="font-serif text-charcoal-800 text-base leading-relaxed italic mb-6">
                "{test.review_text}"
              </blockquote>
            </div>

            <div className="pt-4 border-t border-ivory-200 flex items-center justify-between">
              <div>
                <h4 className="font-serif font-bold text-charcoal-900 text-base">
                  {test.customer_name}
                </h4>
                <p className="text-xs text-gold-800 font-medium">
                  {test.event_type} • {test.location}
                </p>
                {test.event_date && (
                  <p className="text-[10px] text-charcoal-400 mt-0.5">{test.event_date}</p>
                )}
              </div>

              <div className="w-10 h-10 rounded-full bg-gold-100 text-gold-800 font-bold flex items-center justify-center text-sm shadow-sm">
                {test.customer_name.charAt(0)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Box */}
      <div className="bg-charcoal-950 text-ivory-100 rounded-3xl p-8 sm:p-12 border border-gold-500/20 text-center space-y-6">
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-ivory-50">
          Make Your Celebration Our Next Success Story
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-400 max-w-xl mx-auto">
          Contact our team today to discuss themes, venue walkthroughs, and custom mandapam designs.
        </p>
        <div>
          <Link
            to="/plan-event"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all"
          >
            <span>Start Planning With Us</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
