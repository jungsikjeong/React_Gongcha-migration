import { IUserInfo } from 'interface/auth';

export const USER_LOCAL_STORAGE_KEY = 'user';

export function saveUser(user: IUserInfo): void {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(user));
}

export function getUser(): IUserInfo | undefined {
  const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

  return user ? JSON.parse(user) : undefined;
}

export function removeUser(): void {
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
}
