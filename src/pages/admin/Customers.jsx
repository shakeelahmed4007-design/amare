import { useState, useEffect } from 'react';
import { Search, Mail, Phone, Eye, Users, ShoppingBag, Crown } from 'lucide-react';
import { supabase } from '../../supabase';

const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const AVATAR_COLORS = [
  'from-violet-500 to-purple-600',
  'from-blue-500 to-cyan-600',
  'from-rose-500 to-pink-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-teal-600',
];

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { fetchCustomers(); }, []);

  async function fetchCustomers() {
    setLoading(true);
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error) setCustomers(data || []);
    setLoading(false);
  }

  const filtered = customers.filter(c =>
    c.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = customers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
  const totalPoints = customers.reduce((sum, c) => sum + (c.loyalty_points || 0), 0);

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">Customers</h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 mt-1">
            View and manage your customer base and loyalty programs.
          </p>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Total Customers', value: customers.length, icon: Users, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30' },
          { label: 'Total Revenue', value: formatCurrency(totalRevenue), icon: ShoppingBag, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
          { label: 'Loyalty Points Issued', value: totalPoints.toLocaleString(), icon: Crown, color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-slate-500 truncate">{s.label}</p>
                <p className="text-lg sm:text-xl font-black text-neutral-900 dark:text-white mt-0.5 truncate">{s.value}</p>
              </div>
              <div className={`p-2.5 rounded-xl ${s.bg} shrink-0`}>
                <s.icon className={`w-4 h-4 ${s.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-neutral-200/80 dark:border-slate-800">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 dark:bg-slate-800/60 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-semibold outline-none focus:ring-2 focus:ring-black text-neutral-900 dark:text-slate-100 placeholder:text-neutral-400"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Customers Table / Cards */}
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
              <Users className="w-7 h-7 text-neutral-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 dark:text-white">No customers found</h3>
            <p className="text-xs text-neutral-500 dark:text-slate-400 mt-1">
              {searchTerm ? 'Try a different search query.' : 'Customers will appear here once they sign up.'}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-100 dark:divide-slate-800">
                <thead className="bg-neutral-50/80 dark:bg-slate-800/50">
                  <tr>
                    {['Customer', 'Contact', 'Loyalty Points', 'Total Spent', 'Joined', ''].map(h => (
                      <th key={h} scope="col" className="py-3.5 px-4 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 dark:divide-slate-800/80">
                  {filtered.map((customer, idx) => (
                    <tr key={customer.id} className="hover:bg-neutral-50/80 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 pl-5 pr-4">
                        <div className="flex items-center gap-3">
                          <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} flex items-center justify-center shrink-0`}>
                            <span className="text-white font-black text-xs">
                              {customer.full_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-neutral-900 dark:text-white">{customer.full_name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-slate-400 mb-1">
                          <Mail className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[180px]">{customer.email}</span>
                        </div>
                        {customer.phone && (
                          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-slate-400">
                            <Phone className="w-3.5 h-3.5 shrink-0" />
                            <span>{customer.phone}</span>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-violet-50 dark:bg-violet-950/30 text-violet-700 dark:text-violet-400 border border-violet-200/60 dark:border-violet-900/40">
                          <Crown className="w-3 h-3" />
                          {customer.loyalty_points} pts
                        </span>
                      </td>
                      <td className="px-4 py-4 text-xs font-black text-neutral-900 dark:text-white whitespace-nowrap">
                        {formatCurrency(customer.total_spent)}
                      </td>
                      <td className="px-4 py-4 text-xs text-neutral-400 whitespace-nowrap">
                        {new Date(customer.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-4 pl-4 pr-5 text-right">
                        <button className="p-1.5 rounded-lg border border-neutral-200 dark:border-slate-700 hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors text-neutral-500 dark:text-slate-400">
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="block sm:hidden divide-y divide-neutral-100 dark:divide-slate-800">
              {filtered.map((customer, idx) => (
                <div key={customer.id} className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} flex items-center justify-center shrink-0`}>
                      <span className="text-white font-black text-sm">
                        {customer.full_name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-neutral-900 dark:text-white truncate">{customer.full_name}</p>
                      <p className="text-xs text-neutral-400 truncate">{customer.email}</p>
                    </div>
                    <span className="text-[10px] font-bold text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-950/30 px-2 py-0.5 rounded-full shrink-0">
                      {customer.loyalty_points} pts
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-t border-neutral-100 dark:border-slate-800 pt-2">
                    <span className="font-black text-neutral-900 dark:text-white">{formatCurrency(customer.total_spent)}</span>
                    <span className="text-neutral-400">{new Date(customer.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {!loading && filtered.length > 0 && (
          <div className="px-5 py-3.5 border-t border-neutral-200/80 dark:border-slate-800">
            <span className="text-xs text-neutral-500 dark:text-slate-400 font-medium">
              {filtered.length} of {customers.length} customers
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
