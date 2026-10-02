import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, AlertCircle, CheckCircle, Mail, KeyRound, RefreshCw, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const RegisterPage: React.FC = () => {
  const [step, setStep] = useState<'details' | 'otp'>('details');
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP state
  const [otp, setOtp] = useState('');
  const [demoCodeNotice, setDemoCodeNotice] = useState<string | null>(null);
  const [resendTimer, setResendTimer] = useState(45);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { sendSignUpOtp, verifySignUpOtp } = useAuth();
  const navigate = useNavigate();

  // Countdown timer for OTP resend
  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  // Step 1: Submit Details & Request Email OTP
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address to receive your verification OTP.');
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
        setStep('otp');
        setResendTimer(45);
        if (res.demoOtp) {
          setDemoCodeNotice(res.demoOtp);
        }
      } else {
        setError(res.error || 'Failed to send verification code.');
      }
    } catch (err: any) {
      setError(err.message || 'Error sending OTP.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Step 2: Verify OTP & Complete Account Creation
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!otp || otp.trim().length < 6) {
      setError('Please enter the complete 6-digit OTP code.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await verifySignUpOtp({
        email,
        otp: otp.trim(),
        full_name: fullName,
        mobile,
        password,
      });

      if (res.success) {
        navigate('/dashboard');
      } else {
        setError(res.error || 'Invalid OTP code.');
      }
    } catch (err: any) {
      setError(err.message || 'Verification failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
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
        if (res.demoOtp) {
          setDemoCodeNotice(res.demoOtp);
        }
      } else {
        setError(res.error || 'Failed to resend code.');
      }
    } catch (err: any) {
      setError('Error resending OTP.');
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
            {step === 'details' ? 'Create Account' : 'Verify Your Email'}
          </h1>
          <p className="text-xs text-charcoal-500 mt-1">
            {step === 'details' 
              ? 'One-time email OTP verification is required only for initial account creation'
              : `We sent a 6-digit verification code to ${email}`}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {demoCodeNotice && step === 'otp' && (
          <div className="p-3 rounded-xl bg-gold-50 border border-gold-300 text-gold-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-gold-700 shrink-0" />
              <span>Verification OTP: <strong className="font-mono text-sm tracking-wider">{demoCodeNotice}</strong></span>
            </div>
            <button 
              type="button" 
              onClick={() => setOtp(demoCodeNotice)}
              className="text-[11px] font-bold underline text-gold-800 hover:text-gold-950"
            >
              Auto-Fill
            </button>
          </div>
        )}

        {/* STEP 1: Registration Form */}
        {step === 'details' ? (
          <form onSubmit={handleRequestOtp} className="space-y-3.5">
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
                Email Address (For Verification OTP) *
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
              <span>{isSubmitting ? 'Sending Verification Code...' : 'Get Email OTP'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          /* STEP 2: OTP Verification Form */
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-charcoal-700 uppercase tracking-wider mb-2 text-center">
                Enter 6-Digit Verification Code
              </label>
              <input
                type="text"
                required
                maxLength={6}
                placeholder="0 0 0 0 0 0"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3.5 text-center font-mono text-2xl tracking-[0.4em] font-bold rounded-2xl border-2 border-gold-400 bg-ivory-50 text-charcoal-950 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || otp.length < 6}
              className="w-full py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-charcoal-950 font-bold text-xs uppercase tracking-wider shadow-gold-glow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isSubmitting ? 'Verifying...' : 'Verify & Create Account'}</span>
            </button>

            <div className="flex items-center justify-between text-xs text-charcoal-600 pt-2 border-t border-ivory-200">
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
                onClick={handleResendOtp}
                className={`font-semibold ${
                  resendTimer > 0 
                    ? 'text-charcoal-400 cursor-not-allowed' 
                    : 'text-gold-800 hover:underline cursor-pointer'
                }`}
              >
                {resendTimer > 0 ? `Resend code in ${resendTimer}s` : 'Resend OTP'}
              </button>
            </div>
          </form>
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
