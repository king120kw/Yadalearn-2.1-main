import { createClient } from '@supabase/supabase-js';

const sanitizeEnvVal = (val: string | undefined): string => {
  if (!val) return '';
  return val.trim().replace(/^["']|["']$/g, '');
};

const DEFAULT_SUPABASE_URL = "https://yxqezrvgvfwdgrlwczea.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4cWV6cnZndmZ3ZGdybHdjemVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE5NTEwMTcsImV4cCI6MjA5NzUyNzAxN30.82swG99ZvWtYHwjgHxb5RlKVqwlIP6E-fevsdCz4Qzk";

const supabaseUrl = sanitizeEnvVal(import.meta.env.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = sanitizeEnvVal(import.meta.env.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'implicit',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});


