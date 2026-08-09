import React, { useState, useRef, useEffect } from 'react';
import { Bell, Menu, Moon, Search, Sun, LogOut, ChevronDown, Sparkles, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useStore } from '../../contexts/StoreContext';
import { useNavigate } from 'react-router-dom';

export function Navbar({ setSidebarOpen }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logoutAdmin } = useStore();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-3 border-b border-neutral-200/80 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl px-3 sm:px-5 shadow-sm">

      {/* Mobile Hamburger Toggle */}
      <button
        type="button"
        className="p-2 text-neutral-600 dark:text-slate-400 hover:text-black dark:hover:text-white lg:hidden transition-colors rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Divider (mobile only) */}
      <div className="h-6 w-px bg-neutral-200 dark:bg-slate-700 lg:hidden" />

      {/* Search Bar */}
      <div className="flex flex-1 items-center">
        <form className="relative flex w-full max-w-sm items-center" onSubmit={(e) => e.preventDefault()}>
          <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-neutral-400 shrink-0" />
          <input
            className="w-full pl-10 pr-10 py-2 text-xs font-medium text-neutral-900 dark:text-slate-100 bg-neutral-100 dark:bg-slate-800/60 border border-transparent focus:border-neutral-300 dark:focus:border-slate-600 rounded-xl outline-none transition-all placeholder:text-neutral-400 focus:bg-white dark:focus:bg-slate-800"
            placeholder="Search anything..."
            type="search"
          />
          <kbd className="hidden sm:inline-flex items-center absolute right-3 pointer-events-none text-[10px] font-mono font-bold text-neutral-400 bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-neutral-200 dark:border-slate-600">
            ⌘K
          </kbd>
        </form>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-1 sm:gap-2">

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={toggleTheme}
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-all"
          title="Toggle theme"
        >
          {isDarkMode
            ? <Sun className="h-4 w-4 text-amber-400" />
            : <Moon className="h-4 w-4 text-slate-600" />
          }
        </button>

        {/* Notifications */}
        <button
          type="button"
          className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-all relative"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        </button>

        <div className="h-5 w-px bg-neutral-200 dark:bg-slate-700 hidden sm:block mx-1" />

        {/* User Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setProfileDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-neutral-100 dark:hover:bg-slate-800 transition-colors"
          >
            {/* Avatar */}
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 text-white dark:text-black font-black text-xs flex items-center justify-center shadow-md shrink-0">
              {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
            </div>
            {/* User info - hidden on mobile */}
            <div className="hidden sm:flex sm:flex-col sm:items-start text-left">
              <span className="text-xs font-extrabold text-neutral-900 dark:text-slate-100 leading-tight">
                {user?.username || 'Admin User'}
              </span>
              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                {user?.role || 'Super Admin'}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-neutral-400 hidden sm:block transition-transform duration-200 ${profileDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {profileDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-neutral-200 dark:border-slate-800 p-1.5 z-50 animate-fadeIn">
              <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-slate-800 mb-1">
                <div className="flex items-center gap-2.5">
                  <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 text-white dark:text-black font-black text-xs flex items-center justify-center shrink-0">
                    {user?.username ? user.username.charAt(0).toUpperCase() : 'A'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-neutral-900 dark:text-slate-100 truncate">
                      {user?.username || 'Admin User'}
                    </p>
                    <p className="text-[10px] text-neutral-400 truncate">
                      {user?.username || 'admin'}@cosmatic.com
                    </p>
                  </div>
                </div>
              </div>

              <button
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-neutral-600 dark:text-slate-400 hover:bg-neutral-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                <User className="w-4 h-4" />
                Profile Settings
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2 text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-xl transition-colors mt-0.5"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
