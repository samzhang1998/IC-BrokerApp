<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Household Name">
        <wd-input type="text" v-model="formData.name" placeholder="Enter household name" />
      </FormItem>
      <FormItem label="Number of Adults">
        <wd-input type="number" v-model="formData.adultsCount" placeholder="Enter number of adults" />
      </FormItem>
      <FormItem label="Number of Dependants">
        <wd-input type="number" v-model="formData.dependantsCount" placeholder="Enter number of dependants" />
      </FormItem>
      <view class="text-28rpx font-bold">Living Expenses and Other Commitments</view>
      <FormItem v-for="item in livingExpensesForm" :key="item" :label="item">
        <view class="flex-y-center gap-20rpx">
          <wd-input type="number" v-model="formData.expensesJson" placeholder="$" class="w-2/5" />
          <wd-picker
            :columns="livingExpensesColumns"
            v-model="formData.expensesJson"
            placeholder="Select living expenses"
            class="flex-1"
          />
        </view>
      </FormItem>
    </wd-form>
    <wd-button type="primary" block class="bg-#FF754C! mt-3" size="large" @click="handleSubmit">Save</wd-button>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()

const applicationInfo = computed(() => applicationStore.applicationInfo)

const formData = ref<Application.IHousehold>({} as Application.IHousehold)

const livingExpensesColumns = ref(['Fortnightly', 'Half Yearly', 'Monthly', 'Quarterly', 'Weekly', 'Yearly'])

const livingExpensesForm = ref([
  'Clothing and Personal Care',
  'Groceries',
  'Recreation And Entertainment',
  'Transport',
  'Medical And Health',
  'General Basic Insurances',
  'Childcare',
  'Public Or Government Education',
  'Primary Residence Costs',
  'Investment Property Costs',
  'Other Living Expenses',
  'Rent',
  'Child And Spousal Maintenance',
  'Board',
  'Other Commitments'
])

const handleSubmit = () => {
  console.log(formData.value)
}
</script>

<style scoped></style>
