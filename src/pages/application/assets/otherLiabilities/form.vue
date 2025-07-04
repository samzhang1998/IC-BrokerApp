<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Liability Type" labelBold>
        <wd-picker :columns="types" v-model="formData.detailType" placeholder="Select Other Liabilities Type" />
      </FormItem>
      <FormItem label="Credit Card Type" labelBold>
        <wd-picker :columns="credits" v-model="formData.dataJson.credit" placeholder="Select Credit Card Type" />
      </FormItem>
      <FormItem label="Financial Institution" labelBold>
        <wd-input v-model="formData.financialInstitution" placeholder="Enter Financial Institution" />
      </FormItem>
      <FormItem label="Outstanding Balance" labelBold>
        <view class="flex items-center gap-2">
          <text class="text-28rpx font-bold">$</text>
          <wd-input
            class="flex-1"
            type="number"
            v-model="formData.outstandingBalance"
            placeholder="Enter Outstanding Balance"
          />
        </view>
      </FormItem>
      <FormItem label="Credit Limit" labelBold>
        <view class="flex items-center gap-2">
          <text class="text-28rpx font-bold">$</text>
          <wd-input
            class="flex-1"
            type="number"
            v-model="formData.originalAmount"
            placeholder="Enter Original Amount"
          />
        </view>
      </FormItem>
      <FormItem label="Annual Interest Rate" labelBold>
        <wd-input type="digit" v-model="formData.dataJson.interest" placeholder="Enter Interest Rate" />
      </FormItem>

      <FormItem label="Clearing From This Loan" labelBold>
        <wd-picker :columns="clearings" v-model="formData.dataJson.clearing" placeholder="Select Clearing" />
      </FormItem>
      <FormItem label="Repayment" labelBold>
        <view class="flex-y-center justify-between gap-1">
          <view class="flex items-center gap-1 w-[50%]">
            <text class="text-28rpx font-bold">$</text>
            <wd-input
              class="flex-1"
              type="number"
              v-model="formData.dataJson.repayment"
              placeholder="Enter Repayment Amount"
            />
          </view>
          <wd-picker
            class="w-[50%]"
            :columns="frequencies"
            v-model="formData.dataJson.repaymentFrequency"
            placeholder="Select Repayment"
          />
        </view>
      </FormItem>
      <FormItem label="Repayment Type" labelBold>
        <wd-picker
          :columns="repayments"
          v-model="formData.dataJson.repaymentFrequency"
          placeholder="Select Repayment Frequency"
        />
      </FormItem>
      <FormItem label="Tax Deductible" labelBold>
        <wd-switch v-model="formData.dataJson.tax" />
      </FormItem>
      <FormItem label="Has Arrears" labelBold>
        <wd-switch v-model="formData.dataJson.arrears" />
      </FormItem>

      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Owner</text>
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateOwner"
            v-if="!isViewApplication"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
        </view>
        <view v-for="(item, index) in formData.percentJson?.owner" :key="index" class="flex-col gap-4">
          <FormItem label="Owner">
            <view class="flex-y-center justify-between gap-4">
              <wd-picker
                :columns="applicants"
                v-model="item.id"
                :value-key="'applicant_ID'"
                :label-key="'applicant_name'"
                placeholder="Select applicant"
              />
              <wd-input type="number" v-model="item.percentage" placeholder="Enter percentage" class="flex-1" />
              <wd-icon name="delete" size="22px" @click="handleDeleteOwner(index)" v-if="!isViewApplication"></wd-icon>
            </view>
          </FormItem>
        </view>
      </view>
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
const { applicationInfo, currentOtherLiabilities, isViewApplication } = toRefs(applicationStore)

const form = ref()
const formData = ref<Application.IOtherLiabilities>({} as Application.IOtherLiabilities)
const applicants = ref<AnyObj[]>([])

const types = ref([
  'Credit Card',
  'Line of Credit',
  'Overdraft',
  'Store Card',
  'Car Loan',
  'Hire Purchase',
  'Lease',
  'Margin Loan',
  'Personal Loan',
  'Term Loan',
  'Other Loan',
  'Commercial Bill',
  'Contingent Liability',
  'HECS-HELP',
  'Loan as Guarantor',
  'Outstanding Taxation',
  'Other'
])
const credits = ref(['American Express', 'Bank Card', 'Diners Club', 'MasterCard', 'Visa', 'Other Credit Card'])
const clearings = ref(['Yes', 'No', 'partial'])
const frequencies = ref(['Fortnightly', 'Monthly', 'Quarterly', 'Weekly', 'Yearly'])
const repayments = ref(['Interest Capitalised', 'Interest Only', 'Prepaid Interest', 'Principal and Interest'])

onLoad((options) => {
  if (options?.id) {
    formData.value.id = options.id
  }
  if (currentOtherLiabilities.value) {
    Object.assign(formData.value, currentOtherLiabilities.value)
    console.log(currentOtherLiabilities.value)
    if (!formData.value.percentJson) {
      formData.value.percentJson = { owner: [{ id: '', percentage: 0 }] }
    }
    if (!formData.value.dataJson) {
      formData.value.dataJson = {
        credit: '',
        interest: 0,
        clearing: '',
        repayment: '',
        repaymentFrequency: '',
        repaymentType: '',
        tax: '',
        arrears: ''
      }
    }
    getApplicants()
  }
})

const getApplicants = async () => {
  const [e, r] = await api.getAllApplicants(applicationInfo.value?.applicationId as unknown as string)
  if (!e && r) {
    applicants.value = r as unknown as AnyObj[]
  }
}

const handleCreateOwner = () => {
  formData.value.percentJson.owner.push({ id: '', percentage: 0 })
}

const handleDeleteOwner = (index: number) => {
  formData.value.percentJson.owner.splice(index, 1)
}

const handleSubmit = async () => {
  let data = cloneDeep(formData.value)
  console.log(data)

  const [e, r] = await api.putOtherLiabilities(
    applicationInfo.value?.applicationId as unknown as string,
    formData.value.id,
    data
  )
  if (!e && r) {
    uni.showToast({ title: 'Success', icon: 'success' })
    uni.navigateBack()
  }
}
</script>

<style scoped></style>
