import { Bell, Menu, Moon, Search, Sun, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

export function Navbar({ setSidebarOpen }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-admin-border dark:border-admin-darkBorder bg-white dark:bg-admin-darkCard px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button
        type="button"
        className="-m-2.5 p-2.5 text-admin-muted dark:text-admin-darkMuted lg:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-admin-border dark:bg-admin-darkBorder lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-admin-muted dark:text-admin-darkMuted ml-2"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-0 pl-10 pr-0 text-admin-text dark:text-admin-darkText bg-transparent focus:ring-0 sm:text-sm placeholder:text-admin-muted dark:placeholder:text-admin-darkMuted outline-none"
            placeholder="Search orders, products, or customers..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            onClick={toggleTheme}
            className="-m-2.5 p-2.5 text-admin-muted hover:text-admin-text dark:text-admin-darkMuted dark:hover:text-admin-darkText transition-colors"
          >
            <span className="sr-only">Toggle theme</span>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <button type="button" className="-m-2.5 p-2.5 text-admin-muted hover:text-admin-text dark:text-admin-darkMuted dark:hover:text-admin-darkText transition-colors">
            <span className="sr-only">View notifications</span>
            <Bell className="h-5 w-5" aria-hidden="true" />
          </button>

          {/* Separator */}
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-admin-border dark:lg:bg-admin-darkBorder" aria-hidden="true" />

          {/* Profile dropdown */}
          <div className="relative">
            <button
              type="button"
              className="-m-1.5 flex items-center p-1.5"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                 <User className="h-5 w-5 text-admin-muted dark:text-admin-darkMuted" />
              </div>
              <span className="hidden lg:flex lg:items-center">
                <span className="ml-4 text-sm font-semibold leading-6 text-admin-text dark:text-admin-darkText" aria-hidden="true">
                  Admin User
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
