import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import { routerAfterEach, routerBeforeGuard, routerOAuthLogin } from './guard';

const router = createRouter({
  history: createWebHistory(
    `${
      import.meta.env.VITE_PUBLISH_DIR
        ? `/${import.meta.env.VITE_PUBLISH_DIR}`
        : ''
    }/`
  ),
  routes,
});

router.beforeEach(routerBeforeGuard);
router.beforeEach(routerAfterEach);
router.beforeResolve(routerOAuthLogin);

export default router;
