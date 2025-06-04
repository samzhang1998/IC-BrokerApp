<script setup lang="ts">
const handleToUp = () => {
  uni.pageScrollTo({
    scrollTop: 0,
    duration: 200
  })
}
</script>

<template>
  <view class="up" @click.stop="handleToUp">
    <uni-icons type="arrow-up" color="#fff"></uni-icons>
  </view>
</template>

<style lang="scss" scoped>
.up {
  width: 80rpx;
  height: 80rpx;
  border-radius: 50%;
  position: fixed;
  z-index: 105;
  bottom: 20%;
  right: 30rpx;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
