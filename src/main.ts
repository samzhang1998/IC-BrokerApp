import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './locale'
import 'virtual:uno.css'
import { Locale } from 'wot-design-uni'
// 引入英文语言包
import enUS from 'wot-design-uni/locale/lang/en-US'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  Locale.use('en-US', enUS)
  return {
    app
  }
}
