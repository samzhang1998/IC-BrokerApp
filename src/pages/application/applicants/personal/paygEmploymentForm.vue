<template>
  <BasePage :title="`${currentEmploymentItem?.statusCode} - ${currentEmploymentItem?.typeStatus}`" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <FormItem label="Status">
        <wd-input type="text" :modelValue="currentEmploymentItem?.typeStatus" placeholder="Enter status" disabled />
      </FormItem>
      <FormItem label="Basis">
        <wd-picker
          :columns="basisColumns"
          v-model="formData.basis"
          placeholder="Select basis"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Position Title">
        <wd-input
          type="text"
          v-model="formData.positionTitle"
          placeholder="Enter position title"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Occupation">
        <wd-input
          type="text"
          v-model="formData.occupation"
          placeholder="Enter position title"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Employer Type">
        <wd-picker
          :columns="employerColumns"
          v-model="formData.employerType"
          placeholder="Select employer type"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Employer Source">
        <wd-picker
          :columns="employerSourceColumns"
          v-model="formData.employerSource"
          placeholder="Select employer source"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Employer">
        <wd-input
          type="text"
          v-model="formData.employerId"
          placeholder="Enter position title"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="On Probation">
        <wd-switch v-model="formData.onProbation" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Fully Maintained Company Car">
        <wd-switch v-model="formData.maintainedCompanyCar" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <text class="font-bold">Income Amount and Frequency</text>
      <FormItem label="Start Date">
        <wd-datetime-picker
          type="date"
          v-model="formData.startDate"
          placeholder="Select start date"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="End Date">
        <wd-datetime-picker
          type="date"
          v-model="formData.endDate"
          placeholder="Select end date"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem v-for="item in incomeJson" :key="item.name" :label="item.name">
        <view class="flex-y-center gap-20rpx">
          <wd-input type="number" v-model="item.amount" placeholder="$" class="w-2/5" :disabled="isViewApplication" />
          <wd-picker
            :columns="incomeTimeColumns"
            v-model="item.time"
            placeholder="Select income time"
            class="flex-1"
            :disabled="isViewApplication"
          />
        </view>
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
const { putPaygEmployment } = applicationApi
type IPaygDetails = Application.IBorrowerDetail['employmentStatuses'][0]['paygDetails']
const applicationStore = useApplicationStore()
const { applicationInfo, currentEmploymentItem, isViewApplication } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<IPaygDetails>({
  basis: '',
  businessActivity: '',
  employerId: null,
  employerSource: null,
  employerType: 'Private',
  endDate: '',
  incomeJson: '',
  maintainedCompanyCar: false,
  occupation: null,
  onProbation: false,
  positionTitle: null,
  startDate: ''
} as any)
const incomeJson = ref([
  { name: 'Gross Salary ', amount: '', time: '' },
  { name: 'Net Salary', amount: '', time: '' },
  { name: 'Cross Regular Overtime', amount: '', time: '' },
  { name: 'Gross Bonus', amount: '', time: '' },
  { name: 'Gross Commission', amount: '', time: '' },
  { name: 'Gross Car Allowance', amount: '', time: '' },
  { name: 'Gross Work Allowance', amount: '', time: '' },
  { name: 'Workers Compensation', amount: '', time: '' }
])
const basisColumns = ref(['Full Time', 'Part Time', 'Casual'])
const employerColumns = ref(['Private', 'Public'])
const employerSourceColumns = ref(['Company', 'Company_Applicant'])
const incomeTimeColumns = ref(['Weekly', 'Monthly', 'Yearly'])

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!applicationInfo.value?.applicationId || !currentEmploymentItem.value?.id) return
  const postData = {
    ...formData,
    incomeJson: JSON.stringify(incomeJson.value)
  }
  const [e, r] = await putPaygEmployment(
    applicationInfo.value.applicationId,
    currentEmploymentItem.value.borrowerId,
    currentEmploymentItem.value.id,
    postData
  )
  if (e) return
  uni.showToast({
    title: 'Save Success',
    icon: 'success'
  })
}

onLoad(() => {
  Object.assign(formData, currentEmploymentItem.value?.paygDetails)
})
</script>

<style scoped></style>
