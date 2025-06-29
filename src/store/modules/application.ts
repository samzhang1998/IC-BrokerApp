import { applicationApi } from '@/api/application'
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore(
  'application',
  () => {
    const applicationInfo = ref<Application.IApplication>()
    const currentBorrower = ref<Application.IBorrowerDetail>()
    const currentCompanyApplicant = ref<Application.ICompanyApplicant>()
    const currentTrustApplicant = ref<Application.ITrustApplicant>()
    const borrowerDetails = ref<Application.IBorrowerDetail[]>([])

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
      borrowerDetails.value = []
    }

    const fetchBorrowerDetails = async () => {
      if (!applicationInfo.value?.applicationId) return
      const [e, r] = await applicationApi.getBorrowerDetails(applicationInfo.value?.applicationId)
      if (!e && r) {
        borrowerDetails.value = r as unknown as Application.IBorrowerDetail[]
      }
    }

    const getCurrentBorrowerById = (id: string | number) => {
      currentBorrower.value = borrowerDetails.value.find((item) => item.id === id) as Application.IBorrowerDetail
    }

    return {
      applicationInfo,
      setApplicationInfo,
      currentBorrower,
      currentCompanyApplicant,
      currentTrustApplicant,
      borrowerDetails,
      reset,
      fetchBorrowerDetails,
      getCurrentBorrowerById
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)
