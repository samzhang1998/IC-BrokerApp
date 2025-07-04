import { applicationApi } from '@/api/application'
import { defineStore } from 'pinia'

export const useApplicationStore = defineStore(
  'application',
  () => {
    const applicationInfo = ref<Application.IApplication>()
    // 当前个人借款人
    const currentBorrower = ref<Application.IBorrowerDetail>()
    // 当前公司借款人
    const currentCompanyApplicant = ref<Application.ICompanyApplicant>()
    // 当前信托借款人
    const currentTrustApplicant = ref<Application.ITrustApplicant>()
    // 借款人详情列表
    const borrowerDetails = ref<Application.IBorrowerDetail[]>([])
    // 当前选中的就业状态
    const currentEmploymentItem = ref<Application.IBorrowerDetail['employmentStatuses'][0]>()
    // 当前选中的证明
    const currentIdentityItem = ref<Application.IBorrowerDetail['identities'][0]>()
    // 当前选中的现有产业
    const currentExistingProperty = ref<Application.IExistingProperty>()
    // 当前选中的其他资产
    const currentOtherAsset = ref<Application.IOtherAsset>()

    // 当前贡献资金
    const currentContributionFund = ref<Application.IContributionFunds>()
    // 当前新购房产
    const currentNewPurchase = ref<Application.IPurchase>()
    // 当前新贷款
    const currentNewLoan = ref<Application.INewLoan>()
    // 当前其他收入
    const currentOtherIncome = ref<Application.IOtherIncome>()
    // 当前其他负债
    const currentOtherLiabilities = ref<Application.IOtherLiabilities>()

    // 当前抵押贷款
    const currentMortgageLiability = ref<Application.IMortgageLiability>()

    const setApplicationInfo = (info: Application.IApplication) => {
      applicationInfo.value = {
        ...applicationInfo.value,
        ...info
      }
    }

    const isViewApplication = ref(false)

    const reset = () => {
      applicationInfo.value = {} as Application.IApplication
      currentBorrower.value = {} as Application.IBorrowerDetail
      currentCompanyApplicant.value = {} as Application.ICompanyApplicant
      currentTrustApplicant.value = {} as Application.ITrustApplicant
      borrowerDetails.value = []
      currentEmploymentItem.value = {} as Application.IBorrowerDetail['employmentStatuses'][0]
      currentIdentityItem.value = {} as Application.IBorrowerDetail['identities'][0]
      currentExistingProperty.value = {} as Application.IExistingProperty
      currentOtherAsset.value = {} as Application.IOtherAsset
    }

    const fetchBorrowerDetails = async () => {
      if (!applicationInfo.value?.applicationId) return
      const [e, r] = await applicationApi.getBorrowerDetails(applicationInfo.value?.applicationId)
      if (!e && r) {
        borrowerDetails.value = r as unknown as Application.IBorrowerDetail[]
      }
    }

    const getCurrentBorrowerById = (id: string | number) => {
      currentBorrower.value = borrowerDetails.value.find(
        (item) => String(item.id) === String(id)
      ) as Application.IBorrowerDetail
    }

    return {
      applicationInfo,
      setApplicationInfo,
      currentBorrower,
      currentCompanyApplicant,
      currentTrustApplicant,
      borrowerDetails,
      currentEmploymentItem,
      currentIdentityItem,
      reset,
      fetchBorrowerDetails,
      getCurrentBorrowerById,
      currentExistingProperty,
      currentOtherAsset,
      currentContributionFund,
      currentNewPurchase,
      currentNewLoan,
      currentMortgageLiability,
      currentOtherIncome,
      currentOtherLiabilities,
      isViewApplication
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)
