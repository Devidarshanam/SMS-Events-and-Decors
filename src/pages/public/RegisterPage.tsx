import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle, Mail, ArrowLeft, MailCheck, ExternalLink, RefreshCw } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<'details' | 'sent'>('details');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [resendTimer, setResendTimer] = useState(45);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkingSession, setCheckingSession] = useState(false);

  const { sendSignUpOtp, user } = useAuth();
  const navigate = useNavigate();

  // If user gets authenticated via email confirmation link, navigate to dashboard automatically
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  // Countdown timer for email resend
  useEffect(() => {
    let interval: any = null;
    if (step === 'sent' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Step 1: Submit Details & Send Verification Email
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (mobile.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password should be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await sendSignUpOtp({
        full_name: fullName,
        mobile,
        email,
        password,
      });

      if (res.success) {
        if (res.sessionCreated) {
          navigate('/dashboard');
        } else {
          setStep('sent');
          setResendTimer(45);
        }
      } else {
        setError(res.error || 'Failed to send verification email.');
      }
    } catch (err: any) {
      setError(err.message || 'Error sending registration request.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check if user has confirmed and redirect
  const handleCheckConfirmed = () => {
    setCheckingSession(true);
    if (user) {
      navigate('/dashboard');
    } else {
      setTimeout(() => {
        setCheckingSession(false);
        setError('Please click the "Confirm email address" link in your email first.');
      }, 1200);
    }
  };

  // Resend Verification Email
  const handleResend = async () => {
    if (resendTimer > 0) return;
    setError('');
    setIsSubmitting(true);
    try {
      const res = await sendSignUpOtp({
        full_name: fullName,
        mobile,
        email,
        password,
      });
      if (res.success) {
        setResendTimer(45);
      } else {
        setError(res.error || 'Failed to resend email.');
      }
    } catch (err: any) {
      setError('Error resending email.');
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
            {step === 'details' ? 'Create Account' : 'Check Your Inbox'}
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            {step === 'details' 
              ? 'Sign up to track quotations, design moodboards, and manage your events'
              : `We sent an activation link to ${email}`}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* STEP 1: Registration Form */}
        {step === 'details' ? (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Priya Sharma"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Email Address (For Account Verification) *
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="e.g. priya@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3.5 top-3" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Mobile Number (For WhatsApp Updates) *
              </label>
              <input
                type="tel"
                required
                placeholder="e.g. 9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="Create password (min. 6 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-1">
                Confirm Password *
              </label>
              <input
                type="password"
                required
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-gold-200 bg-ivory-50 text-xs sm:text-sm focus:outline-none focus:border-gold-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-3 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Creating Account...' : 'Create Account & Verify'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: Email Confirmation Sent Notice */
          <div className="space-y-6 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-gold-100 border border-gold-300 flex items-center justify-center mx-auto text-gold-700">
              <MailCheck className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-xl font-bold text-charcoal-900">
                Verification Email Sent!
              </h3>
              <p className="text-xs text-charcoal-600 leading-relaxed px-2">
                We sent a confirmation link to <strong className="text-charcoal-900 font-semibold">{email}</strong>. Please open your email and click <strong className="text-gold-800">"Confirm email address"</strong> to activate your account.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-ivory-100 border border-gold-200 text-xs text-charcoal-600 text-left space-y-1.5">
              <p className="font-bold text-charcoal-900">Next Steps:</p>
              <p>1. Open your email inbox (or Spam folder).</p>
              <p>2. Click the <strong>Confirm email address</strong> button.</p>
              <p>3. You will be automatically signed in!</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                type="button"
                disabled={checkingSession}
                onClick={handleCheckConfirmed}
                className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                <span>{checkingSession ? 'Checking...' : "I've Clicked The Link"}</span>
              </button>

              <div className="flex items-center justify-between text-xs text-charcoal-600 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="flex items-center gap-1 font-semibold text-charcoal-600 hover:text-charcoal-950"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit details</span>
                </button>

                <button
                  type="button"
                  disabled={resendTimer > 0 || isSubmitting}
                  onClick={handleResend}
                  className={`font-semibold ${
                    resendTimer > 0 
                      ? 'text-charcoal-400 cursor-not-allowed' 
                      : 'text-gold-800 hover:underline cursor-pointer'
                  }`}
                >
                  {resendTimer > 0 ? `Resend email in ${resendTimer}s` : 'Resend Email'}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="text-center pt-2 border-t border-ivory-200 text-xs text-charcoal-600">
          <span>Already registered? </span>
          <Link to="/login" className="font-bold text-gold-800 hover:underline">
            Sign In with Password
          </Link>
        </div>

      </div>
    </div>
  );
};
