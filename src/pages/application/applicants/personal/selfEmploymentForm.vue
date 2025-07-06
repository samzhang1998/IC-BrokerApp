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
      <FormItem label="Occupation">
        <wd-input
          type="text"
          v-model="formData.occupation"
          placeholder="Enter occupation"
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
      <FormItem label="Business Start Date">
        <wd-datetime-picker
          type="date"
          v-model="formData.businessStartDate"
          placeholder="Select business start date"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Business Activity">
        <wd-input
          type="text"
          v-model="formData.businessActivity"
          placeholder="Enter business activity"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Industry">
        <wd-input type="text" v-model="formData.industry" placeholder="Enter industry" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Industry Code">
        <wd-input
          type="text"
          v-model="formData.industryCode"
          placeholder="Enter industry code"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Number of Employees">
        <wd-input-number
          v-model="formData.numberOfEmployees"
          placeholder="Enter number of employees"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Number of Locations">
        <wd-input-number
          v-model="formData.numberOfLocations"
          placeholder="Enter number of locations"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Is Franchise">
        <wd-switch v-model="formData.isFranchise" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Own Premises">
        <wd-switch v-model="formData.ownPremises" size="medium" :disabled="isViewApplication" />
      </FormItem>
      <view
        v-for="income in formData.incomes"
        :key="income.id"
        class="flex-col gap-4 border-t-solid border-t border-#E5E5E5! pt-20rpx"
      >
        <FormItem label="Start Date">
          <wd-datetime-picker
            type="date"
            v-model="income.startDate"
            placeholder="Select start date"
            :disabled="isViewApplication"
          />
        </FormItem>
        <FormItem label="End Date">
          <wd-datetime-picker
            type="date"
            v-model="income.endDate"
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
      </view>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full" v-if="!isViewApplication">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const { putSelfEmployment } = applicationApi
type ISelfDetails = Application.IBorrowerDetail['employmentStatuses'][0]['selfDetails']
const applicationStore = useApplicationStore()
const { applicationInfo, currentEmploymentItem, isViewApplication } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<ISelfDetails>({
  accountantId: null,
  basis: '',
  businessActivity: '',
  businessStartDate: '',
  employerId: null,
  employerSource: '',
  incomes: [],
  industry: '',
  industryCode: '',
  isFranchise: false,
  numberOfEmployees: null,
  numberOfLocations: null,
  occupation: null,
  ownPremises: false
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
  const [e, r] = await putSelfEmployment(
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
  Object.assign(formData, currentEmploymentItem.value?.selfDetails)
})
</script>

<style scoped></style>
