import { defineStore } from 'pinia'

export const useApplicationStore = defineStore(
  'application',
  () => {
    const applicationInfo = ref<Application.IApplication>()
    const currentBorrower = ref<Application.IBorrowerDetail>()
    const currentCompanyApplicant = ref<Application.ICompanyApplicant>()
    const currentTrustApplicant = ref<Application.ITrustApplicant>()

    const setApplicationInfo = (info: Application.IApplication) => {
      applicationInfo.value = {
        ...applicationInfo.value,
        ...info
      }
    }

    const reset = () => {
      applicationInfo.value = {} as Application.IApplication
      currentBorrower.value = {} as Application.IBorrowerDetail
      currentCompanyApplicant.value = {} as Application.ICompanyApplicant
      currentTrustApplicant.value = {} as Application.ITrustApplicant
    }

    return {
      applicationInfo,
      setApplicationInfo,
      currentBorrower,
      currentCompanyApplicant,
      currentTrustApplicant,
      reset
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)
