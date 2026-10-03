import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Facebook, 
  Youtube, 
  ShieldCheck, 
  ArrowUpRight 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { EVENT_CATEGORIES } from '../../lib/constants';

export const Footer: React.FC = () => {
  const { siteSettings } = useStore();

  return (
    <footer className="bg-charcoal-950 text-ivory-100 border-t border-gold-500/20 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND & CTA STRIP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-charcoal-800">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gold-500 text-charcoal-950 flex items-center justify-center font-serif font-bold text-xl shadow-gold-glow">
                SMS
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-ivory-50 tracking-wide">
                  SMS Events and Decors
                </h3>
                <p className="text-xs uppercase tracking-widest text-gold-400 font-medium">
                  We Turn Celebrations Into Experiences
                </p>
              </div>
            </div>
            <p className="text-sm text-charcoal-400 max-w-lg leading-relaxed font-sans">
              Hyderabad’s luxury event styling and decoration studio. We craft unforgettable visual ambiences for weddings, engagements, birthdays, haldi, mehendi, and bespoke milestones.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-4">
            <Link
              to="/plan-event"
              className="px-6 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-gold-glow flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Interactive Event Planner</span>
            </Link>
            <Link
              to="/request-quote"
              className="px-6 py-3.5 rounded-full border border-gold-400/50 hover:border-gold-400 text-ivory-50 font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>Get Free Quotation</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* MAIN FOOTER GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12">
          
          {/* Col 1: Event Categories */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-serif text-base text-gold-300 font-semibold mb-4 tracking-wider uppercase text-xs">
              Celebration Types
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-400">
              {EVENT_CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link 
                    to={`/portfolio?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-gold-400 transition-colors"
                  >
                    {cat.name} Decor
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/services" className="text-gold-400 font-medium hover:underline">
                  + View All 10 Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Styles & Links */}
          <div>
            <h4 className="font-serif text-base text-gold-300 font-semibold mb-4 tracking-wider uppercase text-xs">
              Explore & Plan
            </h4>
            <ul className="space-y-2 text-xs text-charcoal-400">
              <li><Link to="/styles" className="hover:text-gold-400 transition-colors">Find Your Decor Style</Link></li>
              <li><Link to="/portfolio" className="hover:text-gold-400 transition-colors">Real Work Gallery</Link></li>
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Our Studio</Link></li>
              <li><Link to="/plan-event" className="hover:text-gold-400 transition-colors">Event Planner</Link></li>
            </ul>
          </div>

          {/* Col 3: Service Locations */}
          <div>
            <h4 className="font-serif text-base text-gold-300 font-semibold mb-4 tracking-wider uppercase text-xs">
              Service Areas
            </h4>
            <p className="text-xs text-charcoal-400 leading-relaxed mb-3">
              Serving premier celebrations across Telangana & Andhra Pradesh:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px] text-charcoal-300">
              {['Hyderabad', 'Warangal', 'Vijayawada', 'Guntur', 'Khammam', 'Karimnagar', 'Nizamabad', 'Visakhapatnam', 'Secunderabad'].map((area) => (
                <span key={area} className="px-2 py-0.5 rounded bg-charcoal-900 border border-charcoal-800">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h4 className="font-serif text-base text-gold-300 font-semibold mb-4 tracking-wider uppercase text-xs">
              Direct Contact
            </h4>
            <ul className="space-y-3 text-xs text-charcoal-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${siteSettings.contact_phone}`} className="hover:text-gold-400">
                  {siteSettings.contact_phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`mailto:${siteSettings.contact_email}`} className="hover:text-gold-400">
                  {siteSettings.contact_email}
                </a>
              </li>
            </ul>

            <div className="flex items-center gap-3 mt-4">
              <a 
                href={siteSettings.instagram_url} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:border-gold-500 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={siteSettings.facebook_url} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:border-gold-500 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href={siteSettings.youtube_url} 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-charcoal-900 border border-charcoal-800 flex items-center justify-center text-charcoal-400 hover:text-gold-400 hover:border-gold-500 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT & ADMIN LINK */}
        <div className="pt-8 border-t border-charcoal-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-500">
          <p>© {new Date().getFullYear()} SMS Events and Decors. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-charcoal-300">Privacy & Terms</Link>
            <span>•</span>
            <Link to="/admin/login" className="flex items-center gap-1 hover:text-gold-400 transition-colors text-charcoal-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Owner Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
