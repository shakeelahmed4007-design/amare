import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart
} from 'recharts';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Download, ArrowUpRight } from 'lucide-react';

const salesData = [
  { name: 'Mon', sales: 0, orders: 0 },
  { name: 'Tue', sales: 0, orders: 0 },
  { name: 'Wed', sales: 0, orders: 0 },
  { name: 'Thu', sales: 0, orders: 0 },
  { name: 'Fri', sales: 0, orders: 0 },
  { name: 'Sat', sales: 0, orders: 0 },
  { name: 'Sun', sales: 0, orders: 0 },
];

const topProducts = [];

const STAT_CARDS = [
  {
    label: 'Total Revenue',
    value: '$0',
    change: '0%',
    up: true,
    icon: DollarSign,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  {
    label: 'Total Orders',
    value: '0',
    change: '0%',
    up: true,
    icon: ShoppingBag,
    color: 'text-blue-500',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  {
    label: 'New Customers',
    value: '0',
    change: '0%',
    up: true,
    icon: Users,
    color: 'text-violet-500',
    bg: 'bg-violet-50 dark:bg-violet-950/30',
  },
  {
    label: 'Conversion Rate',
    value: '0%',
    change: '0%',
    up: true,
    icon: TrendingUp,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
  },
];

const CHART_TOOLTIP_STYLE = {
  contentStyle: {
    backgroundColor: '#1e293b',
    border: 'none',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '12px',
    padding: '10px 14px',
  },
  itemStyle: { color: '#94a3b8' },
  labelStyle: { color: '#fff', fontWeight: 800, marginBottom: 4 },
};

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6 pb-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900 dark:text-white">
            Analytics & Reports
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-slate-400 mt-1">
            Track your store's performance, sales trends, and customer insights.
          </p>
        </div>
        <div className="flex items-center gap-2.5 flex-wrap sm:flex-nowrap self-start sm:self-auto">
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-neutral-200 dark:border-slate-700 rounded-xl text-xs font-bold outline-none text-neutral-800 dark:text-slate-200 shadow-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold shadow-md hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {STAT_CARDS.map(card => (
          <div
            key={card.label}
            className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 dark:text-slate-500 truncate">
                  {card.label}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                  {card.value}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${card.bg} shrink-0`}>
                <card.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${card.color}`} />
              </div>
            </div>
            <div className={`mt-3 flex items-center gap-1 text-xs font-bold ${card.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              {card.up
                ? <TrendingUp className="w-3.5 h-3.5" />
                : <TrendingDown className="w-3.5 h-3.5" />
              }
              {card.change} from last period
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-black text-neutral-900 dark:text-white">Revenue Over Time</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Daily revenue trend</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              0%
            </div>
          </div>
          <div className="h-52 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip {...CHART_TOOLTIP_STYLE} formatter={v => [`$${v.toLocaleString()}`, 'Revenue']} />
                <Area type="monotone" dataKey="sales" stroke="#06b6d4" strokeWidth={2.5} fill="url(#salesGrad)" dot={{ r: 3, fill: '#06b6d4', strokeWidth: 0 }} activeDot={{ r: 5 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-black text-neutral-900 dark:text-white">Orders Volume</h3>
              <p className="text-xs text-neutral-400 mt-0.5">Daily order count</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              0%
            </div>
          </div>
          <div className="h-52 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} barSize={24}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip {...CHART_TOOLTIP_STYLE} formatter={v => [v, 'Orders']} />
                <Bar dataKey="orders" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-neutral-100 dark:border-slate-800">
          <h3 className="text-base font-black text-neutral-900 dark:text-white">Top Selling Products</h3>
          <p className="text-xs text-neutral-400 mt-0.5">Best performers this period</p>
        </div>

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-100 dark:divide-slate-800">
            <thead className="bg-neutral-50/80 dark:bg-slate-800/50">
              <tr>
                {['#', 'Product', 'Units Sold', 'Revenue', 'Share'].map(h => (
                  <th key={h} scope="col" className="py-3.5 px-4 text-left text-[11px] font-black uppercase text-neutral-400 tracking-wider first:pl-5 last:pr-5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 dark:divide-slate-800/80">
              {topProducts.length === 0 && (
              <tr>
                <td colSpan="5" className="py-8 text-center text-xs font-bold text-neutral-500">
                  No data available yet.
                </td>
              </tr>
            )}
            {topProducts.map((product, idx) => (
              <tr key={product.id} className="hover:bg-neutral-50/80 dark:hover:bg-slate-800/30 transition-colors">
                <td className="py-4 pl-5 pr-4 text-xs font-black text-neutral-400">#{idx + 1}</td>
                <td className="px-4 py-4 text-xs font-extrabold text-neutral-900 dark:text-white">{product.name}</td>
                <td className="px-4 py-4 text-xs font-bold text-neutral-600 dark:text-slate-400">{product.sales.toLocaleString()}</td>
                <td className="px-4 py-4 text-xs font-black text-neutral-900 dark:text-white">${product.revenue.toLocaleString()}</td>
                <td className="px-4 py-4 pr-5">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-neutral-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        style={{ width: `${product.share}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-neutral-400 w-8 text-right">{product.share}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="block sm:hidden divide-y divide-neutral-100 dark:divide-slate-800">
        {topProducts.length === 0 && (
          <div className="p-8 text-center text-xs font-bold text-neutral-500">
            No data available yet.
          </div>
        )}
        {topProducts.map((product, idx) => (
            <div key={product.id} className="p-4 flex items-center gap-3">
              <span className="text-lg font-black text-neutral-200 dark:text-slate-700 w-6 shrink-0">#{idx + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-neutral-900 dark:text-white truncate">{product.name}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1 bg-neutral-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                      style={{ width: `${product.share}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">{product.share}%</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-black text-neutral-900 dark:text-white">${product.revenue.toLocaleString()}</p>
                <p className="text-[10px] text-neutral-400">{product.sales} units</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
