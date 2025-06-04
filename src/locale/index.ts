import { createI18n } from 'vue-i18n'
import zh from './lang/zh-cn'
import en from './lang/en'

const messages = {
  en,
  'zh-Hans': zh
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式，则需要将其设置为false
  globalInjection: true,
  locale: uni.getLocale(),
  messages
})

export default i18n
