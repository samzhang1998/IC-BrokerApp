import { defineStore } from 'pinia'

export const useApplicationStore = defineStore(
  'application',
  () => {
    const applicationInfo = ref<Application.IApplication>()

    return {
      applicationInfo
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)
