import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TicketWidget from '@/components/common/TicketWidget';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar isSidebarOpen={isSidebarOpen} />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header isSidebarOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />

        <main className="flex-1">
          <Outlet />
        </main>

        <Footer />
        <TicketWidget />
      </div>
    </div>
  );
}

export default MainLayout;
