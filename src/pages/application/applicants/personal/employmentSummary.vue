<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Employment"
      description="Add employment for this applicant to detail their current and previous activities whether employed, unemployed or retired."
      @action="handleAction"
      :actions="employmentColumns"
      isPicker
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC"
        v-for="item in employmentStatusList"
        :key="item.id"
        @click="handleEditEmployment(item)"
      >
        <view class="flex-1">
          <view class="identity-item-title">{{ item.typeStatus }}</view>
          <view class="text-24rpx text-gray-500">{{ item.statusCode }}</view>
        </view>
        <wd-icon name="delete-thin" size="22px" @click.stop.prevent="handleDeleteEmployment(item)"></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentBorrower } = toRefs(applicationStore)

const employmentColumns = ref([
  ['Previous', 'Primary', 'Secondary'],
  [
    { value: 'EMPLOYED', label: 'PAYG', sub: 'Employees who do not own the business' },
    { value: 'SELF_EMPLOYED', label: 'Self employed', sub: 'Self Employed individual' },
    { value: 'UNEMPLOYED', label: 'Not employed', sub: 'No employment recorded' }
  ]
])

const handlePostEmployment = async (item: any) => {
  if (!applicationInfo.value?.applicationId || !currentBorrower.value?.id) {
    return
  }
  const typeStatus = item[0]
  const statusCode = item[1]
  const [e, r] = await applicationApi.postEmployment(applicationInfo.value?.applicationId, currentBorrower.value?.id, {
    typeStatus,
    statusCode
  })
  if (!e && r) {
    applicationStore.fetchBorrowerDetails()
  }
}

const handleAction = (item: any) => {
  handlePostEmployment(item)
}

const handleDeleteEmployment = (item: any) => {
  console.log(item)
  uni.showModal({
    title: 'Warning',
    content: 'Do you want to delete this employment?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    success: async (res) => {
      if (res.confirm) {
        if (!applicationInfo.value?.applicationId || !currentBorrower.value?.id) {
          return
        }
        const [e, r] = await applicationApi.deleteEmployment(
          applicationInfo.value?.applicationId,
          currentBorrower.value?.id,
          item.id
        )
        if (!e && r) {
          await applicationStore.fetchBorrowerDetails()
          applicationStore.getCurrentBorrowerById(currentBorrower.value?.id)
        }
      } else {
        console.log('点击了取消按钮')
      }
    }
  })
}

const handleEditEmployment = (item: any) => {
  console.log(item)
  switch (item.statusCode) {
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
    default:
      break
  }
}

const employmentStatusList = ref<Application.IBorrowerDetail['employmentStatuses'][number][]>([])

watch(
  () => applicationStore.borrowerDetails,
  (newVal) => {
    if (!newVal) return
    applicationStore.getCurrentBorrowerById(currentBorrower.value?.id || '')
    employmentStatusList.value = currentBorrower.value
      ?.employmentStatuses as unknown as Application.IBorrowerDetail['employmentStatuses'][number][]
  },
  {
    deep: true,
    immediate: true
  }
)

onLoad((options) => {
  applicationStore.getCurrentBorrowerById(options?.borrowerId)
})
</script>

<style scoped></style>
