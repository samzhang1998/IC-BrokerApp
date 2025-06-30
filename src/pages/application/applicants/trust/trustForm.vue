<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <FormItem label="Established">
        <wd-switch v-model="formData.established" size="medium" />
      </FormItem>
      <FormItem label="Trust Structure">
        <wd-picker :columns="trustStructureColumns" v-model="formData.trustStructure" />
      </FormItem>
      <FormItem label="Trust Purpose">
        <wd-picker :columns="trustPurposeColumns" v-model="formData.trustPurpose" />
      </FormItem>
      <FormItem label="Trust Name" labelBold>
        <wd-input type="text" v-model="formData.trustName" placeholder="Enter trust name" />
      </FormItem>
      <FormItem label="ABN">
        <wd-input type="text" v-model="dataJson.abn" placeholder="Enter ABN" />
      </FormItem>
      <FormItem label="Establishment Date">
        <wd-datetime-picker type="date" v-model="formData.establishmentDate" placeholder="Enter establishment date" />
      </FormItem>
      <FormItem label="Country Established">
        <wd-picker
          :columns="countryColumns"
          v-model="dataJson.countryEstablished"
          placeholder="Enter country established"
          disabled
        />
      </FormItem>
      <FormItem label="Number of Trustees">
        <wd-input-number v-model="formData.numberOfTrustees" placeholder="Enter number of trustees" />
      </FormItem>
      <FormItem label="Number of Beneficiaries">
        <wd-input-number v-model="formData.numberOfBeneficiaries" placeholder="Enter number of beneficiaries" />
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
  abn: '',
  countryEstablished: 'Australia',
  settlor: [],
  deed: []
})

const trustStructureColumns = ref(['Discretionary', 'Fixed', 'Hybrid', 'Simple', 'SMSF'])
const trustPurposeColumns = ref(['Family Trust', 'Protective', 'Security Trust', 'SMSF', 'Trading Trust'])
const countryColumns = ref(['Australia'])

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
  }
}
</script>

<style scoped></style>
