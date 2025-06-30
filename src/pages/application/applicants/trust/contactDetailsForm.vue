<template>
  <BasePage title="Contact Details" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <FormItem label="Office Phone">
        <wd-input type="text" v-model="formData.officePhone" placeholder="Enter office phone" />
      </FormItem>
      <FormItem label="Email">
        <wd-input type="text" v-model="dataJson.email" placeholder="Enter email" />
      </FormItem>
      <FormItem label="Address">
        <wd-input type="text" v-model="dataJson.address" placeholder="Enter address" />
      </FormItem>
      <text class="font-bold">Contact Person</text>
      <FormItem label="Name Title">
        <wd-input type="text" v-model="dataJson.NameTitle" placeholder="Enter name title" />
      </FormItem>
      <FormItem label="First Name">
        <wd-input type="text" v-model="dataJson.firstName" placeholder="Enter first name" />
      </FormItem>
      <FormItem label="Last Name">
        <wd-input type="text" v-model="dataJson.lastName" placeholder="Enter last name" />
      </FormItem>
      <FormItem label="Role">
        <wd-input type="text" v-model="dataJson.role" placeholder="Enter role" />
      </FormItem>
      <FormItem label="Principal Trading Address">
        <wd-input type="text" v-model="formData.tradingAddress" placeholder="Enter trading address" />
      </FormItem>
      <FormItem label="Registered Address">
        <wd-input type="text" v-model="formData.registeredAddress" placeholder="Enter registered address" />
      </FormItem>
      <FormItem label="Mailing Address" v-for="(item, index) in dataJson.MailingAddress" :key="index">
        <view class="flex-y-center justify-between gap-4">
          <wd-input type="text" v-model="item.name" placeholder="Enter mailing address" class="flex-1" />
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateMailingAddress"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
          <wd-icon name="delete" size="22px" @click="handleDeleteMailingAddress(index)"></wd-icon>
        </view>
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
const formData = reactive<Application.ITrustApplicant>({} as Application.ITrustApplicant)

const dataJson = ref({
  email: '',
  address: '',
  NameTitle: '',
  firstName: '',
  lastName: '',
  role: '',
  PreviousRegisteredAddress: [{ name: '' }],
  MailingAddress: [{ name: '' }]
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!applicationInfo.value?.applicationId || !applicationStore.currentTrustApplicant?.id) {
    return
  }

  const [e, r] = await applicationApi.updateTrustApplicant(
    applicationInfo.value?.applicationId,
    applicationStore.currentTrustApplicant?.id,
    {
      ...formData,
      dataJson: JSON.stringify(dataJson.value)
    }
  )
  if (!e && r) {
    uni.showToast({
      title: 'Save Success',
      icon: 'success'
    })
    const [e, r] = await applicationApi.getTrustApplicants(applicationInfo.value?.applicationId)
    if (!e && r) {
      applicationStore.currentTrustApplicant = r.find((item: Application.ITrustApplicant) => {
        return String(item.id) === String(applicationStore.currentTrustApplicant?.id)
      })
      Object.assign(formData, applicationStore.currentTrustApplicant)
      dataJson.value = JSON.parse(applicationStore.currentTrustApplicant?.dataJson || '{}')
    }
  }
}

const handleCreateMailingAddress = () => {
  dataJson.value.MailingAddress.push({
    name: ''
  })
}

const handleDeleteMailingAddress = (index: number) => {
  dataJson.value.MailingAddress.splice(index, 1)
}

onLoad(() => {
  Object.assign(formData, applicationStore.currentTrustApplicant)
  dataJson.value = JSON.parse(applicationStore.currentTrustApplicant?.dataJson || '{}')
})
</script>

<style scoped></style>
