import { createSSRApp } from 'vue'
import App from './App.vue'
import store from './store'
import i18n from './locale'
export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  return {
    app
  }
}
