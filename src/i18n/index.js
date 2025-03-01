import { createI18n } from 'vue-i18n';
import zh_CN from './locales/zh_CN.json';
import en_US from './locales/en_US.json';
const i18n = createI18n({
  legacy: true, // 使用Composition API模式
  // locale: 'zh-CN', // 设置默认语言
  locale: 'en_US', // 设置默认语言
  fallbackLocale: 'zh_CN', // 设置备用语言
  messages: {
    'zh_CN': zh_CN,
    'en_US': en_US
  }
});
export const switchLanguage = (locale) => {
  i18n.global.locale = locale;
};
export default i18n;
