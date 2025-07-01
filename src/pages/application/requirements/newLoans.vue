<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Contribution Funds Type" labelBold>
        <wd-input type="text" v-model="formData.type" placeholder="Enter applicant type" />
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
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
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

const form = ref()
const formData = ref<Application.IContributionFunds>({} as Application.IContributionFunds)
</script>

<style scoped></style>
