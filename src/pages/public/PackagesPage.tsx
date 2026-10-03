import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, CheckCircle2, ArrowRight, HelpCircle, PhoneCall } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PackagesPage: React.FC = () => {
  const { packages, siteSettings } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Transparent Estimates
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-4">
          Celebration Packages & Pricing
        </h1>
        <p className="text-base text-charcoal-600 font-sans">
          Curated decoration packages designed to fit intimate living room ceremonies as well as grand ballroom receptions in Hyderabad.
        </p>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`bg-white rounded-3xl p-8 border flex flex-col justify-between relative transition-all duration-300 ${
              pkg.is_popular
                ? 'border-gold-500 shadow-luxury-hover md:-translate-y-2'
                : 'border-gold-200/80 shadow-luxury'
            }`}
          >
            {pkg.is_popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-500 text-charcoal-950 text-[11px] font-bold uppercase tracking-widest shadow-md">
                Most Popular
              </div>
            )}

            <div>
              <span className="text-xs uppercase tracking-widest text-gold-800 font-bold">
                {pkg.tier}
              </span>
              <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-1 mb-2">
                {pkg.name}
              </h2>
              <p className="text-xs text-charcoal-500 mb-6 min-h-[34px]">
                {pkg.tag_line}
              </p>

              <div className="p-4 rounded-2xl bg-ivory-100 border border-gold-200 mb-6">
                <span className="text-xs text-charcoal-500 font-medium">Estimated Investment</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
                  {pkg.starting_price}
                </p>
                <span className="text-[10px] text-charcoal-500">*Final price depends on venue size & flower count</span>
              </div>

              <p className="text-xs font-bold text-charcoal-900 uppercase tracking-wider mb-3">
                Included Features:
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.inclusions.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-charcoal-700">
                    <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to={`/request-quote?package=${encodeURIComponent(pkg.name)}`}
              className={`w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider text-center transition-all shadow-md ${
                pkg.is_popular
                  ? 'bg-gold-500 hover:bg-gold-400 text-charcoal-950 shadow-gold-glow'
                  : 'bg-charcoal-900 hover:bg-gold-600 text-ivory-50'
              }`}
            >
              Customize This Package
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ / Custom package note */}
      <div className="bg-ivory-200/70 p-8 sm:p-12 rounded-3xl border border-gold-300 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-2">
            Need a Completely Custom Quotation?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-600 leading-relaxed">
            Have multiple ceremonies (Haldi + Sangeet + Wedding + Reception)? We offer multi-event bundle discounts and customized on-site design surveys.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 justify-end">
          <Link
            to="/plan-event"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 font-bold text-xs uppercase tracking-wider text-center"
          >
            Use Event Planner
          </Link>
          <a
            href="tel:+917995644101"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-charcoal-800 text-charcoal-900 hover:bg-white font-semibold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Decorator</span>
          </a>
        </div>
      </div>

    </div>
  );
};
