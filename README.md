# SMS Events and Decors — Complete Event Styling & Decoration Studio Platform

A visual website, customer event planning portal, and mobile-friendly admin management studio built for **SMS Events and Decors** in Hyderabad.

---

## 🌟 Key Features

### 1. 🏛️ Public Luxury Website
- **Hero Section**: Editorial aesthetics with headline *"We Turn Celebrations Into Experiences."*, service area *"Hyderabad & Surrounding Areas"*, CTAs *"Explore Our Work"* & *"Plan Your Event"*.
- **What We Create**: 10 Event Categories (Weddings, Engagements, Birthdays, Baby Showers, Haldi, Mehendi, Anniversaries, Traditional Celebrations, Corporate Events, Home Events, Customized Celebrations).
- **Moments We've Transformed**: Signature visual portfolio with location tags, style tags, and wishlist bookmarks.
- **Before / After Transformation Slider**: Interactive draggable comparison tool.
- **Find Your Style**: 9 Decor Design Aesthetics (Royal, Floral, Minimal, Traditional, Luxury, Modern, Pastel, Rustic, Colorful).
- **Zone by Zone Inspiration**: Stage, Entrance, Mandapam, Photo Booth, Dining, Welcome Area.
- **Curated Packages**: Essential, Signature, Premium, and Royal Bespoke tiers with customizable inclusions.
- **6-Step Interactive Event Planner**: Celebration type → Date → Venue in Hyderabad → Guests → Budget → Style → Instant Quotation Request.
- **Contextual WhatsApp Integration**: Floating button and auto-generated message links with exact event parameters.

### 2. 👤 Customer Portal (`/dashboard`)
- **Dual Login**: Mobile Number + Password or Email + Password.
- **My Events**: Confirmed celebrations, dates, and decorator team updates.
- **My Enquiries**: Status tracker (New → Contacted → Quote Sent → Confirmed).
- **My Quotes**: Itemized quotes (Stage, Entrance, Florals breakdown, Advance & Balance).
- **Saved Designs**: Heart ❤️ wishlist moodboard.
- **Profile**: Contact and notification preferences.

### 3. 🛡️ Business Owner Admin Portal (`/admin`)
- **Mobile-First Studio**: Specifically crafted so the business owner (or his brother) can update everything on the spot from a phone!
- **📷 Direct Phone Camera Capture**: Open `/admin` on phone → `+ Add Project` → Take photo / choose multiple from gallery → Enter name & category → Tap **Publish**. Automatically goes live across website, categories, styles, and gallery!
- **Lead CRM**: Direct Call & WhatsApp buttons, status updates, decorator notes.
- **Interactive Quote Builder**: Add item lines, automatic calculation of total, advance (35%), and balance.
- **Live CMS**: Edit hero text, contact numbers, WhatsApp, packages, styles, services, testimonials, and website settings without writing a single line of code!

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Demo Credentials (Immediate Preview)

### Admin Portal (`/admin/login`):
- **Email / Mobile**: `admin@smsevents.com` (or `9876543210`)
- **Password**: `admin123`

### Customer Portal (`/login`):
- **Mobile**: `9876500000`
- **Password**: `123456`
- *Or register a new account instantly with any 10-digit mobile number!*

---

## 🗄️ Supabase Backend Setup

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in Supabase and run the provided [`supabase-schema.sql`](./supabase-schema.sql) file.
3. In your Supabase dashboard, copy your **Project URL** and **anon public key**.
4. Paste them in `.env`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
*(Note: If Supabase keys are not provided yet, the application automatically uses its local synchronization engine, so you can test all features immediately!)*

---

## 🖼️ Note on Photos & Placeholders

All categories, portfolio items, before/after transformations, and styles currently have luxury placeholders.

Whenever you have actual event photos:
1. **Option A (Instant via Phone)**: Log in to `/admin` on your phone, click **+ Add Project**, take photos or select them from your camera roll, and click **Publish**.
2. **Option B (Batch replace)**: Place your images inside the project or upload them through the Admin Portal Gallery (`/admin/gallery`).

---

## 🌐 Deploy to Vercel

```bash
npx vercel
```
Or connect the repository on [vercel.com](https://vercel.com) and deploy with standard Vite presets!
