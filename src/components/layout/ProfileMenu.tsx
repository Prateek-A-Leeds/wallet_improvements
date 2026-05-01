import { getWithExpiry } from '@/utils/auth';
import { generateRouteAccessMap } from '@/utils/route-access';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

type ThemeMode = 'system' | 'light' | 'dark';

type ProfileMenuProps = {
  imageUrl?: string;
  compact?: boolean;
  onSignOut?: () => void;
};

function ProfileMenu({
  imageUrl = 'https://i.pravatar.cc/100?img=12',
  compact = false,
  onSignOut,
}: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('system');
  const menuRef = useRef<HTMLDivElement | null>(null);

  const user = getWithExpiry('user', true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode') as ThemeMode | null;
    const initialTheme: ThemeMode = savedTheme || 'system';
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      applyTheme('system');
    };

    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const applyTheme = (mode: 'system' | 'light' | 'dark') => {
    const root = document.documentElement;
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;

    if (mode === 'dark') {
      root.classList.add('dark');
    } else if (mode === 'light') {
      root.classList.remove('dark');
    } else {
      root.classList.toggle('dark', systemPrefersDark);
    }

    localStorage.setItem('theme-mode', mode);
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setTheme(mode);
    applyTheme(mode);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    onSignOut?.();
  };

  const themeIndex = theme === 'light' ? 0 : theme === 'system' ? 1 : 2;
  const canViewTicketHistory = Boolean(
    user?.role && generateRouteAccessMap()['/ticket-history'].includes(user.role),
  );

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm transition hover:bg-slate-50 dark:border-slate-500 dark:bg-slate-800 dark:hover:bg-slate-800 ${
          compact ? 'gap-1 pr-1.5' : 'gap-2 pr-3'
        }`}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <img
          src={imageUrl}
          alt="User profile"
          className={`${compact ? 'h-8 w-8' : 'h-9 w-9'} rounded-full object-cover`}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`text-slate-600 transition dark:text-slate-100 ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-3 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="px-3 py-3">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Theme
            </p>

            <div className="rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
              <div className="relative grid grid-cols-3">
                <div
                  className="absolute top-1 bottom-1 w-[calc(33.333%-0.33rem)] rounded-lg bg-white shadow-sm transition-all duration-300 dark:bg-slate-700"
                  style={{
                    left:
                      themeIndex === 0
                        ? '0.25rem'
                        : themeIndex === 1
                          ? 'calc(33.333% + 0.08rem)'
                          : 'calc(66.666% - 0.08rem)',
                  }}
                />

                <button
                  type="button"
                  onClick={() => handleThemeChange('light')}
                  className={`relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    theme === 'light'
                      ? 'text-slate-900 dark:text-slate-100'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  Light
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange('system')}
                  className={`relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    theme === 'system' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  System
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                  className={`relative z-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                    theme === 'dark' ? 'text-slate-900' : 'text-slate-500'
                  }`}
                >
                  Dark
                </button>
              </div>
            </div>
          </div>

          <div className="py-2">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-slate-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 20.118a7.5 7.5 0 0 1 15 0"
                />
              </svg>
              <span>My profile</span>
            </Link>

            {canViewTicketHistory && (
              <Link
                to="/ticket-history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-slate-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 6.75h12m-12 4.5h12m-12 4.5h12M3.75 6.75h.008v.008H3.75V6.75Zm0 4.5h.008v.008H3.75v-.008Zm0 4.5h.008v.008H3.75v-.008Z"
                  />
                </svg>
                <span>Ticket history</span>
              </Link>
            )}

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-400 transition hover:bg-red-50 dark:hover:bg-red-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-7.5a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 6 21h7.5a2.25 2.25 0 0 0 2.25-2.25V15m-3-3 3-3m0 0 3 3m-3-3H9"
                />
              </svg>
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
