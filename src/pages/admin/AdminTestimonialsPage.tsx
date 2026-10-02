import React, { useState } from 'react';
import { MessageCircle, Star, Plus, Trash2, Edit3, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { TestimonialItem, EventCategory } from '../../types';
import { EVENT_CATEGORIES } from '../../lib/constants';

export const AdminTestimonialsPage: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [eventType, setEventType] = useState<EventCategory>('Wedding');
  const [location, setLocation] = useState('Hyderabad');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  const handleEdit = (t: TestimonialItem) => {
    setEditingId(t.id);
    setCustomerName(t.customer_name);
    setEventType(t.event_type);
    setLocation(t.location);
    setRating(t.rating);
    setReviewText(t.review_text);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !reviewText) return;

    if (editingId) {
      await updateTestimonial(editingId, {
        customer_name: customerName,
        event_type: eventType,
        location,
        rating,
        review_text: reviewText,
      });
    } else {
      await addTestimonial({
        customer_name: customerName,
        event_type: eventType,
        location,
        rating,
        review_text: reviewText,
        is_featured: true,
        is_published: true,
        sort_order: 0,
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
            Testimonials CMS
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Add and manage real client feedback and ratings
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setCustomerName('');
            setReviewText('');
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Review</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((test) => (
          <div
            key={test.id}
            className="bg-charcoal-950 rounded-3xl p-6 border border-charcoal-800 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-gold-400">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => handleEdit(test)}
                    className="p-1 rounded bg-charcoal-900 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('Delete testimonial?')) deleteTestimonial(test.id);
                    }}
                    className="p-1 rounded bg-charcoal-900 text-red-400 hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-charcoal-300 italic font-serif leading-relaxed mb-4">
                "{test.review_text}"
              </p>
            </div>

            <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between text-xs">
              <span className="font-bold text-ivory-100">{test.customer_name}</span>
              <span className="text-gold-400 text-[11px]">{test.event_type} • {test.location}</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal-950 w-full max-w-lg rounded-3xl border border-charcoal-700 p-6 space-y-4 text-ivory-100">
            <div className="flex justify-between items-center border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                {editingId ? 'Edit Review' : 'Add Client Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Customer / Couple Names *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh & Sneha"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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
                    Location in Hyderabad
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Rating (Stars)
                </label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                >
                  <option value={5}>5 Stars (Exceptional)</option>
                  <option value={4}>4 Stars (Very Good)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Customer Review Text *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Paste real customer feedback..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
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
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
