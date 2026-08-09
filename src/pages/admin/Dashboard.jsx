import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import {
  Package, Tags, TicketPercent, AlertTriangle,
  TrendingUp, Activity, Plus, ArrowRight, ShieldCheck,
  Zap, CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const { products, categories, subscriptions, activeSubscription, activityLogs } = useStore();

  const lowStockProducts = products.filter(p => (p.stock_quantity ?? 0) < 10);
  const activeSubs = subscriptions.filter(s => s.status === 'Active');
  const activeProducts = products.filter(p => p.status === 'Active');

  const stats = [
    {
      name: 'Total Products',
      value: products.length,
      change: `${activeProducts.length} active`,
      icon: Package,
      gradient: 'from-blue-500 to-indigo-600',
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      text: 'text-blue-600 dark:text-blue-400',
      trend: '+12%',
      trendUp: true,
    },
    {
      name: 'Categories',
      value: categories.length,
      change: `${categories.filter(c => c.parentId).length} subcategories`,
      icon: Tags,
      gradient: 'from-violet-500 to-purple-600',
      bg: 'bg-violet-50 dark:bg-violet-950/30',
      text: 'text-violet-600 dark:text-violet-400',
      trend: '+3',
      trendUp: true,
    },
    {
      name: 'Active Subscriptions',
      value: activeSubs.length,
      change: activeSubscription ? `${activeSubscription.name} plan` : 'No active plan',
      icon: TicketPercent,
      gradient: 'from-pink-500 to-rose-600',
      bg: 'bg-pink-50 dark:bg-pink-950/30',
      text: 'text-pink-600 dark:text-pink-400',
      trend: '+8%',
      trendUp: true,
    },
    {
      name: 'Low Stock Alerts',
      value: lowStockProducts.length,
      change: lowStockProducts.length > 0 ? 'Requires restock' : 'All stocks healthy',
      icon: lowStockProducts.length > 0 ? AlertTriangle : CheckCircle2,
      gradient: lowStockProducts.length > 0 ? 'from-amber-500 to-orange-600' : 'from-emerald-500 to-teal-600',
      bg: lowStockProducts.length > 0 ? 'bg-amber-50 dark:bg-amber-950/30' : 'bg-emerald-50 dark:bg-emerald-950/30',
      text: lowStockProducts.length > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400',
      trend: lowStockProducts.length > 0 ? 'Action needed' : 'All good',
      trendUp: lowStockProducts.length === 0,
    },
  ];

  return (
    <div className="space-y-6 pb-8">

      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-700">
        {/* Decorative gradient blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1.5 bg-cyan-400/20 text-cyan-400 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-cyan-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin Command Center
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome Back, {' '}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Admin
              </span>
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-lg leading-relaxed">
              Monitor inventory metrics, category hierarchies, low-stock warnings, and subscription discounts in real-time.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap sm:flex-nowrap">
            <Link
              to="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-lg hover:shadow-cyan-400/25 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </Link>
            <Link
              to="/admin/subscriptions"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all border border-white/20 hover:border-white/40"
            >
              <Zap className="w-4 h-4" />
              Manage Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm hover:shadow-md dark:hover:shadow-slate-900/50 transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-slate-500 truncate">
                  {stat.name}
                </p>
                <p className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-[10px] sm:text-xs text-neutral-400 dark:text-slate-500 mt-0.5 font-medium truncate">
                  {stat.change}
                </p>
              </div>
              <div className={`p-2.5 rounded-xl ${stat.bg} shrink-0 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${stat.text}`} />
              </div>
            </div>

            <div className={`mt-3 flex items-center gap-1 text-[10px] font-bold ${stat.trendUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
              <TrendingUp className={`w-3 h-3 ${!stat.trendUp ? 'rotate-180' : ''}`} />
              {stat.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Low Stock Alerts + Activity Log */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Low Stock Alerts */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-neutral-100 dark:border-slate-800">
            <h2 className="text-base font-black text-neutral-900 dark:text-white flex items-center gap-2">
              <div className="p-1.5 bg-amber-100 dark:bg-amber-950/50 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
              </div>
              Low Stock Alerts
              <span className="text-xs font-bold text-neutral-400 dark:text-slate-500">(&lt;10 units)</span>
            </h2>
            <Link
              to="/admin/products"
              className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="p-4">
            {lowStockProducts.length === 0 ? (
              <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/60 dark:border-emerald-900/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <p className="text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  All product inventory levels are healthy!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {lowStockProducts.slice(0, 6).map(p => (
                  <div key={p.id} className="flex items-center justify-between p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-white dark:bg-slate-800 overflow-hidden shrink-0 border border-neutral-200 dark:border-slate-700">
                        {p.images?.[0] ? (
                          <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover" />
                        ) : (
                          <Package className="w-4 h-4 m-auto mt-2.5 text-neutral-400" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="font-bold text-sm text-neutral-900 dark:text-white block truncate">{p.title}</span>
                        <span className="text-xs text-neutral-400 capitalize">{p.category_slug}</span>
                      </div>
                    </div>
                    <span className="font-black text-xs text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2.5 py-1 rounded-full shrink-0 ml-2">
                      {p.stock_quantity} left
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-neutral-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="flex items-center p-5 border-b border-neutral-100 dark:border-slate-800">
            <h2 className="text-base font-black text-neutral-900 dark:text-white flex items-center gap-2">
              <div className="p-1.5 bg-cyan-100 dark:bg-cyan-950/50 rounded-lg">
                <Activity className="w-4 h-4 text-cyan-500" />
              </div>
              Recent Activity Log
            </h2>
          </div>

          <div className="p-4 space-y-2 max-h-[320px] overflow-y-auto">
            {activityLogs.length === 0 ? (
              <p className="text-sm text-neutral-400 text-center py-8">No recent activity.</p>
            ) : (
              activityLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50 dark:bg-slate-800/40 border border-neutral-100 dark:border-slate-800/80 hover:bg-neutral-100 dark:hover:bg-slate-800/60 transition-colors">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 shrink-0 ring-2 ring-cyan-100 dark:ring-cyan-900" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-bold text-xs text-neutral-900 dark:text-white">{log.action}</span>
                      <span className="text-[10px] text-neutral-400 shrink-0">{log.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-slate-400 mt-0.5 leading-relaxed">{log.detail}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'New Product', href: '/admin/products/new', icon: Package, color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50', border: 'border-blue-200/60 dark:border-blue-900/40' },
          { label: 'Categories', href: '/admin/categories', icon: Tags, color: 'text-violet-500', bg: 'bg-violet-50 dark:bg-violet-950/30 hover:bg-violet-100 dark:hover:bg-violet-950/50', border: 'border-violet-200/60 dark:border-violet-900/40' },
          { label: 'Orders', href: '/admin/orders', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50', border: 'border-rose-200/60 dark:border-rose-900/40' },
          { label: 'Analytics', href: '/admin/analytics', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50', border: 'border-emerald-200/60 dark:border-emerald-900/40' },
        ].map(item => (
          <Link
            key={item.label}
            to={item.href}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border ${item.bg} ${item.border} transition-all group`}
          >
            <div className={`p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-sm group-hover:scale-110 transition-transform`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <span className="text-xs font-bold text-neutral-700 dark:text-slate-300">{item.label}</span>
          </Link>
        ))}
      </div>

    </div>
  );
}
