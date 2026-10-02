import React, { useState } from 'react';
import { User, Phone, Mail, CheckCircle2, Lock, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(user?.full_name || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [email, setEmail] = useState(user?.email || '');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setSavedSuccess(false);

    await updateProfile({
      full_name: fullName,
      mobile,
      email: email || undefined,
    });

    setIsUpdating(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-charcoal-900">
          My Profile
        </h1>
        <p className="text-xs text-charcoal-500 mt-1">
          Manage your contact credentials for event communications
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Profile updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-gold-200 shadow-luxury space-y-5">
        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
            Registered Mobile Number
          </label>
          <input
            type="tel"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isUpdating}
            className="px-6 py-3 rounded-full bg-charcoal-900 hover:bg-gold-600 text-ivory-50 font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4 text-gold-400" />
            <span>{isUpdating ? 'Saving...' : 'Save Profile'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
