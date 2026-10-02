import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Phone, MessageCircle, Mail, MapPin, Instagram, Globe } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSettingsPage: React.FC = () => {
  const { siteSettings, updateSiteSettings } = useStore();
  const [form, setForm] = useState(siteSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl space-y-6 mx-auto">
      
      <div>
        <h1 className="font-serif text-3xl font-bold text-ivory-50">
          Website Settings & CMS Content
        </h1>
        <p className="text-xs text-charcoal-400 mt-1">
          Update phone numbers, WhatsApp links, hero titles, and address across the entire website
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Website settings updated successfully! Public pages are live with new information.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* HERO CONTENT */}
        <div className="bg-charcoal-950 p-6 rounded-3xl border border-charcoal-800 space-y-4">
          <h3 className="font-serif text-lg font-bold text-gold-400 border-b border-charcoal-800 pb-2">
            1. Homepage Hero Section
          </h3>

          <div>
            <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
              Website Name
            </label>
            <input
              type="text"
              value={form.site_name}
              onChange={(e) => setForm({ ...form, site_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
              Hero Headline
            </label>
            <input
              type="text"
              value={form.hero_heading}
              onChange={(e) => setForm({ ...form, hero_heading: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
              Hero Subheading
            </label>
            <textarea
              rows={2}
              value={form.hero_subheading}
              onChange={(e) => setForm({ ...form, hero_subheading: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
              Service Area Badge
            </label>
            <input
              type="text"
              value={form.service_area}
              onChange={(e) => setForm({ ...form, service_area: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>
        </div>

        {/* CONTACT & WHATSAPP */}
        <div className="bg-charcoal-950 p-6 rounded-3xl border border-charcoal-800 space-y-4">
          <h3 className="font-serif text-lg font-bold text-gold-400 border-b border-charcoal-800 pb-2">
            2. Contact & WhatsApp Numbers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Display Phone Number
              </label>
              <input
                type="text"
                value={form.contact_phone}
                onChange={(e) => setForm({ ...form, contact_phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                WhatsApp Direct Number (with country code, e.g. 919876543210)
              </label>
              <input
                type="text"
                value={form.contact_whatsapp}
                onChange={(e) => setForm({ ...form, contact_whatsapp: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={form.contact_email}
                onChange={(e) => setForm({ ...form, contact_email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Studio Address
              </label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        {/* SOCIAL LINKS & STATS */}
        <div className="bg-charcoal-950 p-6 rounded-3xl border border-charcoal-800 space-y-4">
          <h3 className="font-serif text-lg font-bold text-gold-400 border-b border-charcoal-800 pb-2">
            3. Social Handles & Metric Counters
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Instagram URL
              </label>
              <input
                type="text"
                value={form.instagram_url}
                onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Facebook URL
              </label>
              <input
                type="text"
                value={form.facebook_url}
                onChange={(e) => setForm({ ...form, facebook_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                YouTube URL
              </label>
              <input
                type="text"
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Experience Years (e.g. 8+)
              </label>
              <input
                type="text"
                value={form.experience_years}
                onChange={(e) => setForm({ ...form, experience_years: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Events Decorated (e.g. 450+)
              </label>
              <input
                type="text"
                value={form.events_completed}
                onChange={(e) => setForm({ ...form, events_completed: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
                Happy Clients (e.g. 500+)
              </label>
              <input
                type="text"
                value={form.happy_clients}
                onChange={(e) => setForm({ ...form, happy_clients: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-charcoal-700 bg-charcoal-900 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
          >
            <Save className="w-4 h-4" />
            <span>Save All Website Settings</span>
          </button>
        </div>

      </form>

    </div>
  );
};
