<script lang="ts" setup>
import { formatDate } from '@/utils'
interface IProps {
  application: Application.IApplication
}
const props = defineProps<IProps>()

const statusComputed = computed(() => {
  return (status: number) => {
    switch (status) {
      case 1:
        return 'Submit to final review'
      case 2:
        return 'Instruct to Solicitor'
      case 3:
        return 'Settled'
      default:
        return ''
    }
  }
})

const handleClick = () => {
  uni.navigateTo({
    url: `/pages/application/overview?id=${props.application.applicationId}`
  })
}

// 显式声明默认导出
defineOptions({
  name: 'ApplicationItem'
})
</script>

<template>
  <view class="px-20rpx py-32rpx border border-#E8EBEE border-solid rounded-16rpx" @click="handleClick">
    <view class="top flex-y-center justify-between">
      <view class="flex-y-center gap-20rpx">
        <view class="text-#384144 text-32rpx">{{ application?.applicationName || '' }}</view>
        <view class="id text-#7A858E text-28rpx">{{ application?.referenceNumber || '' }}</view>
      </view>
      <view class="time text-#7A858E text-28rpx flex-shrink-0">
        {{ application?.createTime ? formatDate(application?.createTime) : '' }}
      </view>
    </view>
    <view class="flex-y-center justify-between mt-20rpx pr-20rpx border border-#E8EBEE border-solid rounded-16rpx">
      <view class="flex-y-center gap-20rpx pl-10rpx pr-20rpx h-88rpx justify-between">
        <view class="w-12rpx h-68rpx bg-#EB0000 rounded-16rpx"></view>
        <!-- <view class="text-#384144 text-28rpx">${{ application?.value }}k</view>
        <view class="text-#7A858E text-28rpx">{{ application?.loan }}</view> -->
      </view>
      <!-- <view
        :class="[
          application.status ? 'text-#2196F3 bg-#2196F326' : 'text-#FF754C bg-#FF754C17',
          '  text-20rpx rounded-30rpx h-48rpx flex-center px-20rpx'
        ]"
        >{{ statusComputed(application?.status) }}</view
      > -->
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
