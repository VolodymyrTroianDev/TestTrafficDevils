export const getItem = (key: string): unknown => {
  try {
    return JSON.parse(localStorage.getItem(key) || "");
  } catch (e) {
    return null;
  }
};

export const setItem = (key: string, item: unknown): void => {
  localStorage.setItem(key, JSON.stringify(item));
};

export const removeItem = (key: string): void => {
  localStorage.removeItem(key);
};
