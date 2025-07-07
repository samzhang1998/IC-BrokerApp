<template>
  <BasePage :title="`${currentEmploymentItem?.statusCode} - ${currentEmploymentItem?.typeStatus}`" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <FormItem label="Status">
        <wd-input type="text" :modelValue="currentEmploymentItem?.typeStatus" placeholder="Enter status" disabled />
      </FormItem>
      <FormItem label="Reason">
        <wd-textarea v-model="incomeJson.reason" placeholder="Enter reason" rows="3" :disabled="isViewApplication" />
      </FormItem>
      <FormItem label="Start Date">
        <wd-datetime-picker
          type="date"
          v-model="incomeJson.startDate"
          placeholder="Select start date"
          :disabled="isViewApplication"
          :minDate="MIN_DATE"
        />
      </FormItem>
      <FormItem label="End Date">
        <wd-datetime-picker
          type="date"
          v-model="incomeJson.endDate"
          placeholder="Select end date"
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
import { MIN_DATE } from '../../constants'

const { putNotEmployment } = applicationApi
type INotEmploymentDetails = Application.IBorrowerDetail['employmentStatuses'][0]['notEmployedDetails']
const applicationStore = useApplicationStore()
const { applicationInfo, currentEmploymentItem, isViewApplication } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<INotEmploymentDetails>({
  endDate: '',
  startDate: ''
} as any)
const incomeJson = ref({
  startDate: '',
  endDate: '',
  reason: ''
})

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
  if (!applicationInfo.value?.applicationId || !currentEmploymentItem.value?.id) return
  const postData = {
    ...formData,
    incomeJson: JSON.stringify(incomeJson.value)
  }
  const [e, r] = await putNotEmployment(
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
  uni.navigateBack()
}

onShow(() => {
  if (!currentEmploymentItem.value) return
  Object.assign(formData, currentEmploymentItem.value?.notEmployedDetails)
})
</script>

<style scoped></style>
