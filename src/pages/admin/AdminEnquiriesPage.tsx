import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquareQuote, 
  Phone, 
  MessageCircle, 
  FileText, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  X,
  Sparkles 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { LeadItem, LeadStatus } from '../../types';

export const AdminEnquiriesPage: React.FC = () => {
  const { leads, updateLeadStatus, deleteLead } = useStore();
  const [selectedLead, setSelectedLead] = useState<LeadItem | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [adminNote, setAdminNote] = useState('');

  const cleanNumber = (phone: string) => phone.replace(/\D/g, '');

  const statuses: LeadStatus[] = [
    'New',
    'Contacted',
    'Quote Sent',
    'Negotiating',
    'Confirmed',
    'Completed',
    'Cancelled'
  ];

  const filteredLeads = leads.filter(l => statusFilter === 'All' || l.status === statusFilter);

  const handleOpenDetail = (lead: LeadItem) => {
    setSelectedLead(lead);
    setAdminNote(lead.admin_notes || '');
  };

  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    await updateLeadStatus(selectedLead.id, selectedLead.status, adminNote);
    setSelectedLead(prev => prev ? { ...prev, admin_notes: adminNote } : null);
    alert('Note saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Enquiries & Leads Management
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Track customer requests, call directly, and issue quotations
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setStatusFilter('All')}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
            statusFilter === 'All'
              ? 'bg-gold-500 text-charcoal-950'
              : 'bg-charcoal-950 text-charcoal-300 hover:bg-charcoal-800'
          }`}
        >
          All ({leads.length})
        </button>
        {statuses.map(s => {
          const count = leads.filter(l => l.status === s).length;
          return (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                statusFilter === s
                  ? 'bg-gold-500 text-charcoal-950 font-bold'
                  : 'bg-charcoal-950 text-charcoal-300 hover:bg-charcoal-800'
              }`}
            >
              {s} {count > 0 ? `(${count})` : ''}
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-charcoal-950 rounded-3xl border border-charcoal-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-charcoal-800 bg-charcoal-900/80 text-charcoal-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Celebration</th>
                <th className="py-3 px-4">Venue / Location</th>
                <th className="py-3 px-4">Budget</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-charcoal-900 text-ivory-100">
              {filteredLeads.map((lead) => {
                const waText = `Hi ${lead.name}, this is SMS Events and Decors regarding your decoration enquiry for ${lead.event_type} on ${lead.event_date || 'your upcoming date'}.`;
                const waUrl = `https://wa.me/91${cleanNumber(lead.mobile)}?text=${encodeURIComponent(waText)}`;

                return (
                  <tr key={lead.id} className="hover:bg-charcoal-900/50 transition-colors">
                    <td className="py-3.5 px-4 font-medium">
                      <p className="font-bold text-ivory-50">{lead.name}</p>
                      <p className="text-[11px] text-charcoal-400">{lead.mobile}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-gold-500/20 text-gold-400 font-bold text-[10px] uppercase">
                        {lead.event_type}
                      </span>
                      <p className="text-[11px] text-charcoal-400 mt-0.5">{lead.event_date || 'Date TBD'}</p>
                    </td>
                    <td className="py-3.5 px-4 text-charcoal-300">
                      {lead.location}
                    </td>
                    <td className="py-3.5 px-4 text-gold-400 font-medium">
                      {lead.budget_range || 'Flexible'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                        className="px-2.5 py-1 rounded-lg bg-charcoal-900 border border-charcoal-700 text-[11px] font-semibold text-ivory-100 focus:outline-none focus:border-gold-500"
                      >
                        {statuses.map(st => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={`tel:${lead.mobile}`}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-ivory-100"
                          title="Call Customer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white"
                          title="Chat on WhatsApp"
                        >
                          <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        </a>
                        <button
                          onClick={() => handleOpenDetail(lead)}
                          className="p-1.5 rounded-lg bg-charcoal-800 hover:bg-charcoal-700 text-ivory-100"
                          title="View Full Details"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <Link
                          to={`/admin/quotes?lead_id=${lead.id}&name=${encodeURIComponent(lead.name)}&mobile=${encodeURIComponent(lead.mobile)}&event=${encodeURIComponent(lead.event_type)}&date=${encodeURIComponent(lead.event_date || '')}&venue=${encodeURIComponent(lead.location)}`}
                          className="px-2.5 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-charcoal-950 text-[11px] font-bold"
                          title="Generate Quote"
                        >
                          + Quote
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* LEAD DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-950 w-full max-w-2xl rounded-3xl border border-charcoal-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto text-ivory-100">
            
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-ivory-50">
                  Enquiry Details: {selectedLead.name}
                </h3>
                <p className="text-xs text-charcoal-400">Received on {new Date(selectedLead.created_at).toLocaleString()}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
                <h4 className="font-bold text-gold-400 uppercase tracking-wider">Customer Info</h4>
                <p><span className="text-charcoal-400">Name:</span> {selectedLead.name}</p>
                <p><span className="text-charcoal-400">Mobile:</span> {selectedLead.mobile}</p>
                <p><span className="text-charcoal-400">Email:</span> {selectedLead.email || 'Not provided'}</p>
              </div>

              <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 space-y-2">
                <h4 className="font-bold text-gold-400 uppercase tracking-wider">Celebration Scope</h4>
                <p><span className="text-charcoal-400">Event:</span> {selectedLead.event_type}</p>
                <p><span className="text-charcoal-400">Date:</span> {selectedLead.event_date || 'Flexible'}</p>
                <p><span className="text-charcoal-400">Venue:</span> {selectedLead.location}</p>
                <p><span className="text-charcoal-400">Guests:</span> {selectedLead.guest_count || 'N/A'}</p>
                <p><span className="text-charcoal-400">Budget:</span> {selectedLead.budget_range || 'Flexible'}</p>
                <p><span className="text-charcoal-400">Style:</span> {selectedLead.style || 'Custom'}</p>
              </div>
            </div>

            {selectedLead.requirements && (
              <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 text-xs">
                <h4 className="font-bold text-gold-400 uppercase tracking-wider mb-1">Customer Requirements</h4>
                <p className="text-charcoal-200">{selectedLead.requirements}</p>
              </div>
            )}

            {/* Reference Photos if attached */}
            {selectedLead.reference_images && selectedLead.reference_images.length > 0 && (
              <div>
                <h4 className="font-bold text-gold-400 uppercase tracking-wider text-xs mb-2">Customer Reference Photos</h4>
                <div className="grid grid-cols-3 gap-3">
                  {selectedLead.reference_images.map((img, idx) => (
                    <img key={idx} src={img} alt="Reference" className="w-full h-24 object-cover rounded-xl border border-charcoal-700" />
                  ))}
                </div>
              </div>
            )}

            {/* Admin Notes Box */}
            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Decorator / Internal Notes
              </label>
              <textarea
                rows={3}
                placeholder="Add notes about phone conversation, venue visit date, stage width..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs focus:outline-none focus:border-gold-500"
              />
              <button
                type="button"
                onClick={handleSaveNotes}
                className="mt-2 px-4 py-2 rounded-xl bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-xs font-semibold text-ivory-100 transition-colors"
              >
                Save Notes
              </button>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-charcoal-800">
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this enquiry?')) {
                    deleteLead(selectedLead.id);
                    setSelectedLead(null);
                  }
                }}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Enquiry</span>
              </button>

              <div className="flex gap-2">
                <Link
                  to={`/admin/quotes?lead_id=${selectedLead.id}&name=${encodeURIComponent(selectedLead.name)}&mobile=${encodeURIComponent(selectedLead.mobile)}&event=${encodeURIComponent(selectedLead.event_type)}&date=${encodeURIComponent(selectedLead.event_date || '')}&venue=${encodeURIComponent(selectedLead.location)}`}
                  className="px-6 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider"
                >
                  Create Quotation
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
