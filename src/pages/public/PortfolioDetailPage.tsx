import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowLeft, 
  MapPin, 
  Heart, 
  Share2, 
  ArrowRight, 
  CheckCircle2, 
  Camera,
  Layers,
  Crown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { LuxuryPlaceholder } from '../../components/ui/LuxuryPlaceholder';

export const PortfolioDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { portfolio, toggleSaveDesign, isDesignSaved } = useStore();

  const project = portfolio.find(p => p.id === id || p.slug === id);

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="font-serif text-3xl font-bold text-charcoal-900 mb-4">Project Not Found</h2>
        <p className="text-sm text-charcoal-600 mb-6">The requested portfolio project could not be found or has been moved.</p>
        <Link to="/portfolio" className="px-6 py-2.5 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const isSaved = isDesignSaved(project.id);

  const sections = [
    { name: 'Grand Stage & Couple Seating', desc: 'Central focal point tailored with customized florals and lighting.' },
    { name: 'Entryway Tunnel & Walkway', desc: 'Immersive welcome walkway with fairy lights and botanical arches.' },
    { name: 'Photo Booth & Monogram Zone', desc: 'Dedicated guest portrait point with customized LED lights.' },
    { name: 'Dining & Table Styling', desc: 'Floral centerpieces and banquet ambiance.' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14 space-y-12">
      
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-charcoal-600 hover:text-charcoal-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleSaveDesign({
              id: project.id,
              title: project.title,
              image_url: project.cover_image,
              category: project.event_type,
              type: 'portfolio',
            })}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold border transition-all ${
              isSaved
                ? 'bg-terracotta-500 text-white border-terracotta-500 shadow-md'
                : 'bg-white text-charcoal-800 border-gold-300 hover:bg-gold-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            <span>{isSaved ? 'Saved to Wishlist' : 'Save Design'}</span>
          </button>
        </div>
      </div>

      {/* Hero Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cover / Main Visual */}
        <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-gold-300 shadow-luxury">
          <LuxuryPlaceholder
            category={project.event_type}
            title={project.title}
            subtitle={project.location}
            aspectRatio="wide"
            imageSrc={project.cover_image}
          />
        </div>

        {/* Project Meta Card */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-gold-200/80 shadow-luxury space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-900 text-xs font-bold uppercase tracking-wider">
                {project.event_type}
              </span>
              <span className="flex items-center gap-1 text-xs text-charcoal-500 font-medium">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                {project.location}
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
              {project.title}
            </h1>
            <p className="text-xs font-bold text-gold-800 uppercase tracking-wide mt-2">
              Theme: {project.theme}
            </p>
          </div>

          <div className="space-y-2 text-xs text-charcoal-600">
            <p className="font-medium text-charcoal-900">Celebration Story:</p>
            <p className="leading-relaxed">{project.description}</p>
          </div>

          {project.client_requirement && (
            <div className="p-3.5 rounded-2xl bg-ivory-100 border border-gold-200 text-xs text-charcoal-700">
              <p className="font-bold text-charcoal-900 mb-1">Customer Requirement:</p>
              <p className="italic">"{project.client_requirement}"</p>
            </div>
          )}

          {/* Primary CTA */}
          <div className="pt-2">
            <Link
              to={`/request-quote?reference=${encodeURIComponent(project.title)}&type=${encodeURIComponent(project.event_type)}`}
              className="w-full py-3.5 px-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>I Want Something Like This</span>
            </Link>
          </div>
        </div>

      </div>

      {/* Detailed Gallery Breakdown */}
      <div className="space-y-8 pt-8 border-t border-gold-200">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-700 font-bold">
            Comprehensive Decor Gallery
          </span>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900 mt-1">
            Visual Highlights & Setup Breakdown
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-4 border border-gold-200/80 shadow-luxury space-y-3">
              <LuxuryPlaceholder
                category={project.event_type}
                title={sec.name}
                subtitle={sec.desc}
                aspectRatio="square"
                showBadge={false}
              />
              <div>
                <h4 className="font-serif font-bold text-base text-charcoal-900">{sec.name}</h4>
                <p className="text-xs text-charcoal-500 mt-1 line-clamp-2">{sec.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA Strip */}
      <div className="rounded-3xl bg-charcoal-950 text-ivory-100 p-8 sm:p-12 border border-gold-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-ivory-50">
            Inspired by this celebration?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Let's customize this decoration style for your upcoming event date in Hyderabad.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Link
            to="/plan-event"
            className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow"
          >
            Start Planning Now
          </Link>
        </div>
      </div>

    </div>
  );
};
