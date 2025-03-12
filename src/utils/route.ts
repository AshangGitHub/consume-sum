import layout from '@/layouts/index.vue';
import { RouteRecordRaw } from 'vue-router';
import { h, resolveComponent } from 'vue';

export const globalLayout = (
  namespace: string,
  children: RouteRecordRaw[],
  notLayout?: boolean
) => {
  return {
    path: namespace,
    component: notLayout
      ? {
          render() {
            return h(resolveComponent('router-view'));
          },
        }
      : layout,
    children: children,
  };
};
