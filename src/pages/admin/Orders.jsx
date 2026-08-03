import { useState, useEffect } from 'react';
import { Search, Filter, Eye, Truck, CheckCircle2, Clock, XCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../../supabase';

// Helper to format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Helper for status styling
const getStatusBadge = (status) => {
  const styles = {
    pending: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    processing: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    shipped: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800',
    delivered: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800',
    cancelled: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
    refunded: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700'
  };

  const icons = {
    pending: <Clock className="w-3 h-3 mr-1" />,
    processing: <AlertCircle className="w-3 h-3 mr-1" />,
    shipped: <Truck className="w-3 h-3 mr-1" />,
    delivered: <CheckCircle2 className="w-3 h-3 mr-1" />,
    cancelled: <XCircle className="w-3 h-3 mr-1" />,
    refunded: <XCircle className="w-3 h-3 mr-1" />
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status] || styles.pending}`}>
      {icons[status]}
      <span className="capitalize">{status}</span>
    </span>
  );
};

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(full_name, email)')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching orders:', error);
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date() })
      .eq('id', orderId);

    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      // Optimistic update
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
      ));
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (o.customers?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Orders</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Manage and track customer orders.</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-admin-darkCard p-4 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
        <div className="relative flex-1 w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer Name..."
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

      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-admin-muted dark:text-admin-darkMuted">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="p-12 text-center">
            <Truck className="mx-auto h-12 w-12 text-admin-muted dark:text-admin-darkMuted/50 mb-4" />
            <h3 className="text-lg font-medium text-admin-text dark:text-admin-darkText mb-1">No orders yet</h3>
            <p className="text-admin-muted dark:text-admin-darkMuted">When customers place orders, they will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
              <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText sm:pl-6">Order ID</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Customer</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Date</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Status</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Total</th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6 font-medium text-admin-text dark:text-admin-darkText">
                      #{order.id.split('-')[0].toUpperCase()}
                    </td>
                    <td className="px-3 py-4 text-sm">
                      <div className="font-medium text-admin-text dark:text-admin-darkText">{order.customers?.full_name || 'Guest User'}</div>
                      <div className="text-admin-muted dark:text-admin-darkMuted text-xs mt-0.5">{order.customers?.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-admin-muted dark:text-admin-darkMuted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                        className="text-sm bg-transparent border-0 focus:ring-0 cursor-pointer outline-none pl-0 font-medium"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                      </select>
                      <div className="mt-1">
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-admin-text dark:text-admin-darkText">
                      {formatCurrency(order.total_amount)}
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
