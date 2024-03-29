/*
 * @Author: zhangxuefeng
 * @Date: 2024-03-27 09:39:12
 * @LastEditors: zhangxuefeng
 * @LastEditTime: 2024-03-29 13:21:53
 * @Description:
 */
/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: './node_modules/.vite/.',

  server: {
    port: 4200,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://10.0.7.109:9527/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        bypass(req: any, res, options: any) {
          const proxyUrl =
            new URL(options.rewrite(req.url) || '', options.target as string)
              ?.href || '';
          res.setHeader('x-res-proxy', proxyUrl);
        }
      }
    }
  },

  preview: {
    port: 4300,
    host: 'localhost'
  },

  plugins: [react(), nxViteTsPaths()],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: './dist/sandbox',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },

  test: {
    globals: true,
    cache: {
      dir: './node_modules/.vitest'
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],

    reporters: ['default'],
    coverage: {
      reportsDirectory: './coverage/sandbox',
      provider: 'v8'
    }
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
