import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '%c[Supabase] MISSING ENV VARS!',
    'color:red;font-size:16px;font-weight:bold',
    '\nVITE_SUPABASE_URL:', supabaseUrl || 'NOT SET',
    '\nVITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET',
    '\n\nFix: Add these to Vercel → Project → Settings → Environment Variables, then Redeploy.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)
