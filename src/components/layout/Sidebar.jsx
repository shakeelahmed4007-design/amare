import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ShoppingCart, 
  Users, 
  Star, 
  TicketPercent, 
  ShieldCheck, 
  BarChart3,
  Settings,
  X,
  Store,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import logoImg from '../../assets/LOGO.png';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Subscriptions', href: '/admin/subscriptions', icon: TicketPercent },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Roles & Staff', href: '/admin/roles', icon: ShieldCheck },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export function Sidebar({ open, setSidebarOpen }) {
  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-neutral-200/80 dark:border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b border-neutral-200/80 dark:border-slate-800 shrink-0">
          <Link to="/admin" className="flex items-center gap-3 group min-w-0">
            <div className="w-10 h-10 bg-slate-900 dark:bg-slate-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 overflow-hidden p-1.5">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm font-black text-neutral-900 dark:text-white tracking-tight truncate">
                Admin Console
              </h1>
              <span className="text-[10px] uppercase font-bold text-cyan-600 dark:text-cyan-400 tracking-wider block">
                Pro SaaS Dashboard
              </span>
            </div>
          </Link>

          <button
            onClick={() => setSidebarOpen(false)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-white lg:hidden transition-colors hover:bg-neutral-100 dark:hover:bg-slate-800 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="mb-2 px-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-slate-500">
              Navigation
            </span>
          </div>
          <nav className="space-y-0.5">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/admin'}
                onClick={() => setSidebarOpen && setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-black shadow-md'
                      : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800/70 hover:text-neutral-900 dark:hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${isActive ? '' : ''}`} />
                    <span className="flex-1">{item.name}</span>
                    {isActive && <ChevronRight className="w-3 h-3 opacity-60" />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-3 border-t border-neutral-200/80 dark:border-slate-800 space-y-1 shrink-0">
          <Link
            to="/shop"
            target="_blank"
            className="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-neutral-700 dark:text-slate-300 bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-800/80 dark:to-slate-800/40 hover:from-cyan-100 hover:to-blue-100 dark:hover:from-slate-800 dark:hover:to-slate-700 border border-cyan-200/60 dark:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Store className="w-4 h-4 text-cyan-500" />
              <span>View Storefront</span>
            </div>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </Link>

          <NavLink
            to="/admin/settings"
            onClick={() => setSidebarOpen && setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-slate-900 to-slate-800 dark:from-white dark:to-slate-100 text-white dark:text-black shadow-md'
                  : 'text-neutral-600 dark:text-slate-400 hover:bg-neutral-100 dark:hover:bg-slate-800/70 hover:text-neutral-900 dark:hover:text-white'
              }`
            }
          >
            <Settings className="w-4 h-4 shrink-0" />
            <span>Settings</span>
          </NavLink>
        </div>
      </aside>
    </>
  );
}
