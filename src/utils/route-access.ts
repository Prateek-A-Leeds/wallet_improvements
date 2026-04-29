import { dashboardModules, type ModuleItem } from '@/data/modules';

type RouteAccessMap = Record<string, string[]>;

export function generateRouteAccessMap(): RouteAccessMap {
  const map: RouteAccessMap = {
    '/home': ['admin', 'salesman', 'support'],
    '/profile': ['admin', 'salesman', 'support'],
    '/ticket-history': ['admin', 'support'],
    '/terms-and-conditions': ['admin', 'salesman', 'support'],
    '/privacy-policy': ['admin', 'salesman', 'support'],
    '/faq': ['admin', 'salesman', 'support'],
  };

  const traverse = (items: ModuleItem[]) => {
    for (const item of items) {
      // ✅ leaf node with route
      if (item.to) {
        map[item.to] = item.roles || [];
      }

      // 🔁 recurse children
      if (item.children?.length) {
        traverse(item.children);
      }
    }
  };

  traverse(dashboardModules);

  return map;
}
