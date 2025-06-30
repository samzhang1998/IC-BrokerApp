<template>
  <BasePage title="Contact Details" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <FormItem label="Mobile">
        <wd-input type="text" v-model="formData.mobile" placeholder="Enter mobile" />
      </FormItem>
      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Email Address</text>
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateEmail"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
        </view>
        <view v-for="(item, index) in formData.email" :key="index" class="flex-col gap-4">
          <FormItem label="Email Address">
            <view class="flex-y-center justify-between gap-4">
              <wd-input type="text" v-model="item.email_address" placeholder="Enter email address" class="flex-1" />
              <wd-icon name="delete" size="22px" @click="handleDeleteEmail(index)"></wd-icon>
            </view>
          </FormItem>
          <FormItem label="Email Type">
            <wd-picker :columns="emailTypeColumns" v-model="item.email_type" placeholder="Select email type" />
          </FormItem>
        </view>
      </view>
      <text class="font-bold">Current Address</text>
      <FormItem label="Residential Address">
        <wd-input
          type="text"
          v-model="formData.address.current_address.residential_address"
          placeholder="Enter residential address"
        />
      </FormItem>
      <FormItem label="Start Date">
        <wd-datetime-picker
          type="date"
          v-model="formData.address.current_address.start_date"
          placeholder="Select start date"
        />
      </FormItem>
      <FormItem label="Housing Status">
        <wd-picker
          :columns="housingStatusColumns"
          v-model="formData.address.current_address.housing_status"
          placeholder="Select housing status"
        />
      </FormItem>
      <FormItem label="Mailing Address">
        <wd-input
          type="text"
          v-model="formData.address.current_address.mailing_address"
          placeholder="Enter mailing address"
        />
      </FormItem>

      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Previous Address</text>
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreatePreviewsAddress"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
        </view>
        <view v-for="(item, index) in formData.address.previous_addresses" :key="index" class="flex-col gap-4">
          <FormItem label="Address">
            <view class="flex-y-center justify-between gap-4">
              <wd-input
                type="text"
                v-model="item.residential_address"
                placeholder="Enter email address"
                class="flex-1"
              />
              <wd-icon name="delete" size="22px" @click="handleDeletePreviewsAddress(index)"></wd-icon>
            </view>
          </FormItem>
          <FormItem label="Start Date">
            <wd-datetime-picker type="date" v-model="item.start_date" placeholder="Select start date" />
          </FormItem>
          <FormItem label="End Date">
            <wd-datetime-picker type="date" v-model="item.end_date" placeholder="Select end date" />
          </FormItem>
          <FormItem label="Housing Status">
            <wd-picker
              :columns="housingStatusColumns"
              v-model="item.housing_status"
              placeholder="Select housing status"
            />
          </FormItem>
        </view>
      </view>

      <text class="font-bold">Post Settlement Address</text>
      <FormItem label="Residential Address">
        <wd-input
          type="text"
          v-model="formData.address.post_settlement_address.residential_address"
          placeholder="Enter residential address"
        />
      </FormItem>
      <FormItem label="Housing Status">
        <wd-picker
          :columns="housingStatusColumns"
          v-model="formData.address.post_settlement_address.housing_status"
          placeholder="Select housing status"
        />
      </FormItem>
      <FormItem label="Mailing Address">
        <wd-input
          type="text"
          v-model="formData.address.post_settlement_address.mailing_address"
          placeholder="Enter mailing address"
        />
      </FormItem>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<Application.IContactDetails>({
  email: [{ address: '', type: '', email_address: '', email_type: '' }],
  address: {
    current_address: {
      residential_address: '',
      start_date: '',
      housing_status: '',
      mailing_address: ''
    },
    previous_addresses: [{ residential_address: '', start_date: '', end_date: '', housing_status: '' }],
    post_settlement_address: {
      residential_address: '',
      housing_status: '',
      mailing_address: ''
    }
  }
} as Application.IContactDetails)

const emailTypeColumns = ref(['Work', 'Home'])
const housingStatusColumns = ref([
  'Boarding',
  'Own Home',
  'Own Home Mortgage',
  'Renting',
  'Supplied by Employer',
  'With Parents',
  'Other'
])

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!applicationInfo.value?.applicationId || !applicationStore.currentBorrower?.id) {
    return
  }

  const [e, r] = await applicationApi.updateBorrower(
    applicationInfo.value?.applicationId,
    applicationStore.currentBorrower?.id,
    {
      ...formData,
      type: formData.applicantType
    }
  )
  if (!e && r) {
    uni.showToast({
      title: 'Save Success',
      icon: 'success'
    })
    await applicationStore.fetchBorrowerDetails()
    applicationStore.getCurrentBorrowerById(applicationStore.currentBorrower?.id)
  }
}

const handleCreateEmail = () => {
  formData.email.push({
    address: '',
    type: '',
    email_address: '',
    email_type: ''
  })
}

const handleDeleteEmail = (index: number) => {
  formData.email.splice(index, 1)
}

const handleCreatePreviewsAddress = () => {
  formData.address.previous_addresses.push({
    residential_address: '',
    start_date: '',
    end_date: '',
    housing_status: ''
  })
}

const handleDeletePreviewsAddress = (index: number) => {
  formData.address.previous_addresses.splice(index, 1)
}

onLoad(() => {
  Object.assign(formData, applicationStore.currentBorrower)
})
</script>

<style scoped></style>
