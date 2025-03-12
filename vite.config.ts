import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: `${env.VITE_PUBLISH_DIR ? `/${env.VITE_PUBLISH_DIR}` : ''}/`,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      proxy: {
        '^/api': {
          target: env.VITE_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api'),
        },
      },
      host: '0.0.0.0',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: {
      target: 'esnext', // 针对非行内样式，需要构建规格为 es2020，否则样式会失效，控制台给出提示
      minify: false,
      cssCodeSplit: false,
      outDir: 'dist',
      assetsDir: 'assets',
      // Cloudflare Pages 推荐配置
      rollupOptions: {
        output: {
          minifyInternalExports: false,
          manualChunks: undefined
        },
      },
    },
  };
});
