<template>
  <BasePage title="Create Application" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <text class="text-28rpx font-bold">{{ applicationInfo?.referenceNumber }}</text>
      <view class="flex-col mt-3 gap-1">
        <view class="flex items-center gap-1">
          <text class="text-24rpx font-bold">Application Name:</text>
          <text class="text-24rpx">{{ applicationInfo?.applicationName }}</text>
        </view>
        <view class="flex items-center gap-1">
          <text class="text-24rpx font-bold">Documentation Type:</text>
          <text class="text-24rpx">{{ applicationInfo?.documentType }}</text>
        </view>
      </view>
    </view>
    <view>
      <AppCard title="Current Situation" v-model:data="currentSituationItems" @item-click="handleItemClick"> </AppCard>
      <AppCard title="New Requirements" v-model:data="newRequirementsItems" @item-click="handleItemClick"> </AppCard>
      <AppCard title="Summary" v-model:data="applicationSummaryItems" @item-click="handleItemClick"> </AppCard>
    </view>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large">Submit</wd-button>
      <wd-button type="text" class="text-#7A858E! underline">Save as draft</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { currentSituationItems, newRequirementsItems, applicationSummaryItems } from './constants'
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)

const handleItemClick = (name: string, item: Application.IItem) => {
  console.log(name, item)
  switch (name) {
    case 'personalApplicants':
      uni.navigateTo({
        url: `/pages/application/borrowerSummary?type=${name}&id=${applicationInfo.value?.applicationId}`
      })
      break
    default:
      break
  }
}

const getApplicationDetail = async (id: string | undefined) => {
  if (!id) return
  const [e, r] = await api.getApplicationDetail(id)
  if (!e && r) {
    applicationStore.setApplicationInfo({
      ...r,
      applicationId: Number(id)
    } as unknown as Application.IApplication)
  }
}

onLoad((options) => {
  if (options?.id) {
    getApplicationDetail(options.id)
  }
})
</script>
