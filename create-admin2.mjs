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
  console.log('Signing up admin@123.com...');
  const { data, error } = await supabase.auth.signUp({
    email: 'admin@123.com',
    password: 'admin@123'
  });
  
  if (error) {
    console.error('Signup Error:', error.message);
    return;
  }
  
  console.log('User created:', data.user?.id);
  
  if (data.user) {
    // Wait for the automatic profile trigger to run
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Now sign in as the user to get their JWT (so we can update their own profile)
    console.log('Signing in to get session...');
    const { data: signInData, error: signInErr } = await supabase.auth.signInWithPassword({
      email: 'admin@123.com',
      password: 'admin@123'
    });
    
    if (signInErr) {
      console.error('Sign In Error:', signInErr.message);
      return;
    }
    
    console.log('Updating profile role to admin...');
    const { data: profile, error: profileErr } = await supabase
      .from('profiles')
      .update({ role: 'admin' })
      .eq('id', data.user.id);
      
    if (profileErr) {
      console.error('Profile Error:', profileErr.message);
    } else {
      console.log('Profile updated to admin successfully!');
    }
  }
}

createAdmin();
