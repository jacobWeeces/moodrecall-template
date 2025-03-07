import { createClient } from '@supabase/supabase-js';

// Default to a placeholder URL in development to prevent client-side errors
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'http://placeholder-url.com';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key';

// Validate URL format
const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch (e) {
    return false;
  }
};

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
} else if (!isValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL)) {
  console.error('Invalid NEXT_PUBLIC_SUPABASE_URL format');
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
}

export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    },
    global: {
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseServiceKey,
      }
    }
  }
);