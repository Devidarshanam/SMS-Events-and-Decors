import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, CheckCircle, Sparkles, PhoneCall } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const MyEventsPage: React.FC = () => {
  const { user } = useAuth();
  const { events, siteSettings } = useStore();

  const userEvents = events.filter(e => e.customer_id === user?.id || e.customer_id === 'cust-test-01');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900">
            My Events
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Confirmed celebrations, dates, and decoration team updates
          </p>
        </div>
        <Link
          to="/plan-event"
          className="px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" />
          <span>Book New Event</span>
        </Link>
      </div>

      {userEvents.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gold-200 p-8 space-y-4">
          <Calendar className="w-12 h-12 text-gold-500/50 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-charcoal-900">No Events Booked Yet</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Once you confirm a quotation with our decorator, your event itinerary and styling details will appear here.
          </p>
          <Link
            to="/plan-event"
            className="inline-block px-6 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs font-bold uppercase tracking-wider"
          >
            Plan Your Event
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {userEvents.map((evt) => (
            <div
              key={evt.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-200 shadow-luxury space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ivory-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-gold-600 text-white text-xs font-bold uppercase">
                    {evt.status}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
                    Payment: {evt.payment_status}
                  </span>
                </div>
                <span className="text-xs font-semibold text-charcoal-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gold-600" />
                  {evt.event_date}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-charcoal-900 mb-1">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-charcoal-600 flex items-center gap-1 mb-3">
                    <MapPin className="w-4 h-4 text-gold-600" />
                    <span>{evt.venue}, {evt.city}</span>
                  </p>
                  {evt.requirements && (
                    <p className="text-xs text-charcoal-600 bg-ivory-100 p-3 rounded-xl border border-gold-200">
                      <span className="font-bold text-charcoal-900">Requirements: </span>
                      {evt.requirements}
                    </p>
                  )}
                </div>

                <div className="space-y-3 bg-ivory-50 p-4 rounded-2xl border border-ivory-300">
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal-500 font-semibold">Event Type:</span>
                    <span className="font-bold text-charcoal-900">{evt.event_type}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-charcoal-500 font-semibold">Total Budget:</span>
                    <span className="font-bold text-gold-900">₹{evt.total_budget.toLocaleString('en-IN')}</span>
                  </div>
                  {evt.team_notes && (
                    <div className="text-xs text-charcoal-700 pt-2 border-t border-ivory-200">
                      <span className="font-bold text-charcoal-900">Team Status: </span>
                      {evt.team_notes}
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-ivory-200 flex items-center justify-between text-xs">
                <span className="text-charcoal-500">Need to modify arrangements?</span>
                <a
                  href={`tel:${siteSettings.contact_phone}`}
                  className="font-bold text-gold-800 hover:underline flex items-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Coordinator</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
