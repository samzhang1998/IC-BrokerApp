<template>
  <BasePage title="Password" hasBack>
    <view class="flex-col h-full">
      <view class="text">
        Password must be 8-16 characters and be some combination of letters, number, and/or special characters(cannot be
        only numbers)
      </view>
      <wd-form ref="form" :model="formData" :rules="rules" class="flex-1">
        <view class="flex-col gap-4">
          <view class="flex-col gap-3">
            <text class="text-28rpx">Current Password</text>
            <wd-input
              type="text"
              v-model="formData.oldPassword"
              placeholder="Enter Current Password"
              :rules="rules.oldPassword"
              prop="oldPassword"
              clearable
              show-password
            />
          </view>
          <view class="flex-col gap-3">
            <text class="text-28rpx">New Password</text>
            <wd-input
              type="text"
              v-model="formData.newPassword"
              placeholder="Enter New Password"
              :rules="rules.newPassword"
              prop="newPassword"
              clearable
              show-password
            />
          </view>
          <view class="flex-col gap-3">
            <text class="text-28rpx">Confirm New Password</text>
            <wd-input
              type="text"
              v-model="formData.confirmPassword"
              placeholder="Enter Confirm New Password"
              :rules="rules.confirmPassword"
              prop="confirmPassword"
              clearable
              show-password
            />
          </view>
        </view>
      </wd-form>
      <view class="flex-col gap-1 mt-3 w-full">
        <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleCreate">Save</wd-button>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { api } from '@/api'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const form = ref()
const formData = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const rules = ref({
  oldPassword: [{ required: true, message: 'Please enter application name' }],
  newPassword: [{ required: true, message: 'Please select documentation type' }],
  confirmPassword: [{ required: true, message: 'Please select documentation type' }]
})

const handleCreate = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await api.updatePassword(userStore.userInfo.id, formData)
  console.log('🚀 ~ handleCreate ~ r:', r)
  if (!e && r) {
    console.log(r)
    userStore.resetToken()
  }
}
</script>

<style>
.text {
  color: #7a858e;
  padding: 20rpx;
  margin-bottom: 20rpx;
}
</style>
