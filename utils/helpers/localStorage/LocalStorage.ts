export function storageSave(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function storageFind(key: string): string | null {
  return localStorage.getItem(key);
}

export function storageRemove(key: string) {
  localStorage.removeItem(key);
}
