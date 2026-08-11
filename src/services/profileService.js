import { supabase } from '../supabase';

export const profileService = {
  async getProfiles() {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async updateRole(id, role) {
    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', id)
      .select('*')
      .single();
      
    if (error) throw error;
    return data;
  }
};
