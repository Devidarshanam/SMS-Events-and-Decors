import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PortfolioProject,
  GalleryItem,
  BeforeAfterItem,
  ServiceItem,
  DecorationStyleItem,
  PackageItem,
  TestimonialItem,
  LeadItem,
  QuoteItem,
  ConfirmedEvent,
  SavedDesignItem,
  SiteSettings,
  EventCategory,
} from '../types';
import {
  INITIAL_PORTFOLIO,
  INITIAL_SERVICES,
  DECORATION_STYLES,
  INITIAL_PACKAGES,
  INITIAL_BEFORE_AFTER,
  INITIAL_TESTIMONIALS,
  INITIAL_SITE_SETTINGS,
} from '../lib/constants';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface StoreContextType {
  // Data lists
  portfolio: PortfolioProject[];
  gallery: GalleryItem[];
  beforeAfter: BeforeAfterItem[];
  services: ServiceItem[];
  styles: DecorationStyleItem[];
  packages: PackageItem[];
  testimonials: TestimonialItem[];
  leads: LeadItem[];
  quotes: QuoteItem[];
  events: ConfirmedEvent[];
  savedDesigns: SavedDesignItem[];
  siteSettings: SiteSettings;
  isLoading: boolean;

  // Portfolio actions
  addPortfolioProject: (project: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>) => Promise<PortfolioProject>;
  updatePortfolioProject: (id: string, updates: Partial<PortfolioProject>) => Promise<void>;
  deletePortfolioProject: (id: string) => Promise<void>;

  // Gallery actions
  addGalleryItem: (item: Omit<GalleryItem, 'id' | 'created_at'>) => Promise<GalleryItem>;
  deleteGalleryItem: (id: string) => Promise<void>;

  // Before/After actions
  addBeforeAfter: (item: Omit<BeforeAfterItem, 'id' | 'created_at'>) => Promise<BeforeAfterItem>;
  updateBeforeAfter: (id: string, updates: Partial<BeforeAfterItem>) => Promise<void>;
  deleteBeforeAfter: (id: string) => Promise<void>;

  // Services actions
  updateService: (id: string, updates: Partial<ServiceItem>) => Promise<void>;
  addService: (service: Omit<ServiceItem, 'id'>) => Promise<void>;
  deleteService: (id: string) => Promise<void>;

  // Packages actions
  updatePackage: (id: string, updates: Partial<PackageItem>) => Promise<void>;
  addPackage: (pkg: Omit<PackageItem, 'id'>) => Promise<void>;
  deletePackage: (id: string) => Promise<void>;

  // Styles actions
  updateStyle: (id: string, updates: Partial<DecorationStyleItem>) => Promise<void>;

  // Testimonials actions
  addTestimonial: (item: Omit<TestimonialItem, 'id' | 'created_at'>) => Promise<void>;
  updateTestimonial: (id: string, updates: Partial<TestimonialItem>) => Promise<void>;
  deleteTestimonial: (id: string) => Promise<void>;

  // Leads / Enquiries actions
  submitLead: (lead: Omit<LeadItem, 'id' | 'created_at' | 'updated_at' | 'status'>) => Promise<{ success: boolean; leadId: string }>;
  updateLeadStatus: (id: string, status: LeadItem['status'], notes?: string) => Promise<void>;
  deleteLead: (id: string) => Promise<void>;

  // Quotes actions
  createQuote: (quote: Omit<QuoteItem, 'id' | 'quote_number' | 'created_at' | 'updated_at'>) => Promise<QuoteItem>;
  updateQuote: (id: string, updates: Partial<QuoteItem>) => Promise<void>;
  deleteQuote: (id: string) => Promise<void>;

  // Events actions
  createEvent: (event: Omit<ConfirmedEvent, 'id' | 'created_at' | 'updated_at'>) => Promise<ConfirmedEvent>;
  updateEvent: (id: string, updates: Partial<ConfirmedEvent>) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;

  // Saved Designs (Wishlist)
  toggleSaveDesign: (item: { id: string; title: string; image_url: string; category?: string; type: 'portfolio' | 'gallery' | 'style' }) => Promise<boolean>;
  isDesignSaved: (itemId: string) => boolean;

  // Site Settings
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;

  // Helper for image upload / compression
  processAndUploadImage: (file: File, bucket?: string) => Promise<string>;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  // State
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('sms_portfolio');
    return saved ? JSON.parse(saved) : INITIAL_PORTFOLIO;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('sms_gallery');
    return saved ? JSON.parse(saved) : [];
  });

  const [beforeAfter, setBeforeAfter] = useState<BeforeAfterItem[]>(() => {
    const saved = localStorage.getItem('sms_before_after');
    return saved ? JSON.parse(saved) : INITIAL_BEFORE_AFTER;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('sms_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [styles, setStyles] = useState<DecorationStyleItem[]>(() => {
    const saved = localStorage.getItem('sms_styles');
    return saved ? JSON.parse(saved) : DECORATION_STYLES;
  });

  const [packages, setPackages] = useState<PackageItem[]>(() => {
    const saved = localStorage.getItem('sms_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('sms_testimonials');
    return saved ? JSON.parse(saved) : INITIAL_TESTIMONIALS;
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    const saved = localStorage.getItem('sms_leads');
    if (saved) return JSON.parse(saved);
    // Initial sample leads
    return [
      {
        id: 'lead-1',
        customer_id: 'cust-test-01',
        name: 'Priya Sharma',
        mobile: '9876500000',
        email: 'priya@example.com',
        event_type: 'Engagement',
        event_date: '2026-12-15',
        location: 'Novotel, Hitec City, Hyderabad',
        guest_count: '150-200',
        budget_range: '₹50,000 - ₹1,00,000',
        style: 'Royal Floral',
        requirements: 'Floral ring backdrop with warm fairy lights and personalized gold monogram.',
        status: 'Quote Sent',
        admin_notes: 'Initial quotation shared for ₹58,000. Client liked the stage concept.',
        created_at: '2026-09-20T11:30:00Z',
        updated_at: '2026-09-21T14:00:00Z',
      },
      {
        id: 'lead-2',
        name: 'Rajesh Kumar',
        mobile: '9848012345',
        email: 'rajesh.k@gmail.com',
        event_type: 'Birthday',
        event_date: '2026-11-05',
        location: 'Madhapur Club House, Hyderabad',
        guest_count: '50-100',
        budget_range: '₹25,000 - ₹50,000',
        style: 'Pastel Safari',
        requirements: '1st birthday hot air balloon theme for boy with organic balloon garland.',
        status: 'New',
        admin_notes: 'Need to call and discuss venue height.',
        created_at: '2026-09-24T09:15:00Z',
        updated_at: '2026-09-24T09:15:00Z',
      }
    ];
  });

  const [quotes, setQuotes] = useState<QuoteItem[]>(() => {
    const saved = localStorage.getItem('sms_quotes');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'quote-1',
        quote_number: 'SMS-2026-089',
        customer_id: 'cust-test-01',
        lead_id: 'lead-1',
        customer_name: 'Priya Sharma',
        customer_mobile: '9876500000',
        customer_email: 'priya@example.com',
        event_type: 'Engagement',
        event_date: '2026-12-15',
        venue: 'Novotel, Hitec City, Hyderabad',
        items: [
          { id: '1', category: 'Stage Decoration', description: '20ft Royal floral wall & customized couple seating', amount: 28000 },
          { id: '2', category: 'Entryway Tunnel', description: 'Floral arch with warm fairy lights walkway', amount: 12000 },
          { id: '3', category: 'Photo Booth', description: 'Personalized monogram gold ring photo point', amount: 10000 },
          { id: '4', category: 'Ambient Lighting', description: 'Warm Par lights and stage mood illumination', amount: 8000 },
        ],
        total_amount: 58000,
        advance_amount: 20000,
        balance_amount: 38000,
        status: 'Sent',
        valid_until: '2026-10-30',
        admin_notes: 'Discount applied for combined entryway & stage package.',
        created_at: '2026-09-21T14:00:00Z',
        updated_at: '2026-09-21T14:00:00Z',
      }
    ];
  });

  const [events, setEvents] = useState<ConfirmedEvent[]>(() => {
    const saved = localStorage.getItem('sms_events');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'event-1',
        customer_id: 'cust-test-01',
        title: 'Priya & Vikram Grand Engagement',
        event_type: 'Engagement',
        event_date: '2026-12-15',
        venue: 'Grand Ball Room, Novotel Hitec City',
        city: 'Hyderabad',
        status: 'Confirmed',
        payment_status: 'Advance Paid',
        total_budget: 58000,
        requirements: 'Royal floral stage with gold ring photo booth.',
        team_notes: 'Setup team arrives at venue by 10:00 AM on 15th Dec. Lead: Ravi.',
        created_at: '2026-09-22T10:00:00Z',
        updated_at: '2026-09-22T10:00:00Z',
      }
    ];
  });

  const [savedDesigns, setSavedDesigns] = useState<SavedDesignItem[]>(() => {
    const saved = localStorage.getItem('sms_saved_designs');
    return saved ? JSON.parse(saved) : [];
  });

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('sms_site_settings_v2');
    return saved ? { ...INITIAL_SITE_SETTINGS, ...JSON.parse(saved) } : INITIAL_SITE_SETTINGS;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => { localStorage.setItem('sms_portfolio', JSON.stringify(portfolio)); }, [portfolio]);
  useEffect(() => { localStorage.setItem('sms_gallery', JSON.stringify(gallery)); }, [gallery]);
  useEffect(() => { localStorage.setItem('sms_before_after', JSON.stringify(beforeAfter)); }, [beforeAfter]);
  useEffect(() => { localStorage.setItem('sms_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('sms_styles', JSON.stringify(styles)); }, [styles]);
  useEffect(() => { localStorage.setItem('sms_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('sms_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('sms_leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('sms_quotes', JSON.stringify(quotes)); }, [quotes]);
  useEffect(() => { localStorage.setItem('sms_events', JSON.stringify(events)); }, [events]);
  useEffect(() => { localStorage.setItem('sms_saved_designs', JSON.stringify(savedDesigns)); }, [savedDesigns]);
  useEffect(() => { localStorage.setItem('sms_site_settings_v2', JSON.stringify(siteSettings)); }, [siteSettings]);

  // Image Processing & Compression Helper (Supports phone camera capture)
  const processAndUploadImage = async (file: File, bucket: string = 'portfolio'): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          // Resize image on canvas to max 1600px width/height for optimal web performance
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1600;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const optimizedBase64 = canvas.toDataURL('image/jpeg', 0.85);
            resolve(optimizedBase64);
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  // Portfolio Project Actions
  const addPortfolioProject = async (data: Omit<PortfolioProject, 'id' | 'created_at' | 'updated_at'>): Promise<PortfolioProject> => {
    const newProject: PortfolioProject = {
      ...data,
      id: `port-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setPortfolio(prev => [newProject, ...prev]);

    // Also populate individual gallery entries for immediate visual exploration
    if (data.images && data.images.length > 0) {
      const newGalleryItems: GalleryItem[] = data.images.map((img, idx) => ({
        id: `gal-${Date.now()}-${idx}`,
        title: `${data.title} - ${img.caption || data.event_type}`,
        image_url: img.image_url,
        event_type: data.event_type,
        style: data.tags?.[0] as any,
        tags: data.tags || [],
        is_published: true,
        is_featured: idx === 0,
        sort_order: 0,
        created_at: new Date().toISOString(),
      }));
      setGallery(prev => [...newGalleryItems, ...prev]);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('portfolio').insert({
          title: newProject.title,
          slug: newProject.slug,
          event_type: newProject.event_type,
          location: newProject.location,
          theme: newProject.theme,
          description: newProject.description,
          cover_image: newProject.cover_image,
          tags: newProject.tags,
          is_featured: newProject.is_featured,
          is_published: newProject.is_published,
        });
      } catch (err) {
        console.error('Supabase portfolio insert error:', err);
      }
    }

    return newProject;
  };

  const updatePortfolioProject = async (id: string, updates: Partial<PortfolioProject>) => {
    setPortfolio(prev => prev.map(p => p.id === id ? { ...p, ...updates, updated_at: new Date().toISOString() } : p));
  };

  const deletePortfolioProject = async (id: string) => {
    setPortfolio(prev => prev.filter(p => p.id !== id));
  };

  // Gallery Actions
  const addGalleryItem = async (item: Omit<GalleryItem, 'id' | 'created_at'>): Promise<GalleryItem> => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setGallery(prev => [newItem, ...prev]);
    return newItem;
  };

  const deleteGalleryItem = async (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  // Before/After Actions
  const addBeforeAfter = async (item: Omit<BeforeAfterItem, 'id' | 'created_at'>): Promise<BeforeAfterItem> => {
    const newItem: BeforeAfterItem = {
      ...item,
      id: `ba-${Date.now()}`,
      created_at: new Date().toISOString(),
    };
    setBeforeAfter(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateBeforeAfter = async (id: string, updates: Partial<BeforeAfterItem>) => {
    setBeforeAfter(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const deleteBeforeAfter = async (id: string) => {
    setBeforeAfter(prev => prev.filter(item => item.id !== id));
  };

  // Services Actions
  const updateService = async (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };
  const addService = async (service: Omit<ServiceItem, 'id'>) => {
    setServices(prev => [...prev, { ...service, id: `srv-${Date.now()}` }]);
  };
  const deleteService = async (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // Packages Actions
  const updatePackage = async (id: string, updates: Partial<PackageItem>) => {
    setPackages(prev => prev.map(pkg => pkg.id === id ? { ...pkg, ...updates } : pkg));
  };
  const addPackage = async (pkg: Omit<PackageItem, 'id'>) => {
    setPackages(prev => [...prev, { ...pkg, id: `pkg-${Date.now()}` }]);
  };
  const deletePackage = async (id: string) => {
    setPackages(prev => prev.filter(pkg => pkg.id !== id));
  };

  // Styles Actions
  const updateStyle = async (id: string, updates: Partial<DecorationStyleItem>) => {
    setStyles(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
  };

  // Testimonials Actions
  const addTestimonial = async (item: Omit<TestimonialItem, 'id' | 'created_at'>) => {
    setTestimonials(prev => [{ ...item, id: `test-${Date.now()}`, created_at: new Date().toISOString() }, ...prev]);
  };
  const updateTestimonial = async (id: string, updates: Partial<TestimonialItem>) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
  };
  const deleteTestimonial = async (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  // Leads / Enquiries Actions
  const submitLead = async (leadData: Omit<LeadItem, 'id' | 'created_at' | 'updated_at' | 'status'>): Promise<{ success: boolean; leadId: string }> => {
    const leadId = `lead-${Date.now()}`;
    const newLead: LeadItem = {
      ...leadData,
      id: leadId,
      customer_id: user?.id,
      status: 'New',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setLeads(prev => [newLead, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('leads').insert(newLead);
      } catch (err) {
        console.error('Supabase lead submit error:', err);
      }
    }

    return { success: true, leadId };
  };

  const updateLeadStatus = async (id: string, status: LeadItem['status'], notes?: string) => {
    setLeads(prev => prev.map(l => l.id === id ? {
      ...l,
      status,
      admin_notes: notes !== undefined ? notes : l.admin_notes,
      updated_at: new Date().toISOString(),
    } : l));
  };

  const deleteLead = async (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
  };

  // Quotes Actions
  const createQuote = async (data: Omit<QuoteItem, 'id' | 'quote_number' | 'created_at' | 'updated_at'>): Promise<QuoteItem> => {
    const quoteNumber = `SMS-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    const newQuote: QuoteItem = {
      ...data,
      id: `quote-${Date.now()}`,
      quote_number: quoteNumber,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setQuotes(prev => [newQuote, ...prev]);

    // Update corresponding lead status if linked
    if (data.lead_id) {
      updateLeadStatus(data.lead_id, 'Quote Sent', `Quotation ${quoteNumber} generated for ₹${data.total_amount.toLocaleString('en-IN')}`);
    }

    return newQuote;
  };

  const updateQuote = async (id: string, updates: Partial<QuoteItem>) => {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, ...updates, updated_at: new Date().toISOString() } : q));
  };

  const deleteQuote = async (id: string) => {
    setQuotes(prev => prev.filter(q => q.id !== id));
  };

  // Events Actions
  const createEvent = async (data: Omit<ConfirmedEvent, 'id' | 'created_at' | 'updated_at'>): Promise<ConfirmedEvent> => {
    const newEvent: ConfirmedEvent = {
      ...data,
      id: `event-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setEvents(prev => [newEvent, ...prev]);
    return newEvent;
  };

  const updateEvent = async (id: string, updates: Partial<ConfirmedEvent>) => {
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates, updated_at: new Date().toISOString() } : e));
  };

  const deleteEvent = async (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  // Saved Designs (Wishlist)
  const toggleSaveDesign = async (item: { id: string; title: string; image_url: string; category?: string; type: 'portfolio' | 'gallery' | 'style' }): Promise<boolean> => {
    const existing = savedDesigns.find(s => s.item_id === item.id);
    if (existing) {
      setSavedDesigns(prev => prev.filter(s => s.item_id !== item.id));
      return false; // Unsaved
    } else {
      const newItem: SavedDesignItem = {
        id: `saved-${Date.now()}`,
        customer_id: user?.id || 'guest',
        item_id: item.id,
        item_type: item.type,
        title: item.title,
        image_url: item.image_url,
        category: item.category,
        created_at: new Date().toISOString(),
      };
      setSavedDesigns(prev => [newItem, ...prev]);
      return true; // Saved
    }
  };

  const isDesignSaved = (itemId: string): boolean => {
    return savedDesigns.some(s => s.item_id === itemId);
  };

  // Site Settings
  const updateSiteSettings = async (updates: Partial<SiteSettings>) => {
    setSiteSettings(prev => ({ ...prev, ...updates }));
  };

  return (
    <StoreContext.Provider
      value={{
        portfolio,
        gallery,
        beforeAfter,
        services,
        styles,
        packages,
        testimonials,
        leads,
        quotes,
        events,
        savedDesigns,
        siteSettings,
        isLoading,
        addPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,
        addGalleryItem,
        deleteGalleryItem,
        addBeforeAfter,
        updateBeforeAfter,
        deleteBeforeAfter,
        updateService,
        addService,
        deleteService,
        updatePackage,
        addPackage,
        deletePackage,
        updateStyle,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        submitLead,
        updateLeadStatus,
        deleteLead,
        createQuote,
        updateQuote,
        deleteQuote,
        createEvent,
        updateEvent,
        deleteEvent,
        toggleSaveDesign,
        isDesignSaved,
        updateSiteSettings,
        processAndUploadImage,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
