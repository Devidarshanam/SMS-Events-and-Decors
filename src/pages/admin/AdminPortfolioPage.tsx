import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Camera, 
  Upload, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Check, 
  X, 
  Plus, 
  Star, 
  Eye, 
  EyeOff, 
  Layers, 
  MapPin, 
  Image as ImageIcon 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PortfolioProject, EventCategory, PortfolioImage } from '../../types';
import { EVENT_CATEGORIES, DECORATION_STYLES } from '../../lib/constants';

export const AdminPortfolioPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { portfolio, addPortfolioProject, updatePortfolioProject, deletePortfolioProject, processAndUploadImage } = useStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [eventType, setEventType] = useState<EventCategory>('Wedding');
  const [location, setLocation] = useState('Hyderabad');
  const [theme, setTheme] = useState('Royal Floral');
  const [description, setDescription] = useState('');
  const [clientRequirement, setClientRequirement] = useState('');
  const [tagsInput, setTagsInput] = useState('Royal, Floral, Hyderabad');
  const [isFeatured, setIsFeatured] = useState(true);
  const [isPublished, setIsPublished] = useState(true);
  const [images, setImages] = useState<{ id: string; url: string; caption: string; isCover: boolean }[]>([]);

  // Open modal automatically if query param action=new is present
  useEffect(() => {
    if (searchParams.get('action') === 'new') {
      resetForm();
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setEventType('Wedding');
    setLocation('Hyderabad');
    setTheme('Royal Floral');
    setDescription('');
    setClientRequirement('');
    setTagsInput('Royal, Floral, Gold');
    setIsFeatured(true);
    setIsPublished(true);
    setImages([]);
  };

  const handleEdit = (project: PortfolioProject) => {
    setEditingId(project.id);
    setTitle(project.title);
    setEventType(project.event_type);
    setLocation(project.location);
    setTheme(project.theme);
    setDescription(project.description);
    setClientRequirement(project.client_requirement || '');
    setTagsInput(project.tags.join(', '));
    setIsFeatured(project.is_featured);
    setIsPublished(project.is_published);
    
    // Map project images
    if (project.images && project.images.length > 0) {
      setImages(project.images.map((img, idx) => ({
        id: img.id || `img-${idx}`,
        url: img.image_url,
        caption: img.caption || '',
        isCover: img.is_cover || idx === 0,
      })));
    } else if (project.cover_image) {
      setImages([{
        id: 'cover',
        url: project.cover_image,
        caption: 'Main Stage Setup',
        isCover: true,
      }]);
    }
    setIsModalOpen(true);
  };

  // Direct Camera / Multiple Photo File Upload Handler
  const handlePhotosSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsUploading(true);
    const files = Array.from(e.target.files);

    for (let i = 0; i < files.length; i++) {
      try {
        const file = files[i];
        const compressedBase64 = await processAndUploadImage(file, 'portfolio');
        setImages(prev => [
          ...prev,
          {
            id: `upload-${Date.now()}-${i}`,
            url: compressedBase64,
            caption: `Decor Photo ${prev.length + 1}`,
            isCover: prev.length === 0 && i === 0, // First photo is cover by default
          },
        ]);
      } catch (err) {
        console.error('Error uploading photo:', err);
      }
    }
    setIsUploading(false);
  };

  const removePhoto = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const setAsCover = (id: string) => {
    setImages(prev => prev.map(img => ({
      ...img,
      isCover: img.id === id,
    })));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a project name.');
      return;
    }

    const coverPhoto = images.find(img => img.isCover)?.url || images[0]?.url || '';
    const cleanTags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);

    const projectImages: PortfolioImage[] = images.map((img, idx) => ({
      id: img.id,
      portfolio_id: editingId || 'temp',
      image_url: img.url,
      caption: img.caption,
      category_section: 'Stage',
      is_cover: img.isCover,
      sort_order: idx,
    }));

    if (editingId) {
      await updatePortfolioProject(editingId, {
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        event_type: eventType,
        location,
        theme,
        description,
        client_requirement: clientRequirement,
        cover_image: coverPhoto,
        tags: cleanTags,
        is_featured: isFeatured,
        is_published: isPublished,
        images: projectImages,
      });
    } else {
      await addPortfolioProject({
        title,
        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        event_type: eventType,
        location,
        theme,
        description,
        client_requirement: clientRequirement,
        cover_image: coverPhoto,
        tags: cleanTags,
        is_featured: isFeatured,
        is_published: isPublished,
        sort_order: 0,
        images: projectImages,
      });
    }

    setIsModalOpen(false);
    resetForm();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-ivory-50">
            Portfolio Management
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Add completed wedding mandapams, haldi setups & birthday themes directly from your phone camera
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 self-start sm:self-auto"
        >
          <Camera className="w-4 h-4" />
          <span>+ Add New Project</span>
        </button>
      </div>

      {/* Projects Table / Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolio.map((p) => (
          <div
            key={p.id}
            className="bg-charcoal-950 rounded-2xl border border-charcoal-800 overflow-hidden shadow-lg flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-charcoal-900 flex items-center justify-center">
              {p.cover_image ? (
                <img src={p.cover_image} alt={p.title} className="w-full h-full object-cover" />
              ) : (
                <div className="text-center p-4">
                  <ImageIcon className="w-8 h-8 text-charcoal-600 mx-auto mb-1" />
                  <span className="text-[11px] text-charcoal-500">Decor Placeholder Ready</span>
                </div>
              )}

              {/* Status Badges */}
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2 py-0.5 rounded bg-black/70 text-gold-400 text-[10px] font-bold uppercase">
                  {p.event_type}
                </span>
                {p.is_featured && (
                  <span className="px-2 py-0.5 rounded bg-gold-500 text-charcoal-950 text-[10px] font-bold flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-current" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              <div className="absolute top-3 right-3">
                <button
                  onClick={() => updatePortfolioProject(p.id, { is_published: !p.is_published })}
                  className={`p-1.5 rounded-lg text-xs font-semibold backdrop-blur-md ${
                    p.is_published ? 'bg-emerald-600/90 text-white' : 'bg-red-600/90 text-white'
                  }`}
                  title={p.is_published ? 'Published on website' : 'Draft / Hidden'}
                >
                  {p.is_published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-ivory-100 line-clamp-1">{p.title}</h3>
                <p className="text-xs text-gold-400 font-semibold">{p.location} • {p.theme}</p>
                <p className="text-xs text-charcoal-400 line-clamp-2 mt-1">{p.description}</p>
              </div>

              <div className="pt-3 border-t border-charcoal-800 flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="p-2 rounded-xl bg-charcoal-900 hover:bg-gold-500 hover:text-charcoal-950 text-ivory-100 transition-colors"
                    title="Edit Project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${p.title}"?`)) {
                        deletePortfolioProject(p.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-charcoal-900 hover:bg-red-600 text-charcoal-400 hover:text-white transition-colors"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <Link
                  to={`/portfolio/${p.id}`}
                  target="_blank"
                  className="text-xs text-gold-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Live Preview</span>
                  <Eye className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ADD / EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-charcoal-950 w-full max-w-2xl rounded-3xl border border-charcoal-700 p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-charcoal-800 pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-gold-400" />
                <h3 className="font-serif text-xl font-bold text-ivory-50">
                  {editingId ? 'Edit Portfolio Project' : 'Add Project From Camera / Gallery'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-charcoal-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              
              {/* 📷 CAMERA & PHOTO SELECTION STRIP */}
              <div className="p-4 rounded-2xl bg-charcoal-900 border border-dashed border-gold-500/40 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-gold-400 block">
                      📷 Take Photos or Choose From Gallery
                    </span>
                    <span className="text-[11px] text-charcoal-400">
                      Tap below on your phone to open camera or upload multiple photos
                    </span>
                  </div>

                  <label className="cursor-pointer px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-charcoal-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shrink-0">
                    <Camera className="w-4 h-4" />
                    <span>{isUploading ? 'Optimizing...' : '+ Take / Add Photos'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotosSelected}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Selected Thumbnails Grid */}
                {images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
                    {images.map((img) => (
                      <div
                        key={img.id}
                        className={`relative aspect-square rounded-xl overflow-hidden border-2 ${
                          img.isCover ? 'border-gold-400 shadow-gold-glow' : 'border-charcoal-700'
                        }`}
                      >
                        <img src={img.url} alt="Decor" className="w-full h-full object-cover" />
                        
                        {img.isCover && (
                          <div className="absolute top-1 left-1 px-1.5 py-0.5 rounded bg-gold-500 text-charcoal-950 text-[9px] font-bold uppercase">
                            Cover
                          </div>
                        )}

                        <div className="absolute bottom-1 right-1 flex gap-1">
                          {!img.isCover && (
                            <button
                              type="button"
                              onClick={() => setAsCover(img.id)}
                              className="p-1 rounded bg-charcoal-900/90 text-gold-400 text-[10px] font-bold hover:bg-gold-500 hover:text-charcoal-950"
                              title="Make Cover"
                            >
                              ★
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => removePhoto(img.id)}
                            className="p-1 rounded bg-black/80 text-red-400 hover:text-white"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul & Sneha Royal Wedding"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Event Type *
                  </label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  >
                    {EVENT_CATEGORIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Venue / Location in Hyderabad
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Banjara Hills, Hyderabad"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                    Theme / Color Style
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Royal Gold • Fresh Orchids"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Describe the floral mandapam, couple seating, or backdrop setup..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Royal, Haldi, Marigold, Banjara Hills"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:border-gold-500 focus:outline-none"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ivory-100">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-gold-500 focus:ring-0"
                  />
                  <span>Feature on Homepage</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-ivory-100">
                  <input
                    type="checkbox"
                    checked={isPublished}
                    onChange={(e) => setIsPublished(e.target.checked)}
                    className="rounded text-gold-500 focus:ring-0"
                  />
                  <span>Publish Immediately</span>
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
                  {editingId ? 'Update Project' : 'Publish Project'}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
