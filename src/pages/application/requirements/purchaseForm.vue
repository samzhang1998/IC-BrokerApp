<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Primary Usage" labelBold>
        <wd-picker :columns="usages" v-model="formData.primaryUsage" placeholder="Select Primary Usage" />
      </FormItem>
      <FormItem label="Residential Type">
        <wd-input type="text" v-model="formData.type" placeholder="Enter Residential Type" />
      </FormItem>
      <FormItem label="Primary Purpose" labelBold>
        <wd-picker :columns="purposes" v-model="formData.dataJson.purpose" placeholder="Select Primary Purpose" />
      </FormItem>

      <FormItem label="Status" labelBold>
        <wd-picker :columns="statuses" v-model="formData.dataJson.status" placeholder="Select Status" />
      </FormItem>

      <FormItem label="To be Used as Security" labelBold>
        <wd-switch v-model="formData.usedAsSecurity" />
      </FormItem>

      <FormItem label="Primary Security" labelBold>
        <wd-switch v-model="formData.dataJson.primarySecurity" />
      </FormItem>

      <FormItem label="Approval In Principle" labelBold>
        <wd-switch v-model="formData.dataJson.principle" />
      </FormItem>

      <FormItem label="Construction" labelBold>
        <wd-switch v-model="formData.dataJson.construction" />
      </FormItem>

      <FormItem label="Address" labelBold>
        <wd-input type="text" v-model="formData.dataJson.address" placeholder="Enter Address" />
      </FormItem>

      <FormItem label="Valuation Program" labelBold>
        <wd-picker :columns="valuations" v-model="formData.dataJson.valuation" placeholder="Select Valuation Program" />
      </FormItem>

      <FormItem label="Visit Contact Type" labelBold>
        <wd-picker :columns="contacts" v-model="formData.dataJson.contactType" placeholder="Select Contact Type" />
      </FormItem>

      <FormItem label="Details" labelBold>
        <wd-input type="text" v-model="formData.dataJson.details" placeholder="Enter Details" />
      </FormItem>
      <FormItem label="Transaction" labelBold>
        <wd-input type="text" v-model="formData.dataJson.transaction" placeholder="Enter Transaction" />
      </FormItem>

      <FormItem label="Contract Of Sale" labelBold>
        <wd-switch v-model="formData.contractOfSale" />
      </FormItem>

      <FormItem label="To be Sold" labelBold>
        <wd-switch v-model="formData.dataJson.toBeSold" />
      </FormItem>

      <FormItem label="Estimate Methodology" labelBold>
        <wd-input type="text" v-model="formData.estimateMethod" placeholder="Enter Estimate Methodology" />
      </FormItem>

      <FormItem label="Estimate Basis" labelBold>
        <wd-picker :columns="basises" v-model="formData.estimateBasis" placeholder="Select Estimate Basis" />
      </FormItem>

      <FormItem label="Estimated Value" labelBold>
        <wd-input type="text" v-model="formData.estimatedValue" placeholder="Enter Estimated Value" />
      </FormItem>

      <FormItem label="Legal Representative" labelBold>
        <wd-switch v-model="formData.legalRepresentative" />
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
const { applicationInfo, currentNewPurchase, isViewApplication } = toRefs(applicationStore)

const form = ref()
const formData = ref<Application.IPurchase>({} as Application.IPurchase)
const applicants = ref<AnyObj[]>([])

const usages = ref(['Residential', 'Rural', 'Commercial', 'Industrial'])
const purposes = ref(['Business', 'Investment', 'Owner Occupied'])
const statuses = ref(['Established', 'New Building', 'Off the Plan', 'Vacant Land'])
const valuations = ref(['Full Registered', 'None', 'Progress Inspection'])
const contacts = ref(['Applicant', 'Property Agent', 'Vendor'])
const basises = ref([
  'Applicant Estimate',
  'Bank Assessment',
  'Certified Valuation',
  'Electronic Valuation',
  'Rates Notice',
  'RP Data'
])

onLoad((options) => {
  if (options?.id) {
    formData.value.id = options.id
  }
  if (currentNewPurchase.value) {
    Object.assign(formData.value, currentNewPurchase.value)
    console.log(currentNewPurchase.value)
    if (!formData.value.percentJson) {
      formData.value.percentJson = { owner: [{ id: '', percentage: 0 }] }
    }

    if (!formData.value.dataJson) {
      formData.value.dataJson = {
        purpose: '',
        status: '',
        primarySecurity: false,
        principle: false,
        construction: false,
        address: '',
        valuation: '',
        contactType: '',
        details: '',
        transaction: '',
        toBeSold: false
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
  console.log(formData.value)
  let data = cloneDeep(formData.value)
  console.log(data)
  const [e, r] = await api.putNewPurchase(
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
