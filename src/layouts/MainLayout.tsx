import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TicketWidget from '@/components/common/TicketWidget';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { getWithExpiry } from '@/utils/auth';

function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSessionValid, setIsSessionValid] = useState(
    () => Boolean(getWithExpiry('token') && getWithExpiry('user', true)),
  );
  const hasRedirected = useRef(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const redirectToLogin = () => {
      if (hasRedirected.current) return;

      hasRedirected.current = true;
      setIsSessionValid(false);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.clear();

      navigate('/', {
        replace: true,
        state: {
          snackbar: {
            message: 'Your session has expired. Please sign in again.',
            type: 'error',
          },
        },
      });
    };

    const checkSession = () => {
      const token = getWithExpiry('token');
      const user = getWithExpiry('user', true);

      if (!token || !user) {
        redirectToLogin();
        return;
      }

      setIsSessionValid(true);
    };

    const intervalId = window.setInterval(checkSession, 30 * 1000);

    window.addEventListener('focus', checkSession);
    window.addEventListener('pointerdown', checkSession, true);
    window.addEventListener('keydown', checkSession, true);

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener('focus', checkSession);
      window.removeEventListener('pointerdown', checkSession, true);
      window.removeEventListener('keydown', checkSession, true);
    };
  }, [navigate]);

  if (!isSessionValid) {
    return null;
  }

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
