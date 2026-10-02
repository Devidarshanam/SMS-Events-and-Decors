import React, { useState } from 'react';
import { ChevronsLeftRight, Camera, Trash2, Edit3, Plus, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { BeforeAfterItem, EventCategory } from '../../types';
import { BeforeAfterSlider } from '../../components/ui/BeforeAfterSlider';
import { EVENT_CATEGORIES } from '../../lib/constants';

export const AdminBeforeAfterPage: React.FC = () => {
  const { beforeAfter, addBeforeAfter, deleteBeforeAfter, processAndUploadImage } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<EventCategory>('Wedding');
  const [location, setLocation] = useState('Hyderabad');
  const [description, setDescription] = useState('');
  const [beforeImage, setBeforeImage] = useState('');
  const [afterImage, setAfterImage] = useState('');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const base64 = await processAndUploadImage(file, 'before-after');
    if (type === 'before') {
      setBeforeImage(base64);
    } else {
      setAfterImage(base64);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addBeforeAfter({
      title,
      event_type: eventType,
      venue_location: location,
      description,
      before_image: beforeImage,
      after_image: afterImage,
      is_published: true,
      sort_order: 0,
    });

    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setBeforeImage('');
    setAfterImage('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Before & After Manager
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Upload bare venue photos vs final decorated setup pairs
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Transformation Pair</span>
        </button>
      </div>

      {/* Grid of Sliders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {beforeAfter.map((item) => (
          <div key={item.id} className="bg-charcoal-950 p-6 rounded-3xl border border-charcoal-800 space-y-4">
            <BeforeAfterSlider item={item} />
            <div className="flex justify-end pt-2 border-t border-charcoal-800">
              <button
                onClick={() => {
                  if (confirm('Delete this before/after comparison?')) {
                    deleteBeforeAfter(item.id);
                  }
                }}
                className="p-2 rounded-xl bg-charcoal-900 hover:bg-red-600 text-charcoal-400 hover:text-white transition-colors"
                title="Delete Pair"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-950 w-full max-w-xl rounded-3xl border border-charcoal-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-ivory-50">
                New Before & After Comparison
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 text-charcoal-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Transformation Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bare Gachibowli Lawn to Royal Mandapam"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Event Type
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
                    Venue / City
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Jubilee Hills, Hyderabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Photo Upload Pair */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 text-center space-y-2">
                  <span className="text-xs font-bold uppercase text-charcoal-400 block">1. BEFORE Photo</span>
                  {beforeImage ? (
                    <img src={beforeImage} alt="Before" className="w-full h-28 object-cover rounded-xl" />
                  ) : (
                    <div className="h-28 rounded-xl bg-charcoal-950 border border-dashed border-charcoal-700 flex items-center justify-center text-charcoal-500 text-xs">
                      No photo selected
                    </div>
                  )}
                  <label className="cursor-pointer inline-block px-3 py-1.5 rounded-lg bg-charcoal-800 hover:bg-gold-500 hover:text-charcoal-950 text-xs font-semibold text-ivory-100 transition-colors">
                    <span>Upload Before</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'before')} className="hidden" />
                  </label>
                </div>

                <div className="p-4 rounded-2xl bg-charcoal-900 border border-charcoal-800 text-center space-y-2">
                  <span className="text-xs font-bold uppercase text-gold-400 block">2. AFTER Photo</span>
                  {afterImage ? (
                    <img src={afterImage} alt="After" className="w-full h-28 object-cover rounded-xl" />
                  ) : (
                    <div className="h-28 rounded-xl bg-charcoal-950 border border-dashed border-charcoal-700 flex items-center justify-center text-charcoal-500 text-xs">
                      No photo selected
                    </div>
                  )}
                  <label className="cursor-pointer inline-block px-3 py-1.5 rounded-lg bg-gold-500 hover:bg-gold-400 text-xs font-bold text-charcoal-950 transition-colors">
                    <span>Upload After</span>
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'after')} className="hidden" />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Description / Transformation Story
                </label>
                <textarea
                  rows={2}
                  placeholder="How the setup was executed in 6 hours..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
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
                  Publish Transformation
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
