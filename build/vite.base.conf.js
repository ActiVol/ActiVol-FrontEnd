import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import json5 from '@miyaneee/rollup-plugin-json5';
import eslintPlugin from 'vite-plugin-eslint'; //导入包
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

import VueSetupExtend from 'vite-plugin-vue-setup-extend';
const { addDynamicIconSelectors } = require('@iconify/tailwind');

import path from 'path';
const viteAppConfig = require('./vite.app.conf');

const appConfigAliasInfo = viteAppConfig.getAppConfigAliasInfo();
function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/volunteer/',
  css: {
    preprocessorOptions: {
      less: {
        charset: false,
        // 这里可以配置LESS的全局变量等
        // additionalData: ['@import "./src/style/mixin.less";'],
      },
    },
  },
  plugins: [
    vue(),
    json5(),
    VueSetupExtend(),
    addDynamicIconSelectors(),
    eslintPlugin({
      include: ['src/\*\*/\*.js', 'src/\*\*/\*.vue', 'src/\*.js', 'src/\*.vue']
    }),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [
        resolve('/src/assets/icon')
      ],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
  ],
  resolve: {
    extensions: [".vue", ".mjs", ".js", ".ts", ".jsx", ".tsx", ".json"],
    alias: Object.assign(appConfigAliasInfo, {
      assets: resolve('/src/assets'),
      view: resolve('/src/view'),
      utils: resolve('/src/utils'),
      '@': resolve('/src'),
      static: resolve('/static'),
    }),
  },
  cache: {
    // 开启缓存，缓存目录可以自定义
    dir: 'node_modules/.vite_cache',
  },
  esbuild: {
    // 开启esbuild并调优构建
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
  build: {
    cacheDir: 'node_modules/.vite_cache', // 设置持久化缓存目录
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // 将所有依赖拆分为一个单独的 chunk
          }
        }
      }
    },
    brotliSize: false,  // 关闭 Brotli 压缩
    sourcemap: true
  }
});
