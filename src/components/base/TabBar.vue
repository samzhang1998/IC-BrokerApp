<script setup lang="ts">
//导入自定义tabBarHook
import { useTabBar } from '@/hooks/useTabBar'
const { tabBarList, selectKey, setSelectKey } = useTabBar()

onShow(() => {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const path = currentPage.route // 输出示例: "pages/index/index"
  const find = tabBarList.value.find((item) => item.router === `/${path}`)
  if (find) {
    setSelectKey(find.key)
  }
})

//点击事件
const handleItem = (item: ITabBar) => {
  setSelectKey(item.key)
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
        <image class="icon" :src="selectKey === item.key ? item.iconActivePath : item.iconPath" />
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
  z-index: 9;
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

    .icon {
      width: 48rpx;
      height: 48rpx;
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
