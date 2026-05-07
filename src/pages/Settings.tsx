import { useEffect, useState } from 'react';
import {
  PageSection,
  Panel,
  PanelInset,
  SectionHeading,
} from '@/components/common/AppShell';
import Container from '@/components/common/Container';
import { getWithExpiry } from '@/utils/auth';
import {
  applyTheme,
  getStoredThemeForUser,
  saveThemeForUser,
  type ThemeMode,
} from '@/utils/theme';

function Settings() {
  const user = getWithExpiry<{ username?: string; name?: string }>('user', true);
  const [theme, setTheme] = useState<ThemeMode>('system');

  useEffect(() => {
    const initialTheme = getStoredThemeForUser(user?.username);
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }, [user?.username]);

  const handleThemeChange = (mode: ThemeMode) => {
    if (!user?.username) return;

    setTheme(mode);
    saveThemeForUser(user.username, mode);
    applyTheme(mode);
  };

  return (
    <PageSection className="pb-8 pt-2">
      <Container className="space-y-6">
        <Panel className="p-5 sm:p-7 lg:p-8">
          <SectionHeading
            eyebrow="Settings"
            title="App settings"
            description="Manage how the workspace behaves for your account."
          />
        </Panel>

        <Panel className="p-5 sm:p-7">
          <PanelInset className="p-5 sm:p-6">
            <div className="flex flex-col gap-6 border-b border-slate-200/70 pb-6 md:flex-row md:items-start md:justify-between dark:border-slate-800">
              <div className="max-w-xl">
                <p className="text-base font-semibold tracking-[-0.03em] text-slate-950 dark:text-slate-50">
                  Theme
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  Choose how the workspace should appear for your account. If no
                  specific option is selected, the app follows your device theme.
                </p>
              </div>

              <div className="w-full md:w-[240px]">
                <select
                  value={theme}
                  onChange={(e) => handleThemeChange(e.target.value as ThemeMode)}
                  className="w-full rounded-full border border-slate-200/80 bg-white/90 px-4 py-3 text-sm font-medium text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-100"
                >
                  <option value="system">System default</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>

            <div className="pt-6">
              <p className="text-xs leading-6 text-slate-500 dark:text-slate-400">
                This preference is saved for the signed-in user. The login page
                always opens with the default theme until a user signs in.
              </p>
            </div>
          </PanelInset>
        </Panel>
      </Container>
    </PageSection>
  );
}

export default Settings;
