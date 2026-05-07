import { Link } from 'react-router-dom';
import {
  PageSection,
  Panel,
  PanelInset,
  SectionHeading,
} from '@/components/common/AppShell';
import AppIcon from '@/components/common/AppIcon';
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
  const modules = filterModulesByRole(dashboardModules);

  return (
    <PageSection className="pb-8 pt-2 sm:pb-10">
      <Container className="space-y-6">
        <Panel className="p-5 sm:p-7 lg:p-8">
          <SectionHeading
            eyebrow="Dashboard"
            title="Available modules"
            description="Open the modules available for your role."
          />
        </Panel>

        <Panel className="p-5 sm:p-7">
          <div className="hover-scrollbar lg:max-h-[calc(100dvh-15rem)] lg:overflow-y-auto lg:pr-2">
            <div className="grid gap-4 lg:grid-cols-2">
              {modules.map((module) => {
                const leafModules = extractLeafModules(module.children ?? []);

                return (
                  <PanelInset
                    key={module.title}
                    className="group p-5 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-[0_20px_45px_-30px_rgba(15,23,42,0.28)] dark:hover:border-slate-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.1rem] border border-slate-200/70 bg-white/90 text-slate-700 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
                        {module.icon}
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-lg font-semibold tracking-[-0.03em] text-slate-950 dark:text-slate-50">
                          {module.title}
                        </h2>
                        <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                          {module.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-slate-200/70 pt-4 dark:border-slate-800">
                      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                        Modules
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {leafModules.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            title={child.path.join(' > ')}
                            className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200/80 bg-white/85 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-300 hover:bg-white hover:text-slate-950 dark:border-slate-700 dark:bg-slate-900/75 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:bg-slate-800 dark:hover:text-white"
                          >
                            <span className="truncate">{child.title}</span>
                            <AppIcon
                              name="arrow-right"
                              className="h-3.5 w-3.5 shrink-0 opacity-70"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </PanelInset>
                );
              })}
            </div>
          </div>
        </Panel>
      </Container>
    </PageSection>
  );
}

export default Home;
