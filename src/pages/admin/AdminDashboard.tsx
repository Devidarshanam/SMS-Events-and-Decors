import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Camera, 
  MessageSquareQuote, 
  CalendarDays, 
  Image as ImageIcon, 
  FileText, 
  Sparkles, 
  Phone, 
  MessageCircle, 
  ArrowRight,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';

export const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { leads, events, portfolio, quotes, siteSettings } = useStore();

  const newLeads = leads.filter(l => l.status === 'New');
  const upcomingEvents = events.filter(e => e.status === 'Confirmed' || e.status === 'Planning');
  const pendingQuotes = quotes.filter(q => q.status === 'Sent' || q.status === 'Draft');

  const cleanNumber = (phone: string) => phone.replace(/\D/g, '');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Top Welcome Strip & Quick Phone Camera Action */}
      <div className="bg-charcoal-950 p-6 sm:p-8 rounded-3xl border border-charcoal-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs uppercase tracking-widest text-gold-400 font-bold">Studio Control Center</span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-ivory-50 mt-1">
            Welcome, {user?.full_name}
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Publish completed events, review customer enquiries, and manage bookings across Hyderabad.
          </p>
        </div>

        {/* HIGH PRIORITY QUICK CAMERA ADD BUTTON */}
        <Link
          to="/admin/portfolio?action=new"
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2.5 transition-all hover:scale-105 active:scale-95 shrink-0"
        >
          <Camera className="w-5 h-5" />
          <span>+ Add Project From Camera</span>
        </Link>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <Link
          to="/admin/enquiries"
          className="bg-charcoal-950 p-5 rounded-2xl border border-charcoal-800 hover:border-gold-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
              <MessageSquareQuote className="w-5 h-5" />
            </div>
            {newLeads.length > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold animate-pulse">
                {newLeads.length} New
              </span>
            )}
          </div>
          <span className="text-3xl font-serif font-bold text-ivory-50">{leads.length}</span>
          <p className="text-xs text-charcoal-400 mt-0.5">Customer Enquiries</p>
        </Link>

        <Link
          to="/admin/events"
          className="bg-charcoal-950 p-5 rounded-2xl border border-charcoal-800 hover:border-gold-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/20 text-gold-400 flex items-center justify-center">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-bold">
              {upcomingEvents.length} Active
            </span>
          </div>
          <span className="text-3xl font-serif font-bold text-ivory-50">{events.length}</span>
          <p className="text-xs text-charcoal-400 mt-0.5">Confirmed Events</p>
        </Link>

        <Link
          to="/admin/portfolio"
          className="bg-charcoal-950 p-5 rounded-2xl border border-charcoal-800 hover:border-gold-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-serif font-bold text-ivory-50">{portfolio.length}</span>
          <p className="text-xs text-charcoal-400 mt-0.5">Portfolio Projects</p>
        </Link>

        <Link
          to="/admin/quotes"
          className="bg-charcoal-950 p-5 rounded-2xl border border-charcoal-800 hover:border-gold-500/50 transition-all group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>
          <span className="text-3xl font-serif font-bold text-ivory-50">{quotes.length}</span>
          <p className="text-xs text-charcoal-400 mt-0.5">Quotations Issued</p>
        </Link>

      </div>

      {/* Main Grid: Recent Enquiries & Upcoming Events */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-charcoal-950 p-6 rounded-3xl border border-charcoal-800 space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-ivory-50">
                Recent Customer Enquiries
              </h3>
            </div>
            <Link to="/admin/enquiries" className="text-xs text-gold-400 font-bold hover:underline">
              View All ({leads.length})
            </Link>
          </div>

          {leads.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-6 text-center">No enquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {leads.slice(0, 4).map((lead) => {
                const waText = `Hi ${lead.name}, this is SMS Events and Decors regarding your enquiry for ${lead.event_type} on ${lead.event_date || 'your upcoming date'}. Let's discuss!`;
                const waUrl = `https://wa.me/91${cleanNumber(lead.mobile)}?text=${encodeURIComponent(waText)}`;

                return (
                  <div
                    key={lead.id}
                    className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-ivory-100 text-sm">{lead.name}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gold-500/20 text-gold-400 uppercase">
                          {lead.event_type}
                        </span>
                        <span className="text-[10px] text-charcoal-400">
                          {lead.event_date || 'Date TBD'}
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-400 line-clamp-1">{lead.location} • Budget: {lead.budget_range || 'Flexible'}</p>
                    </div>

                    {/* Fast Communication Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${lead.mobile}`}
                        className="p-2 rounded-xl bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-ivory-100 text-xs transition-colors"
                        title="Call Customer"
                      >
                        <Phone className="w-4 h-4" />
                      </a>
                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4 fill-current" />
                      </a>
                      <Link
                        to={`/admin/quotes?lead_id=${lead.id}`}
                        className="px-3 py-2 rounded-xl bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-ivory-100 text-xs font-semibold transition-colors"
                      >
                        + Quote
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Upcoming Confirmed Events (5 cols) */}
        <div className="lg:col-span-5 bg-charcoal-950 p-6 rounded-3xl border border-charcoal-800 space-y-4">
          <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-gold-400" />
              <h3 className="font-serif text-lg font-bold text-ivory-50">
                Upcoming Setup Calendar
              </h3>
            </div>
            <Link to="/admin/events" className="text-xs text-gold-400 font-bold hover:underline">
              Manage
            </Link>
          </div>

          {events.length === 0 ? (
            <p className="text-xs text-charcoal-500 py-6 text-center">No confirmed events.</p>
          ) : (
            <div className="space-y-3">
              {events.slice(0, 3).map((evt) => (
                <div
                  key={evt.id}
                  className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gold-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {evt.event_date}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {evt.status}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm text-ivory-100">{evt.title}</h4>
                  <p className="text-xs text-charcoal-400">{evt.venue}, {evt.city}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
