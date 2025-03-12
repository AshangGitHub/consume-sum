import { h, resolveComponent } from 'vue';
import { globalLayout } from '@/utils/route';

export const decryption = globalLayout('/decryption', [
  {
    path: '/decryption',
    component: () => import('@/pages/decryption/index.vue'),
    meta: {
      requiresAuth: true,
      title: '应用配置'
    },
  }
]);

