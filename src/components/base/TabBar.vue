<script setup lang="ts">
//导入自定义tabBarHook
import { useTabBar } from '@/hooks/useTabBar'
const { tabBarList, selectKey, setSelectKey } = useTabBar()

//点击事件
const handleItem = (item: ITabBar) => {
  setSelectKey(item.key)
  console.log(item)

  uni.reLaunch({
    url: item.router
  })
}
</script>

<template>
  <view class="bar-height" />
  <view class="tab-bar flex justify-center align-center">
    <view v-for="(item, index) in tabBarList" :key="index" :class="selectKey === item.key ? 'item active' : 'item'">
      <view class="flex flex-direction justify-center align-center" @click="handleItem(item)">
        <image
          :class="item.key === 'home' ? 'icon1' : 'icon'"
          :src="selectKey === item.key ? item.iconActivePath : item.iconPath"
        />
        <!-- <view class="text">{{ item.name }}</view> -->
      </view>
    </view>
  </view>
</template>

<style lang="scss">
.tab-bar {
  position: fixed;
  width: 100%;
  max-width: 750rpx;
  left: 50%;
  transform: translateX(-50%);
  bottom: 0;
  z-index: 98;
  box-shadow: 0 -1rpx 6rpx rgba(0, 0, 0, 0.1);
  height: calc(150rpx + env(safe-area-inset-bottom) / 2);
  padding-bottom: calc(env(safe-area-inset-bottom) / 2);
  // background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10rpx);
  background: #ffffff;

  .item {
    flex: 1;
    text-align: center;
    padding: 0;
    display: block;
    height: auto;
    line-height: 1;
    margin: 0;
    overflow: initial;
    color: #1e1e1e;
    font-weight: 400;

    .icon1 {
      width: 41rpx;
      height: 45rpx;
    }

    .icon {
      width: 44rpx;
      height: 44rpx;
    }

    .text {
      padding-top: 20rpx;
      color: #000;
      font-size: 22rpx;
      font-style: normal;
      font-weight: 400;
    }
  }

  .active {
    font-weight: 600;
    color: #333eee;
  }
}

.bar-height {
  min-height: 150rpx;
  height: calc(150rpx + env(safe-area-inset-bottom) / 2);
}
</style>
