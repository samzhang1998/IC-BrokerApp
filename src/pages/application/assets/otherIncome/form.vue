<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Other Income Type" labelBold>
        <wd-picker :columns="types" v-model="formData.type" placeholder="Select Other Income Type" />
      </FormItem>
      <FormItem label="Amount" labelBold>
        <view class="flex items-center gap-2">
          <text class="text-28rpx font-bold">$</text>
          <wd-input class="flex-1" type="number" v-model="formData.amount" placeholder="Enter Amount" />
        </view>
      </FormItem>
      <FormItem label="Frequency" labelBold>
        <wd-picker :columns="frequencies" v-model="formData.frequency" placeholder="Select Frequency" />
      </FormItem>
      <FormItem label="Is Taxable" labelBold>
        <wd-switch v-model="formData.isTaxable" />
      </FormItem>
      <FormItem label="Start Date" labelBold>
        <wd-datetime-picker type="date" v-model="formData.startDate" placeholder="Select Start Date" />
      </FormItem>
      <FormItem label="End Date" labelBold>
        <wd-datetime-picker type="date" v-model="formData.endDate" placeholder="Select End Date" />
      </FormItem>
      <FormItem label="Previous Year Amount" labelBold>
        <view class="flex items-center gap-2">
          <text class="text-28rpx font-bold">$</text>
          <wd-input
            class="flex-1"
            type="number"
            v-model="formData.previousYearAmount"
            placeholder="Enter Previous Year Amount"
          />
        </view>
      </FormItem>

      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Owner</text>
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateOwner"
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
              <wd-icon name="delete" size="22px" @click="handleDeleteOwner(index)"></wd-icon>
            </view>
          </FormItem>
        </view>
      </view>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { cloneDeep } from 'lodash'
import dayjs from 'dayjs'

const applicationStore = useApplicationStore()
const { applicationInfo, currentOtherIncome } = toRefs(applicationStore)

const form = ref()
const formData = ref<Application.IOtherIncome>({} as Application.IOtherIncome)
const applicants = ref<AnyObj[]>([])

const types = ref([
  'Annuities',
  'Child Maintenance',
  'Dividends',
  'Foreign Sourced',
  'Government Benefits',
  'Interest Income',
  'Private Pension',
  'Superannuation',
  'Workers Compensation',
  'Other Income'
])
const frequencies = ref(['Fortnightly', 'Monthly', 'Weekly', 'Yearly'])

onLoad((options) => {
  if (options?.id) {
    formData.value.id = options.id
  }
  if (currentOtherIncome.value) {
    Object.assign(formData.value, currentOtherIncome.value)
    console.log(currentOtherIncome.value)
    if (formData.value.startDate) {
      formData.value.startDate = dayjs(formData.value.startDate).valueOf()
    }
    if (formData.value.endDate) {
      formData.value.endDate = dayjs(formData.value.endDate).valueOf()
    }
    if (!formData.value.percentJson) {
      formData.value.percentJson = { owner: [{ id: '', percentage: 0 }] }
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
  data.startDate = dayjs(data.startDate).format('YYYY-MM-DD')
  data.endDate = dayjs(data.endDate).format('YYYY-MM-DD')
  console.log(data)

  const [e, r] = await api.putOtherIncome(
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
