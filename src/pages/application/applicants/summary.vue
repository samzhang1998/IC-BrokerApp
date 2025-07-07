<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <BorrowerHead @createBorrower="handleCreateBorrower" :type="borrowerType" />
    <view>
      <template v-if="borrowerType === 'personalApplicants'">
        <AppCard
          v-for="borrower in borrowerDetails"
          :key="borrower.id"
          :title="`${borrower.firstName ?? 'New Applicant'} (${borrower.applicantType})`"
          :data="getBorrowerSummaryItems(borrower)"
          @item-click="(name, item) => handlePersonalItemClick(name, item, borrower)"
          @header-click="handlePersonalHeaderClick(borrower)"
          @collapse-click="(item) => handleCollapseClick(item, borrower)"
        >
        </AppCard>
      </template>
      <template v-if="borrowerType === 'companyApplicants'">
        <AppCard
          v-for="borrower in companyApplicants"
          :key="borrower.id"
          :title="`${borrower.companyName ?? 'New Applicant'} (${borrower.type})`"
          v-model:data="companyApplicantSummaryItems"
          @item-click="(name, item) => handleCompanyItemClick(name, item, borrower)"
          @header-click="handleCompanyHeaderClick(borrower)"
        >
        </AppCard>
      </template>
      <template v-if="borrowerType === 'trustApplicants'">
        <AppCard
          v-for="borrower in trustApplicants"
          :key="borrower.id"
          :title="`${borrower.trustName ?? 'New Applicant'}`"
          v-model:data="trustApplicantSummaryItems"
          @item-click="(name, item) => handleTrustItemClick(name, item, borrower)"
          @header-click="handleTrustHeaderClick(borrower)"
        >
        </AppCard>
      </template>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { borrowerSummaryItems, companyApplicantSummaryItems, trustApplicantSummaryItems } from '../constants'
import { api } from '@/api'
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { currentBorrower, applicationInfo, borrowerDetails } = toRefs(applicationStore)
const borrowerType = ref<'personalApplicants' | 'companyApplicants' | 'trustApplicants'>('personalApplicants')
const applicationId = ref<number | string>()
const companyApplicants = ref<Application.ICompanyApplicant[]>([])
const trustApplicants = ref<Application.ITrustApplicant[]>([])

const fetchCompanyApplicants = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getCompanyApplicants(applicationId.value)
  if (!e && r) {
    companyApplicants.value = r as unknown as Application.ICompanyApplicant[]
  }
}

const fetchTrustApplicants = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getTrustApplicants(applicationId.value)
  if (!e && r) {
    trustApplicants.value = r as unknown as Application.ITrustApplicant[]
  }
}

const handleCreateBorrower = async (applicantType: string) => {
  if (!applicationInfo.value?.applicationId) return
  if (borrowerType.value === 'personalApplicants') {
    const [e, r] = await api.createBorrower(applicationInfo.value?.applicationId, {
      type: applicantType
    })
    if (!e && r) {
      applicationStore.fetchBorrowerDetails()
    }
  } else if (borrowerType.value === 'companyApplicants') {
    const [e, r] = await api.createCompanyApplicant(applicationInfo.value?.applicationId, {
      type: applicantType,
      registeredCountry: 'Australia'
    })
    if (!e && r) {
      fetchCompanyApplicants()
    }
  } else if (borrowerType.value === 'trustApplicants') {
    const [e, r] = await api.createTrustApplicant(applicationInfo.value?.applicationId, {})
    if (!e && r) {
      fetchTrustApplicants()
    }
  }
}

const handlePersonalHeaderClick = (borrower: Application.IBorrowerDetail) => {
  currentBorrower.value = borrower
  uni.navigateTo({
    url: `/pages/application/applicants/personal/personalForm`
  })
}

const handleCompanyHeaderClick = (borrower: Application.ICompanyApplicant) => {
  applicationStore.currentCompanyApplicant = borrower
  uni.navigateTo({
    url: `/pages/application/applicants/company/companyForm`
  })
}

