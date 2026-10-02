import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  isLoading: boolean;
  login: (identifier: string, password: string) => Promise<{ success: boolean; error?: string }>;
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
        const emailToUse = isEmail ? cleanId : `${cleanId}@smseventsanddecors.internal`;
        
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

    // Local Mock DB Login
    const rawDb = localStorage.getItem(LOCAL_STORAGE_USERS_DB);
    const users: any[] = rawDb ? JSON.parse(rawDb) : [];

    const foundUser = users.find(u => 
      (u.mobile === cleanId || u.email?.toLowerCase() === cleanId) && u.password === password
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
    if (cleanId === '9876500000' && password === '123456') {
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

  const register = async (data: {
    full_name: string;
    mobile: string;
    email?: string;
    password: string;
  }): Promise<{ success: boolean; error?: string }> => {
    const cleanMobile = data.mobile.trim().replace(/\D/g, '');
    const cleanEmail = data.email?.trim().toLowerCase();

    if (!cleanMobile || cleanMobile.length < 10) {
      return { success: false, error: 'Please provide a valid 10-digit mobile number.' };
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const emailToUse = cleanEmail || `${cleanMobile}@smseventsanddecors.internal`;
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: emailToUse,
          password: data.password,
          options: {
            data: {
              full_name: data.full_name,
              mobile: cleanMobile,
            }
          }
        });

        if (authError) {
          return { success: false, error: authError.message };
        }

        if (authData.user) {
          const newProfile: UserProfile = {
            id: authData.user.id,
            full_name: data.full_name,
            mobile: cleanMobile,
            email: cleanEmail,
            role: 'customer',
            created_at: new Date().toISOString(),
          };

          await supabase.from('profiles').upsert(newProfile);
          setUser(newProfile);
          return { success: true };
        }
      } catch (err: any) {
        return { success: false, error: err.message || 'Registration failed' };
      }
    }

    // Local Mock DB Registration
    const rawDb = localStorage.getItem(LOCAL_STORAGE_USERS_DB);
    const users: any[] = rawDb ? JSON.parse(rawDb) : [];

    // Check if user already exists
    if (users.some(u => u.mobile === cleanMobile)) {
      return { success: false, error: 'An account with this mobile number already exists.' };
    }

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
    return { success: true };
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
