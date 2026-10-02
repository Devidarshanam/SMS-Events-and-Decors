import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Send, Phone, MessageCircle } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ForgotPasswordPage: React.FC = () => {
  const [mobileOrEmail, setMobileOrEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { siteSettings } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileOrEmail) return;
    setSubmitted(true);
  };

  const cleanNumber = (siteSettings.contact_whatsapp || '919876543210').replace(/\D/g, '');
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(`Hi SMS Events Support, I need help resetting the password for my account: ${mobileOrEmail}`)}`;

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-gold-200/80 shadow-luxury space-y-6">
        
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-charcoal-900">
            Reset Password
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Enter your registered mobile number or email
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Request Received
            </h3>
            <p className="text-xs text-charcoal-600">
              If an account exists for <span className="font-semibold text-charcoal-900">{mobileOrEmail}</span>, our team will send a quick verification link / reset pin to your mobile or WhatsApp.
            </p>
            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Instant WhatsApp Help</span>
              </a>
            </div>
            <div className="pt-3">
              <Link to="/login" className="text-xs text-gold-800 font-bold hover:underline">
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Mobile Number or Email
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 9876543210 or your@email.com"
                value={mobileOrEmail}
                onChange={(e) => setMobileOrEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2"
            >
              <span>Send Reset Instructions</span>
              <Send className="w-4 h-4" />
            </button>

            <div className="text-center pt-2">
              <Link to="/login" className="inline-flex items-center gap-1.5 text-xs text-charcoal-600 hover:text-charcoal-900 font-medium">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
