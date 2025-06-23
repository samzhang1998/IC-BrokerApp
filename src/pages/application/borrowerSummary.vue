<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <BorrowerHead @createBorrower="handleCreateBorrower" :type="borrowerType" />
    <view>
      <AppCard
        v-for="borrower in borrowerDetails"
        :key="borrower.id"
        :title="`${borrower.firstName ?? 'New Applicant'} (${borrower.applicantType})`"
        v-model:data="borrowerSummaryItems"
        @item-click="handleItemClick"
        @header-click="handlePersonalHeaderClick(borrower)"
      >
      </AppCard>
      <AppCard
        v-for="borrower in companyApplicants"
        :key="borrower.id"
        :title="`${borrower.companyName ?? 'New Applicant'} (${borrower.type})`"
        v-model:data="companyApplicantSummaryItems"
        @item-click="handleItemClick"
        @header-click="handleCompanyHeaderClick(borrower)"
      >
      </AppCard>
      <AppCard
        v-for="borrower in trustApplicants"
        :key="borrower.id"
        :title="`${borrower.trustName ?? 'New Applicant'}`"
        v-model:data="trustApplicantSummaryItems"
        @item-click="handleItemClick"
        @header-click="handleTrustHeaderClick(borrower)"
      >
      </AppCard>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { borrowerSummaryItems, companyApplicantSummaryItems, trustApplicantSummaryItems } from './constants'
import { api } from '@/api'
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { currentBorrower, applicationInfo } = toRefs(applicationStore)
const borrowerDetails = ref<Application.IBorrowerDetail[]>([])
const borrowerType = ref<'personalApplicants' | 'companyApplicants' | 'trustApplicants'>('personalApplicants')
const applicationId = ref<number | string>()
const companyApplicants = ref<Application.ICompanyApplicant[]>([])
const trustApplicants = ref<Application.ITrustApplicant[]>([])

const fetchBorrowerDetails = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getBorrowerDetails(applicationId.value)
  if (!e && r) {
    borrowerDetails.value = r as unknown as Application.IBorrowerDetail[]
  }
}

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
      fetchBorrowerDetails()
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
    url: `/pages/application/borrowerForm`
  })
}

const handleCompanyHeaderClick = (borrower: Application.ICompanyApplicant) => {
  applicationStore.currentCompanyApplicant = borrower
  uni.navigateTo({
    url: `/pages/application/companyForm`
  })
}

const handleTrustHeaderClick = (borrower: Application.ITrustApplicant) => {
  applicationStore.currentTrustApplicant = borrower
  uni.navigateTo({
    url: `/pages/application/trustForm`
  })
}
const handleItemClick = (name: string, item: Application.IItem) => {
  console.log(name, item)
}

onLoad((options) => {
  borrowerType.value = options?.type // 接待人类型
  applicationId.value = options?.id || applicationInfo.value?.applicationId
  if (applicationId.value) {
    if (borrowerType.value === 'personalApplicants') {
      fetchBorrowerDetails()
    } else if (borrowerType.value === 'companyApplicants') {
      fetchCompanyApplicants()
    } else if (borrowerType.value === 'trustApplicants') {
      fetchTrustApplicants()
    }
  }
})
</script>

<style scoped></style>
