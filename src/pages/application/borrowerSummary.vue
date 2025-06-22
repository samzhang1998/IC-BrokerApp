<template>
  <BasePage title="Create Application" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <view class="flex-y-center justify-between">
        <view class="flex-y-center gap-3">
          <check-badge></check-badge>
          <text class="text-28rpx font-bold">Personal Applicants</text>
        </view>
        <view class="bg-#ff754c! rounded-full flex-center text-white" @click="showActions">
          <wd-icon name="add1" size="22px"></wd-icon>
        </view>
      </view>
      <view class="flex-col mt-3 gap-1 text-24rpx">
        Add all person applicants that are either borrowers or guarantors to this application
      </view>
    </view>
    <view>
      <AppCard
        v-for="borrower in borrowerDetails"
        :key="borrower.id"
        :title="`${borrower.firstName ?? 'New Applicant'} (${borrower.applicantType})`"
        v-model:data="borrowerSummaryItems"
        @item-click="handleItemClick"
        @header-click="handleHeaderClick(borrower)"
      >
      </AppCard>
    </view>
    <wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" cancel-text="Cancel" />
  </BasePage>
</template>

<script setup lang="ts">
import { borrowerSummaryItems } from './constants'
import { api } from '@/api'
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { currentBorrower, applicationInfo } = toRefs(applicationStore)
const borrowerDetails = ref<Application.IBorrowerDetail[]>([])
const borrowerType = ref<string>('borrower')
const applicationId = ref<number | string>()
const show = ref<boolean>(false)
const actions = ref([
  {
    name: 'Borrower'
  },
  {
    name: 'Guarantor'
  }
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}

const fetchBorrowerDetails = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getBorrowerDetails(applicationId.value)
  if (!e && r) {
    borrowerDetails.value = r as unknown as Application.IBorrowerDetail[]
  }
}

const handleCreateBorrower = async (applicantType: string) => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await api.createBorrower(applicationInfo.value?.applicationId, {
    type: applicantType
  })
  if (!e && r) {
    fetchBorrowerDetails()
  }
}

function select({ item }: { item: Application.IItem }) {
  if (item.name === 'Borrower') {
    handleCreateBorrower(item.name)
  }
}

const handleHeaderClick = (borrower: Application.IBorrowerDetail) => {
  currentBorrower.value = borrower
  uni.navigateTo({
    url: `/pages/application/borrowerForm`
  })
}

const handleItemClick = (name: string, item: Application.IItem) => {
  console.log(name, item)
}

onLoad((options) => {
  borrowerType.value = options?.type
  applicationId.value = options?.id || applicationInfo.value?.applicationId
  if (applicationId.value) {
    fetchBorrowerDetails()
  }
})
</script>

<style scoped></style>
