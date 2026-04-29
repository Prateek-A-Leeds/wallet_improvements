export const logout = () => {
  localStorage.clear();
};

export const setWithExpiry = (key: string, value: string, ttl: number) => {
  const now = new Date();

  const item = {
    value,
    expiry: now.getTime() + ttl, // ttl in ms
  };

  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key: string, parsed: boolean = false) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item = JSON.parse(itemStr);

  const now = new Date();

  // Expired
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return parsed ? JSON.parse(item.value) : item.value;
};
