import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
  sendSignUpOtp: (data: {
    full_name: string;
    mobile: string;
    email: string;
    password: string;
  }) => Promise<{ success: boolean; demoOtp?: string; error?: string }>;
  verifySignUpOtp: (data: {
    email: string;
    otp: string;
    full_name: string;
    mobile: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    full_name: string;
    mobile: string;
    email?: string;
    password: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = 'sms_auth_user';
const LOCAL_STORAGE_USERS_DB = 'sms_registered_users';
const LOCAL_STORAGE_PENDING_OTP = 'sms_pending_otp';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize stored user or check Supabase session
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (profile) {
              setUser(profile as UserProfile);
            }
          }
        } else {
          // Local storage session fallback
          const savedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
          if (savedUser) {
            setUser(JSON.parse(savedUser));
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  // Normal login with Email/Mobile + Password (No OTP required for sign-ins)
  const login = async (identifier: string, password: string): Promise<{ success: boolean; error?: string }> => {
    const cleanId = identifier.trim().toLowerCase();
    
    // Superadmin bypass demo logic (for instant preview)
    if ((cleanId === 'admin@smsevents.com' || cleanId === 'admin' || cleanId === '9876543210') && (password === 'admin123' || password === 'admin')) {
      const adminProfile: UserProfile = {
        id: 'admin-super-01',
        full_name: 'SMS Admin (Business Owner)',
        mobile: '9876543210',
        email: 'admin@smsevents.com',
        role: 'admin',
        created_at: new Date().toISOString(),
      };
      setUser(adminProfile);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(adminProfile));
      return { success: true };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        // Check if identifier is email or phone
        const isEmail = cleanId.includes('@');
        let emailToUse = cleanId;

        // If phone number entered, find matching profile email
        if (!isEmail) {
          const cleanPhone = cleanId.replace(/\D/g, '');
          const { data: profileData } = await supabase
            .from('profiles')
            .select('email')
            .eq('mobile', cleanPhone)
            .limit(1)
            .single();

          if (profileData?.email) {
            emailToUse = profileData.email;
          } else {
            emailToUse = `${cleanPhone}@smseventsanddecors.internal`;
          }
        }
        
        const { data, error } = await supabase.auth.signInWithPassword({
          email: emailToUse,
          password: password,
        });

        if (error) {
          return { success: false, error: error.message };
        }

        if (data.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          if (profile) {
            setUser(profile as UserProfile);
            return { success: true };
          }
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Login failed' };
      }
    }

    // Local Mock DB Login fallback
    const rawDb = localStorage.getItem(LOCAL_STORAGE_USERS_DB);
    const users: any[] = rawDb ? JSON.parse(rawDb) : [];

    const cleanDigits = cleanId.replace(/\D/g, '');
    const foundUser = users.find(u => 
      (u.mobile === cleanDigits || u.email?.toLowerCase() === cleanId || u.full_name?.toLowerCase() === cleanId) && u.password === password
    );

    if (foundUser) {
      const profile: UserProfile = {
        id: foundUser.id,
        full_name: foundUser.full_name,
        mobile: foundUser.mobile,
        email: foundUser.email,
        role: foundUser.role || 'customer',
        created_at: foundUser.created_at,
      };
      setUser(profile);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(profile));
      return { success: true };
    }

    // Default test customer
    if ((cleanId === '9876500000' || cleanId === 'priya@example.com') && password === '123456') {
      const testCustomer: UserProfile = {
        id: 'cust-test-01',
        full_name: 'Priya Sharma',
        mobile: '9876500000',
        email: 'priya@example.com',
        role: 'customer',
        created_at: new Date().toISOString(),
      };
      setUser(testCustomer);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(testCustomer));
      return { success: true };
    }

    return { success: false, error: 'Invalid mobile/email or password.' };
  };

  // Step 1 of Registration: Send OTP to Email
  const sendSignUpOtp = async (data: {
    full_name: string;
    mobile: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; demoOtp?: string; error?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanMobile = data.mobile.trim().replace(/\D/g, '');

    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, error: 'Please enter a valid email address.' };
    }
    if (!cleanMobile || cleanMobile.length < 10) {
      return { success: false, error: 'Please enter a valid 10-digit mobile number.' };
    }

    // Generate a 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store pending registration payload locally for verification
    const pendingData = {
      ...data,
      email: cleanEmail,
      mobile: cleanMobile,
      otp: generatedOtp,
      expiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes expiry
    };
    sessionStorage.setItem(LOCAL_STORAGE_PENDING_OTP, JSON.stringify(pendingData));

    if (isSupabaseConfigured && supabase) {
      try {
        const { error: signUpError } = await supabase.auth.signUp({
          email: cleanEmail,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name,
              mobile: cleanMobile,
            }
          }
        });

        if (signUpError && !signUpError.message.includes('already registered')) {
          // If Supabase returns rate limit or provider error, fallback with generated code
          console.warn('Supabase signUp notice:', signUpError.message);
        }

        return { success: true, demoOtp: generatedOtp };
      } catch (err: any) {
        return { success: true, demoOtp: generatedOtp };
      }
    }

    return { success: true, demoOtp: generatedOtp };
  };

  // Step 2 of Registration: Verify OTP & Create Account
  const verifySignUpOtp = async (data: {
    email: string;
    otp: string;
    full_name: string;
    mobile: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const cleanEmail = data.email.trim().toLowerCase();
    const cleanMobile = data.mobile.trim().replace(/\D/g, '');
    const cleanOtp = data.otp.trim();

    // Check stored OTP session
    const rawPending = sessionStorage.getItem(LOCAL_STORAGE_PENDING_OTP);
    let isLocalOtpValid = false;

    if (rawPending) {
      const pending = JSON.parse(rawPending);
      if (pending.email === cleanEmail && pending.otp === cleanOtp) {
        if (Date.now() < pending.expiresAt) {
          isLocalOtpValid = true;
        } else {
          return { success: false, error: 'OTP has expired. Please request a new one.' };
        }
      }
    }

    if (isSupabaseConfigured && supabase) {
      try {
        // Attempt Supabase OTP verification
        const { data: verifyData, error: verifyErr } = await supabase.auth.verifyOtp({
          email: cleanEmail,
          token: cleanOtp,
          type: 'signup',
        });

        let userId = verifyData?.user?.id;

        // If direct OTP match or verified
        if (!verifyErr && userId) {
          const newProfile: UserProfile = {
            id: userId,
            full_name: data.full_name,
            mobile: cleanMobile,
            email: cleanEmail,
            role: 'customer',
            created_at: new Date().toISOString(),
          };

          await supabase.from('profiles').upsert(newProfile);
          setUser(newProfile);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProfile));
          sessionStorage.removeItem(LOCAL_STORAGE_PENDING_OTP);
          return { success: true };
        }

        // If local OTP matches
        if (isLocalOtpValid) {
          // Sign in or create session
          const { data: signInData } = await supabase.auth.signInWithPassword({
            email: cleanEmail,
            password: data.password,
          });

          const finalUserId = signInData?.user?.id || `user_${Date.now()}`;
          const newProfile: UserProfile = {
            id: finalUserId,
            full_name: data.full_name,
            mobile: cleanMobile,
            email: cleanEmail,
            role: 'customer',
            created_at: new Date().toISOString(),
          };

          try {
            await supabase.from('profiles').upsert(newProfile);
          } catch (e) {
            // continue
          }

          setUser(newProfile);
          localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProfile));
          sessionStorage.removeItem(LOCAL_STORAGE_PENDING_OTP);
          return { success: true };
        }

        if (verifyErr && !isLocalOtpValid) {
          return { success: false, error: 'Invalid verification code. Please check your code.' };
        }
      } catch (err: any) {
        if (!isLocalOtpValid) {
          return { success: false, error: err.message || 'Verification failed.' };
        }
      }
    }

    // Local Verification Fallback
    if (isLocalOtpValid) {
      const rawDb = localStorage.getItem(LOCAL_STORAGE_USERS_DB);
      const users: any[] = rawDb ? JSON.parse(rawDb) : [];

      const newId = `user_${Date.now()}`;
      const newUserRecord = {
        id: newId,
        full_name: data.full_name,
        mobile: cleanMobile,
        email: cleanEmail,
        password: data.password,
        role: 'customer',
        created_at: new Date().toISOString(),
      };

      users.push(newUserRecord);
      localStorage.setItem(LOCAL_STORAGE_USERS_DB, JSON.stringify(users));

      const newProfile: UserProfile = {
        id: newId,
        full_name: data.full_name,
        mobile: cleanMobile,
        email: cleanEmail,
        role: 'customer',
        created_at: newUserRecord.created_at,
      };

      setUser(newProfile);
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(newProfile));
      sessionStorage.removeItem(LOCAL_STORAGE_PENDING_OTP);
      return { success: true };
    }

    return { success: false, error: 'Invalid or expired OTP code.' };
  };

  // Direct registration method (legacy / fallback)
  const register = async (data: {
    full_name: string;
    mobile: string;
    email?: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    return sendSignUpOtp({
      full_name: data.full_name,
      mobile: data.mobile,
      email: data.email || `${data.mobile}@smseventsanddecors.internal`,
      password: data.password,
    });
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const updateProfile = async (updates: Partial<UserProfile>): Promise<{ success: boolean; error?: string }> => {
    if (!user) return { success: false, error: 'Not logged in' };

    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      await supabase.from('profiles').update(updates).eq('id', user.id);
    }

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin' || user?.role === 'manager',
        isLoading,
        login,
        sendSignUpOtp,
        verifySignUpOtp,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
