import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, AlertCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const AdminLoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('admin@smsevents.com');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await login(identifier, password);
      if (res.success) {
        navigate('/admin');
      } else {
        setError(res.error || 'Invalid admin credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-charcoal-900 p-8 sm:p-10 rounded-3xl border border-gold-500/30 shadow-2xl space-y-6">
        
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gold-500 text-charcoal-950 font-serif font-bold text-2xl flex items-center justify-center mx-auto mb-4 shadow-gold-glow">
            SMS
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-ivory-50">
            Admin Portal Access
          </h1>
          <p className="text-xs text-charcoal-400 mt-1">
            Restricted to SMS Events and Decors management
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo Credential Notice */}
        <div className="p-3 rounded-xl bg-gold-950/40 border border-gold-500/30 text-gold-300 text-xs space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>Pre-filled Super Admin Demo:</span>
          </p>
          <p className="text-[11px] text-charcoal-300">
            Email: <span className="font-mono text-gold-300">admin@smsevents.com</span> | Pass: <span className="font-mono text-gold-300">admin123</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
              Admin Email or Mobile
            </label>
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-charcoal-700 bg-charcoal-950 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal-300 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-charcoal-700 bg-charcoal-950 text-ivory-100 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <span>{isSubmitting ? 'Verifying...' : 'Enter Admin Portal'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-charcoal-800">
          <Link to="/" className="text-xs text-charcoal-400 hover:text-gold-400">
            ← Return to Public Website
          </Link>
        </div>

      </div>
    </div>
  );
};
