<template>
  <BasePage title="Year to Date Income" hasBack>
    <wd-form :model="formData" ref="formRef" class="flex-col gap-4">
      <view
        class="flex-col gap-4 border-b-solid border-b-#E5E5E5 border-b-1 pb-4"
        v-for="(item, index) in incomeJson.income"
        :key="index"
      >
        <FormItem label="Start Date">
          <wd-datetime-picker type="date" v-model="item.start" placeholder="Select start date" :minDate="MIN_DATE" />
        </FormItem>
        <FormItem label="End Date">
          <wd-datetime-picker type="date" v-model="item.end" placeholder="Select end date" :minDate="MIN_DATE" />
        </FormItem>
        <FormItem label="Salary">
          <wd-input type="text" v-model="item.salary" placeholder="Enter salary" />
        </FormItem>
        <text class="text-28rpx font-bold">Addbacks (AUD)</text>
        <FormItem v-for="incomeItem in incomeFormItems" :key="incomeItem.key" :label="incomeItem.label">
          <wd-input type="number" v-model="item[incomeItem.key]" placeholder="$" />
        </FormItem>
      </view>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'
import { MIN_DATE } from '../../constants'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<Application.ITrustApplicant>({} as Application.ITrustApplicant)

const incomeJson = ref<Application.ITrustApplicant['incomeJson']>({
  income: [
    {
      end: '',
      tax: '',
      cash: '',
      bonus: '',
      email: '',
      lease: '',
      start: '',
      losses: '',
      salary: '',
      director: '',
      goodwill: '',
      interest: '',
      recurring: '',
      allowances: '',
      carExpense: '',
      depreciation: '',
      superannuation: ''
    },
    {
      end: '',
      tax: '',
      cash: '',
      bonus: '',
      email: '',
      lease: '',
      start: '',
      losses: '',
      salary: '',
      director: '',
      goodwill: '',
      interest: '',
      recurring: '',
      allowances: '',
      carExpense: '',
      depreciation: '',
      superannuation: ''
    },
    {
      end: '',
      tax: '',
      cash: '',
      bonus: '',
      email: '',
      lease: '',
      start: '',
      losses: '',
      salary: '',
      director: '',
      goodwill: '',
      interest: '',
      recurring: '',
      allowances: '',
      carExpense: '',
      depreciation: '',
      superannuation: ''
    }
  ]
})

const incomeFormItems = ref([
  {
    label: 'Company Profit Before Tax (AUD)',
    key: 'tax'
  },
  {
    label: 'Salary',
    key: 'salary'
  },
  {
    label: 'Bonus',
    key: 'bonus'
  },
  {
    label: 'Allowances',
    key: 'allowances'
  },
  {
    label: 'Payment to Director',
    key: 'director'
  },
  {
    label: 'Depreciation',
    key: 'depreciation'
  },
  {
    label: 'Interest',
    key: 'interest'
  },
  {
    label: 'Lease',
    key: 'lease'
  },
  {
    label: 'Non Cash Benefits',
    key: 'cash'
  },
  {
    label: 'Non Recurring Expenses',
    key: 'recurring'
  },
  {
    label: 'Car Expense',
    key: 'carExpense'
  },
  {
    label: 'Superannuation Excess',
    key: 'superannuation'
  },
  {
    label: 'Carry Forward Losses',
    key: 'losses'
  },
  {
    label: 'Amortisation of Goodwill',
    key: 'goodwill'
  }
])

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
      incomeJson: incomeJson.value
    }
  )
  if (!e && r) {
    uni.showToast({
      title: 'Save Success',
      icon: 'success'
    })
    const [e, r] = await applicationApi.getTrustApplicants(applicationInfo.value?.applicationId)
    if (!e && r) {
      applicationStore.currentTrustApplicant = r.find((item: Application.ITrustApplicant) => {
        return String(item.id) === String(applicationStore.currentTrustApplicant?.id)
      })
      Object.assign(formData, applicationStore.currentTrustApplicant)
      incomeJson.value = applicationStore.currentTrustApplicant
        ?.incomeJson as unknown as Application.ITrustApplicant['incomeJson']
    }
  }
}

onShow(() => {
  if (!applicationStore.currentTrustApplicant) return
  Object.assign(formData, applicationStore.currentTrustApplicant)
  if (applicationStore.currentTrustApplicant?.incomeJson) {
    incomeJson.value = applicationStore.currentTrustApplicant
      ?.incomeJson as unknown as Application.ITrustApplicant['incomeJson']
  }
})
</script>

<style scoped></style>
