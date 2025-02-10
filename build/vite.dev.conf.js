
import { mergeConfig,defineConfig ,loadEnv} from 'vite';
import eslintPlugin from 'vite-plugin-eslint' //导入包

import baseConfig from './vite.base.conf';

export default defineConfig(({command, mode})=>{
  const env = loadEnv(mode, process.cwd());
  return mergeConfig(
    {
      base:env.VITE_APP_BASE,
      mode: 'development',
      server: {
        open: true,
        host:'0.0.0.0',
        port: 9012
      },
      plugins: [
        eslintPlugin({
          fix: true,
        })
      ],
    },
    baseConfig
  )
})
// export default mergeConfig(
//   {
//     mode: 'development',
//     server: {
//       open: true,
//       host:'0.0.0.0',
//       port: 9012
//     },
//     plugins: [
//       eslintPlugin({
//         fix: true,
//       })
//     ],
//   },
//   baseConfig
// );


