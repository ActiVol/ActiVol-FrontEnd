import { mergeConfig,defineConfig ,loadEnv} from 'vite';
import baseConfig from './vite.base.conf';
import copy from 'rollup-plugin-copy' //引入插件
const viteAppConfig = require('./vite.app.conf');
// import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({command, mode})=>{
  const env = loadEnv(mode, process.cwd());
  return mergeConfig(
    {
      base:env.VITE_APP_BASE,
      plugins: [
        copy({
          // 显示日志
          verbose: true,
          hook: 'closeBundle',
          targets: [].concat(viteAppConfig.getAppConfigCopyInfo())
        })
      ],
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              // chart: ['echarts'],
              // vue: ['vue', 'vue-router', 'pinia', '@vueuse/core', 'vue-i18n'],
            },
          },
        },
        chunkSizeWarningLimit: 2000,
      },
    },
    baseConfig
  )
})
