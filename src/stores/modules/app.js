import { defineStore } from 'pinia';
import {switchLanguage} from '../../i18n/index';

const useAppStore = defineStore(
  'app',
  {
    state: () => ({
      language: 'en_US'
    }),
    actions: {
      // 获取字典
      setLanguage(language) {
        this.language = language;
        switchLanguage(language);
      },
    }
  });


export default useAppStore;
