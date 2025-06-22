<template>
  <BasePage :title="applicationInfo?.applicationName || ''" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <view class="flex-y-center justify-between">
        <text class="text-28rpx font-bold">{{ applicationInfo?.applicationName }}</text>
        <view class="flex-y-center gap-10rpx">
          <wd-icon name="error-circle" size="22px" color="#EB0000"></wd-icon>
          <wd-icon name="file-paste" size="22px" color="#1CBB8C"></wd-icon>
        </view>
      </view>
      <view class="flex-col mt-3 gap-2">
        <view class="flex items-center gap-1 text-#FF754C">
          <text class="text-24rpx">Case ID:</text>
          <text class="text-24rpx">{{ applicationInfo?.referenceNumber }}</text>
        </view>
        <view class="flex items-center gap-1 text-#7A858E">
          <text class="text-24rpx">Date Create:</text>
          <text class="text-24rpx">{{ applicationInfo?.createTime }}</text>
        </view>
      </view>
      <view
        class="border border-#E8EBEE border-solid rounded-lg bg-white text-24rpx mt-2 px-3 py-2 flex-y-center justify-between"
      >
        <view class="flex-col gap-1">
          <view>Conditional Approval</view>
          <view class="text-#7A858E text-24rpx"> 12/02/2025 11:32:21</view>
        </view>
        <wd-icon name="browse" size="22px" color="#7A858E"></wd-icon>
      </view>
    </view>
    <wd-button type="primary" block class="bg-#FF754C! rounded flex-y-center" size="large" :round="false">
      <view class="flex-y-center gap-20rpx">
        <wd-icon name="browse" size="22px"></wd-icon>
        <text>View Application</text>
      </view>
    </wd-button>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationStore = useApplicationStore()

const applicationInfo = computed(() => applicationStore.applicationInfo)

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

<style scoped></style>
