import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Crown, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { LuxuryPlaceholder } from '../../components/ui/LuxuryPlaceholder';

export const StylesPage: React.FC = () => {
  const { styles } = useStore();
  const [activeStyle, setActiveStyle] = useState<string>(styles[0]?.id || 'style-1');

  const selected = styles.find(s => s.id === activeStyle) || styles[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Aesthetic Direction
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-4">
          Find Your Decoration Style
        </h1>
        <p className="text-base text-charcoal-600 font-sans">
          Discover the distinct aesthetics our studio crafts — from heritage South Indian temple mandapams to contemporary pastel wonderland sets.
        </p>
      </div>

      {/* Style Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setActiveStyle(style.id)}
            className={`px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
              activeStyle === style.id
                ? 'bg-charcoal-900 text-ivory-50 shadow-md scale-105'
                : 'bg-white text-charcoal-700 hover:bg-gold-50 border border-gold-200'
            }`}
          >
            {style.name}
          </button>
        ))}
      </div>

      {/* Active Style Showcase */}
      {selected && (
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-200/80 shadow-luxury grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-50 border border-gold-200 text-gold-800 text-xs font-semibold uppercase tracking-wider">
              <Crown className="w-3.5 h-3.5 text-gold-600" />
              <span>Signature Style</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              The {selected.name} Aesthetic
            </h2>

            <p className="text-sm sm:text-base text-charcoal-600 leading-relaxed font-sans">
              {selected.description}
            </p>

            <div className="space-y-2">
              <p className="text-xs font-bold text-charcoal-900 uppercase tracking-wider">Defining Elements:</p>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-lg bg-ivory-100 border border-gold-200 text-charcoal-800 text-xs font-medium"
                  >
                    ✦ {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                to={`/plan-event?style=${encodeURIComponent(selected.name)}`}
                className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Plan With This Style</span>
              </Link>
              <Link
                to={`/portfolio?style=${encodeURIComponent(selected.name)}`}
                className="px-6 py-3.5 rounded-full border border-gold-300 text-charcoal-800 hover:bg-gold-50 text-xs font-semibold uppercase tracking-wider"
              >
                View Matching Projects
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <LuxuryPlaceholder
              category={selected.name}
              title={`${selected.name} Styling Showcase`}
              subtitle={selected.description}
              aspectRatio="video"
              imageSrc={selected.cover_image}
            />
          </div>

        </div>
      )}

      {/* Grid of All Styles */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl font-bold text-charcoal-900">
          All 9 Decor Design Aesthetics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {styles.map((st) => (
            <div
              key={st.id}
              onClick={() => setActiveStyle(st.id)}
              className={`cursor-pointer bg-white p-6 rounded-2xl border transition-all ${
                activeStyle === st.id
                  ? 'border-gold-500 shadow-luxury-hover scale-102 bg-gold-50/20'
                  : 'border-gold-200/80 shadow-luxury hover:border-gold-300'
              }`}
            >
              <h4 className="font-serif text-xl font-bold text-charcoal-900 mb-2">{st.name}</h4>
              <p className="text-xs text-charcoal-600 line-clamp-2 mb-3">{st.description}</p>
              <div className="flex flex-wrap gap-1">
                {st.tags.slice(0, 2).map(t => (
                  <span key={t} className="text-[10px] bg-ivory-100 text-gold-900 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
