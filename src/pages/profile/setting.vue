<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
import { useUserStoreHook } from '@/store/modules/user'
import useProfile from './hooks/useProfile'

const { editUserInfo } = useProfile()
const { resetToken, userId } = useUser()
const userStore = useUserStoreHook()

import settingIcon from '@/static/icon/setting-icon.png'
import settingLang from '@/static/icon/setting-lang.png'
import settingUser from '@/static/icon/setting-user.png'
import settingLock from '@/static/icon/setting-lock.png'
import settingPhone from '@/static/icon/setting-phone.png'
import logout from '@/static/icon/logout.png'

const userInfo = computed(() => userStore.userInfo)

onMounted(() => {
  if (!userId.value) {
    handleLogout()
  }
})

const handleLogout = () => {
  resetToken()
}

const handleUpdatePassword = () => {
  uni.navigateTo({
    url: '/pages/profile/updatePassword'
  })
}

const handleChangeSystemNotification = (e: any) => {
  editUserInfo({ systemNotification: e.detail.value }, () => {})
}
</script>

<template>
  <BasePage title="Settings" hasBack>
    <view class="content">
      <!-- Account Setting -->
      <view class="card">
        <view class="card-title">Account Setting</view>
        <view class="item">
          <view class="icon user">
            <image :src="settingUser"></image>
          </view>
          <view class="label">Broker ID</view>
          <view class="value">{{ userInfo.brokerId }}</view>
        </view>
        <view class="item">
          <view class="icon phone">
            <image :src="settingPhone"></image>
          </view>
          <view class="label">Mobile Number</view>
          <view class="value">{{ userInfo.phone }}</view>
        </view>
        <view class="item arrow" @click="handleUpdatePassword">
          <view class="icon lock">
            <image :src="settingLock"></image>
          </view>
          <view class="label">Password</view>
          <view class="value">
            <wd-icon name="arrow-right" color="#7A858E" size="16px"></wd-icon>
          </view>
        </view>
      </view>

      <!-- General Setting -->
      <view class="card">
        <view class="card-title">General Setting</view>
        <view class="item arrow">
          <view class="icon lang">
            <image :src="settingLang"></image>
          </view>
          <view class="label">Language</view>
          <view class="value">English</view>
        </view>
      </view>

      <!-- Notification -->
      <view class="card">
        <view class="card-title">Notification</view>
        <view class="item">
          <view class="icon gear">
            <image :src="settingIcon"></image>
          </view>
          <view class="label">System Notification</view>
          <switch
            class="switch"
            :checked="userInfo.systemNotification"
            color="#ff6d3a"
            @change="handleChangeSystemNotification"
          />
        </view>
      </view>

      <!-- Logout -->
      <view class="logout-btn" @click="handleLogout">
        <view class="logout-icon">
          <image :src="logout"></image>
        </view>
        <view>Logout</view>
      </view>
    </view>
  </BasePage>
</template>

<style lang="scss" scoped>
.content {
  padding: 32rpx 20rpx 20rpx 20rpx;
}
.card {
  background: #fff;
  border-radius: 20rpx;
  margin-bottom: 32rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
  .card-title {
    font-weight: bold;
    font-size: 32rpx;
    padding: 32rpx 0 16rpx 0;
    margin-left: 32rpx;
  }
  .item {
    display: flex;
    align-items: center;
    padding: 24rpx 32rpx;
    border-top: 1rpx solid #f0f0f0;
    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 24rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .label {
      flex: 1;
      font-size: 28rpx;
    }
    .value {
      color: #888;
      font-size: 28rpx;
    }
    .switch {
      margin-left: auto;
    }
  }
  .item:first-of-type {
    border-top: none;
  }
  .arrow::after {
    // content: '>';
    // color: #ccc;
    // margin-left: 16rpx;
  }
}
.logout-btn {
  margin: 40rpx 0 0 0;
  background: #363c3c;
  color: #fff;
  border-radius: 16rpx;
  display: flex;
  align-items: center;
  // justify-content: center;
  height: 96rpx;
  font-size: 32rpx;
  font-weight: bold;
  padding: 0 32rpx;
  .logout-icon {
    width: 40rpx;
    height: 40rpx;
    margin-right: 16rpx;
    image {
      width: 100%;
      height: 100%;
      display: block;
    }
  }
}
</style>
