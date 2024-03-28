const user = localStorage.getItem('token');

export const userInfoKeys = {
  all: [user || 'userInfo'] as const,
};
