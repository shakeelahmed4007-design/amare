import { useState } from 'react';
import { Save, Shield, Store, Bell, CreditCard, HelpCircle } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [storeName, setStoreName] = useState('e.l.f. Style Cosmetics');
  const [contactEmail, setContactEmail] = useState('info@cosmatic.com');
  const [currency, setCurrency] = useState('USD');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Settings saved successfully!');
    }, 800);
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Store },
    { id: 'security', name: 'Security & Access', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'payment', name: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-admin-text dark:text-admin-darkText">Settings</h1>
        <p className="text-sm text-admin-muted dark:text-admin-darkMuted mt-1">Configure your online store preferences and credentials.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Navigation Tabs */}
        <aside className="w-full md:w-64 shrink-0">
          <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto pb-3 md:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'bg-admin-text dark:bg-admin-darkText text-white dark:text-black font-semibold'
                      : 'text-admin-muted dark:text-admin-darkMuted hover:bg-admin-bg dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-admin-darkCard p-6 rounded-xl shadow-soft dark:shadow-dark-soft border border-admin-border/50 dark:border-admin-darkBorder/50">
          {activeTab === 'general' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h3 className="text-lg font-bold text-admin-text dark:text-admin-darkText">General Store Information</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-admin-text dark:text-admin-darkText mb-2">Store Name</label>
                  <input
                    type="text"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-admin-text dark:text-admin-darkText mb-2">Contact Email</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="block w-full rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-admin-text dark:text-admin-darkText mb-2">Currency</label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="block w-full max-w-xs rounded-md border-0 py-2 px-3 text-admin-text dark:text-admin-darkText bg-admin-bg dark:bg-slate-800 shadow-sm ring-1 ring-inset ring-admin-border dark:ring-admin-darkBorder focus:ring-2 focus:ring-inset focus:ring-admin-text sm:text-sm sm:leading-6"
                >
                  <option value="USD">United States Dollar ($)</option>
                  <option value="EUR">Euro (€)</option>
                  <option value="PKR">Pakistani Rupee (Rs)</option>
                  <option value="GBP">British Pound (£)</option>
                </select>
              </div>

              <div className="pt-4 border-t border-admin-border dark:border-admin-darkBorder flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md bg-admin-text dark:bg-admin-darkText px-4 py-2 text-sm font-semibold text-white dark:text-black shadow-sm hover:bg-admin-text/90 disabled:opacity-50 transition-colors"
                >
                  <Save className="h-4 w-4" />
                  {isSubmitting ? 'Saving...' : 'Save Settings'}
                </button>
              </div>
            </form>
          )}

          {activeTab !== 'general' && (
            <div className="py-12 text-center text-admin-muted dark:text-admin-darkMuted space-y-3">
              <HelpCircle className="h-12 w-12 mx-auto text-admin-muted/50" />
              <h4 className="font-bold text-admin-text dark:text-admin-darkText">Advanced Settings Configured on Supabase</h4>
              <p className="text-sm max-w-sm mx-auto">Payment, Security, and Notification keys are securely managed directly via your Supabase Project Settings and Environment variables.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
