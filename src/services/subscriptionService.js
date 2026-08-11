import { supabase } from '../supabase';

const mapPlanToUI = (dbPlan) => {
  if (!dbPlan) return null;
  return {
    id: dbPlan.id,
    name: dbPlan.name,
    price: Number(dbPlan.price),
    billing_interval: dbPlan.billing_interval,
    description: dbPlan.description,
    created_at: dbPlan.created_at,
    // Provide a fallback discountPercent for the UI to function if needed
    discountPercent: Number(dbPlan.price) <= 10 ? Number(dbPlan.price) : 0 
  };
};

const mapPlanToDB = (uiPlan) => {
  return {
    name: uiPlan.name,
    price: uiPlan.price !== undefined ? uiPlan.price : (uiPlan.discountPercent || 0),
    billing_interval: uiPlan.billing_interval || 'monthly',
    description: uiPlan.description || ''
  };
};

export const subscriptionService = {
  // --- Subscription Plans ---
  async getSubscriptions() {
    const { data, error } = await supabase
      .from('subscription_plans')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return (data || []).map(mapPlanToUI);
  },

  async createSubscription(data) {
    // Some validation for discount percent if UI relies on it
    if (data.discountPercent !== undefined) {
      const discount = Number(data.discountPercent);
      if (isNaN(discount) || discount < 0 || discount > 10) {
        throw new Error('Discount percentage cannot exceed 10% (Maximum Cap: 10%).');
      }
    }
    
    const dbData = mapPlanToDB(data);
    const { data: result, error } = await supabase
      .from('subscription_plans')
      .insert([dbData])
      .select('*')
      .single();
      
    if (error) throw error;
    return mapPlanToUI(result);
  },

  async updateSubscription(id, data) {
    if (data.discountPercent !== undefined) {
      const discount = Number(data.discountPercent);
      if (isNaN(discount) || discount < 0 || discount > 10) {
        throw new Error('Discount percentage cannot exceed 10% (Maximum Cap: 10%).');
      }
    }

    const dbData = mapPlanToDB(data);
    const { data: result, error } = await supabase
      .from('subscription_plans')
      .update(dbData)
      .eq('id', id)
      .select('*')
      .single();
      
    if (error) throw error;
    return mapPlanToUI(result);
  },

  async deleteSubscription(id) {
    const { error } = await supabase
      .from('subscription_plans')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    return true;
  },
  
  // --- User Subscriptions ---
  async getActiveUserSubscriptions() {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*, subscription_plans(*), customers(*)')
      .order('start_date', { ascending: false });
      
    if (error) throw error;
    return data;
  }
};
