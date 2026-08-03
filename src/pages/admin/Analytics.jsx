import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign, Download } from 'lucide-react';

const salesData = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 139 },
  { name: 'Wed', sales: 2000, orders: 980 },
  { name: 'Thu', sales: 2780, orders: 390 },
  { name: 'Fri', sales: 1890, orders: 480 },
  { name: 'Sat', sales: 2390, orders: 380 },
  { name: 'Sun', sales: 3490, orders: 430 },
];

const topProducts = [
  { id: 1, name: 'Power Grip Primer', sales: 1245, revenue: 12450 },
  { id: 2, name: 'Halo Glow Liquid Filter', sales: 982, revenue: 13748 },
  { id: 3, name: 'O-Face Satin Lipstick', sales: 843, revenue: 7587 },
  { id: 4, name: 'Bite-Size Eyeshadow', sales: 654, revenue: 1962 },
];

export function Analytics() {
  const [timeRange, setTimeRange] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Analytics & Reports</h1>
          <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Track your store's performance and sales trends.</p>
        </div>
        <div className="flex items-center gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-white dark:bg-admin-darkCard border border-admin-border dark:border-admin-darkBorder text-admin-text dark:text-admin-darkText rounded-md py-2 pl-3 pr-8 text-sm focus:ring-2 focus:ring-admin-accent focus:border-transparent outline-none"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="12m">Last 12 months</option>
          </select>
          <button className="inline-flex items-center justify-center rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 transition-colors">
            <Download className="-ml-1 mr-2 h-4 w-4" aria-hidden="true" />
            Export
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-admin-muted dark:text-admin-darkMuted">Total Revenue</h3>
            <DollarSign className="h-4 w-4 text-admin-muted dark:text-admin-darkMuted" />
          </div>
          <div className="text-2xl font-bold text-admin-text dark:text-admin-darkText">$45,231.89</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +20.1% from last period
          </p>
        </div>
        
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-admin-muted dark:text-admin-darkMuted">Orders</h3>
            <ShoppingBag className="h-4 w-4 text-admin-muted dark:text-admin-darkMuted" />
          </div>
          <div className="text-2xl font-bold text-admin-text dark:text-admin-darkText">+3,219</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12.5% from last period
          </p>
        </div>

        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-admin-muted dark:text-admin-darkMuted">New Customers</h3>
            <Users className="h-4 w-4 text-admin-muted dark:text-admin-darkMuted" />
          </div>
          <div className="text-2xl font-bold text-admin-text dark:text-admin-darkText">+844</div>
          <p className="text-xs text-green-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1" />
            +18.2% from last period
          </p>
        </div>

        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          <div className="flex items-center justify-between pb-2">
            <h3 className="text-sm font-medium text-admin-muted dark:text-admin-darkMuted">Conversion Rate</h3>
            <TrendingUp className="h-4 w-4 text-admin-muted dark:text-admin-darkMuted" />
          </div>
          <div className="text-2xl font-bold text-admin-text dark:text-admin-darkText">3.2%</div>
          <p className="text-xs text-red-500 flex items-center mt-1">
            <TrendingUp className="h-3 w-3 mr-1 rotate-180 transform" />
            -1.1% from last period
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          <h3 className="text-lg font-bold text-admin-text dark:text-admin-darkText mb-6">Revenue Over Time</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="sales" stroke="#000000" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          <h3 className="text-lg font-bold text-admin-text dark:text-admin-darkText mb-6">Orders Volume</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                  cursor={{fill: '#334155', opacity: 0.1}}
                />
                <Bar dataKey="orders" fill="#000000" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-white dark:bg-admin-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 overflow-hidden">
        <div className="p-6 border-b border-admin-border dark:border-admin-darkBorder">
          <h3 className="text-lg font-bold text-admin-text dark:text-admin-darkText">Top Selling Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-admin-border dark:divide-admin-darkBorder">
            <thead className="bg-admin-bg/50 dark:bg-slate-800/50">
              <tr>
                <th scope="col" className="py-3.5 pl-6 pr-3 text-left text-sm font-semibold text-admin-text dark:text-admin-darkText">Product</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-admin-text dark:text-admin-darkText">Units Sold</th>
                <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-admin-text dark:text-admin-darkText pr-6">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-admin-border dark:divide-admin-darkBorder">
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-admin-bg/50 dark:hover:bg-slate-800/20 transition-colors">
                  <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-admin-text dark:text-admin-darkText">
                    {product.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right text-admin-muted dark:text-admin-darkMuted">
                    {product.sales.toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-right font-medium text-admin-text dark:text-admin-darkText pr-6">
                    ${product.revenue.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
