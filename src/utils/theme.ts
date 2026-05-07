export type ThemeMode = 'system' | 'light' | 'dark';

const THEME_PREFIX = 'theme-mode';

export function applyTheme(mode: ThemeMode) {
  const root = document.documentElement;
  const systemPrefersDark = window.matchMedia(
    '(prefers-color-scheme: dark)',
  ).matches;

  if (mode === 'dark') {
    root.classList.add('dark');
  } else if (mode === 'light') {
    root.classList.remove('dark');
  } else {
    root.classList.toggle('dark', systemPrefersDark);
  }
}

export function applyDefaultTheme() {
  applyTheme('system');
}

export function getUserThemeStorageKey(username: string) {
  return `${THEME_PREFIX}:${username}`;
}

export function getStoredThemeForUser(username?: string | null): ThemeMode {
  if (!username) {
    return 'system';
  }

  const savedTheme = localStorage.getItem(
    getUserThemeStorageKey(username),
  ) as ThemeMode | null;

  return savedTheme || 'system';
}

export function saveThemeForUser(username: string, mode: ThemeMode) {
  localStorage.setItem(getUserThemeStorageKey(username), mode);
}
