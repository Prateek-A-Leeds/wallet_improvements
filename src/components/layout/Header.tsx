import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileMenu from '@/components/layout/ProfileMenu';

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

    setTimeout(() => {
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 2000);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();

    showSnackbar('Signed out successfully', 'success');

    setTimeout(() => {
      navigate('/');
    }, 1000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur dark:border-b dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100 dark:shadow-none">
        <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onToggleSidebar}
              aria-label="Toggle sidebar"
              className="cursor-pointer rounded-md p-2 text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              {isSidebarOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.96997 2V22"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.97 9.43994L12.41 11.9999L14.97 14.5599"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M21.97 15V9C21.97 4 19.97 2 14.97 2H8.96997C3.96997 2 1.96997 4 1.96997 9V15C1.96997 20 3.96997 22 8.96997 22H14.97C19.97 22 21.97 20 21.97 15Z"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.97 2V22"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.96997 9.43994L10.53 11.9999L7.96997 14.5599"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            <span className="truncate text-base font-semibold text-slate-900 sm:text-lg dark:text-slate-100">
              Retail Wallet
            </span>
          </div>

          <ProfileMenu compact={isMobile} onSignOut={handleSignOut} />
        </div>
      </header>

      {snackbar.open && (
        <div className="fixed left-1/2 bottom-15 z-9999 -translate-x-1/2">
          <div
            className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white shadow-lg ${
              snackbar.type === 'success' ? 'bg-green-600' : 'bg-red-600'
            }`}
          >
            <span>{snackbar.message}</span>

            <button
              type="button"
              onClick={() => setSnackbar((prev) => ({ ...prev, open: false }))}
              className="ml-2 text-xs opacity-80 hover:opacity-100"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
