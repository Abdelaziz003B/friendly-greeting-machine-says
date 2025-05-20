
import { createClient } from '@supabase/supabase-js';

// These values will be replaced when you connect your Lovable project to Supabase
// via the Supabase integration button
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase credentials. Please connect your Lovable project to Supabase using the integration button.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
