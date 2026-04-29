export const logout = () => {
  localStorage.clear();
};

type ExpiringStorageItem = {
  value: unknown;
  expiry: number;
};

export const setWithExpiry = (key: string, value: unknown, ttl: number) => {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl, // ttl in ms
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = <T = any>(key: string, parsed: boolean = false) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  let item: ExpiringStorageItem;

  try {
    item = JSON.parse(itemStr);
  } catch {
    localStorage.removeItem(key);
    return null;
  }

  const now = new Date();

  // Expired
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  if (!parsed) return item.value as T;

  if (typeof item.value !== 'string') {
    return item.value as T;
  }

  try {
    return JSON.parse(item.value) as T;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};
