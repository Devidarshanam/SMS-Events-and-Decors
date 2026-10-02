import React from 'react';
import { FileText, CheckCircle2, PhoneCall, MessageCircle, Download, Clock, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useStore } from '../../context/StoreContext';

export const MyQuotesPage: React.FC = () => {
  const { user } = useAuth();
  const { quotes, siteSettings } = useStore();

  const userQuotes = quotes.filter(q => q.customer_id === user?.id || q.customer_mobile === user?.mobile);

  const cleanNumber = (siteSettings.contact_whatsapp || '919876543210').replace(/\D/g, '');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-900">
          My Quotations
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          Detailed itemized decor estimates prepared by SMS Events and Decors
        </p>
      </div>

      {userQuotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gold-200 p-8 space-y-4">
          <FileText className="w-12 h-12 text-gold-500/50 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-charcoal-900">No Quotations Yet</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Once you submit an enquiry, our team will design an itemized budget breakdown and share it here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {userQuotes.map((quote) => {
            const waText = `Hi SMS Events, I received Quotation #${quote.quote_number} for my ${quote.event_type}. I would like to discuss and confirm booking!`;
            const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(waText)}`;

            return (
              <div
                key={quote.id}
                className="bg-white rounded-3xl p-6 sm:p-10 border border-gold-300 shadow-luxury space-y-6"
              >
                {/* Header Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory-300 pb-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold-700 bg-gold-50 px-2.5 py-0.5 rounded-full border border-gold-200">
                      Official Quotation
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-charcoal-900 mt-1">
                      {quote.event_type} Decoration Proposal
                    </h3>
                    <p className="text-xs text-charcoal-500 font-mono">
                      Ref: {quote.quote_number} • Issued: {new Date(quote.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase">
                      Status: {quote.status}
                    </span>
                  </div>
                </div>

                {/* Event Summary Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-ivory-100 border border-gold-200 text-xs">
                  <div>
                    <span className="text-charcoal-500 font-semibold block">Client Name:</span>
                    <span className="font-bold text-charcoal-900">{quote.customer_name}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-500 font-semibold block">Venue / City:</span>
                    <span className="font-bold text-charcoal-900">{quote.venue}</span>
                  </div>
                  <div>
                    <span className="text-charcoal-500 font-semibold block">Planned Event Date:</span>
                    <span className="font-bold text-charcoal-900">{quote.event_date || 'TBD'}</span>
                  </div>
                </div>

                {/* Itemized Lines Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b-2 border-charcoal-800 text-charcoal-700 font-bold uppercase tracking-wider">
                        <th className="py-2.5 px-3">Category / Zone</th>
                        <th className="py-2.5 px-3">Scope & Specifications</th>
                        <th className="py-2.5 px-3 text-right">Investment (INR)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ivory-200">
                      {quote.items.map((it, idx) => (
                        <tr key={idx} className="hover:bg-ivory-50">
                          <td className="py-3 px-3 font-bold text-charcoal-900">{it.category}</td>
                          <td className="py-3 px-3 text-charcoal-600">{it.description}</td>
                          <td className="py-3 px-3 text-right font-bold text-charcoal-900">
                            ₹{it.amount.toLocaleString('en-IN')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Financial Totals */}
                <div className="flex flex-col sm:flex-row justify-end pt-4 border-t border-ivory-300">
                  <div className="w-full sm:w-72 space-y-2 text-xs">
                    <div className="flex justify-between text-charcoal-600">
                      <span>Total Estimated Cost:</span>
                      <span className="font-bold text-charcoal-900">₹{quote.total_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-medium">
                      <span>Booking Advance (35%):</span>
                      <span>₹{quote.advance_amount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-charcoal-700 border-t border-ivory-300 pt-2 font-bold text-sm text-gold-950">
                      <span>Balance on Event Day:</span>
                      <span>₹{quote.balance_amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-ivory-200">
                  <div className="text-xs text-charcoal-500 italic">
                    * Quotation valid until {quote.valid_until || '15 days from issuance'}. Transport and setup team included.
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      <span>Accept & Book via WhatsApp</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
