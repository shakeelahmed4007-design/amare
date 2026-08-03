import { NavLink } from 'react-router-dom';
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
  Settings
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Products', href: '/admin/products', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/admin/customers', icon: Users },
  { name: 'Reviews', href: '/admin/reviews', icon: Star },
  { name: 'Discounts', href: '/admin/discounts', icon: TicketPercent },
  { name: 'Roles & Staff', href: '/admin/roles', icon: ShieldCheck },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
];

export function Sidebar({ open }) {
  return (
    <aside 
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-admin-darkCard border-r border-admin-border dark:border-admin-darkBorder transition-transform duration-300 ease-in-out lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <div className="flex items-center justify-center h-16 border-b border-admin-border dark:border-admin-darkBorder px-4">
        <h1 className="text-xl font-bold text-admin-text dark:text-admin-darkText flex items-center gap-2">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-black font-serif text-sm">e.l.f.</span>
          </div>
          Admin Panel
        </h1>
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)] p-4">
        <nav className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-admin-bg dark:bg-slate-800 text-admin-text dark:text-admin-darkText' 
                    : 'text-admin-muted dark:text-admin-darkMuted hover:bg-admin-bg dark:hover:bg-slate-800/50 hover:text-admin-text dark:hover:text-admin-darkText'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        <div className="mt-8 pt-4 border-t border-admin-border dark:border-admin-darkBorder">
           <NavLink
              to="/admin/settings"
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-admin-bg dark:bg-slate-800 text-admin-text dark:text-admin-darkText' 
                    : 'text-admin-muted dark:text-admin-darkMuted hover:bg-admin-bg dark:hover:bg-slate-800/50 hover:text-admin-text dark:hover:text-admin-darkText'
                }`
              }
            >
              <Settings className="w-5 h-5" />
              Settings
            </NavLink>
        </div>
      </div>
    </aside>
  );
}
