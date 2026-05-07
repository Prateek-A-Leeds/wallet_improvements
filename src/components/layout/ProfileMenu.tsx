import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import AppIcon from '@/components/common/AppIcon';
import { getWithExpiry } from '@/utils/auth';
import { generateRouteAccessMap } from '@/utils/route-access';

type ProfileMenuProps = {
  compact?: boolean;
  onSignOut?: () => void;
};

function ProfileMenu({ compact = false, onSignOut }: ProfileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const user = getWithExpiry('user', true);

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

  const handleSignOut = () => {
    setIsOpen(false);
    onSignOut?.();
  };
  const canViewTicketHistory = Boolean(
    user?.role && generateRouteAccessMap()['/ticket-history'].includes(user.role),
  );

  const initials = useMemo(() => {
    if (!user?.name) return 'RW';
    return user.name
      .split(' ')
      .map((part: string) => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  }, [user?.name]);

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center rounded-full border border-slate-200/80 bg-white/85 p-1 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.45)] hover:border-slate-300 hover:bg-white active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-slate-600 dark:hover:bg-slate-900 ${
          compact ? 'gap-1 pr-1.5' : 'gap-2 pr-3'
        }`}
        aria-label="Open profile menu"
        aria-expanded={isOpen}
      >
        <div
          className={`${compact ? 'h-8 w-8 text-xs' : 'h-9 w-9 text-sm'} flex items-center justify-center rounded-full bg-gradient-to-br from-teal-600 to-sky-600 font-semibold text-white`}
        >
          {initials}
        </div>

        {!compact ? (
          <div className="hidden min-w-0 text-left sm:block">
            <p className="truncate text-sm font-semibold tracking-[-0.02em] text-slate-950 dark:text-slate-50">
              {user.name}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {user.role}
            </p>
          </div>
        ) : null}

        <AppIcon
          name="chevron-down"
          className={`text-slate-500 transition dark:text-slate-300 ${compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen ? (
        <div className="app-surface-strong absolute right-0 top-full z-50 mt-3 w-[min(20rem,calc(100vw-2rem))] rounded-[1.7rem] p-2">
          <div className="rounded-[1.3rem] border border-slate-200/70 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/35">
            <p className="text-sm font-semibold tracking-[-0.03em] text-slate-950 dark:text-slate-50">
              {user.name}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              {user.role}
            </p>
          </div>

          <div className="border-t border-slate-200/70 px-1 pt-2 dark:border-slate-800">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-[1rem] px-3 py-3 text-sm font-medium text-slate-700 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/70 dark:hover:text-white"
            >
              <AppIcon name="profile" className="h-4 w-4 text-slate-500" />
              <span>My profile</span>
            </Link>

            <Link
              to="/settings"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 rounded-[1rem] px-3 py-3 text-sm font-medium text-slate-700 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/70 dark:hover:text-white"
            >
              <AppIcon name="settings" className="h-4 w-4 text-slate-500" />
              <span>Settings</span>
            </Link>

            {canViewTicketHistory ? (
              <Link
                to="/ticket-history"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 rounded-[1rem] px-3 py-3 text-sm font-medium text-slate-700 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/70 dark:hover:text-white"
              >
                <AppIcon name="history" className="h-4 w-4 text-slate-500" />
                <span>Ticket history</span>
              </Link>
            ) : null}

            <button
              type="button"
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-[1rem] px-3 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-950/30"
            >
              <AppIcon name="logout" className="h-4 w-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProfileMenu;
