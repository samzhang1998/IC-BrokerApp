<template>
  <BasePage :title="currentIdentityItem?.documentType || 'Identity'" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <FormItem label="Document Type">
        <wd-picker
          :columns="documentTypeColumns"
          v-model="formData.documentType"
          placeholder="Select document type"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Document Category">
        <wd-input
          type="text"
          :modelValue="currentIdentityItem?.documentCategory"
          placeholder="Enter document category"
          disabled
        />
      </FormItem>
      <FormItem label="Document Number">
        <wd-input
          type="text"
          v-model="formData.documentNumber"
          placeholder="Enter document number"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Issue Date">
        <wd-datetime-picker
          type="date"
          v-model="formData.issueDate"
          placeholder="Select issue date"
          :disabled="isViewApplication"
          :minDate="MIN_DATE"
        />
      </FormItem>
      <FormItem label="Name on Document">
        <wd-input type="text" v-model="dataJson.name" placeholder="Enter name" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Card Number">
        <wd-input type="text" v-model="dataJson.card" placeholder="Enter card number" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Issuing Organization">
        <wd-input
          type="text"
          v-model="dataJson.organization"
          placeholder="Enter issuing organization"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Expire Date">
        <wd-datetime-picker
          type="date"
          v-model="dataJson.expireDate"
          placeholder="Select expire date"
          :disabled="isViewApplication"
          :minDate="MIN_DATE"
        />
      </FormItem>
      <FormItem label="Country of Issue">
        <wd-input
          type="text"
          v-model="dataJson.country"
          placeholder="Enter issuing country"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Place of Issue">
        <wd-input
          type="text"
          v-model="dataJson.place"
          placeholder="Enter issuing place"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Original Sighted">
        <wd-switch v-model="dataJson.sighted" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Name Verified">
        <wd-switch v-model="dataJson.nameVerified" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Photograph Verified">
        <wd-switch v-model="dataJson.photoVerified" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="DOB Verified">
        <wd-switch v-model="dataJson.dobVerified" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Residential Address Verified">
        <wd-switch v-model="dataJson.addressVerified" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Location Document Verified">
        <wd-switch v-model="dataJson.locationVerified" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Signature Verified">
        <wd-switch v-model="dataJson.signVerified" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Date Document Verified">
        <wd-datetime-picker
          type="date"
          v-model="dataJson.verifyDate"
          placeholder="Select verify date"
          :disabled="isViewApplication"
          :minDate="MIN_DATE"
        />
      </FormItem>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full" v-if="!isViewApplication">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'
import { proofOfIdentityItems, MIN_DATE } from '../../constants'

const { putIdentity } = applicationApi
type IIdentity = Application.IBorrowerDetail['identities'][0]
const applicationStore = useApplicationStore()
const { applicationInfo, currentIdentityItem, isViewApplication } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<IIdentity>({
  documentType: '',
  documentCategory: '',
  documentNumber: '',
  issueDate: '',
  dataJson: ''
} as any)

const dataJson = ref<any>({
  name: '',
  card: '',
  organization: '',
  expireDate: '',
  country: '',
  place: '',
  sighted: false,
  nameVerified: false,
  photoVerified: false,
  dobVerified: false,
  addressVerified: false,
  locationVerified: false,
  signVerified: false,
  verifyDate: ''
})

const documentTypeColumns = ref(proofOfIdentityItems.map((item) => item.name))

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!applicationInfo.value?.applicationId || !currentIdentityItem.value?.id) return
  const postData = {
    ...formData,
    dataJson: dataJson.value
  }
  const [e, r] = await putIdentity(
    applicationInfo.value.applicationId,
    currentIdentityItem.value.borrowerId,
    currentIdentityItem.value.id,
    postData
  )
  if (e) return
  applicationStore.fetchBorrowerDetails()
  uni.showToast({
    title: 'Save Success',
    icon: 'success'
  })
  uni.navigateBack()
}

onShow(() => {
  Object.assign(formData, currentIdentityItem.value)
  dataJson.value = JSON.parse(currentIdentityItem.value?.dataJson || '{}')
})
</script>

<style scoped></style>
