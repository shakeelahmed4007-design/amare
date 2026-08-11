import { supabase } from '../supabase';

export const customerService = {
  async getCustomers() {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data;
  },

  async createCustomer(data) {
    const { data: result, error } = await supabase
      .from('customers')
      .insert([data])
      .select('*')
      .single();
      
    if (error) throw error;
    return result;
  },

  async updateCustomer(id, data) {
    const { data: result, error } = await supabase
      .from('customers')
      .update(data)
      .eq('id', id)
      .select('*')
      .single();
      
    if (error) throw error;
    return result;
  },

  async deleteCustomer(id) {
    const { error } = await supabase
      .from('customers')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  }
};
