import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = readFileSync('.env', 'utf-8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, ...val] = line.split('=');
  if (key && val.length) env[key.trim()] = val.join('=').trim().replace(/["']/g, '');
});

const supabase = createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_ANON_KEY);

async function setAdmin() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: 'admin@admin.com',
    password: 'admin@123'
  });
  
  if (error) {
    console.error('Login Error:', error.message);
    return;
  }
  
  console.log('Logged in as:', data.user.email);
  
  const { data: updateRes, error: updateErr } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', data.user.id);
    
  if (updateErr) {
    console.error('Update Role Error:', updateErr.message);
  } else {
    console.log('Role updated to admin!');
  }
}

setAdmin();
