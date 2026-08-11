import { supabase } from '../supabase';

export const authService = {
  async login(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      // Check if user is admin or staff
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        await supabase.auth.signOut();
        return { success: false, message: 'Could not fetch user profile.' };
      }
      
      if (profile.role !== 'admin' && profile.role !== 'staff') {
        await supabase.auth.signOut();
        return { success: false, message: 'Unauthorized. Only admins and staff can log in.' };
      }

      return { success: true, user: { ...data.user, role: profile.role } };
    } catch (err) {
      return { success: false, message: err.message };
    }
  },

  async logout() {
    await supabase.auth.signOut();
  },

  async getCurrentSession() {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  },
  
  async getCurrentProfile(userId) {
    if (!userId) return null;
    const { data, error } = await supabase
      .from('profiles')
      .select('role, full_name')
      .eq('id', userId)
      .single();
    if (error) return null;
    return data;
  }
};
