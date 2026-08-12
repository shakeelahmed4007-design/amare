import { createClient } from '@supabase/supabase-js'

// Anon key is intentionally public — security is enforced by Supabase RLS policies
const SUPABASE_URL = 'https://lhxclmxwcehujkqbhglf.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxoeGNsbXh3Y2VodWprcWJoZ2xmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY0NDE0NDEsImV4cCI6MjEwMjAxNzQ0MX0.Jrx0APyrM-STfyVPyr8vR93i3OYjHdyUTOSWRowHvIY'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
