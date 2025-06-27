<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Applicant Type" labelBold>
        <wd-input type="text" v-model="formData.type" placeholder="Enter applicant type" disabled />
      </FormItem>
      <FormItem label="Company Name" name="companyName">
        <wd-input v-model="formData.companyName" placeholder="Enter company name" />
      </FormItem>
      <FormItem label="ABN" name="abn">
        <wd-input v-model="formData.abn" placeholder="Enter ABN" />
      </FormItem>
      <FormItem label="ACN" name="acn">
        <wd-input v-model="formData.acn" placeholder="Enter ACN" />
      </FormItem>

      <FormItem label="Date Registered" name="dateRegistered">
        <wd-datetime-picker v-model="formData.dateRegistered" type="date" placeholder="Select date registered" />
      </FormItem>
      <FormItem label="Registered in Country" name="registeredInCountry">
        <wd-input v-model="formData.registeredCountry" placeholder="Enter registered in country" disabled />
      </FormItem>

      <FormItem label="Registered in State" name="registeredInState">
        <wd-picker :columns="states" v-model="formData.registeredState" placeholder="Select registered in state" />
      </FormItem>
      <FormItem label="Registered for GST" name="registeredForGst">
        <wd-switch v-model="formData.registeredGst" size="medium" />
      </FormItem>
      <FormItem label="License Number" name="licenseNumber">
        <wd-input v-model="dataJson.license" placeholder="Enter license number" />
      </FormItem>

      <FormItem label="Type of Incorporation" name="typeOfIncorporation">
        <wd-picker
          :columns="corporations"
          v-model="dataJson.incorporationType"
          placeholder="Select type of incorporation"
        />
      </FormItem>
      <FormItem label="Exempt Status" name="exemptStatus">
        <wd-picker :columns="exemptStatus" v-model="dataJson.exemptStatus" placeholder="Select exempt status" />
      </FormItem>

      <FormItem label="Public Authority" name="publicAuthority">
        <wd-switch v-model="dataJson.authority" size="medium" />
      </FormItem>
      <FormItem label="Is Holding Company" name="isHoldingCompany">
        <wd-switch v-model="dataJson.holding" size="medium" />
      </FormItem>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentCompanyApplicant } = toRefs(applicationStore)
const form = ref<any>()
const formData = reactive<Application.ICompanyApplicant>({} as Application.ICompanyApplicant)
const dataJson = ref({
  license: '',
  incorporationType: '',
  exemptStatus: '',
  authority: '',
  holding: '',
  shareholders: 0
})

const states = ref(['ACT', 'NSW', 'NT', 'QLD', 'SA', 'TAS', 'VIC', 'WA'])
const isGst = ref([
  { value: true, label: 'Yes' },
  { value: false, label: 'No' }
])
const corporations = ref(['lnc', 'Ltd', 'NL', 'Pty Ltd'])
const exemptStatus = ref([
  { value: true, label: 'Exempt' },
  { value: false, label: 'Non Exempt' }
])
watch(
  currentCompanyApplicant,
  (newVal) => {
    if (newVal) {
      const cleanNewVal = { ...newVal } as any
      for (const key in cleanNewVal) {
        if (cleanNewVal[key] === null) {
          cleanNewVal[key] = ''
        }
      }
      Object.assign(formData, cleanNewVal)
    }
  },
  {
    deep: true,
    immediate: true
  }
)
</script>

<style scoped></style>
