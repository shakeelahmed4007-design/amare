import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val.length) env[key.trim()] = val.join('=').trim().replace(/["']/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function createAdmin() {
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@admin.com',
    password: 'admin@123'
  });
  
  if (error) {
    console.error('Signup Error:', error.message);
    return;
  }
  
  console.log('User created:', data.user?.id);
  
  if (data.user) {
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .upsert({
        id: data.user.id,
        role: 'admin',
        full_name: 'Admin User'
      });
      
    if (profileErr) {
      console.error('Profile Error:', profileErr.message);
    } else {
      console.log('Profile created successfully!');
    }
  }
}

createAdmin();
