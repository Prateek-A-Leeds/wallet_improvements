import { useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import TicketWidget from '@/components/common/TicketWidget';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { getWithExpiry } from '@/utils/auth';

function MainLayout() {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false,
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true,
  );
  const [isSessionValid, setIsSessionValid] = useState(
    () => Boolean(getWithExpiry('token') && getWithExpiry('user', true)),
  );
  const hasRedirected = useRef(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);
  const closeSidebar = () => setIsSidebarOpen(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');

    const handleViewportChange = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = event.matches;
      setIsMobile(matches);
      setIsSidebarOpen(!matches);
    };

    handleViewportChange(mediaQuery);
    mediaQuery.addEventListener('change', handleViewportChange);

    return () => {
      mediaQuery.removeEventListener('change', handleViewportChange);
    };
  }, []);

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
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobile={isMobile}
        onClose={closeSidebar}
      />

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Header
          isSidebarOpen={isSidebarOpen}
          isMobile={isMobile}
          onToggleSidebar={toggleSidebar}
        />

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

        <Footer />
        <TicketWidget />
      </div>
    </div>
  );
}

export default MainLayout;
