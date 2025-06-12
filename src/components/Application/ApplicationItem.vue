<script lang="ts" setup>
const props = defineProps({
  application: {
    type: Object as PropType<AnyObj>,
    default: () => {}
  }
})

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

// 显式声明默认导出
defineOptions({
  name: 'ApplicationItem'
})
</script>

<template>
  <view class="application">
    <view class="top">
      <view class="flex align-center">
        <view class="title">{{ application?.title || '' }}</view>
        <view class="id">{{ application?.id || '' }}</view>
      </view>
      <view class="time"> {{ application?.time || '' }} </view>
    </view>
    <view class="bottom">
      <view class="flex align-center">
        <view class="status"></view>
        <view class="value">${{ application?.value }}k</view>
        <view class="loan">{{ application?.loan }}</view>
      </view>
      <view :class="application.status > 1 ? 'btn blue' : 'btn orange'">{{ statusComputed(application?.status) }}</view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.application {
  padding: 32rpx 20rpx;

  .top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    font-size: 24rpx;
    color: #7a858e;
    .title {
      font-size: 32rpx;
      font-weight: 400;
      padding-right: 20rpx;
    }
  }

  .bottom {
    margin-top: 20rpx;
    border: 2rpx solid #e8ebee;
    height: 88rpx;
    border-radius: 16rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10rpx;
    padding-right: 20rpx;

    .status {
      width: 12rpx;
      height: 68rpx;
      border-radius: 16rpx;
      background: #eb0000;
      margin-right: 20rpx;
    }

    .value,
    .loan {
      color: #384144;
      font-size: 28rpx;
    }

    .value {
      margin-right: 20rpx;
    }

    .btn {
      border-radius: 30rpx;
      height: 48rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 20rpx;
      font-size: 20rpx;
    }

    .orange {
      background: rgba(255, 117, 76, 0.09);
      color: #ff754c;
    }

    .blue {
      background: rgba(33, 150, 243, 0.15);
      color: #2196f3;
    }
  }
}
</style>
