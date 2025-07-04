<template>
  <BasePage title="Create Application" hasBack>
    <view class="flex-col h-full">
      <wd-form ref="form" :model="formData" :rules="rules" class="flex-1 flex-col gap-4">
        <FormItem label="Application Name" required>
          <wd-input
            type="text"
            v-model="formData.name"
            placeholder="Enter application name"
            :rules="rules.name"
            prop="name"
          />
        </FormItem>
        <FormItem label="Documentation Type">
          <wd-picker
            :columns="columns"
            v-model="formData.documentType"
            @confirm="handleConfirm"
            placeholder="Select documentation type"
            :rules="rules.documentType"
            prop="documentType"
          />
        </FormItem>
      </wd-form>
      <view class="flex-col gap-1 mt-3 w-full">
        <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleCreate">Create</wd-button>
        <!-- <wd-button type="text" class="text-#7A858E! underline">Save as draft</wd-button> -->
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { api } from '@/api'
import { useUserStore } from '@/store/modules/user'
import { useApplicationStore } from '@/store/modules/application'

const userStore = useUserStore()
const applicationStore = useApplicationStore()

const form = ref()
const formData = reactive({
  name: '',
  documentType: '',
  brokerId: userStore.userInfo.id,
  bdmId: userStore.userInfo.bdmId
})

const columns = ref(['Full Doc', 'Low Doc', 'Expat Doc', 'Lease Doc'])

const rules = ref({
  name: [{ required: true, message: 'Please enter application name' }],
  documentType: [{ required: true, message: 'Please select documentation type' }]
})

const handleConfirm = ({ value }: { value: string }) => {
  formData.documentType = value
}

const handleCreate = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await api.createApplication(formData)
  if (!e && r) {
    applicationStore.isViewApplication = false
    applicationStore.applicationInfo = r as unknown as Application.IApplication
    uni.navigateTo({
      url: `/pages/application/overview?id=${r.applicationId}`
    })
  }
}
</script>
