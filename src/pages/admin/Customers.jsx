import { useState, useEffect } from 'react';
import { Search, Filter, Mail, Phone, ShoppingBag, Eye, Users } from 'lucide-react';
import { supabase } from '../../supabase';

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    setLoading(true);
    // Join with orders to get real total_spent and order_count if needed, 
    // but we can just use the fields on the customer table as designed in our schema.
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching customers:', error);
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  }

  const filteredCustomers = customers.filter(c => 
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Customers</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">View and manage your customer base and loyalty programs.</p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-admin-darkCard p-4 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2 bg-admin-bg dark:bg-slate-800 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm focus:ring-2 focus:ring-admin-text outline-none text-admin-text dark:text-admin-darkText"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 border border-admin-border dark:border-admin-darkBorder rounded-lg text-sm font-medium text-admin-text dark:text-admin-darkText hover:bg-admin-bg dark:hover:bg-slate-800 transition-colors">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-admin-muted dark:text-admin-darkMuted">
            Loading customers...
          </div>
        ) : customers.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="mx-auto h-12 w-12 text-admin-muted dark:text-admin-darkMuted/50 mb-4" />
            <h3 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-1">No customers found</h3>
            <p className="text-admin-muted dark:text-admin-darkMuted">As users sign up or place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
              <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText sm:pl-6">Customer</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Contact</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Loyalty Points</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Total Spent</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Joined</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                           <span className="text-indigo-700 dark:text-indigo-400 font-bold">
                             {customer.full_name.charAt(0).toUpperCase()}
                           </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-admin-text dark:text-admin-darkText">{customer.full_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted">
                      <div className="flex items-center gap-2 mb-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>{customer.email}</span>
                      </div>
                      {customer.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-3.5 w-3.5" />
                          <span>{customer.phone}</span>
                        </div>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                        {customer.loyalty_points} pts
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-admin-text dark:text-admin-darkText">
                      {formatCurrency(customer.total_spent)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted">
                      {new Date(customer.created_at).toLocaleDateString()}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button className="text-admin-accent hover:text-blue-700 dark:hover:text-blue-400 inline-flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
