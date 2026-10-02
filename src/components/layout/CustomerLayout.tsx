import React from 'react';
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import { 
  CalendarDays, 
  MessageSquareQuote, 
  FileText, 
  Heart, 
  User, 
  LogOut, 
  Sparkles, 
  ArrowLeft,
  LayoutDashboard
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { WhatsAppButton } from '../ui/WhatsAppButton';

export const CustomerLayout: React.FC = () => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-100">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login?redirect=/dashboard" replace />;
  }

  const menuItems = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'My Events', path: '/dashboard/events', icon: CalendarDays },
    { name: 'My Enquiries', path: '/dashboard/enquiries', icon: MessageSquareQuote },
    { name: 'My Quotes', path: '/dashboard/quotes', icon: FileText },
    { name: 'Saved Designs', path: '/dashboard/saved-designs', icon: Heart },
    { name: 'My Profile', path: '/dashboard/profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-ivory-200/60 flex flex-col md:flex-row">
      
      {/* CUSTOMER SIDEBAR */}
      <aside className="w-full md:w-64 bg-charcoal-950 text-ivory-100 flex flex-col shrink-0 border-r border-gold-500/20">
        <div className="p-6 border-b border-charcoal-800 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gold-500 text-charcoal-950 flex items-center justify-center font-serif font-bold text-base shadow-gold-glow">
              SMS
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-ivory-50">SMS Events & Decors</h3>
              <span className="text-[10px] text-gold-400 font-medium">Customer Portal</span>
            </div>
          </Link>
          <Link to="/" className="text-charcoal-400 hover:text-white p-1" title="Back to Website">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* User Card */}
        <div className="p-5 border-b border-charcoal-800/80 bg-charcoal-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-400/40 text-gold-400 flex items-center justify-center font-bold text-sm">
              {user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <h4 className="text-sm font-semibold text-ivory-50 truncate">{user.full_name}</h4>
              <p className="text-xs text-charcoal-400 truncate">{user.mobile || user.email}</p>
            </div>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="p-4 space-y-1.5 flex-1">
          {menuItems.map((item) => {
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.exact}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-gold-500 text-charcoal-950 shadow-gold-glow font-bold'
                      : 'text-charcoal-300 hover:text-ivory-50 hover:bg-charcoal-900'
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Plan Event Shortcut */}
        <div className="p-4 border-t border-charcoal-800">
          <Link
            to="/plan-event"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-sm hover:from-gold-400 hover:to-gold-500 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Plan New Event</span>
          </Link>

          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="w-full mt-3 flex items-center justify-center gap-2 text-xs text-charcoal-400 hover:text-red-400 py-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/80 backdrop-blur-md border-b border-ivory-300 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-700 bg-gold-50 px-2.5 py-1 rounded-full border border-gold-200">
              Welcome Back
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/portfolio"
              className="text-xs text-charcoal-700 hover:text-gold-700 font-semibold"
            >
              Browse Designs
            </Link>
            <Link
              to="/"
              className="text-xs text-gold-700 font-bold hover:underline"
            >
              Back to Main Website
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 md:p-8 max-w-6xl mx-auto w-full">
          <Outlet />
        </main>
      </div>

      <WhatsAppButton />
    </div>
  );
};
