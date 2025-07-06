<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Name Title">
        <wd-picker
          :columns="nameTitleColumns"
          v-model="formData.contactTitle"
          placeholder="Select name title"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="First Name">
        <wd-input
          type="text"
          v-model="formData.contactFirstName"
          placeholder="Enter first name"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Surname">
        <wd-input
          type="text"
          v-model="formData.contactLastName"
          placeholder="Enter surname"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Company Name">
        <wd-input
          type="text"
          v-model="formData.companyName"
          placeholder="Enter company name"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="ABN">
        <wd-input type="text" v-model="formData.abn" placeholder="Enter ABN" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Office Phone">
        <wd-input
          type="text"
          v-model="formData.officePhone"
          placeholder="Enter office phone"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Email">
        <wd-input
          type="text"
          v-model="formData.email"
          placeholder="Enter email"
          prop="email"
          :disabled="isViewApplication"
          :rules="[
            {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email'
            }
          ]"
        />
      </FormItem>
      <view class="flex-col gap-1 mt-3 w-full" v-if="!isViewApplication">
        <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
      </view>
    </wd-form>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationStore = useApplicationStore()

const { applicationInfo, isViewApplication } = storeToRefs(applicationStore)

const nameTitleColumns = ref([
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Miss', label: 'Miss' }
])

const form = ref()

const formData = reactive({
  abn: '',
  applicationId: '',
  companyName: '',
  contactFirstName: '',
  contactLastName: '',
  contactTitle: '',
  email: '',
  officePhone: '',
  type: 'Accountant'
})

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await api.createCompany(applicationInfo.value?.applicationId || '', formData)
  if (!e && r) {
    uni.showToast({
      title: 'Update Success',
      icon: 'success'
    })
    uni.navigateBack()
  }
}
</script>

<style scoped></style>