const handleTrustHeaderClick = (borrower: Application.ITrustApplicant) => {
  console.log('🚀 ~ handleTrustHeaderClick ~ borrower:', borrower)
  applicationStore.currentTrustApplicant = borrower
  uni.navigateTo({
    url: `/pages/application/applicants/trust/trustForm`
  })
}
const handlePersonalItemClick = (name: string, item: Application.IItem, borrower: Application.IBorrowerDetail) => {
  console.log(name, item, borrower)
  switch (name) {
    case 'contactDetails':
      applicationStore.currentBorrower = borrower
      uni.navigateTo({
        url: `/pages/application/applicants/personal/contactDetailsForm`
      })
      break
    case 'otherDetails':
      applicationStore.currentBorrower = borrower
      uni.navigateTo({
        url: `/pages/application/applicants/personal/otherDetailForm`
      })
      break
    case 'EMPLOYED':
      applicationStore.currentEmploymentItem = item as unknown as Application.IBorrowerDetail['employmentStatuses'][0]
      uni.navigateTo({
        url: `/pages/application/applicants/personal/paygEmploymentForm?borrowerItemId=${item.id}`
      })
      break
    case 'SELF_EMPLOYED':
      applicationStore.currentEmploymentItem = item as unknown as Application.IBorrowerDetail['employmentStatuses'][0]
      uni.navigateTo({
        url: `/pages/application/applicants/personal/selfEmploymentForm?borrowerItemId=${item.id}`
      })
      break
    case 'UNEMPLOYED':
      applicationStore.currentEmploymentItem = item as unknown as Application.IBorrowerDetail['employmentStatuses'][0]
      uni.navigateTo({
        url: `/pages/application/applicants/personal/notEmploymentForm?borrowerItemId=${item.id}`
      })
      break
    case 'identity':
      applicationStore.currentIdentityItem = item as unknown as Application.IBorrowerDetail['identities'][0]
      uni.navigateTo({
        url: `/pages/application/applicants/personal/identityForm?identityId=${item.id}`
      })
      break
    default:
      break
  }
}

const handleCompanyItemClick = (name: string, item: Application.IItem, borrower: Application.ICompanyApplicant) => {
  console.log(name, item, borrower)
  applicationStore.currentCompanyApplicant = borrower
  switch (name) {
    case 'contactDetails':
      uni.navigateTo({
        url: `/pages/application/applicants/company/contactDetailsForm`
      })
      break
    case 'yearToDateIncome':
      uni.navigateTo({
        url: `/pages/application/applicants/company/yearToDateIncomeForm`
      })
      break
    default:
      break
  }
}

const handleTrustItemClick = (name: string, item: Application.IItem, borrower: Application.ITrustApplicant) => {
  console.log(name, item, borrower)
  applicationStore.currentTrustApplicant = borrower
  switch (name) {
    case 'contactDetails':
      uni.navigateTo({
        url: `/pages/application/applicants/trust/contactDetailsForm`
      })
      break
    case 'yearToDateIncome':
      uni.navigateTo({
        url: `/pages/application/applicants/trust/yearToDateIncomeForm`
      })
      break
    default:
      break
  }
}

const handleCollapseClick = (name: string, borrower: Application.IBorrowerDetail) => {
  console.log(name, borrower)
  applicationStore.currentBorrower = borrower
  switch (name) {
    case 'employment':
      uni.navigateTo({
        url: `/pages/application/applicants/personal/employmentSummary?borrowerId=${borrower.id}`
      })
      break
    case 'proofOfIdentity':
      uni.navigateTo({
        url: `/pages/application/applicants/personal/identitySummary?borrowerId=${borrower.id}`
      })
      break
    default:
      break
  }
}

const getBorrowerSummaryItems = (borrower: Application.IBorrowerDetail) => {
  // 创建新的数组，避免修改原始数据
  const rawItems = JSON.parse(JSON.stringify(borrowerSummaryItems.value))
  const items = rawItems.map((item: Application.IItem) => {
    if (item.name === 'employment') {
      item.children = borrower.employmentStatuses.map((status) => ({
        ...status,
        title: `${status.statusCode} - ${status.typeStatus}`,
        name: status.statusCode
      }))
    }
    if (item.name === 'proofOfIdentity') {
      item.children = borrower.identities.map((identity) => ({
        ...identity,
        title: identity.documentType,
        name: 'identity'
      }))
    }
    return item
  })
  return items
}

onLoad((options) => {
  borrowerType.value = options?.type // 接待人类型
  applicationId.value = options?.id || applicationInfo.value?.applicationId
  if (applicationId.value) {
    if (borrowerType.value === 'personalApplicants') {
      applicationStore.fetchBorrowerDetails()
    } else if (borrowerType.value === 'companyApplicants') {
      fetchCompanyApplicants()
    } else if (borrowerType.value === 'trustApplicants') {
      fetchTrustApplicants()
    }
  }
})

onShow(() => {
  if (applicationId.value) {
    if (borrowerType.value === 'personalApplicants') {
      applicationStore.fetchBorrowerDetails()
    } else if (borrowerType.value === 'companyApplicants') {
      fetchCompanyApplicants()
    } else if (borrowerType.value === 'trustApplicants') {
      fetchTrustApplicants()
    }
  }
})
</script>

<style scoped></style>
