import { globalLayout } from '@/utils/route';

export const home = globalLayout('/', [
  {
    path: '/',
    component: () => import('@/pages/common/index.vue'),
    meta: {
      title: '首页',
      requiresAuth: true,
    },
  },
],true);

