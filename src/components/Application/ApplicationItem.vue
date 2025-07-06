<script lang="ts" setup>
import { formatDate } from '@/utils'
import { StageMap } from '@/pages/application/constants'
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()

interface IProps {
  application: Application.IApplication
}
const props = defineProps<IProps>()

const handleClick = () => {
  if (props.application.status === 'DRAFT') {
    applicationStore.isViewApplication = false
    uni.navigateTo({
      url: `/pages/application/overview?id=${props.application.applicationId}`
    })
  } else if (props.application.status === 'ACTIVE') {
    uni.navigateTo({
      url: `/pages/application/detail?id=${props.application.applicationId}`
    })
  }
}

const isMIR = computed(() => {
  return (
    props.application.mirDocuments &&
    props.application.mirDocuments['Pre-settlement Conditions']?.length > 0 &&
    props.application.mirDocuments['Rejected Conditions']?.length > 0
  )
})

const firstLoan = computed(() => {
  return props.application.loanInfos?.[0]
})

// 显式声明默认导出
defineOptions({
  name: 'ApplicationItem'
})
</script>

<template>
  <view class="px-20rpx py-32rpx border border-#E8EBEE border-solid rounded-16rpx bg-#FCFCFC" @click="handleClick">
    <view class="top flex-y-center justify-between">
      <view class="flex-y-center gap-20rpx">
        <view class="text-#384144 text-28rpx">{{ application?.applicationName || '' }}</view>
        <view class="id text-#7A858E text-24rpx">{{ application?.referenceNumber || '' }}</view>
      </view>
      <view class="time text-#7A858E text-24rpx flex-shrink-0">
        {{ application?.createTime ? formatDate(application?.createTime) : '' }}
      </view>
    </view>
    <view v-if="props.application.status === 'ACTIVE'">
      <view class="flex-y-center justify-between mt-20rpx pr-20rpx border border-#E8EBEE border-solid rounded-16rpx">
        <view class="flex-y-center gap-20rpx pl-10rpx pr-20rpx h-88rpx justify-between">
          <view class="w-12rpx h-68rpx rounded-16rpx" :class="isMIR ? 'bg-#FF754C' : 'bg-#384144'"></view>
          <view class="text-#384144 text-24rpx">
            {{ firstLoan?.amountRequested ? `$${firstLoan?.amountRequested}k` : '' }}
          </view>
          <view class="text-#7A858E text-24rpx">{{ firstLoan?.productName }}</view>
        </view>
        <view
          class="text-white bg-#FF754C17 text-20rpx rounded-30rpx h-48rpx flex-center px-20rpx shrink-0"
          :style="{ backgroundColor: StageMap[application?.stage]?.color }"
        >
          {{ application?.stage }}
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped></style>
