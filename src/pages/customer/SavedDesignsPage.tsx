import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { LuxuryPlaceholder } from '../../components/ui/LuxuryPlaceholder';

export const SavedDesignsPage: React.FC = () => {
  const { savedDesigns, toggleSaveDesign } = useStore();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900">
            Saved Designs & Moodboard
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Decoration ideas and setup inspirations you've bookmarked
          </p>
        </div>
        <Link
          to="/portfolio"
          className="px-6 py-2.5 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <span>Explore More Work</span>
        </Link>
      </div>

      {savedDesigns.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gold-200 p-8 space-y-4">
          <Heart className="w-12 h-12 text-terracotta-400/50 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-charcoal-900">No Saved Designs Yet</h3>
          <p className="text-xs text-charcoal-500 max-w-sm mx-auto">
            Click the ❤️ heart icon on any portfolio project or gallery photo to save concepts for your celebration.
          </p>
          <Link
            to="/portfolio"
            className="inline-block px-6 py-2.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider"
          >
            Browse Portfolio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedDesigns.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden border border-gold-200 shadow-luxury flex flex-col justify-between group"
            >
              <div className="relative">
                <LuxuryPlaceholder
                  category={item.category || 'Wedding'}
                  title={item.title}
                  aspectRatio="video"
                  imageSrc={item.image_url}
                />
                <button
                  onClick={() => toggleSaveDesign({
                    id: item.item_id,
                    title: item.title,
                    image_url: item.image_url,
                    category: item.category,
                    type: item.item_type,
                  })}
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/60 hover:bg-red-600 text-white transition-colors"
                  title="Remove from saved"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-800">
                    {item.category || 'Event Decor'}
                  </span>
                  <h4 className="font-serif font-bold text-base text-charcoal-900 line-clamp-1 mt-0.5">
                    {item.title}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t border-ivory-200 flex items-center justify-between">
                  <Link
                    to={`/request-quote?reference=${encodeURIComponent(item.title)}`}
                    className="text-xs font-bold text-gold-800 hover:text-gold-950 flex items-center gap-1"
                  >
                    <span>Request This Setup</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
