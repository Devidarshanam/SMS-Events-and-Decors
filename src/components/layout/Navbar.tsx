import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Menu, 
  X, 
  User, 
  Heart, 
  CalendarDays, 
  PhoneCall, 
  ChevronRight,
  ShieldCheck,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, logout } = useAuth();
  const { savedDesigns, siteSettings } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Styles', path: '/styles' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-ivory-50/95 backdrop-blur-md shadow-sm border-b border-gold-300/40 py-3.5'
          : 'bg-ivory-100/80 backdrop-blur-sm border-b border-gold-200/20 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO & BRAND */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-charcoal-900 border border-gold-500/40 flex items-center justify-center text-gold-400 font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform">
              SMS
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg sm:text-xl tracking-tight text-charcoal-900 group-hover:text-gold-700 transition-colors">
                SMS Events & Decors
              </span>
              <span className="text-[10px] tracking-widest uppercase font-medium text-gold-700">
                Luxury Event Styling • Hyderabad
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION LINKS */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? 'text-gold-800 bg-gold-100/80 font-bold'
                      : 'text-charcoal-700 hover:text-gold-700 hover:bg-gold-50/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTION BUTTONS */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* Wishlist Link */}
            <Link
              to={user ? '/dashboard/saved-designs' : '/portfolio'}
              className="relative p-2 rounded-full text-charcoal-600 hover:text-terracotta-600 hover:bg-terracotta-50 transition-colors"
              title="Saved Designs"
            >
              <Heart className="w-5 h-5" />
              {savedDesigns.length > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-terracotta-500 text-white text-[10px] flex items-center justify-center font-bold">
                  {savedDesigns.length}
                </span>
              )}
            </Link>

            {/* User or Admin CTA */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gold-300 bg-gold-50 text-charcoal-900 hover:bg-gold-100 transition-colors"
                >
                  {isAdmin ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-600" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-gold-600" />
                  )}
                  <span>{isAdmin ? 'Admin Portal' : user.full_name.split(' ')[0]}</span>
                </Link>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-xs font-semibold uppercase tracking-wider text-charcoal-700 hover:text-gold-700 px-3 py-1.5"
              >
                Sign In
              </Link>
            )}

            {/* Plan Event Primary Button */}
            <Link
              to="/plan-event"
              className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold bg-charcoal-900 hover:bg-gold-600 text-ivory-50 px-4 py-2.5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg active:scale-95 border border-gold-500/30"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span>Plan Event</span>
            </Link>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              to="/plan-event"
              className="flex items-center gap-1 text-[11px] font-bold bg-charcoal-900 text-ivory-50 px-3 py-1.5 rounded-full"
            >
              <Sparkles className="w-3 h-3 text-gold-400" />
              <span>Plan</span>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-charcoal-800 hover:bg-gold-100/50 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE DRAWER MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-ivory-50 border-b border-gold-300 shadow-xl px-4 pt-3 pb-6 animate-fade-in">
          <div className="space-y-1 mb-4">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold ${
                    isActive
                      ? 'bg-gold-100 text-gold-900 font-bold'
                      : 'text-charcoal-800 hover:bg-ivory-200'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-charcoal-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-gold-200/60 space-y-2">
            <Link
              to="/request-quote"
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-600 text-white font-semibold text-xs uppercase tracking-wider"
            >
              <span>Request Free Quotation</span>
            </Link>

            {user ? (
              <div className="space-y-2 pt-2">
                <Link
                  to={isAdmin ? '/admin' : '/dashboard'}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-charcoal-300 text-charcoal-800 font-semibold text-xs uppercase"
                >
                  {isAdmin ? <ShieldCheck className="w-4 h-4 text-gold-600" /> : <User className="w-4 h-4" />}
                  <span>{isAdmin ? 'Open Admin Portal' : 'My Dashboard'}</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-red-600 font-medium"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  to="/login"
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl border border-gold-300 text-charcoal-800 text-xs font-semibold"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="flex items-center justify-center py-2.5 px-3 rounded-xl bg-charcoal-900 text-white text-xs font-semibold"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
