import { useI18n } from 'vue-i18n'

export function useLocale() {
  const { t } = useI18n()

  /* getCurrentInstance()可以用来获取当前组件实例 */
  const current = getCurrentInstance()?.appContext.config.globalProperties as any

  // 根据状态，切换国际化
  const handleLanguageChange = (val: string) => {
    current.$i18n.locale = val
    uni.setLocale(val)
    // window.localStorage.setItem('lang', val)
  }

  const langStatus = ref(false)
  const langStr = uni.getLocale()
  langStatus.value = langStr.includes('zh')

  return { t, handleLanguageChange, langStatus }
}
