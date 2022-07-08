import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';
import * as path from 'path';
import 'dotenv/config';

const PORT = Number(process.env.VITE_PORT) || 2000;
const PROXY_HOST = process.env.PROXY_HOST || 'https://dev.budu.ru/api';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    dedupe: ['vue'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    hmr: false,
    host: '0.0.0.0',
    port: PORT,
    open: true,
    proxy: {
      '/api': {
        target: PROXY_HOST,
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req: any, res, options: any) => {
            const rewritedPath = `${req.url}`;
            const host = options.target?.href || '';
            console.info(
              `👉 Rewrite ${req.method} ${req.originalUrl} -> ${host}${rewritedPath}`
            );
            proxyReq.path = rewritedPath;
          });
        },
      },
    },
  },
  plugins: [
    // По идее можно настроить копирование иконок - но пока работает странно
    // viteStaticCopy({
    //   targets: [
    //     {
    //       src: 'node_modules/@frontend/budu-ui/src/assets/icons/fonts/*',
    //       dest: '../public/fonts/',
    //     },
    //   ],
    // }),
    vue({
      template: { transformAssetUrls },
    }),
    /**
     * У плагина есть косяк - если импортить компонент из либы (где квазар V1)
     * то он пытается распарсить версию квазара из либы и падает.
     * Когда либа перейдет на версию 2 - проблема уйдет, а пока
     * не придумал как исправить - временно плагин закоментил
     */
    // quasar(),
  ],
  build: {
    minify: true,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/style/index.scss";`,
      },
    },
  },
});
