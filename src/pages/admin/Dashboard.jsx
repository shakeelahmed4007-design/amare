import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react';

const stats = [
  { name: 'Total Revenue', value: '$45,231.89', change: '+20.1%', changeType: 'positive', icon: DollarSign },
  { name: 'Total Orders', value: '3,219', change: '+12.5%', changeType: 'positive', icon: ShoppingCart },
  { name: 'Total Customers', value: '1,244', change: '+5.4%', changeType: 'positive', icon: Users },
  { name: 'Total Products', value: '412', change: '-2.3%', changeType: 'negative', icon: Package },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Dashboard Overview</h1>
        <div className="flex items-center gap-2">
          <select className="bg-white dark:bg-admin-darkCard border border-admin-border dark:border-admin-darkBorder text-admin-text dark:text-admin-darkText rounded-md py-1.5 pl-3 pr-8 text-sm focus:ring-2 focus:ring-admin-accent focus:border-transparent outline-none">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>This month</option>
            <option>This year</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-xl bg-white dark:bg-admin-darkCard p-6 shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50"
          >
            <dt>
              <div className="absolute rounded-md bg-admin-bg dark:bg-slate-800 p-3">
                <stat.icon className="h-6 w-6 text-admin-text dark:text-admin-darkText" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-admin-muted dark:text-admin-darkMuted">
                {stat.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-admin-text dark:text-admin-darkText">
                {stat.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white dark:bg-admin-darkCard shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 p-6 min-h-[400px] flex items-center justify-center">
            <p className="text-admin-muted dark:text-admin-darkMuted text-sm">Revenue Chart Placeholder</p>
        </div>
        <div className="rounded-xl bg-white dark:bg-admin-darkCard shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50 p-6 min-h-[400px] flex items-center justify-center">
            <p className="text-admin-muted dark:text-admin-darkMuted text-sm">Recent Orders Placeholder</p>
        </div>
      </div>
    </div>
  );
}
