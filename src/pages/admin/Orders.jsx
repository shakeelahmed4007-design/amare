import { useState, useEffect } from 'react';
import { Search, Filter, Truck, CheckCircle2, Clock, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../../supabase';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const STATUS_CONFIG = {
  pending:    { label: 'Pending',    cls: 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800', icon: Clock },
  pending_payment_verification: { label: 'Pending Verification', cls: 'bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400 border-orange-200 dark:border-orange-800', icon: AlertCircle },
  processing: { label: 'Processing', cls: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800', icon: AlertCircle },
  shipped:    { label: 'Shipped',    cls: 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800', icon: Truck },
  delivered:  { label: 'Delivered',  cls: 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800', icon: CheckCircle2 },
  cancelled:  { label: 'Cancelled',  cls: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800', icon: XCircle },
  refunded:   { label: 'Refunded',   cls: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400 border-slate-200 dark:border-slate-700', icon: XCircle },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  const Icon = cfg.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${cfg.cls}`}>
      <Icon className="w-3 h-3" />
      <span className="capitalize">{status}</span>
    </span>
  );
}

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { fetchOrders(); }, []);

  async function fetchOrders() {
    setLoading(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*, customers(full_name, email)')
      .order('created_at', { ascending: false });
    if (!error) setOrders(data || []);
    setLoading(false);
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus, updated_at: new Date() })
      .eq('id', orderId);
    if (!error) {
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    }
  };

  const filtered = orders.filter(o => {
    const matchSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.customers?.full_name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === 'all' || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Orders</h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 mt-1">Manage and track customer orders in real-time.</p>
        </div>
        <button
          onClick={fetchOrders}
          className="inline-flex items-center gap-2 px-4 py-2.5 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold text-neutral-700 dark:text-slate-200 hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by Order ID or customer name..."
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black text-neutral-900 dark:text-slate-100 placeholder:text-neutral-400"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3.5 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-neutral-800 dark:text-slate-200"
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
              <option key={val} value={val}>{cfg.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-slate-800 overflow-hidden">
        {loading ? (
          <div className="p-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-14 bg-neutral-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-14 h-14 bg-neutral-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Truck className="w-7 h-7 text-neutral-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">No orders found</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
              {searchTerm || statusFilter !== 'all' ? 'Try adjusting your filters.' : 'Orders will appear here when customers place them.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-100 dark:divide-slate-800">
                <thead className="bg-neutral-50/80 dark:bg-slate-800/50">
                  <tr>
                    {['Order ID', 'Customer', 'Date', 'Status', 'Total', 'Action'].map(h => (
                      <th key={h} scope="col" className="py-3.5 px-4 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider first:pl-5 last:text-right last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-slate-800/80">
                  {filtered.map(order => (
                    <tr key={order.id} className="hover:bg-neutral-50/80 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 pl-5 pr-4 text-xs font-extrabold text-neutral-900 dark:text-white">
                        #{order.id.split('-')[0].toUpperCase()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-xs font-bold text-neutral-900 dark:text-white">{order.customers?.full_name || 'Guest User'}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">{order.customers?.email}</div>
                      </td>
                      <td className="px-4 py-4 text-xs text-neutral-500 dark:text-slate-400 whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-col gap-1.5">
                          <StatusBadge status={order.status} />
                          <select
                            value={order.status}
                            onChange={e => handleStatusUpdate(order.id, e.target.value)}
                            className="text-[10px] bg-transparent border-0 focus:ring-0 cursor-pointer outline-none text-neutral-400 dark:text-slate-500 font-bold"
                          >
                            {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                              <option key={val} value={val}>{cfg.label}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-xs font-black text-neutral-900 dark:text-white whitespace-nowrap">
                        {formatCurrency(order.total_amount)}
                      </td>
                      <td className="py-4 pl-4 pr-5 text-right space-y-2">
                        {order.status === 'pending_payment_verification' && order.payment_proof_url && (
                          <div className="flex flex-col items-end gap-2">
                            <a href={order.payment_proof_url} target="_blank" rel="noreferrer" className="text-[10px] text-cyan-600 dark:text-cyan-400 hover:underline">
                              View Proof
                            </a>
                            <button
                              onClick={async () => {
                                const { orderService } = await import('../../services/orderService');
                                await orderService.verifyManualPayment(order.id);
                                fetchOrders();
                              }}
                              className="px-2 py-1 text-[10px] bg-black text-white rounded font-bold hover:bg-neutral-800"
                            >
                              Verify Payment
                            </button>
                          </div>
                        )}
                        <button className="text-xs font-bold text-neutral-600 dark:text-neutral-400 hover:underline block ml-auto">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block md:hidden divide-y divide-neutral-100 dark:divide-slate-800">
              {filtered.map(order => (
                <div key={order.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-xs font-black text-neutral-900 dark:text-white">
                        #{order.id.split('-')[0].toUpperCase()}
                      </span>
                      <p className="text-xs font-bold text-neutral-700 dark:text-slate-300 mt-0.5">
                        {order.customers?.full_name || 'Guest'}
                      </p>
                      <p className="text-[10px] text-neutral-400">{order.customers?.email}</p>
                    </div>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-neutral-100 dark:border-slate-800">
                    <span className="text-sm font-black text-neutral-900 dark:text-white">
                      {formatCurrency(order.total_amount)}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-neutral-400">
                        {new Date(order.created_at).toLocaleDateString()}
                      </span>
                      <select
                        value={order.status}
                        onChange={e => handleStatusUpdate(order.id, e.target.value)}
                        className="text-[10px] bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 rounded-lg px-2 py-1 outline-none font-bold text-neutral-700 dark:text-slate-200"
                      >
                        {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
                          <option key={val} value={val}>{cfg.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {order.status === 'pending_payment_verification' && order.payment_proof_url && (
                    <div className="pt-3 flex items-center justify-between border-t border-neutral-100 dark:border-slate-800">
                      <a href={order.payment_proof_url} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 hover:underline">
                        View Payment Proof
                      </a>
                      <button
                        onClick={async () => {
                          const { orderService } = await import('../../services/orderService');
                          await orderService.verifyManualPayment(order.id);
                          fetchOrders();
                        }}
                        className="px-3 py-1.5 text-xs bg-black text-white rounded-md font-bold hover:bg-neutral-800"
                      >
                        Verify Payment
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Footer count */}
        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3.5 border-t border-neutral-200/80 dark:border-slate-800 bg-white dark:bg-slate-900">
            <span className="text-xs text-neutral-500 dark:text-slate-400 font-medium">
              Showing {filtered.length} of {orders.length} orders
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
