import { defineStore } from 'pinia'

export const useApplicationStore = defineStore(
  'application',
  () => {
    const applicationInfo = ref<Application.IApplication>()
    const currentBorrower = ref<Application.IBorrowerDetail>()

    const setApplicationInfo = (info: Application.IApplication) => {
      applicationInfo.value = {
        ...applicationInfo.value,
        ...info
      }
    }

    return {
      applicationInfo,
      setApplicationInfo,
      currentBorrower
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)
