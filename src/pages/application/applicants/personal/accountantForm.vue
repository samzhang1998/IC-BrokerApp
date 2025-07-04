<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Name Title">
        <wd-picker :columns="nameTitleColumns" v-model="formData.contactTitle" placeholder="Select name title" />
      </FormItem>
      <FormItem label="First Name">
        <wd-input type="text" v-model="formData.contactFirstName" placeholder="Enter first name" />
      </FormItem>
      <FormItem label="Surname">
        <wd-input type="text" v-model="formData.contactLastName" placeholder="Enter surname" />
      </FormItem>
      <FormItem label="Company Name">
        <wd-input type="text" v-model="formData.companyName" placeholder="Enter company name" />
      </FormItem>
      <FormItem label="ABN">
        <wd-input type="text" v-model="formData.abn" placeholder="Enter ABN" />
      </FormItem>
      <FormItem label="Office Phone">
        <wd-input type="text" v-model="formData.officePhone" placeholder="Enter office phone" />
      </FormItem>
      <FormItem label="Email">
        <wd-input
          type="text"
          v-model="formData.email"
          placeholder="Enter email"
          prop="email"
          :rules="[
            {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: 'Please enter a valid email'
            }
          ]"
        />
      </FormItem>
      <view class="flex-col gap-1 mt-3 w-full">
        <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
      </view>
    </wd-form>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationStore = useApplicationStore()

const { applicationInfo } = storeToRefs(applicationStore)

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
