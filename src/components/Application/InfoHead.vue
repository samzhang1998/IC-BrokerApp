<template>
  <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
    <view class="flex-y-center justify-between">
      <text class="text-28rpx font-bold">{{ applicationInfo?.applicationName }}</text>
      <view class="flex-y-center gap-10rpx">
        <wd-icon name="error-circle" size="22px" color="#EB0000" @click="handleToMir" v-if="showMir"></wd-icon>
        <wd-icon name="file-paste" size="22px" color="#1CBB8C" @click="handleToIssued" v-if="showIssued"></wd-icon>
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
        <view>{{ history.length > 0 ? history[history?.length - 1].status : '' }}</view>
        <view class="text-#7A858E text-24rpx">
          {{ history.length > 0 ? dayjs(history[history?.length - 1].timeStamp).format('MM/DD/YYYY HH:mm:ss') : '' }}
        </view>
      </view>
      <wd-icon name="browse" size="22px" color="#7A858E" @click="showHistory = true"></wd-icon>
    </view>
  </view>
  <wd-overlay :show="showHistory" @click="showHistory = false">
    <view class="wrapper">
      <view class="history-list">
        <view
          class="bg-white flex items-center w-[600rpx] h-[80rpx] px-2 border gap-3"
          v-for="item in history"
          :key="item.id"
        >
          <view class="w-[30rpx] h-[30rpx] rounded-full" :style="{ backgroundColor: timeLine(item) }"></view>
          <view>
            <view class="title">{{ item?.status || '' }}</view>
            <view class="value">{{ dayjs(item?.timeStamp || '').format('MM/DD/YYYY HH:mm:ss') }}</view>
          </view>
        </view>
      </view>
    </view>
  </wd-overlay>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface IProps {
  applicationInfo: AnyObj
  history: AnyObj[]
  showMir: boolean
  showIssued: boolean
}

const props = defineProps<IProps>()

const showHistory = ref(false)

const timeLine = computed(() => {
  return (h: AnyObj) => {
    if (!h.timeStamp) {
      return '#B3BFCA'
    } else if (
      h.status === 'Submit to IC' ||
      h.status === 'Pre-assessment' ||
      h.status === 'Full-assessment' ||
      h.status === 'AIP' ||
      h.status === 'Submit to Funder'
    ) {
      return '#FF754C'
    } else if (h.status === 'Conditional Approval' || h.status === 'Formal Approval') {
      return '#1CBB8C'
    } else if (
      h.status === 'Instruct to Solicitor' ||
      h.status === 'Loan doc Issued' ||
      h.status === 'Loan doc Returned' ||
      h.status === 'Settlement Date Booked' ||
      h.status === 'Settled'
    ) {
      return '#2196F3'
    } else {
      return '#EB0000'
    }
  }
})

const handleToMir = () => {
  uni.navigateTo({
    url: `/pages/application/mir?id=${props.applicationInfo?.applicationId}`
  })
}

const handleToIssued = () => {
  uni.navigateTo({
    url: `/pages/application/issued?id=${props.applicationInfo?.applicationId}`
  })
}
</script>

<style lang="scss" scoped>
.title {
  color: #384144;
}

.value {
  color: #7a858e;
}

.border {
  font-size: 24rpx;
}

.border + .border {
  border-top: 1px solid #e8ebee;
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
