<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
const { resetToken, userId } = useUser()

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

const userInfo = ref<AnyObj>({})

onMounted(() => {
  if (userId.value) {
    getUserInfo()
  } else {
    handleLogout()
  }
})

const handleLogout = () => {
  resetToken()
}

async function getUserInfo() {
  const [e, r] = await api.getUserInfo(userId.value)
  if (!e && r) {
    userInfo.value = r
  }
}
</script>

<template>
  <view class="home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title act">Settings</view>
      </template>
      <template #right> </template>
    </NavBar>

    <view class="content"> </view>
  </view>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: #f5f5f5;
  .content {
    padding: 20rpx;
  }
}
</style>
