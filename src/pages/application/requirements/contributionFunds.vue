<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Contribution Funds Type" labelBold>
        <wd-picker :columns="typeColumns" v-model="formData.type" placeholder="Select Contribution Funds Type" />
      </FormItem>
      <FormItem label="Description" labelBold>
        <wd-input type="text" v-model="formData.description" placeholder="Enter Description" />
      </FormItem>
      <FormItem label="Amount" labelBold>
        <wd-input type="number" v-model="formData.amount" placeholder="Enter Amount" />
      </FormItem>
      <FormItem label="Is Funds from Loan" labelBold>
        <wd-switch v-model="formData.fundsFromLoan" />
      </FormItem>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full" v-if="!isViewApplication">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { cloneDeep } from 'lodash'

const applicationStore = useApplicationStore()
const { applicationInfo, currentContributionFund, isViewApplication } = toRefs(applicationStore)
const typeColumns = ref([
  'Cash',
  'Existing Equity',
  'First Home Owner Grant',
  'Genuine Savings',
  'Gift',
  'Inheritance',
  'Net Proceeds from Sale of Property',
  'Redraw',
  'Sale of Non Real Estate Asset',
  'Secured VISA',
  'Superannuation',
  'Term Deposit',
  'Unsecured Borrowing',
  'Other'
])

onLoad((options) => {
  if (options?.id) {
    formData.value.id = options.id
  }
  if (currentContributionFund.value) {
    Object.assign(formData.value, currentContributionFund.value)
  }
})

const form = ref()
const formData = ref<Application.IContributionFunds>({} as Application.IContributionFunds)

const handleSubmit = async () => {
  let data = cloneDeep(formData.value)
  const [e, r] = await api.putContributionFunds(applicationInfo.value?.applicationId || '', data.id, data)
  if (!e && r) {
    uni.showToast({
      title: 'Success',
      icon: 'success'
    })
    uni.navigateBack()
  }
}
</script>

<style scoped></style>
