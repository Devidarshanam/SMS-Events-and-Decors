import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Sparkles, ArrowRight, Lock, Phone, Mail, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        navigate(redirectPath);
      } else {
        setError(res.error || 'Invalid credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl border border-gold-200/80 shadow-luxury space-y-6">
        
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-charcoal-950 text-gold-400 font-serif font-bold text-xl flex items-center justify-center mx-auto mb-3 shadow-md border border-gold-500/30">
            SMS
          </div>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900">
            Welcome Back
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            Sign in to view your quotes, events, and saved designs
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
              Mobile Number or Email
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 9876543210 or your@email.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider">
                Password
              </label>
              <Link to="/forgot-password" className="text-[11px] text-gold-800 hover:underline">
                Forgot Password?
              </Link>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-ivory-200 text-xs text-charcoal-600">
          <span>New here? </span>
          <Link to="/register" className="font-bold text-gold-800 hover:underline">
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
};
