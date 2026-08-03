import { useState, useEffect } from 'react';
import { Search, Plus, ShieldCheck, Mail, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../../supabase';

// Helper to format role names
const formatRole = (role) => {
  if (!role) return '';
  return role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const getRoleBadge = (role) => {
  const styles = {
    super_admin: 'bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 border-purple-200',
    admin: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200',
    editor: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200',
    support: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200'
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[role] || styles.support}`}>
      {formatRole(role)}
    </span>
  );
};

export function Roles() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Note: For a real app, adding an admin requires interacting with Supabase Auth (admin API) to create the user,
  // then inserting them into the admin_users table. 
  // We'll show a placeholder UI for that here.
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    setLoading(true);
    // Since admin_users references auth.users which isn't publicly selectable due to security,
    // in a real app, this query would be executed via a secure Edge Function or Server Route.
    // For this UI, we will simulate the fetch if it fails (due to RLS/Auth table restrictions).
    
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*');
        
      if (error) {
        throw error;
      }
      setAdmins(data || []);
    } catch (err) {
      console.warn("Could not fetch from admin_users directly (likely due to Supabase Auth restrictions on frontend). Loading dummy data for UI demonstration.");
      setAdmins([
        { id: '1', user_id: 'user-1', email: 'owner@cosmatic.com', role: 'super_admin', created_at: new Date().toISOString() },
        { id: '2', user_id: 'user-2', email: 'manager@cosmatic.com', role: 'admin', created_at: new Date().toISOString() },
        { id: '3', user_id: 'user-3', email: 'content@cosmatic.com', role: 'editor', created_at: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this staff member?')) {
      alert('In a production app, this would delete the user from auth.users and admin_users via an Edge Function.');
    }
  };

  const filteredAdmins = admins.filter(a => 
    (a.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.role || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Roles & Staff</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Manage team members and their access permissions.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 transition-colors"
        >
          <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
          Add Staff Member
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-admin-darkCard p-4 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
          <input
            type="text"
            placeholder="Search by email or role..."
            className="w-full pl-10 pr-4 py-2 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm focus:ring-2 focus:ring-admin-text outline-none text-admin-text dark:text-admin-darkText"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-admin-muted dark:text-admin-darkMuted">
            Loading staff members...
          </div>
        ) : admins.length === 0 ? (
          <div className="p-12 text-center">
            <ShieldCheck className="mx-auto h-12 w-12 text-admin-muted dark:text-admin-darkMuted/50 mb-4" />
            <h3 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-1">No staff members found</h3>
            <p className="text-admin-muted dark:text-admin-darkMuted">Invite team members to help manage your store.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
              <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText sm:pl-6">Staff Member</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Role</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Added On</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-admin-bg dark:bg-slate-700 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
                        </div>
                        <div className="font-medium text-admin-text dark:text-admin-darkText">{admin.email || 'Email hidden'}</div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      {getRoleBadge(admin.role)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted">
                      {new Date(admin.created_at).toLocaleDateString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          className="text-admin-accent hover:text-blue-700 dark:hover:text-blue-400"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        {admin.role !== 'super_admin' && (
                          <button 
                            onClick={() => handleDelete(admin.id)}
                            className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Invite Modal Placeholder */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="relative bg-white dark:bg-admin-darkCard w-full max-w-md mx-4 rounded-xl shadow-2xl p-6 border border-admin-border/50 dark:border-admin-darkBorder/50">
            <h3 className="text-lg font-bold text-admin-text dark:text-admin-darkText mb-4">Invite Staff Member</h3>
            <p className="text-sm text-admin-muted dark:text-admin-darkMuted mb-4">
              To add new staff members securely, an Edge Function must be configured in Supabase to invite users via Auth and assign their roles.
            </p>
            <button 
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-admin-bg dark:bg-slate-800 text-admin-text dark:text-admin-darkText py-2 rounded-lg text-sm font-medium hover:bg-admin-border dark:hover:bg-admin-darkBorder transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
