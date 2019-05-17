export const saveToStorage = (key: string, value: any) =>
  sessionStorage.setItem(key, JSON.stringify(value));

export const getFromStorage = (key: string) =>
  JSON.parse(sessionStorage.getItem(key));
