import React, { useState } from 'react';
import { Package, Edit3, Plus, Trash2, X, CheckCircle2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PackageItem } from '../../types';

export const AdminPackagesPage: React.FC = () => {
  const { packages, updatePackage, addPackage, deletePackage } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [tier, setTier] = useState<'Essential' | 'Signature' | 'Premium' | 'Royal Bespoke'>('Essential');
  const [tagLine, setTagLine] = useState('');
  const [startingPrice, setStartingPrice] = useState('Starting from ₹25,000');
  const [description, setDescription] = useState('');
  const [inclusionsText, setInclusionsText] = useState('');
  const [isPopular, setIsPopular] = useState(false);

  const handleEdit = (pkg: PackageItem) => {
    setEditingId(pkg.id);
    setName(pkg.name);
    setTier(pkg.tier);
    setTagLine(pkg.tag_line || '');
    setStartingPrice(pkg.starting_price);
    setDescription(pkg.description);
    setInclusionsText(pkg.inclusions.join('\n'));
    setIsPopular(Boolean(pkg.is_popular));
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const inclusions = inclusionsText.split('\n').map(l => l.trim()).filter(Boolean);

    if (editingId) {
      await updatePackage(editingId, {
        name,
        tier,
        tag_line: tagLine,
        starting_price: startingPrice,
        description,
        inclusions,
        is_popular: isPopular,
      });
    } else {
      await addPackage({
        name,
        tier,
        tag_line: tagLine,
        starting_price: startingPrice,
        description,
        inclusions,
        is_popular: isPopular,
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
            Packages & Pricing CMS
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Update pricing tiers, inclusions, and estimates instantly on the live website
          </p>
        </div>

        <button
          onClick={() => {
            setEditingId(null);
            setName('');
            setTagLine('');
            setStartingPrice('Starting from ₹30,000');
            setDescription('');
            setInclusionsText('Backdrop (12ft x 8ft)\nFresh flower accents\nLED lights');
            setIsPopular(false);
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Package</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className="bg-charcoal-950 rounded-3xl p-6 border border-charcoal-800 space-y-4 shadow-xl flex flex-col justify-between relative"
          >
            {pkg.is_popular && (
              <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-gold-500 text-charcoal-950 text-[10px] font-bold uppercase">
                Popular
              </span>
            )}

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-400">{pkg.tier}</span>
              <h3 className="font-serif text-2xl font-bold text-ivory-50 mt-1">{pkg.name}</h3>
              <p className="text-xs text-charcoal-400 mt-0.5 mb-3">{pkg.tag_line}</p>

              <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-800 text-sm font-bold text-gold-400 mb-4">
                {pkg.starting_price}
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-charcoal-400 uppercase">Inclusions:</span>
                {pkg.inclusions.map((inc, i) => (
                  <p key={i} className="text-xs text-charcoal-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </p>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-charcoal-800">
              <button
                onClick={() => {
                  if (confirm('Delete package?')) deletePackage(pkg.id);
                }}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>

              <button
                onClick={() => handleEdit(pkg)}
                className="px-4 py-1.5 rounded-xl bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 text-xs font-semibold text-ivory-100 transition-colors"
              >
                Edit Package
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-950 w-full max-w-lg rounded-3xl border border-charcoal-700 p-6 space-y-4 text-ivory-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                {editingId ? 'Edit Package' : 'New Package'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Package Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Tier
                  </label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  >
                    {['Essential', 'Signature', 'Premium', 'Royal Bespoke'].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Starting Price Text
                  </label>
                  <input
                    type="text"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  value={tagLine}
                  onChange={(e) => setTagLine(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Inclusions (One per line)
                </label>
                <textarea
                  rows={4}
                  value={inclusionsText}
                  onChange={(e) => setInclusionsText(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                  <input
                    type="checkbox"
                    checked={isPopular}
                    onChange={(e) => setIsPopular(e.target.checked)}
                    className="rounded text-gold-500"
                  />
                  <span>Mark as Most Popular in Hyderabad</span>
                </label>
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
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
