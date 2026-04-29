import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import SidebarMenuItem from '@/components/layout/SidebarMenuItem';
import { getSidebarNavItems } from '@/components/layout/sidebar-utils';

type SidebarProps = {
  isSidebarOpen: boolean;
};

function Sidebar({ isSidebarOpen }: SidebarProps) {
  const navItems = getSidebarNavItems();

  return (
    <aside
      className={`sticky top-0 z-80 flex h-screen flex-col bg-white shadow-sm transition-all duration-300 dark:border-r dark:border-slate-800 dark:bg-slate-900 ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex h-16 shrink-0 items-center border-slate-200 px-4 dark:border-slate-800">
        <Link
          to="/home"
          title="Return to Homepage"
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
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-visible p-3 [scrollbar-width:none]">
        <nav className="space-y-2 overflow-visible">
          {navItems.map((item, index) => (
            <SidebarMenuItem
              key={`${item.label}-${index}`}
              item={item}
              isSidebarOpen={isSidebarOpen}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
