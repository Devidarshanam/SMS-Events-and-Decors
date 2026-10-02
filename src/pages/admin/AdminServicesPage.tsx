import React, { useState } from 'react';
import { Layers, Plus, Edit3, Trash2, X, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ServiceItem } from '../../types';

export const AdminServicesPage: React.FC = () => {
  const { services, updateService, addService, deleteService } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Weddings');
  const [shortDesc, setShortDesc] = useState('');
  const [fullDesc, setFullDesc] = useState('');

  const handleEdit = (srv: ServiceItem) => {
    setEditingId(srv.id);
    setTitle(srv.title);
    setCategory(srv.category);
    setShortDesc(srv.short_desc);
    setFullDesc(srv.full_desc || '');
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    if (editingId) {
      await updateService(editingId, {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        short_desc: shortDesc,
        full_desc: fullDesc,
      });
    } else {
      await addService({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category,
        short_desc: shortDesc,
        full_desc: fullDesc,
        icon_name: 'Sparkles',
        is_featured: true,
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
            Services CMS
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Manage decoration services and descriptions without code changes
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setTitle('');
            setShortDesc('');
            setFullDesc('');
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((srv) => (
          <div key={srv.id} className="bg-charcoal-950 rounded-3xl p-6 border border-charcoal-800 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded-full bg-gold-500/20 text-gold-400 text-[10px] font-bold uppercase">
                {srv.category}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(srv)}
                  className="p-1.5 rounded-lg bg-charcoal-900 text-gold-400 hover:bg-gold-500 hover:text-charcoal-950 transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm('Delete service?')) deleteService(srv.id);
                  }}
                  className="p-1.5 rounded-lg bg-charcoal-900 text-red-400 hover:bg-red-600 hover:text-white transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="font-serif text-xl font-bold text-ivory-50">{srv.title}</h3>
            <p className="text-xs text-charcoal-300">{srv.short_desc}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-charcoal-950 w-full max-w-lg rounded-3xl border border-charcoal-700 p-6 space-y-4 text-ivory-100">
            <div className="flex justify-between items-center border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                {editingId ? 'Edit Service' : 'Add New Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Category
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Full Detailed Description
                </label>
                <textarea
                  rows={3}
                  value={fullDesc}
                  onChange={(e) => setFullDesc(e.target.value)}
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
