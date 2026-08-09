import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors font-sans text-neutral-900 dark:text-slate-100">
      <Sidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area — offset by sidebar width on large screens */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        <Navbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8 max-w-screen-2xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
