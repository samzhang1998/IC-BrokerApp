<script setup lang="ts">
import noData from '@/static/images/nodata.png'
const title = ref('No Data')
</script>

<template>
  <view class="no-data">
    <image class="img" mode="aspectFit" :src="noData"></image>
    <view class="texts">
      {{ title }}
    </view>
  </view>
</template>

<style lang="scss" scoped>
.no-data {
  width: 100vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.no-data .img {
  display: inline-block;
  width: 100px;
  height: 64px;
  margin-top: -120upx;
}
.texts {
  margin-top: 20upx;
  height: 40upx;
  line-height: 40upx;
  text-align: center;
  color: #9c9c9c;
  font-size: 24upx;
  letter-spacing: 5upx;
}
</style>
