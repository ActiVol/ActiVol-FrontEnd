import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import zhCn from './locales/zh-cn.json'

const messages = {
    en,
    'zh-cn': zhCn
}

const i18n = createI18n({
    locale: 'en', // 设置默认语言
    fallbackLocale: 'en', // 设置回退语言
    messages
})

export default i18n