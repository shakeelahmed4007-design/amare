import { supabase } from '../supabase';

export const activityLogService = {
  async logAction(action, description) {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      
      await supabase.from('activity_logs').insert([{
        user_id: session.user.id,
        action,
        description
      }]);
    } catch (err) {
      console.error('Failed to log activity:', err);
    }
  },

  async getRecentLogs(limit = 5) {
    const { data, error } = await supabase
      .from('activity_logs')
      .select('*, profiles(full_name, role)')
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    return data;
  }
};
