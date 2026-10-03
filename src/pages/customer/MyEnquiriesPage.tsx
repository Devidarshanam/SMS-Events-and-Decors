import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquareQuote, Clock, MapPin, Sparkles, PhoneCall, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const MyEnquiriesPage: React.FC = () => {
  const { user } = useAuth();
  const { leads, siteSettings } = useStore();

  const userLeads = leads.filter(l => (user?.id && l.customer_id === user.id) || (user?.mobile && l.mobile === user.mobile) || (user?.email && l.email?.toLowerCase() === user.email.toLowerCase()));

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'New':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Quote Sent':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Contacted':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      default:
        return 'bg-ivory-200 text-charcoal-800 border-ivory-300';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900">
            My Enquiries
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Status of your decoration quote requests and event plans
          </p>
        </div>
        <Link
          to="/request-quote"
          className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>New Quote Request</span>
        </Link>
      </div>

      {userLeads.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gold-200 p-8 space-y-4">
          <MessageSquareQuote className="w-12 h-12 text-gold-500/50 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-charcoal-900">No Active Enquiries</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Planning a celebration? Submit your date and venue parameters to get started.
          </p>
          <Link
            to="/plan-event"
            className="inline-block px-6 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs font-bold uppercase tracking-wider"
          >
            Launch Event Planner
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-white rounded-3xl p-6 border border-gold-200 shadow-luxury space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-0.5 rounded-full text-xs font-bold uppercase border ${getStatusBadge(lead.status)}`}>
                    Status: {lead.status}
                  </span>
                  <span className="text-xs text-charcoal-500">
                    Submitted on {new Date(lead.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span className="font-mono text-xs text-charcoal-400">ID: {lead.id}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-charcoal-900">
                    {lead.event_type} Celebration
                  </h3>
                  <p className="text-xs text-charcoal-600 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-gold-600" />
                    <span>{lead.location}</span>
                  </p>
                  {lead.event_date && (
                    <p className="text-xs text-charcoal-600 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-gold-600" />
                      <span>Planned Date: {lead.event_date}</span>
                    </p>
                  )}
                  {lead.requirements && (
                    <div className="p-3 rounded-xl bg-ivory-100 border border-ivory-300 text-xs text-charcoal-700 mt-2">
                      <span className="font-bold text-charcoal-900">Requirements: </span>
                      {lead.requirements}
                    </div>
                  )}
                </div>

                <div className="bg-ivory-50 p-4 rounded-2xl border border-ivory-200 text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-charcoal-500 font-semibold">Guest Count:</span>
                    <span className="font-bold text-charcoal-900">{lead.guest_count || 'Not specified'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500 font-semibold">Budget Range:</span>
                    <span className="font-bold text-gold-900">{lead.budget_range || 'Flexible'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-charcoal-500 font-semibold">Style Choice:</span>
                    <span className="font-bold text-charcoal-900">{lead.style || 'Custom'}</span>
                  </div>
                  {lead.admin_notes && (
                    <div className="pt-2 border-t border-ivory-300 text-xs text-gold-900 font-medium bg-gold-50 p-2 rounded-lg border border-gold-200">
                      💬 <span className="font-bold">Decorator Note: </span>{lead.admin_notes}
                    </div>
                  )}
                </div>
              </div>

              {lead.status === 'Quote Sent' && (
                <div className="pt-2 flex justify-end">
                  <Link
                    to="/dashboard/quotes"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-sm"
                  >
                    <span>View Itemized Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
