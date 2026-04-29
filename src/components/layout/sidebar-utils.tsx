import { dashboardModules, type ModuleItem } from '@/data/modules';
import type { NavItem } from '@/components/layout/SidebarMenuItem';
import { getWithExpiry } from '@/utils/auth';

function mapModuleItemToNavItem(item: ModuleItem): NavItem {
  return {
    label: item.title,
    to: item.to,
    icon: item.icon,
    children: item.children?.map(mapModuleItemToNavItem),
  };
}

export function getSidebarNavItems(): NavItem[] {
  return filterModulesByRole(dashboardModules).map((module) => ({
    label: module.title,
    icon: module.icon,
    children: (module.children ?? []).map(mapModuleItemToNavItem),
  }));
}

export function filterModulesByRole(modules: ModuleItem[]): ModuleItem[] {
  const user = getWithExpiry('user', true);

  if (!user) return [];

  const role = user.role;

  const filterItems = (items: ModuleItem[]): ModuleItem[] => {
    return items
      .map((item): ModuleItem | null => {
        const isAllowed = !item.roles || item.roles.includes(role);

        if (item.children?.length) {
          const filteredChildren = filterItems(item.children);

          if (filteredChildren.length > 0) {
            return { ...item, children: filteredChildren };
          }

          if (item.to && isAllowed) {
            return { ...item, children: undefined };
          }

          return null;
        }

        if (item.to && isAllowed) {
          return item;
        }

        return null;
      })
      .filter((item): item is ModuleItem => item !== null);
  };

  return modules
    .map((module): ModuleItem | null => {
      const filteredChildren = filterItems(module.children ?? []);

      if (filteredChildren.length > 0) {
        return {
          ...module,
          children: filteredChildren,
        };
      }

      return null;
    })
    .filter((module): module is ModuleItem => module !== null);
}
