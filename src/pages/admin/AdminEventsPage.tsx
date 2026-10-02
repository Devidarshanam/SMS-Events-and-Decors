import React, { useState } from 'react';
import { CalendarDays, MapPin, Clock, Plus, Trash2, Edit3, X, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ConfirmedEvent, EventStatus, PaymentStatus, EventCategory } from '../../types';
import { EVENT_CATEGORIES } from '../../lib/constants';

export const AdminEventsPage: React.FC = () => {
  const { events, createEvent, updateEvent, deleteEvent } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<EventCategory>('Wedding');
  const [eventDate, setEventDate] = useState('2026-12-15');
  const [venue, setVenue] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [status, setStatus] = useState<EventStatus>('Confirmed');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('Advance Paid');
  const [totalBudget, setTotalBudget] = useState(50000);
  const [teamNotes, setTeamNotes] = useState('');

  const handleEdit = (evt: ConfirmedEvent) => {
    setEditingId(evt.id);
    setTitle(evt.title);
    setEventType(evt.event_type);
    setEventDate(evt.event_date);
    setVenue(evt.venue);
    setCity(evt.city);
    setStatus(evt.status);
    setPaymentStatus(evt.payment_status);
    setTotalBudget(evt.total_budget);
    setTeamNotes(evt.team_notes || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingId) {
      await updateEvent(editingId, {
        title,
        event_type: eventType,
        event_date: eventDate,
        venue,
        city,
        status,
        payment_status: paymentStatus,
        total_budget: Number(totalBudget),
        team_notes: teamNotes,
      });
    } else {
      await createEvent({
        title,
        event_type: eventType,
        event_date: eventDate,
        venue,
        city,
        status,
        payment_status: paymentStatus,
        total_budget: Number(totalBudget),
        team_notes: teamNotes,
      });
    }

    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Confirmed Events Management
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Track booked celebrations, venue setup dates, payment status, and team assignments
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setTitle('');
            setVenue('');
            setTeamNotes('');
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Confirmed Event</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-charcoal-950 rounded-3xl p-6 border border-charcoal-800 space-y-4 shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <span className="px-3 py-1 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold uppercase">
                {evt.status}
              </span>
              <span className="text-xs font-bold text-gold-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {evt.event_date}
              </span>
            </div>

            <div>
              <h3 className="font-serif text-xl font-bold text-ivory-50 mb-1">{evt.title}</h3>
              <p className="text-xs text-charcoal-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gold-500" />
                <span>{evt.venue}, {evt.city}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-charcoal-900 text-xs">
              <div>
                <span className="text-charcoal-500 block">Payment:</span>
                <span className="font-bold text-emerald-400">{evt.payment_status}</span>
              </div>
              <div>
                <span className="text-charcoal-500 block">Budget:</span>
                <span className="font-bold text-gold-400">₹{evt.total_budget.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {evt.team_notes && (
              <p className="text-xs text-charcoal-300 italic bg-charcoal-900/60 p-3 rounded-xl border border-charcoal-800">
                <strong className="text-ivory-100">Team Notes:</strong> {evt.team_notes}
              </p>
            )}

            <div className="flex justify-between items-center pt-2 border-t border-charcoal-800">
              <button
                onClick={() => {
                  if (confirm('Delete event record?')) {
                    deleteEvent(evt.id);
                  }
                }}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <button
                onClick={() => handleEdit(evt)}
                className="px-4 py-1.5 rounded-xl bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 text-xs font-semibold text-ivory-100 transition-colors"
              >
                Edit Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-950 w-full max-w-xl rounded-3xl border border-charcoal-700 p-6 sm:p-8 space-y-5 text-ivory-100">
            <div className="flex justify-between items-center border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                {editingId ? 'Edit Event Setup' : 'Add Confirmed Event'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya & Vikram Wedding Reception"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Event Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  >
                    {EVENT_CATEGORIES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    required
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Venue & Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Ball Room, Novotel Hitec City"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Event Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  >
                    {['Planning', 'Confirmed', 'In Progress', 'Completed', 'Cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Payment Status
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  >
                    {['Pending', 'Advance Paid', 'Fully Paid', 'Refunded'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Total Decor Budget (INR)
                </label>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Team Notes & Instructions
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Arrive at venue by 10 AM, Lead florist: Ramesh..."
                  value={teamNotes}
                  onChange={(e) => setTeamNotes(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-charcoal-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-charcoal-700 text-charcoal-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
