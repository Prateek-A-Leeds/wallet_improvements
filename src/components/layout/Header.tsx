import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppIcon from '@/components/common/AppIcon';
import Toast from '@/components/common/Toast';
import ProfileMenu from '@/components/layout/ProfileMenu';
import { applyDefaultTheme } from '@/utils/theme';

type HeaderProps = {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isMobile: boolean;
};

type SnackbarType = 'success' | 'error';

function Header({ onToggleSidebar, isSidebarOpen, isMobile }: HeaderProps) {
  const navigate = useNavigate();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    type: SnackbarType;
  }>({
    open: false,
    message: '',
    type: 'success',
  });

  const showSnackbar = (message: string, type: SnackbarType) => {
    setSnackbar({
      open: true,
      message,
      type,
    });

    window.setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 2000);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    applyDefaultTheme();

    showSnackbar('Signed out successfully', 'success');

    window.setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-4 pb-4 pt-4 sm:px-6 lg:px-8">
        <div className="app-surface mx-auto flex min-h-18 max-w-[1400px] items-center justify-between gap-4 rounded-[1.8rem] px-4 py-3 sm:px-5">
          <div className="flex min-w-0 items-center gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              className="group flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-950 active:scale-[0.97] dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900"
            >
              <AppIcon
                name={isSidebarOpen ? 'menu-open' : 'menu-closed'}
                className="h-5 w-5 transition group-hover:-translate-y-px"
              />
            </button>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
                Workspace
              </p>
              <div className="flex min-w-0 items-center gap-2">
                <span className="truncate text-base font-semibold tracking-[-0.03em] text-slate-950 sm:text-lg dark:text-slate-50">
                  Retail Wallet
                </span>
                {!isMobile ? (
                  <span className="hidden rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 lg:inline-flex dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-200">
                    Live
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <ProfileMenu compact={isMobile} onSignOut={handleSignOut} />
        </div>
      </header>

      <Toast
        open={snackbar.open}
        message={snackbar.message}
        variant={snackbar.type}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
}

export default Header;
