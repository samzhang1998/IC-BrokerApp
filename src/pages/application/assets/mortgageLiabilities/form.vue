<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <view class="head-wrap flex-y-center justify-between h-88rpx mb-32rpx">
      <view class="text-28rpx font-bold">
        {{ currentMortgageLiability?.liabilityType }} - {{ currentMortgageLiability?.financialInstitution }}
      </view>
      <wd-button type="primary" size="small" class="bg-#FF754C!" @click="handleSubmit">Save</wd-button>
    </view>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Liability Type">
        <wd-picker
          :columns="liabilityTypeColumns"
          v-model="formData.liabilityType"
          placeholder="Select liability type"
        />
      </FormItem>
      <FormItem label="Financial Institution">
        <wd-input v-model="formData.financialInstitution" placeholder="Enter financial institution" />
      </FormItem>
      <FormItem label="Account Number">
        <wd-input v-model="formData.accountNumber" placeholder="Enter account number" />
      </FormItem>
      <FormItem label="Outstanding Balance">
        <wd-input type="number" v-model="formData.outstandingBalance" placeholder="Enter outstanding balance" />
      </FormItem>
      <FormItem label="Original Amount">
        <wd-input type="number" v-model="formData.originalAmount" placeholder="Enter original amount" />
      </FormItem>
      <FormItem label="Original Loan Purpose">
        <wd-picker :columns="purposesColumns" v-model="dataJson.purpose" placeholder="Select original loan purpose" />
      </FormItem>

      <view class="flex-col gap-4">
        <view class="flex-y-center justify-between gap-4">
          <text class="font-bold">Security</text>
          <AddButton @click="handleCreateSecurity" />
        </view>
        <view v-for="(item, index) in dataJson.security" :key="index" class="flex-col gap-4">
          <FormItem :label="`Security Property ${index + 1}`">
            <view class="flex-y-center justify-between gap-4">
              <wd-picker :columns="properties" v-model="item.property" placeholder="Enter property" class="flex-1" />
              <wd-icon name="delete" size="22px" @click="handleDeleteSecurity(index)"></wd-icon>
            </view>
          </FormItem>
          <FormItem label="Security priority">
            <wd-picker :columns="prioritiesColumns" v-model="item.priority" placeholder="Enter priority" />
          </FormItem>
          <FormItem label="Negatively Geared">
            <wd-switch v-model="item.negative" />
          </FormItem>
        </view>
      </view>

      <FormItem label="Clearing From This Loan">
        <wd-picker :columns="clearingsColumns" v-model="dataJson.clearing" placeholder="Select clearing" />
      </FormItem>

      <FormItem label="Repayment">
        <view class="flex-y-center justify-between gap-4">
          <wd-input v-model="dataJson.repayment" placeholder="Enter repayment" class="flex-1" />
          <wd-picker
            :columns="frequenciesColumns"
            v-model="dataJson.repaymentFrequency"
            placeholder="Select"
            class="flex-1"
          />
        </view>
      </FormItem>

      <FormItem label="Repayment Type">
        <wd-picker :columns="repaymentsColumns" v-model="dataJson.repaymentType" placeholder="Select repayment type" />
      </FormItem>
      <FormItem label="Tax Deductible">
        <wd-switch v-model="dataJson.tax" />
      </FormItem>

      <FormItem label="Has Arrears">
        <wd-switch v-model="dataJson.arrears" />
      </FormItem>

      <view class="flex-col gap-4">
        <view class="flex-y-center justify-between gap-4">
          <text class="font-bold">Owner</text>
          <AddButton @click="handleCreateOwner" />
        </view>
        <view v-for="(item, index) in percentJson.owner" :key="index" class="flex-y-center justify-between gap-4">
          <wd-input v-model="item.id" placeholder="Enter owner" class="flex-1" />
          <wd-input-number v-model="item.percentage" placeholder="Enter percentage" />
          <wd-icon name="delete" size="22px" @click="handleDeleteOwner(index)"></wd-icon>
        </view>
      </view>
    </wd-form>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { currentMortgageLiability, applicationInfo } = toRefs(applicationStore)

const formData = reactive<Application.IMortgageLiability>({} as Application.IMortgageLiability)

const liabilityTypeColumns = ref(['Term Loan', 'Line of Credit'])
const purposesColumns = ref([
  'Business',
  'Investment Non Residential',
  'Investment Residential',
  'Owner Occupied',
  'Personal'
])
const prioritiesColumns = ref([
  'First Mortgage',
  'Registered Security',
  'Second after DSH',
  'Second Mortgage',
  'Third Mortgage',
  'Unregistered Mortgage'
])
const clearingsColumns = ref(['Yes', 'No', 'partial'])
const frequenciesColumns = ref(['Fortnightly', 'Monthly', 'Quarterly', 'Weekly', 'Yearly'])
const repaymentsColumns = ref(['Interest Capitalised', 'Interest Only', 'Prepaid Interest', 'Principal and Interest'])

const form = ref()
const dataJson = ref<Application.IMortgageLiability['dataJson']>({
  purpose: '',
  security: [
    {
      property: '',
      priority: '',
      negative: false
    }
  ],
  clearing: '',
  repayment: '',
  repaymentFrequency: '',
  repaymentType: '',
  tax: '',
  arrears: ''
})

const percentJson = ref<Application.IMortgageLiability['percentJson']>({
  owner: [{ id: '', percentage: 0 }]
})

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await api.updateMortgageLiabilities(
    applicationInfo.value?.applicationId || '',
    currentMortgageLiability.value?.id || '',
    {
      ...formData,
      dataJson: dataJson.value,
      percentJson: percentJson.value
    }
  )
  if (!e && r) {
    currentMortgageLiability.value = r as unknown as Application.IMortgageLiability
    uni.showToast({
      title: 'Update Success',
      icon: 'success'
    })
  }
}

const handleCreateSecurity = () => {
  dataJson.value.security.push({ property: '', priority: '', negative: false })
}

const handleDeleteSecurity = (index: number) => {
  dataJson.value.security.splice(index, 1)
}

const handleCreateOwner = () => {
  percentJson.value.owner.push({ id: '', percentage: 0 })
}

const handleDeleteOwner = (index: number) => {
  percentJson.value.owner.splice(index, 1)
}

watch(
  currentMortgageLiability,
  (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal)
      if (newVal.dataJson) {
        dataJson.value = newVal.dataJson as unknown as Application.IMortgageLiability['dataJson']
      }
      if (newVal.percentJson) {
        percentJson.value = newVal.percentJson as unknown as Application.IMortgageLiability['percentJson']
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)
const properties = ref<{ value: number; label: string }[]>([])
const fetchProperties = async () => {
  const [e, r] = await api.getProperties(applicationInfo.value?.applicationId || '')
  if (!e && r) {
    properties.value = (r as unknown as Application.IExistingProperty[]).map((item) => ({
      value: item.id,
      label: item.primaryUsage + '-' + (item.dataJson?.address || 'No address provided')
    }))
  }
}

onShow(() => {
  fetchProperties()
})
</script>

<style scoped lang="scss">
.head-wrap {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -32rpx;
    width: calc(100% + 64rpx);
    height: 1rpx;
    background-color: #e5e5e5;
  }
}
</style>
