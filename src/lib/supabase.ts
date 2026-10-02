import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project-id')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper to check connection status
export const checkSupabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase.from('site_settings').select('key').limit(1);
    return !error;
  } catch {
    return false;
  }
};
