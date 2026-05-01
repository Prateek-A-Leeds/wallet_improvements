import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import SidebarMenuItem from '@/components/layout/SidebarMenuItem';
import { getSidebarNavItems } from '@/components/layout/sidebar-utils';

type SidebarProps = {
  isSidebarOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
};

function Sidebar({ isSidebarOpen, isMobile, onClose }: SidebarProps) {
  const navItems = getSidebarNavItems();

  return (
    <>
      {isMobile && isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-70 bg-slate-950/45 backdrop-blur-[1px] lg:hidden"
        />
      )}

      <aside
        className={`z-80 flex h-screen flex-col bg-white shadow-sm transition-all duration-300 dark:border-slate-800 dark:bg-slate-900 ${
          isMobile
            ? `fixed inset-y-0 left-0 w-[18.5rem] max-w-[88vw] border-r ${
                isSidebarOpen
                  ? 'translate-x-0 shadow-2xl'
                  : '-translate-x-full shadow-none'
              }`
            : `sticky top-0 border-r ${isSidebarOpen ? 'w-64' : 'w-20'}`
        }`}
      >
        <div className="flex h-16 shrink-0 items-center border-slate-200 px-4 dark:border-slate-800">
          <Link
            to="/home"
            title="Return to Homepage"
            onClick={isMobile ? onClose : undefined}
            className={`group relative flex items-center transition ${
              isSidebarOpen ? 'gap-2' : 'w-full justify-center'
            }`}
          >
            <img
              src={logo}
              alt="Parijat Industries"
              className="h-10 w-10 object-contain"
            />

            <span
              className={`overflow-hidden whitespace-nowrap text-lg font-semibold text-slate-900 transition-all duration-300 dark:text-slate-100 ${
                isSidebarOpen
                  ? 'ml-2 max-w-37.5 translate-x-0 opacity-100'
                  : 'ml-0 max-w-0 -translate-x-2 opacity-0'
              }`}
            >
              Parijat Industries
            </span>
          </Link>

          {isMobile && (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label="Close sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-visible p-3 [scrollbar-width:none]">
          <nav className="space-y-2 overflow-visible">
            {navItems.map((item, index) => (
              <SidebarMenuItem
                key={`${item.label}-${index}`}
                item={item}
                isSidebarOpen={isSidebarOpen}
                onNavigate={isMobile ? onClose : undefined}
              />
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
