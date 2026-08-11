import { supabase } from '../supabase';

export const reviewService = {
  async getReviews() {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, products(name), customers(full_name)')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async deleteReview(id) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
};
