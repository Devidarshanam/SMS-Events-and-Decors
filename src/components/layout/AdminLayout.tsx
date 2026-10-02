import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Sparkles, 
  CalendarDays, 
  MessageSquareQuote, 
  FileText, 
  Layers, 
  Palette, 
  Package, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Camera, 
  Menu, 
  X, 
  ArrowLeft,
  ChevronsLeftRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const AdminLayout: React.FC = () => {
  const { user, isAdmin, logout, isLoading } = useAuth();
  const { leads } = useStore();
  const navigate = useNavigate();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-charcoal-950">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Verify admin authorization
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const newLeadsCount = leads.filter(l => l.status === 'New').length;

  const adminNavItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Portfolio Projects', path: '/admin/portfolio', icon: ImageIcon },
    { name: 'Photo Gallery', path: '/admin/gallery', icon: Sparkles },
    { name: 'Before & After', path: '/admin/before-after', icon: ChevronsLeftRight },
    { name: 'Enquiries / Leads', path: '/admin/enquiries', icon: MessageSquareQuote, badge: newLeadsCount },
    { name: 'Create Quotes', path: '/admin/quotes', icon: FileText },
    { name: 'Confirmed Events', path: '/admin/events', icon: CalendarDays },
    { name: 'Services CMS', path: '/admin/services', icon: Layers },
    { name: 'Styles Explorer', path: '/admin/styles', icon: Palette },
    { name: 'Packages & Pricing', path: '/admin/packages', icon: Package },
    { name: 'Testimonials CMS', path: '/admin/testimonials', icon: MessageCircle },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-charcoal-900 text-ivory-100 flex flex-col md:flex-row">
      
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 bg-charcoal-950 border-r border-charcoal-800 flex-col shrink-0">
        {/* Header Branding */}
        <div className="p-5 border-b border-charcoal-800 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-gold-500 text-charcoal-950 flex items-center justify-center font-serif font-bold text-base shadow-gold-glow">
              SMS
            </div>
            <div>
              <h3 className="font-serif font-bold text-sm text-ivory-50 leading-tight">Admin Portal</h3>
              <span className="text-[10px] text-gold-400 font-medium">Business Owner Studio</span>
            </div>
          </Link>
          <Link to="/" target="_blank" className="text-charcoal-400 hover:text-white p-1" title="View Public Website">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Quick Camera Capture CTA */}
        <div className="p-4 border-b border-charcoal-800/80">
          <Link
            to="/admin/portfolio?action=new"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow transition-all active:scale-95"
          >
            <Camera className="w-4 h-4" />
            <span>+ Quick Add Project</span>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-gold-500 text-charcoal-950 shadow-gold-glow font-bold'
                    : 'text-charcoal-300 hover:text-ivory-50 hover:bg-charcoal-900'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span className="px-1.5 py-0.5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-charcoal-800 bg-charcoal-950/80">
          <div className="flex items-center justify-between">
            <div className="overflow-hidden pr-2">
              <p className="text-xs font-medium text-ivory-100 truncate">{user.full_name}</p>
              <p className="text-[10px] text-gold-400 uppercase tracking-widest font-semibold">{user.role}</p>
            </div>
            <button
              onClick={() => {
                logout();
                navigate('/admin/login');
              }}
              className="p-1.5 text-charcoal-400 hover:text-red-400 rounded-lg hover:bg-charcoal-900 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <div className="md:hidden bg-charcoal-950 border-b border-charcoal-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="p-1.5 rounded-lg text-ivory-100 hover:bg-charcoal-800"
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-serif font-bold text-sm text-ivory-50">SMS Admin</span>
        </div>

        {/* Quick Camera Button on Mobile Header */}
        <div className="flex items-center gap-2">
          <Link
            to="/admin/portfolio?action=new"
            className="flex items-center gap-1 bg-gold-500 text-charcoal-950 text-xs font-bold px-3 py-1.5 rounded-full shadow-gold-glow"
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Upload</span>
          </Link>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-charcoal-950 h-full flex flex-col z-10 border-r border-charcoal-800 p-4">
            <div className="flex items-center justify-between pb-4 border-b border-charcoal-800 mb-3">
              <span className="font-serif font-bold text-base text-gold-400">SMS Admin Portal</span>
              <button onClick={() => setMobileDrawerOpen(false)} className="p-1 text-charcoal-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1 flex-1 overflow-y-auto">
              {adminNavItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.exact}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                      isActive
                        ? 'bg-gold-500 text-charcoal-950 font-bold shadow-gold-glow'
                        : 'text-charcoal-300 hover:bg-charcoal-900'
                    }`
                  }
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && item.badge > 0 ? (
                    <span className="px-1.5 py-0.5 rounded-full bg-terracotta-500 text-white text-[10px] font-bold">
                      {item.badge}
                    </span>
                  ) : null}
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-charcoal-800">
              <Link
                to="/"
                target="_blank"
                className="w-full mb-2 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-charcoal-700 text-charcoal-300 text-xs font-medium"
              >
                <span>View Public Website</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  navigate('/admin/login');
                }}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-red-400 font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN ADMIN WORKSPACE */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
};
