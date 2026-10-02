export type EventCategory = 
  | 'Wedding'
  | 'Engagement'
  | 'Birthday'
  | 'Baby Shower'
  | 'Haldi'
  | 'Mehendi'
  | 'Anniversary'
  | 'Traditional Celebrations'
  | 'Corporate Events'
  | 'Home Events'
  | 'Customized Celebrations';

export type DecorationStyleType =
  | 'Royal'
  | 'Floral'
  | 'Minimal'
  | 'Traditional'
  | 'Luxury'
  | 'Modern'
  | 'Pastel'
  | 'Rustic'
  | 'Colorful';

export type UserRole = 'customer' | 'admin' | 'manager';

export interface UserProfile {
  id: string;
  full_name: string;
  mobile: string;
  email?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface PortfolioImage {
  id: string;
  portfolio_id: string;
  image_url: string;
  caption?: string;
  category_section?: string; // 'Stage', 'Entrance', 'Mandapam', 'Photo Booth', 'Dining', 'Before', 'Preparation'
  is_cover: boolean;
  sort_order: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  event_type: EventCategory;
  location: string;
  theme: string;
  description: string;
  client_requirement?: string;
  cover_image: string;
  images: PortfolioImage[];
  tags: string[];
  is_featured: boolean;
  is_published: boolean;
  is_archived?: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  event_type: EventCategory;
  style?: DecorationStyleType;
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  event_type: EventCategory;
  venue_location: string;
  description: string;
  before_image: string;
  after_image: string;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  short_desc: string;
  full_desc?: string;
  category: string;
  icon_name: string;
  cover_image?: string;
  is_featured: boolean;
  sort_order: number;
}

export interface DecorationStyleItem {
  id: string;
  name: DecorationStyleType;
  slug: string;
  description: string;
  cover_image: string;
  tags: string[];
  sort_order: number;
}

export interface PackageItem {
  id: string;
  name: string;
  tier: 'Essential' | 'Signature' | 'Premium' | 'Royal Bespoke';
  tag_line?: string;
  starting_price: string;
  description: string;
  inclusions: string[];
  cover_image?: string;
  is_popular?: boolean;
  sort_order: number;
}

export interface TestimonialItem {
  id: string;
  customer_name: string;
  event_type: EventCategory;
  event_date?: string;
  location: string;
  rating: number;
  review_text: string;
  customer_image?: string;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Quote Sent' | 'Negotiating' | 'Confirmed' | 'Completed' | 'Cancelled';

export interface LeadItem {
  id: string;
  customer_id?: string;
  name: string;
  mobile: string;
  email?: string;
  event_type: EventCategory;
  event_date?: string;
  location: string;
  guest_count?: string;
  budget_range?: string;
  style?: string;
  requirements?: string;
  reference_images?: string[];
  status: LeadStatus;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteItemLine {
  id?: string;
  category: string;
  description: string;
  amount: number;
}

export type QuoteStatus = 'Draft' | 'Sent' | 'Accepted' | 'Revised' | 'Declined';

export interface QuoteItem {
  id: string;
  quote_number: string;
  customer_id?: string;
  lead_id?: string;
  customer_name: string;
  customer_mobile: string;
  customer_email?: string;
  event_type: EventCategory;
  event_date?: string;
  venue: string;
  items: QuoteItemLine[];
  total_amount: number;
  advance_amount: number;
  balance_amount: number;
  status: QuoteStatus;
  valid_until?: string;
  admin_notes?: string;
  created_at: string;
  updated_at: string;
}

export type EventStatus = 'Planning' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
export type PaymentStatus = 'Pending' | 'Advance Paid' | 'Fully Paid' | 'Refunded';

export interface ConfirmedEvent {
  id: string;
  customer_id?: string;
  lead_id?: string;
  quote_id?: string;
  title: string;
  event_type: EventCategory;
  event_date: string;
  venue: string;
  city: string;
  status: EventStatus;
  payment_status: PaymentStatus;
  total_budget: number;
  requirements?: string;
  team_notes?: string;
  photos?: string[];
  created_at: string;
  updated_at: string;
}

export interface SavedDesignItem {
  id: string;
  customer_id: string;
  item_id: string;
  item_type: 'portfolio' | 'gallery' | 'style';
  title: string;
  image_url: string;
  category?: string;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  hero_heading: string;
  hero_subheading: string;
  service_area: string;
  contact_phone: string;
  contact_whatsapp: string;
  contact_email: string;
  address: string;
  instagram_url: string;
  facebook_url: string;
  youtube_url: string;
  experience_years: string;
  events_completed: string;
  happy_clients: string;
}
