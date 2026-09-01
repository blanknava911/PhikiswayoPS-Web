import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://xykqcgnlyxhxtrlhjesv.supabase.co';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_QWsDyojCNCJeCGMcfj7YHQ_QSs0YcSl';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

export const ADMIN_EMAILS = ['blanknava205@gmail.com', 'phikiswayop@gmail.com'] as const;
export const ADMIN_EMAIL = ADMIN_EMAILS[0];

export function isAdminEmail(email?: string | null): boolean {
  return Boolean(email && ADMIN_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === email.toLowerCase()));
}

function getSupabaseClient(): SupabaseClient | null {
  if (!rawUrl || typeof rawUrl !== 'string' || !rawAnonKey || typeof rawAnonKey !== 'string') {
    return null;
  }

  const trimmedUrl = rawUrl.trim();
  const trimmedKey = rawAnonKey.trim();

  if (!trimmedUrl || !trimmedKey) {
    return null;
  }

  // Reject placeholder values
  if (trimmedUrl.includes('your-project') || trimmedKey.includes('your-public-anon-key')) {
    return null;
  }

  try {
    const parsed = new URL(trimmedUrl);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    return createClient(trimmedUrl, trimmedKey);
  } catch {
    return null;
  }
}

export const supabase = getSupabaseClient();

export function isConfigured() {
  return Boolean(supabase);
}
