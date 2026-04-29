import { Link } from 'react-router-dom';
import Container from '@/components/common/Container';
import { dashboardModules, type ModuleItem } from '@/data/modules';
import { filterModulesByRole } from '@/components/layout/sidebar-utils';

type LeafModule = {
  title: string;
  to: string;
  description?: string;
  path: string[];
};

function extractLeafModules(
  items: ModuleItem[],
  parents: string[] = [],
): LeafModule[] {
  return items.flatMap((item) => {
    const currentPath = [...parents, item.title];

    if (item.children?.length) {
      return extractLeafModules(item.children, currentPath);
    }

    if (item.to) {
      return [
        {
          title: item.title,
          to: item.to,
          description: item.description,
          path: parents,
        },
      ];
    }

    return [];
  });
}

function Home() {
  return (
    <section className="py-10">
      <Container>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Access the available parent modules and open the final modules
            directly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filterModulesByRole(dashboardModules).map((module) => {
            const leafModules = extractLeafModules(module.children!);

            return (
              <div
                key={module.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    {module.icon}
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                      {module.title}
                    </h2>
                    <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {module.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4 dark:border-slate-800">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Available Modules
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {leafModules.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        title={child.path.join(' > ')}
                        className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                      >
                        {child.title}

                        {/* optional arrow */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 opacity-70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Home;
