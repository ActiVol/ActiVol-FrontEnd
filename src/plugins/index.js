import auth from './auth';
import cache from './cache';
import i18n from './i18n';

export default function installPlugins(app) {
  // 认证对象
  app.config.globalProperties.$auth = auth;
  // 缓存对象
  app.config.globalProperties.$cache = cache;
  app.config.globalProperties.$t = i18n.t;
}
