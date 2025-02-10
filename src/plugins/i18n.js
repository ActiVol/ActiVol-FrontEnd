import { useI18n } from 'vue-i18n';
export default {
  t(name) {
    const {t} = useI18n();
    return t(name);
  }
};