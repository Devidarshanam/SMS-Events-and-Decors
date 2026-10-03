import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarDays, 
  MessageSquareQuote, 
  FileText, 
  Heart, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  MapPin, 
  PhoneCall,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const CustomerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { events, leads, quotes, savedDesigns, siteSettings } = useStore();

  const userEvents = events.filter(e => (user?.id && e.customer_id === user.id) || (user?.mobile && e.customer_mobile === user.mobile));
  const userLeads = leads.filter(l => (user?.id && l.customer_id === user.id) || (user?.mobile && l.mobile === user.mobile) || (user?.email && l.email?.toLowerCase() === user.email.toLowerCase()));
  const userQuotes = quotes.filter(q => (user?.id && q.customer_id === user.id) || (user?.mobile && q.customer_mobile === user.mobile) || (user?.email && q.customer_email?.toLowerCase() === user.email.toLowerCase()));

  const upcomingEvent = userEvents[0];
  const activeQuote = userQuotes[0];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-200 shadow-luxury flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-700">Customer Space</span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-charcoal-900 mt-1">
            Namaste, {user?.full_name}!
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
            Manage your event decorations, quotations, and saved ideas with SMS Events and Decors.
          </p>
        </div>

        <Link
          to="/plan-event"
          className="px-6 py-3 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 text-xs font-bold uppercase tracking-wider shadow-md flex items-center gap-2 transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4 text-gold-400" />
          <span>Plan New Celebration</span>
        </Link>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/events" className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm hover:border-gold-400 transition-all">
          <div className="w-10 h-10 rounded-xl bg-gold-100 text-gold-800 flex items-center justify-center mb-3">
            <CalendarDays className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-charcoal-900">{userEvents.length}</span>
          <p className="text-xs text-charcoal-500 font-medium mt-0.5">My Confirmed Events</p>
        </Link>

        <Link to="/dashboard/enquiries" className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm hover:border-gold-400 transition-all">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
            <MessageSquareQuote className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-charcoal-900">{userLeads.length}</span>
          <p className="text-xs text-charcoal-500 font-medium mt-0.5">Active Enquiries</p>
        </Link>

        <Link to="/dashboard/quotes" className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm hover:border-gold-400 transition-all">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-charcoal-900">{userQuotes.length}</span>
          <p className="text-xs text-charcoal-500 font-medium mt-0.5">Quotations Received</p>
        </Link>

        <Link to="/dashboard/saved-designs" className="bg-white p-5 rounded-2xl border border-gold-200 shadow-sm hover:border-gold-400 transition-all">
          <div className="w-10 h-10 rounded-xl bg-terracotta-100 text-terracotta-800 flex items-center justify-center mb-3">
            <Heart className="w-5 h-5" />
          </div>
          <span className="text-2xl font-bold font-serif text-charcoal-900">{savedDesigns.length}</span>
          <p className="text-xs text-charcoal-500 font-medium mt-0.5">Saved Moodboard Ideas</p>
        </Link>
      </div>

      {/* Main Grid (Upcoming Event & Active Quote) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upcoming Celebration Card */}
        <div className="bg-white p-6 rounded-3xl border border-gold-200 shadow-luxury space-y-4">
          <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Upcoming Celebration
            </h3>
            <Link to="/dashboard/events" className="text-xs text-gold-800 font-bold hover:underline">
              View All
            </Link>
          </div>

          {upcomingEvent ? (
            <div className="p-5 rounded-2xl bg-ivory-100 border border-gold-300/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-gold-600 text-white text-[10px] font-bold uppercase">
                  {upcomingEvent.status}
                </span>
                <span className="text-xs font-semibold text-charcoal-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-700" />
                  {upcomingEvent.event_date}
                </span>
              </div>
              <h4 className="font-serif text-xl font-bold text-charcoal-900">
                {upcomingEvent.title}
              </h4>
              <p className="text-xs text-charcoal-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-600" />
                {upcomingEvent.venue}, {upcomingEvent.city}
              </p>
              {upcomingEvent.team_notes && (
                <div className="p-2.5 rounded-xl bg-white text-xs text-charcoal-700 border border-ivory-300">
                  <span className="font-bold text-charcoal-900">Styling Notes: </span>
                  {upcomingEvent.team_notes}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-charcoal-500 text-xs">
              <p>No confirmed upcoming events currently.</p>
              <Link to="/plan-event" className="text-gold-800 font-bold hover:underline mt-2 inline-block">
                + Plan your first event
              </Link>
            </div>
          )}
        </div>

        {/* Latest Quotation */}
        <div className="bg-white p-6 rounded-3xl border border-gold-200 shadow-luxury space-y-4">
          <div className="flex items-center justify-between border-b border-ivory-200 pb-3">
            <h3 className="font-serif text-lg font-bold text-charcoal-900">
              Latest Quotation
            </h3>
            <Link to="/dashboard/quotes" className="text-xs text-gold-800 font-bold hover:underline">
              View All
            </Link>
          </div>

          {activeQuote ? (
            <div className="p-5 rounded-2xl bg-ivory-100 border border-gold-300/60 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-gold-900">
                  Quote #{activeQuote.quote_number}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  {activeQuote.status}
                </span>
              </div>
              <h4 className="font-serif text-lg font-bold text-charcoal-900">
                {activeQuote.event_type} Decoration Proposal
              </h4>
              
              <div className="space-y-1.5 pt-2 border-t border-ivory-300 text-xs">
                {activeQuote.items.slice(0, 2).map((it, idx) => (
                  <div key={idx} className="flex justify-between text-charcoal-700">
                    <span>{it.category}</span>
                    <span className="font-semibold">₹{it.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-ivory-300 font-bold text-sm">
                <span className="text-charcoal-900">Total Amount:</span>
                <span className="text-gold-900">₹{activeQuote.total_amount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-charcoal-500 text-xs">
              <p>No active quotations yet.</p>
              <Link to="/request-quote" className="text-gold-800 font-bold hover:underline mt-2 inline-block">
                Request a free estimate
              </Link>
            </div>
          )}
        </div>

      </div>

      {/* Direct Contact Organizer Card */}
      <div className="bg-charcoal-950 text-ivory-50 rounded-3xl p-6 sm:p-8 border border-gold-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-gold-400">Direct Event Support</span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold mt-1">
            Need Help or Custom Styling for Your Celebration?
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-400 mt-1">
            Connect directly with your lead event decorator for venue walkthroughs, stage customization, and date booking.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 shrink-0">
          <a
            href="tel:+917995644101"
            className="px-5 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-gold-glow transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call +91 79956 44101</span>
          </a>
          <a
            href="https://wa.me/917995644101?text=Hi%20SMS%20Events,%20I%20am%20logged%20in%20to%20my%20customer%20dashboard%20and%20would%20like%20to%20discuss%20my%20celebration%20decor."
            target="_blank"
            rel="noreferrer"
            className="px-5 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>WhatsApp Organizer</span>
          </a>
        </div>
      </div>

    </div>
  );
};
