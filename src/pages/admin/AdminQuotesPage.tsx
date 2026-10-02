import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Send, 
  Printer, 
  MessageCircle, 
  CheckCircle2, 
  X,
  IndianRupee 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { QuoteItem, QuoteItemLine, EventCategory } from '../../types';
import { EVENT_CATEGORIES } from '../../lib/constants';

export const AdminQuotesPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { quotes, createQuote, updateQuote, deleteQuote, siteSettings } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [leadId, setLeadId] = useState(searchParams.get('lead_id') || '');
  const [customerName, setCustomerName] = useState(searchParams.get('name') || '');
  const [customerMobile, setCustomerMobile] = useState(searchParams.get('mobile') || '');
  const [customerEmail, setCustomerEmail] = useState('');
  const [eventType, setEventType] = useState<EventCategory>(
    (searchParams.get('event') as EventCategory) || 'Wedding'
  );
  const [eventDate, setEventDate] = useState(searchParams.get('date') || '2026-12-20');
  const [venue, setVenue] = useState(searchParams.get('venue') || 'Hyderabad');

  // Itemized Lines
  const [items, setItems] = useState<QuoteItemLine[]>([
    { id: '1', category: 'Stage Decoration', description: 'Grand backdrop with fresh roses & lighting', amount: 25000 },
    { id: '2', category: 'Entrance Arch', description: 'Floral tunnel arch with warm fairy lights', amount: 10000 },
    { id: '3', category: 'Photo Booth', description: 'Customized name monogram frame setup', amount: 8000 },
  ]);

  const [advancePercent, setAdvancePercent] = useState<number>(35);

  useEffect(() => {
    if (searchParams.get('lead_id') || searchParams.get('name')) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const addItemLine = () => {
    setItems(prev => [
      ...prev,
      { id: `item-${Date.now()}`, category: 'Additional Element', description: '', amount: 5000 }
    ]);
  };

  const removeItemLine = (index: number) => {
    setItems(prev => prev.filter((_, idx) => idx !== index));
  };

  const updateItemLine = (index: number, field: keyof QuoteItemLine, value: any) => {
    setItems(prev => prev.map((item, idx) => idx === index ? { ...item, [field]: value } : item));
  };

  const totalAmount = items.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
  const advanceAmount = Math.round((totalAmount * advancePercent) / 100);
  const balanceAmount = totalAmount - advanceAmount;

  const handleSaveQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerMobile) {
      alert('Please enter customer name and mobile.');
      return;
    }

    await createQuote({
      lead_id: leadId || undefined,
      customer_name: customerName,
      customer_mobile: customerMobile,
      customer_email: customerEmail || undefined,
      event_type: eventType,
      event_date: eventDate,
      venue: venue,
      items: items,
      total_amount: totalAmount,
      advance_amount: advanceAmount,
      balance_amount: balanceAmount,
      status: 'Sent',
      valid_until: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
    });

    setIsModalOpen(false);
  };

  const cleanNumber = (phone: string) => phone.replace(/\D/g, '');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Quotation System
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Build itemized decor proposals and send to customers via WhatsApp
          </p>
        </div>

        <button
          onClick={() => {
            setLeadId('');
            setCustomerName('');
            setCustomerMobile('');
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Create Quotation</span>
        </button>
      </div>

      {/* Quotes List */}
      <div className="space-y-4">
        {quotes.map((quote) => {
          const waText = `Hi ${quote.customer_name}, here is your customized decoration proposal from SMS Events and Decors:\n\nQuotation Ref: ${quote.quote_number}\nEvent: ${quote.event_type} (${quote.event_date})\nVenue: ${quote.venue}\nTotal Investment: ₹${quote.total_amount.toLocaleString('en-IN')}\nAdvance Needed: ₹${quote.advance_amount.toLocaleString('en-IN')}\n\nPlease check the breakdown on your customer portal!`;
          const waUrl = `https://wa.me/91${cleanNumber(quote.customer_mobile)}?text=${encodeURIComponent(waText)}`;

          return (
            <div
              key={quote.id}
              className="bg-charcoal-950 rounded-3xl p-6 border border-charcoal-800 space-y-4 shadow-xl"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-charcoal-800 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-bold text-gold-400">{quote.quote_number}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-xs font-bold uppercase">
                    {quote.event_type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold">
                    {quote.status}
                  </span>
                </div>
                <span className="text-xs text-charcoal-400">{new Date(quote.created_at).toLocaleDateString()}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-charcoal-300">
                <div>
                  <p><span className="text-charcoal-500">Customer:</span> <strong className="text-ivory-50">{quote.customer_name}</strong></p>
                  <p><span className="text-charcoal-500">Phone:</span> {quote.customer_mobile}</p>
                </div>
                <div>
                  <p><span className="text-charcoal-500">Event Date:</span> {quote.event_date || 'TBD'}</p>
                  <p><span className="text-charcoal-500">Venue:</span> {quote.venue}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-base font-serif font-bold text-gold-400">Total: ₹{quote.total_amount.toLocaleString('en-IN')}</p>
                  <p className="text-[11px] text-charcoal-400">Advance: ₹{quote.advance_amount.toLocaleString('en-IN')} | Balance: ₹{quote.balance_amount.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Items Breakdown Snippet */}
              <div className="p-3.5 rounded-2xl bg-charcoal-900 border border-charcoal-800 text-xs space-y-1.5">
                {quote.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-charcoal-300">
                    <span>✦ {it.category} ({it.description})</span>
                    <span className="font-semibold text-ivory-100">₹{it.amount.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    if (confirm('Delete quotation?')) {
                      deleteQuote(quote.id);
                    }
                  }}
                  className="text-xs text-red-400 hover:underline flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Send on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE QUOTE MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-950 w-full max-w-2xl rounded-3xl border border-charcoal-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-ivory-100">
            
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                Generate Custom Itemized Quotation
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuote} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerMobile}
                    onChange={(e) => setCustomerMobile(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Celebration Type
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  >
                    {EVENT_CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Venue / City in Hyderabad
                  </label>
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* ITEMIZED LINES EDITOR */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">
                    Scope & Itemized Pricing Lines
                  </span>
                  <button
                    type="button"
                    onClick={addItemLine}
                    className="px-3 py-1 rounded-lg bg-charcoal-900 hover:bg-charcoal-800 text-gold-400 text-xs font-semibold"
                  >
                    + Add Line Item
                  </button>
                </div>

                <div className="space-y-2">
                  {items.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center bg-charcoal-900 p-2.5 rounded-xl border border-charcoal-800">
                      <div className="col-span-4">
                        <input
                          type="text"
                          placeholder="Category (e.g. Stage)"
                          value={item.category}
                          onChange={(e) => updateItemLine(idx, 'category', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-950 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div className="col-span-5">
                        <input
                          type="text"
                          placeholder="Description (e.g. 20ft flower wall)"
                          value={item.description}
                          onChange={(e) => updateItemLine(idx, 'description', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-950 text-xs text-ivory-100 focus:outline-none focus:border-gold-500"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Amount"
                          value={item.amount}
                          onChange={(e) => updateItemLine(idx, 'amount', Number(e.target.value))}
                          className="w-full px-3 py-1.5 rounded-lg border border-charcoal-700 bg-charcoal-950 text-xs text-ivory-100 font-bold focus:outline-none focus:border-gold-500 text-right"
                        />
                      </div>
                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeItemLine(idx)}
                          className="p-1 text-charcoal-400 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOTAL CALCULATOR */}
              <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-sm">
                  <span>Total Quotation Sum:</span>
                  <span className="text-gold-400">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-charcoal-400">
                  <span>Booking Advance (35%):</span>
                  <span className="text-emerald-400 font-semibold">₹{advanceAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-charcoal-400">
                  <span>Balance on Event Day:</span>
                  <span className="text-ivory-100 font-semibold">₹{balanceAmount.toLocaleString('en-IN')}</span>
                </div>
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
                  Issue Quotation
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
