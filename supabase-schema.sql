-- ==============================================================================
-- SMS EVENTS AND DECORS — COMPLETE SUPABASE DATABASE SCHEMA & POLICIES
-- ==============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE (Linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  mobile TEXT UNIQUE,
  email TEXT UNIQUE,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'admin', 'manager')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PORTFOLIO PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  event_type TEXT NOT NULL, -- Wedding, Engagement, Birthday, Haldi, Mehendi, Baby Shower, Corporate, etc.
  location TEXT NOT NULL DEFAULT 'Hyderabad',
  theme TEXT NOT NULL,
  description TEXT,
  client_requirement TEXT,
  cover_image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  is_archived BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. PORTFOLIO IMAGES TABLE (Gallery within each project)
CREATE TABLE IF NOT EXISTS public.portfolio_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID NOT NULL REFERENCES public.portfolio(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  category_section TEXT DEFAULT 'Main Setup', -- Stage, Entrance, Mandapam, Photo Booth, Preparation, Before
  is_cover BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY ITEMS TABLE (Individual visual gallery)
CREATE TABLE IF NOT EXISTS public.gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  event_type TEXT NOT NULL,
  style TEXT,
  tags TEXT[] DEFAULT '{}',
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BEFORE / AFTER COMPARISON TABLE
CREATE TABLE IF NOT EXISTS public.before_after (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  venue_location TEXT NOT NULL DEFAULT 'Hyderabad',
  description TEXT,
  before_image TEXT NOT NULL,
  after_image TEXT NOT NULL,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  short_desc TEXT NOT NULL,
  full_desc TEXT,
  category TEXT NOT NULL,
  icon_name TEXT DEFAULT 'Sparkles',
  cover_image TEXT,
  is_featured BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. STYLES TABLE
CREATE TABLE IF NOT EXISTS public.styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL, -- Essential, Signature, Premium, Royal Bespoke
  tier TEXT NOT NULL,
  tag_line TEXT,
  starting_price TEXT NOT NULL DEFAULT 'Starting from ₹25,000',
  description TEXT NOT NULL,
  inclusions JSONB NOT NULL DEFAULT '[]', -- Array of inclusion strings
  cover_image TEXT,
  is_popular BOOLEAN DEFAULT false,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date TEXT,
  location TEXT DEFAULT 'Hyderabad',
  rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT NOT NULL,
  customer_image TEXT,
  is_featured BOOLEAN DEFAULT true,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. LEADS / ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  event_type TEXT NOT NULL,
  event_date DATE,
  location TEXT NOT NULL DEFAULT 'Hyderabad',
  guest_count TEXT,
  budget_range TEXT,
  style TEXT,
  requirements TEXT,
  reference_images TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'New' CHECK (status IN ('New', 'Contacted', 'Quote Sent', 'Negotiating', 'Confirmed', 'Completed', 'Cancelled')),
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. QUOTATIONS TABLE
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  quote_number TEXT UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  customer_name TEXT NOT NULL,
  customer_mobile TEXT NOT NULL,
  customer_email TEXT,
  event_type TEXT NOT NULL,
  event_date DATE,
  venue TEXT NOT NULL DEFAULT 'Hyderabad',
  items JSONB NOT NULL DEFAULT '[]', -- [{ "category": "Stage Decoration", "description": "Floral backdrop...", "amount": 25000 }]
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  advance_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  balance_amount NUMERIC(10, 2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Sent' CHECK (status IN ('Draft', 'Sent', 'Accepted', 'Revised', 'Declined')),
  valid_until DATE,
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. CONFIRMED EVENTS TABLE
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  event_type TEXT NOT NULL,
  event_date DATE NOT NULL,
  venue TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Hyderabad',
  status TEXT NOT NULL DEFAULT 'Confirmed' CHECK (status IN ('Planning', 'Confirmed', 'In Progress', 'Completed', 'Cancelled')),
  payment_status TEXT NOT NULL DEFAULT 'Advance Paid' CHECK (payment_status IN ('Pending', 'Advance Paid', 'Fully Paid', 'Refunded')),
  total_budget NUMERIC(10, 2) DEFAULT 0,
  requirements TEXT,
  team_notes TEXT,
  photos TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. SAVED DESIGNS TABLE (Customer wishlist/moodboard)
CREATE TABLE IF NOT EXISTS public.saved_designs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  item_id UUID NOT NULL,
  item_type TEXT NOT NULL DEFAULT 'portfolio', -- portfolio, gallery, style
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(customer_id, item_id)
);

-- 14. SITE SETTINGS TABLE (Dynamic CMS key-value store)
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- STORAGE BUCKETS SETUP
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('portfolio', 'portfolio', true),
  ('gallery', 'gallery', true),
  ('testimonials', 'testimonials', true),
  ('site-assets', 'site-assets', true),
  ('event-references', 'event-references', true)
ON CONFLICT (id) DO NOTHING;

-- Storage public read policy
CREATE POLICY "Public Access To Buckets" ON storage.objects FOR SELECT USING (true);
CREATE POLICY "Admin Upload To Buckets" ON storage.objects FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.before_after ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public read portfolio" ON public.portfolio FOR SELECT USING (is_published = true AND is_archived = false);
CREATE POLICY "Public read portfolio images" ON public.portfolio_images FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (is_published = true);
CREATE POLICY "Public read before_after" ON public.before_after FOR SELECT USING (is_published = true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read styles" ON public.styles FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON public.packages FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON public.testimonials FOR SELECT USING (is_published = true);
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);

-- Anyone can submit a lead / enquiry
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Customers can read their own data
CREATE POLICY "Users read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Customers read own leads" ON public.leads FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers read own quotes" ON public.quotes FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers read own events" ON public.events FOR SELECT USING (auth.uid() = customer_id);
CREATE POLICY "Customers manage saved designs" ON public.saved_designs FOR ALL USING (auth.uid() = customer_id);

-- Admins have full access to everything
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role IN ('admin', 'manager')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE POLICY "Admin full access portfolio" ON public.portfolio FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access gallery" ON public.gallery FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access before_after" ON public.before_after FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access services" ON public.services FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access styles" ON public.styles FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access packages" ON public.packages FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access leads" ON public.leads FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access quotes" ON public.quotes FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access events" ON public.events FOR ALL USING (public.is_admin());
CREATE POLICY "Admin full access site_settings" ON public.site_settings FOR ALL USING (public.is_admin());
