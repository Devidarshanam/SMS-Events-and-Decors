import React, { useState } from 'react';
import { Camera, Trash2, Plus, Sparkles, Filter, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { EVENT_CATEGORIES, DECORATION_STYLES } from '../../lib/constants';
import { EventCategory, DecorationStyleType } from '../../types';

export const AdminGalleryPage: React.FC = () => {
  const { gallery, addGalleryItem, deleteGalleryItem, processAndUploadImage } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isUploading, setIsUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New item modal
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('Wedding');
  const [style, setStyle] = useState<DecorationStyleType>('Royal');
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    const files = Array.from(e.target.files);

    for (const file of files) {
      try {
        const base64 = await processAndUploadImage(file, 'gallery');
        await addGalleryItem({
          title: title || `${category} Setup Photo`,
          image_url: base64,
          event_type: category,
          style: style,
          tags: [category, style],
          is_published: true,
          is_featured: false,
          sort_order: 0,
        });
      } catch (err) {
        console.error('Upload failed', err);
      }
    }
    setIsUploading(false);
    setIsModalOpen(false);
    setTitle('');
  };

  const filtered = gallery.filter(g => selectedCategory === 'All' || g.event_type === selectedCategory);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Photo Gallery Manager
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Upload and organize individual decor snaps directly from phone camera
          </p>
        </div>

        <label className="cursor-pointer px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto">
          <Camera className="w-4 h-4" />
          <span>{isUploading ? 'Uploading Photos...' : '+ Upload Photos'}</span>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handlePhotoCapture}
            className="hidden"
          />
        </label>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-gold-500 text-charcoal-950'
              : 'bg-charcoal-950 text-charcoal-300 hover:bg-charcoal-800'
          }`}
        >
          All Photos ({gallery.length})
        </button>
        {EVENT_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.name)}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat.name
                ? 'bg-gold-500 text-charcoal-950 font-bold'
                : 'bg-charcoal-950 text-charcoal-300 hover:bg-charcoal-800'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 bg-charcoal-950 rounded-3xl border border-charcoal-800 p-8">
          <Sparkles className="w-12 h-12 text-gold-500/40 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-ivory-100">Gallery Ready for Event Snaps</h3>
          <p className="text-xs text-charcoal-400 max-w-sm mx-auto mt-1 mb-4">
            Take photos at your next event and upload them in bulk from your smartphone!
          </p>
          <label className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow">
            <Camera className="w-4 h-4" />
            <span>Select Photos to Upload</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoCapture}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative aspect-square rounded-2xl overflow-hidden border border-charcoal-800 bg-charcoal-950 shadow-md"
            >
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between">
                <button
                  onClick={() => deleteGalleryItem(item.id)}
                  className="self-end p-1.5 rounded-lg bg-red-600/90 text-white"
                  title="Delete Photo"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                <div>
                  <span className="text-[10px] font-bold text-gold-400 uppercase">{item.event_type}</span>
                  <p className="text-xs font-semibold text-ivory-50 line-clamp-1">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
