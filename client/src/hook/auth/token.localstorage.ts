export const TOKEN_LOCAL_STORAGE_KEY = 'token';

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(token));
}

export function getToken(): string | undefined {
  const user = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY);

  return user ? JSON.parse(user) : undefined;
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
}
