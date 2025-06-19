<template>
  <BasePage title="Create Application" hasBack>
    <view class="flex-col h-full">
      <view class="flex-col gap-4 flex-1">
        <view class="flex-col gap-3">
          <text class="text-28rpx">Application Name*</text>
          <wd-input type="text" v-model="formData.name" />
        </view>
        <view class="flex-col gap-3">
          <text class="text-28rpx">Documentation Type</text>
          <wd-picker :columns="columns" v-model="formData.documentType" @confirm="handleConfirm" />
        </view>
      </view>
      <view class="flex-col gap-1 mt-3 w-full">
        <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleCreate">Create</wd-button>
        <wd-button type="text" class="text-#7A858E! underline">Save as draft</wd-button>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { api } from '@/api'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()

const formData = reactive({
  name: '',
  documentType: '',
  brokerId: userStore.userInfo.id,
  bdmId: userStore.userInfo.bdmId
})

const columns = ref(['Full Doc', 'Low Doc', 'Expat Doc', 'Lease Doc'])

const handleConfirm = ({ value }: { value: string }) => {
  formData.documentType = value
}

const handleCreate = async () => {
  const [e, r] = await api.createApplication(formData)
  if (!e && r) {
    console.log(r)
  }
}
</script>
