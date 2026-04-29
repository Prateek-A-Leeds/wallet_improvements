import { ReactNode, useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

export type NavItem = {
  label: string;
  to?: string;
  icon?: ReactNode;
  children?: NavItem[];
};

type SidebarMenuItemProps = {
  item: NavItem;
  level?: number;
  isSidebarOpen: boolean;
};

type TooltipPosition = {
  top: number;
  left: number;
};

function SidebarMenuItem({
  item,
  level = 0,
  isSidebarOpen,
}: SidebarMenuItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
  });

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const hasChildren = Boolean(item.children?.length);

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsOpen(false);
    }
  }, [isSidebarOpen]);

  const updateTooltipPosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 12,
    });
  };

  const handleMouseEnter = () => {
    if (isSidebarOpen) return;
    updateTooltipPosition();
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const getPaddingClass = () => {
    if (!isSidebarOpen) return 'justify-center px-3';
    if (level === 0) return 'pl-3 pr-3';
    if (level === 1) return 'pl-10 pr-3';
    return 'pl-16 pr-3';
  };

  const baseClass = `relative flex w-full items-center rounded-xl py-3 text-sm font-medium transition ${getPaddingClass()}`;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseClass} ${
      isActive
        ? 'bg-blue-50 text-blue-600 dark:bg-slate-800 dark:text-blue-400'
        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
    }`;

  const tooltip = !isSidebarOpen && showTooltip && (
    <div
      className="pointer-events-none fixed z-9999 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm text-white shadow-lg dark:bg-slate-100 dark:text-slate-900"
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: 'translateY(-50%)',
      }}
    >
      {item.label}
      <div className="absolute -left-1.5 top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-slate-900 dark:bg-slate-100" />
    </div>
  );

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <button
            type="button"
            onClick={() => isSidebarOpen && setIsOpen((prev) => !prev)}
            className={`${baseClass} text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800`}
          >
            {item.icon && <span className="shrink-0">{item.icon}</span>}

            <span
              className={`flex-1 overflow-hidden whitespace-nowrap text-left transition-all duration-300 ${
                isSidebarOpen
                  ? `${item.icon ? 'ml-3' : ''} max-w-45 translate-x-0 opacity-100`
                  : 'max-w-0 -translate-x-1.5 opacity-0'
              }`}
            >
              {item.label}
            </span>

            {isSidebarOpen && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 shrink-0 transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
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
            )}
          </button>

          {tooltip}
        </div>

        {isSidebarOpen && isOpen && (
          <div className="space-y-1">
            {item.children?.map((child, index) => (
              <SidebarMenuItem
                key={`${child.label}-${index}`}
                item={child}
                level={level + 1}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      ref={triggerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      <NavLink to={item.to || '#'} className={linkClass}>
        {item.icon && <span className="shrink-0">{item.icon}</span>}

        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
            isSidebarOpen
              ? `${item.icon ? 'ml-3' : ''} max-w-45 translate-x-0 opacity-100`
              : 'max-w-0 -translate-x-1.5 opacity-0'
          }`}
        >
          {item.label}
        </span>
      </NavLink>

      {tooltip}
    </div>
  );
}

export default SidebarMenuItem;
