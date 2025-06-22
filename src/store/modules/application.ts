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

    const reset = () => {
      applicationInfo.value = {} as Application.IApplication
      currentBorrower.value = {} as Application.IBorrowerDetail
    }

    return {
      applicationInfo,
      setApplicationInfo,
      currentBorrower,
      reset
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)
