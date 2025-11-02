export const getMenus = (role: string) => {
  const baseMenus = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Content', path: '/dashboard/content' },
  ];

  if (role === 'admin') {
    baseMenus.push({ name: 'Users', path: '/dashboard/users' });
  }

  return baseMenus;
};
