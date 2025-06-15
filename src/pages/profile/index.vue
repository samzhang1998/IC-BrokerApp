<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
import { ProfileKey } from './types'
import { Overview, Qualifications, CommissionAccount } from './components'
const { resetToken, userId } = useUser()

onMounted(() => {
  if (userId.value) {
    getUserInfo()
  } else {
    handleLogout()
  }
})

onShow(() => {})

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

const userInfo = ref<AnyObj>({})
const value = ref<string[]>([''])

const handleLogout = () => {
  resetToken()
}

async function getUserInfo() {
  const [e, r] = await api.getUserInfo(userId.value)
  if (!e && r) {
    console.log('🚀 ~ getUserInfo ~ r:', r)
    userInfo.value = r
  }
}

const handleSetting = () => {
  uni.navigateTo({
    url: '/pages/profile/setting'
  })
}

const handleReset = () => {
  getUserInfo()
}

provide(ProfileKey, {
  userInfo,
  handleReset
})
</script>

<template>
  <view class="home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title act">Profile</view>
      </template>
      <template #right> </template>
    </NavBar>

    <view class="content">
      <view class="user">
        <view class="box">
          <view class="top">
            <view class="left">
              <view class="name">{{ userInfo?.firstName }}{{ userInfo?.lastName }}</view>
              <view class="broker">Broker ID: {{ userInfo?.id }}</view>
            </view>
            <view class="right">{{ userInfo?.status === 1 ? 'Active' : 'InActive' }}</view>
          </view>
          <view class="bottom">
            <view>Date Create: {{ userInfo?.createdAt }}</view>
            <uni-icons type="gear-filled" color="#7A858E" size="20" @click="handleSetting"></uni-icons>
          </view>
        </view>
      </view>
      <wd-collapse v-model="value" accordion>
        <wd-collapse-item custom-body-style="padding:20rpx 0" title="Overview" name="overview">
          <Overview></Overview>
        </wd-collapse-item>
        <wd-collapse-item custom-body-style="padding:20rpx 0" title="Commission Account" name="account">
          <CommissionAccount></CommissionAccount>
        </wd-collapse-item>
        <wd-collapse-item custom-body-style="padding:20rpx 0" title="Qualifications & Checklist" name="qualifications">
          <Qualifications></Qualifications>
        </wd-collapse-item>
      </wd-collapse>
    </view>

    <TabBar></TabBar>
  </view>
</template>

<style lang="scss" scoped>
.content {
  padding: 0 40rpx;

  .user {
    background: #fcfcfc;
    border: 1px solid #e8ebee;
    // height: 274rpx;
    border-radius: 20rpx;
    padding: 20rpx;

    .box {
      background: #ffffff;
      border: 1px solid #e8ebee;
      // height: 234rpx;
      border-radius: 16rpx;
      padding: 20rpx;

      .top {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0;
        border-bottom: 1px solid #e8ebee;

        .name {
          font-size: 36rpx;
          color: #000000;
        }

        .broker {
          padding-top: 10rpx;
          font-size: 28rpx;
          color: #7a858e;
        }

        .right {
          border-radius: 30rpx;
          padding: 0 20rpx;
          background: rgba(28, 187, 140, 0.15);
          color: #1cbb8c;
          font-size: 24rpx;
          height: 40rpx;
          line-height: 40rpx;
        }
      }

      .bottom {
        padding: 20rpx 0 0;
        display: flex;
        justify-content: space-between;
        color: #939393;
        font-size: 28rpx;
      }
    }
  }
}
</style>
