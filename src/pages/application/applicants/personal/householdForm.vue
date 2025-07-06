<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Household Name">
        <wd-input
          type="text"
          v-model="formData.name"
          placeholder="Enter household name"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Number of Adults">
        <wd-input
          type="number"
          v-model="formData.adultsCount"
          placeholder="Enter number of adults"
          :disabled="isViewApplication"
        />
      </FormItem>
      <FormItem label="Number of Dependants">
        <wd-input
          type="number"
          v-model="formData.dependantsCount"
          placeholder="Enter number of dependants"
          :disabled="isViewApplication"
        />
      </FormItem>
      <view class="text-28rpx font-bold">Living Expenses and Other Commitments</view>
      <FormItem v-for="item in expensesJson" :key="item.name" :label="item.name">
        <view class="flex-y-center gap-20rpx">
          <wd-input type="number" v-model="item.amount" placeholder="$" class="w-2/5" :disabled="isViewApplication" />
          <wd-picker
            :columns="livingExpensesColumns"
            v-model="item.frequency"
            placeholder="Select living expenses"
            class="flex-1"
            :disabled="isViewApplication"
          />
        </view>
      </FormItem>
    </wd-form>
    <wd-button
      type="primary"
      block
      class="bg-#FF754C! mt-3"
      size="large"
      @click="handleSubmit"
      v-if="!isViewApplication"
      >Save</wd-button
    >
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationStore = useApplicationStore()

const { applicationInfo, currentBorrower, isViewApplication } = toRefs(applicationStore)

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

const expensesJson = computed<
  {
    name: string
    amount: number
    frequency: string
  }[]
>(() => {
  return livingExpensesForm.value.map((item) => ({
    name: item,
    amount: 0,
    frequency: ''
  }))
})

const handleSubmit = async () => {
  const [e, r] = await api.createHousehold(
    applicationInfo.value?.applicationId || '',
    currentBorrower.value?.id || '',
    {
      ...formData.value,
      expensesJson: JSON.stringify(expensesJson.value)
    }
  )
  if (!e && r) {
    uni.showToast({
      title: 'Update Success',
      icon: 'success'
    })
  }
}
</script>

<style scoped></style>
