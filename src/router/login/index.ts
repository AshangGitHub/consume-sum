export const login = {
  path: '/login',
  component: () => import('@/pages/login/index.vue'),
  meta: {
    requiresAuth: false,
  },
};
