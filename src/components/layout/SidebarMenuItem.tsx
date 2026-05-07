import type { ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AppIcon from '@/components/common/AppIcon';

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
  onNavigate?: () => void;
};

type TooltipPosition = {
  top: number;
  left: number;
};

function SidebarMenuItem({
  item,
  level = 0,
  isSidebarOpen,
  onNavigate,
}: SidebarMenuItemProps) {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    top: 0,
    left: 0,
  });

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const hasChildren = Boolean(item.children?.length);

  const hasActiveDescendant = Boolean(
    item.children?.some((child) => {
      if (child.to === location.pathname) return true;

      const stack = [...(child.children ?? [])];
      while (stack.length > 0) {
        const nested = stack.pop();
        if (!nested) continue;
        if (nested.to === location.pathname) return true;
        if (nested.children?.length) {
          stack.push(...nested.children);
        }
      }

      return false;
    }),
  );

  useEffect(() => {
    if (!isSidebarOpen) {
      setIsOpen(false);
    } else if (hasActiveDescendant) {
      setIsOpen(true);
    }
  }, [hasActiveDescendant, isSidebarOpen]);

  const updateTooltipPosition = () => {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();

    setTooltipPosition({
      top: rect.top + rect.height / 2,
      left: rect.right + 14,
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
    if (level === 1) return 'pl-11 pr-3';
    return 'pl-[3.7rem] pr-3';
  };

  const baseClass = `group relative flex w-full items-center rounded-[1.35rem] py-3 text-sm font-medium tracking-[-0.01em] ${getPaddingClass()}`;

  const contentClass = isSidebarOpen
    ? `${item.icon ? 'ml-3' : ''} max-w-48 translate-x-0 opacity-100`
    : 'max-w-0 -translate-x-1.5 opacity-0';

  const activeClasses =
    'border border-teal-200/70 bg-teal-50/90 text-teal-800 shadow-[0_12px_30px_-24px_rgba(15,118,110,0.75)] dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-100';
  const idleClasses =
    'text-slate-700 hover:bg-white/75 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/70 dark:hover:text-white';

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${baseClass} ${isActive ? activeClasses : idleClasses}`;

  const tooltip = !isSidebarOpen && showTooltip && (
    <div
      className="pointer-events-none fixed z-50 whitespace-nowrap rounded-xl border border-slate-200/80 bg-white/95 px-3 py-2 text-sm font-medium text-slate-900 shadow-[0_18px_45px_-24px_rgba(15,23,42,0.35)] backdrop-blur dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100"
      style={{
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        transform: 'translateY(-50%)',
      }}
    >
      {item.label}
    </div>
  );

  if (hasChildren) {
    return (
      <div className="space-y-1.5">
        <div
          ref={triggerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative"
        >
          <button
            type="button"
            onClick={() => isSidebarOpen && setIsOpen((prev) => !prev)}
            className={`${baseClass} ${idleClasses}`}
          >
            {item.icon ? (
              <span className="shrink-0 text-slate-500 dark:text-slate-400">
                {item.icon}
              </span>
            ) : null}

            <span
              className={`flex-1 overflow-hidden whitespace-nowrap text-left transition-all duration-300 ${contentClass}`}
            >
              {item.label}
            </span>

            {isSidebarOpen ? (
              <AppIcon
                name="chevron-down"
                className={`h-4 w-4 shrink-0 text-slate-400 transition duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
            ) : null}
          </button>

          {tooltip}
        </div>

        {isSidebarOpen && isOpen ? (
          <div className="space-y-1">
            {item.children?.map((child, index) => (
              <SidebarMenuItem
                key={`${child.label}-${index}`}
                item={child}
                level={level + 1}
                isSidebarOpen={isSidebarOpen}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        ) : null}
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
      <NavLink
        to={item.to || '#'}
        className={linkClass}
        onClick={() => onNavigate?.()}
      >
        {item.icon ? (
          <span className="shrink-0 text-slate-500 dark:text-slate-400">
            {item.icon}
          </span>
        ) : null}

        <span
          className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${contentClass}`}
        >
          {item.label}
        </span>

        {isSidebarOpen ? (
          <span className="ml-auto flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/75 text-slate-400 opacity-0 transition group-hover:opacity-100 dark:bg-slate-800/80 dark:text-slate-500">
            <AppIcon name="arrow-right" className="h-3.5 w-3.5" />
          </span>
        ) : null}
      </NavLink>

      {tooltip}
    </div>
  );
}

export default SidebarMenuItem;
