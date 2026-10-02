import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, Clock, Award, Users, CheckCircle, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AboutPage: React.FC = () => {
  const { siteSettings } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-20">
      
      {/* 1. HERO INTRO */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Our Story & Philosophy
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-6 leading-tight">
          Crafting Unforgettable Moments Across Hyderabad.
        </h1>
        <p className="text-base sm:text-lg text-charcoal-600 font-sans leading-relaxed">
          SMS Events and Decors was founded with a singular passion: to elevate celebrations from simple gatherings into immersive, emotive, and visually breathtaking experiences.
        </p>
      </div>

      {/* 2. THE STORY BEHIND SMS EVENTS AND DECORS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white p-8 sm:p-14 rounded-3xl border border-gold-200/80 shadow-luxury">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
            How It Began
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            From Humble Passion to Hyderabad’s Trusted Decor Studio
          </h2>
          <p className="text-sm text-charcoal-600 leading-relaxed font-sans">
            What started as styling intimate family poojas and birthdays has blossomed into a full-scale event styling studio delivering over {siteSettings.events_completed} celebrations across Telangana and Andhra Pradesh.
          </p>
          <p className="text-sm text-charcoal-600 leading-relaxed font-sans">
            We believe that every wedding mandapam, every haldi urli, and every milestone backdrop should reflect the distinct personality and heartfelt love of the families celebrating.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ivory-200">
            <div>
              <p className="font-serif text-3xl font-bold text-gold-800">{siteSettings.experience_years}</p>
              <p className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider">Years of Craft</p>
            </div>
            <div>
              <p className="font-serif text-3xl font-bold text-gold-800">{siteSettings.happy_clients}</p>
              <p className="text-xs text-charcoal-500 font-semibold uppercase tracking-wider">Delighted Families</p>
            </div>
          </div>
        </div>

        {/* Visual Brand Panel */}
        <div className="rounded-2xl bg-gradient-to-br from-[#2B1F17] via-[#1F150F] to-[#120C08] p-8 text-ivory-100 border border-gold-500/30 flex flex-col justify-between min-h-[380px] shadow-luxury">
          <div className="flex items-center justify-between">
            <div className="w-12 h-12 rounded-xl bg-gold-500 text-charcoal-950 font-serif font-bold text-2xl flex items-center justify-center shadow-gold-glow">
              SMS
            </div>
            <span className="text-xs text-gold-400 font-mono uppercase tracking-widest">Hyderabad, IN</span>
          </div>

          <div className="my-8">
            <blockquote className="font-serif text-xl sm:text-2xl italic leading-relaxed text-ivory-50">
              "Every celebration deserves a beautiful beginning, an awe-inspiring ambiance, and memories that linger forever."
            </blockquote>
          </div>

          <div className="flex items-center gap-3 border-t border-white/10 pt-4 text-xs text-gold-300">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>SMS Events and Decors Leadership Team</span>
          </div>
        </div>
      </div>

      {/* 3. OUR APPROACH */}
      <div className="space-y-12">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
            How We Work With You
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-1">
            Our 4-Step Styling Approach
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Listen & Discover',
              desc: 'We understand your rituals, guest expectations, color preferences, and budget parameters.',
            },
            {
              step: '02',
              title: 'Concept & Moodboard',
              desc: 'We curate bespoke 3D stage concepts, floral palettes, and lighting layouts customized to your venue.',
            },
            {
              step: '03',
              title: 'Flawless Execution',
              desc: 'Our experienced on-ground craftsmen and floral artisans assemble everything on time with precision.',
            },
            {
              step: '04',
              title: 'Magical Handover',
              desc: 'We conduct full lighting tests and quality checks before your guests arrive, guaranteeing perfection.',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white p-6 rounded-2xl border border-gold-200/80 shadow-luxury flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-gold-500/60 block mb-3">
                  {item.step}
                </span>
                <h3 className="font-serif text-lg font-bold text-charcoal-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. OUR PROMISE */}
      <div className="bg-charcoal-950 text-ivory-100 p-8 sm:p-14 rounded-3xl border border-gold-500/20 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">
            Our Commitment
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-ivory-50">
            The SMS Quality Promise
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-left">
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
              <CheckCircle className="w-6 h-6 text-gold-500 mb-2" />
              <h4 className="font-serif font-bold text-sm text-ivory-50 mb-1">Fresh & Premium Florals</h4>
              <p className="text-xs text-charcoal-400">Hand-selected fresh exotic blooms and grade-A fragrant marigolds.</p>
            </div>
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
              <Clock className="w-6 h-6 text-gold-500 mb-2" />
              <h4 className="font-serif font-bold text-sm text-ivory-50 mb-1">On-Time Readiness</h4>
              <p className="text-xs text-charcoal-400">Setups completed at least 2 hours before the first ritual begins.</p>
            </div>
            <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800">
              <Award className="w-6 h-6 text-gold-500 mb-2" />
              <h4 className="font-serif font-bold text-sm text-ivory-50 mb-1">Zero Hidden Pricing</h4>
              <p className="text-xs text-charcoal-400">Clear itemized quotation with transport and labor included.</p>
            </div>
          </div>

          <div className="pt-8">
            <Link
              to="/plan-event"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all"
            >
              <span>Plan Your Event With Us</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};
