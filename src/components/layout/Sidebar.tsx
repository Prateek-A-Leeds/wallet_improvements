import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import AppIcon from '@/components/common/AppIcon';
import SidebarMenuItem from '@/components/layout/SidebarMenuItem';
import { getSidebarNavItems } from '@/components/layout/sidebar-utils';

type SidebarProps = {
  isSidebarOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
};

function Sidebar({ isSidebarOpen, isMobile, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const navItems = getSidebarNavItems();

  const handleGoHome = () => {
    navigate('/home');

    if (isMobile) {
      window.setTimeout(() => {
        onClose();
      }, 0);
    }
  };

  return (
    <>
      {isMobile && isSidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-[2px] lg:hidden"
        />
      )}

      <aside
        className={`flex h-[100dvh] flex-col px-4 pb-4 pt-4 transition-all duration-500 lg:z-40 lg:pb-6 ${
          isMobile
            ? `fixed inset-y-0 left-0 z-60 w-[19rem] max-w-[88vw] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`
            : `${isSidebarOpen ? 'w-[19rem]' : 'w-[6.75rem]'}`
        }`}
      >
        <div className="app-surface flex h-full min-h-0 flex-col overflow-hidden rounded-[2rem]">
          <div className="flex h-20 shrink-0 items-center border-b border-slate-200/70 px-4 dark:border-slate-800/80">
            <button
              type="button"
              title="Return to Homepage"
              onClick={handleGoHome}
              className={`group cursor-pointer flex min-w-0 items-center text-left transition ${
                isSidebarOpen ? 'gap-3' : 'w-full justify-center'
              }`}
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-slate-200/70 bg-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] dark:border-slate-700 dark:bg-slate-900/80">
                <img
                  src={logo}
                  alt="Parijat Industries"
                  className="h-8 w-8 object-contain"
                />
              </div>

              <div
                className={`min-w-0 overflow-hidden transition-all duration-300 ${
                  isSidebarOpen
                    ? 'max-w-40 translate-x-0 opacity-100'
                    : 'max-w-0 -translate-x-2 opacity-0'
                }`}
              >
                <p className="truncate text-sm font-semibold tracking-[-0.03em] text-slate-950 dark:text-slate-50">
                  Parijat Industries
                </p>
                <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                  Sales and planning workspace
                </p>
              </div>
            </button>

            {isMobile ? (
              <button
                type="button"
                onClick={onClose}
                className="ml-auto flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-600 hover:border-slate-300 hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-300 dark:hover:border-slate-600 dark:hover:text-white"
                aria-label="Close sidebar"
              >
                <AppIcon name="close" className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          <div className="hover-scrollbar min-h-0 flex-1 overflow-y-auto px-3 py-4">
            <div className="mb-4 px-2">
              <p
                className={`overflow-hidden text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-500 transition-all dark:text-slate-400 ${
                  isSidebarOpen
                    ? 'max-w-32 translate-x-0 opacity-100'
                    : 'max-w-0 -translate-x-2 opacity-0'
                }`}
              >
                Navigation
              </p>
            </div>

            <nav className="space-y-1.5">
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
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
