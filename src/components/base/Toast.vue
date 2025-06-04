<script setup lang="ts">
import successPop from '@/static/images/success-pop.png'
interface NavbarProps {
  isShow: boolean
}

const props = withDefaults(defineProps<NavbarProps>(), {
  isShow: false
})

watch(
  () => props.isShow,
  () => {}
)
const moveHandle = () => {}
</script>

<template>
  <block v-if="props.isShow">
    <view :class="props.isShow ? 'popup show' : 'popup'" @touchmove.stop.prevent="moveHandle">
      <view class="dialog">
        <view class="pop-box">
          <view class="title">Congratulation!</view>
          <view class="text">Submit successfully, our staff will follow up shortly.</view>
          <view class="icon">
            <image class="img" :src="successPop"></image>
          </view>
        </view>
      </view>
    </view>
  </block>
</template>

<style lang="scss" scoped>
.pop-box {
  width: 568rpx;
  height: 452rpx;
  padding: 60rpx 50rpx;
  border-radius: 30rpx;
  background: #fff;

  .title {
    color: #333;
    font-size: 36rpx;
    font-style: normal;
    font-weight: 700;
    text-align: center;
    padding-bottom: 20rpx;
  }

  .text {
    color: #4f4f4f;
    font-size: 30rpx;
    font-style: normal;
    font-weight: 400;
  }

  .icon {
    padding-top: 20rpx;
    display: flex;
    justify-content: center;
    .img {
      width: 164rpx;
      height: 164rpx;
      display: block;
    }
  }
}

.popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 11100;
  opacity: 0;
  outline: 0;
  text-align: center;
  -ms-transform: scale(1.185);
  transform: scale(1.185);
  backface-visibility: hidden;
  perspective: 2000rpx;
  background: rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease-in-out 0s;
  pointer-events: none;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

.popup::before {
  content: '\200B';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}

.popup.show {
  opacity: 1;
  transition-duration: 0.3s;
  -ms-transform: scale(1);
  transform: scale(1);
  overflow-x: hidden;
  overflow-y: auto;
  pointer-events: auto;
}

.dialog {
  position: relative;
  display: inline-block;
  vertical-align: middle;
  margin-left: auto;
  margin-right: auto;
  max-width: 100%;
  //overflow: hidden;
}
</style>
