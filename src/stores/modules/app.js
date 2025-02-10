import Cookies from 'js-cookie';
import { defineStore } from 'pinia';
import {switchLanguage} from '../../i18n/index';

const useAppStore = defineStore(
  'app',
  {
    state: () => ({
      language: Cookies.get('language') || 'zh_CN'
    }),
    actions: {
      // 获取字典
      setLanguage(language) {
        Cookies.set('language', language);
        switchLanguage(language);
      },
    }
  });


export default useAppStore;
