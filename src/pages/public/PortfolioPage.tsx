import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Heart, MapPin, Sparkles, Filter, ChevronRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { EVENT_CATEGORIES, DECORATION_STYLES } from '../../lib/constants';
import { LuxuryPlaceholder } from '../../components/ui/LuxuryPlaceholder';

export const PortfolioPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialStyle = searchParams.get('style') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedStyle, setSelectedStyle] = useState<string>(initialStyle);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { portfolio, toggleSaveDesign, isDesignSaved } = useStore();

  const filteredProjects = useMemo(() => {
    return portfolio.filter((project) => {
      if (!project.is_published || project.is_archived) return false;

      const matchesCategory =
        selectedCategory === 'All' ||
        project.event_type.toLowerCase() === selectedCategory.toLowerCase();

      const matchesStyle =
        selectedStyle === 'All' ||
        project.tags.some(t => t.toLowerCase() === selectedStyle.toLowerCase()) ||
        project.theme.toLowerCase().includes(selectedStyle.toLowerCase());

      const matchesSearch =
        searchQuery === '' ||
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesStyle && matchesSearch;
    });
  }, [portfolio, selectedCategory, selectedStyle, searchQuery]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 space-y-12">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-700 font-bold px-3 py-1 rounded-full bg-gold-100 border border-gold-300">
          Our Visual Portfolio
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-charcoal-900 mt-4 mb-4">
          Moments We've Transformed
        </h1>
        <p className="text-base text-charcoal-600 font-sans">
          Browse real wedding mandapams, engagement arches, haldi urlis, and birthday wonderlands across Hyderabad.
        </p>
      </div>

      {/* FILTER & SEARCH BAR */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-gold-200/80 shadow-luxury space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 text-charcoal-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by event, location (e.g. Banjara Hills, Gachibowli), or theme (e.g. Royal, Floral)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-ivory-100 border border-gold-200 text-charcoal-900 text-xs sm:text-sm focus:outline-none focus:border-gold-500 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => handleCategoryChange('All')}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold whitespace-nowrap transition-all ${
              selectedCategory === 'All'
                ? 'bg-charcoal-900 text-ivory-50 shadow-sm'
                : 'bg-ivory-100 text-charcoal-700 hover:bg-gold-50 hover:text-gold-900'
            }`}
          >
            All Events ({portfolio.filter(p => p.is_published).length})
          </button>
          {EVENT_CATEGORIES.map((cat) => {
            const count = portfolio.filter(p => p.event_type === cat.name && p.is_published).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === cat.name
                    ? 'bg-gold-500 text-charcoal-950 font-bold shadow-gold-glow'
                    : 'bg-ivory-100 text-charcoal-700 hover:bg-gold-50 hover:text-gold-900'
                }`}
              >
                {cat.name} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>

      </div>

      {/* PORTFOLIO GRID */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gold-200 p-8">
          <Sparkles className="w-12 h-12 text-gold-500/50 mx-auto mb-3" />
          <h3 className="font-serif text-xl font-bold text-charcoal-900 mb-1">
            No Projects Found Matching Filter
          </h3>
          <p className="text-xs text-charcoal-500 mb-4">
            Try resetting your search query or selecting "All Events".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedStyle('All');
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-full bg-gold-500 text-charcoal-950 text-xs font-bold uppercase tracking-wider shadow-sm"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl overflow-hidden border border-gold-200/80 shadow-luxury group transition-all duration-500 hover:shadow-luxury-hover hover:-translate-y-1 flex flex-col justify-between"
            >
              <div className="relative">
                <LuxuryPlaceholder
                  category={project.event_type}
                  title={project.title}
                  subtitle={project.location}
                  aspectRatio="video"
                  imageSrc={project.cover_image}
                />

                {/* Wishlist Heart */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleSaveDesign({
                      id: project.id,
                      title: project.title,
                      image_url: project.cover_image,
                      category: project.event_type,
                      type: 'portfolio',
                    });
                  }}
                  className={`absolute top-3.5 right-3.5 p-2.5 rounded-full backdrop-blur-md transition-all z-20 ${
                    isDesignSaved(project.id)
                      ? 'bg-terracotta-500 text-white shadow-md'
                      : 'bg-charcoal-950/60 text-white hover:bg-terracotta-500'
                  }`}
                  title="Save to My Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isDesignSaved(project.id) ? 'fill-current' : ''}`} />
                </button>

                <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5 z-20">
                  <span className="px-2.5 py-0.5 rounded-full bg-gold-600/90 text-white text-[10px] font-bold uppercase">
                    {project.event_type}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-ivory-100 text-[10px] font-medium backdrop-blur-sm">
                    {project.location}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-charcoal-900 group-hover:text-gold-700 transition-colors mb-1.5 line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs font-semibold text-gold-800 mb-2 uppercase tracking-wide line-clamp-1">
                    {project.theme}
                  </p>
                  <p className="text-xs text-charcoal-600 line-clamp-2 mb-4 font-sans">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-ivory-200 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] bg-ivory-100 text-charcoal-600 px-2 py-0.5 rounded border border-ivory-300">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <Link
                    to={`/portfolio/${project.id}`}
                    className="text-xs uppercase tracking-wider font-bold text-charcoal-900 hover:text-gold-700 flex items-center gap-1"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-4 h-4" />
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
