import { createClient, SupabaseClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const ADMIN_EMAIL = 'blanknava205@gmail.com';

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
