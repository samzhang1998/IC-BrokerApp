<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <view class="head-wrap flex-y-center justify-between h-88rpx mb-32rpx">
      <view class="text-28rpx font-bold"> {{ currentExistingProperty?.primaryUsage }} - New Property </view>
      <wd-button type="primary" size="small" class="bg-#FF754C!" @click="handleSubmit">Save</wd-button>
    </view>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Primary Usage">
        <wd-picker :columns="usagesColumns" v-model="formData.primaryUsage" placeholder="Select primary usage" />
      </FormItem>
      <FormItem label="Transaction">
        <wd-picker :columns="transactionsColumns" v-model="dataJson.transaction" placeholder="Select transaction" />
      </FormItem>
      <FormItem label="Residential Type">
        <wd-picker :columns="residentialTypeColumns" v-model="formData.type" placeholder="Select residential type" />
      </FormItem>
      <FormItem label="To Be Sold">
        <wd-switch v-model="dataJson.toBeSold" />
      </FormItem>
      <FormItem label="Primary Purpose">
        <wd-picker :columns="purposesColumns" v-model="dataJson.purpose" placeholder="Select purpose" />
      </FormItem>
      <FormItem label="Estimate Methodology">
        <wd-picker :columns="methodsColumns" v-model="formData.estimateMethod" placeholder="Select estimate method" />
      </FormItem>
      <FormItem label="Status">
        <wd-picker :columns="statusesColumns" v-model="dataJson.status" placeholder="Select status" />
      </FormItem>
      <FormItem label="Estimate Basis">
        <wd-picker
          :columns="estimateBasisColumns"
          v-model="formData.estimateBasis"
          placeholder="Select estimate basis"
        />
      </FormItem>
      <FormItem label="To be Used as Security">
        <wd-switch v-model="formData.usedAsSecurity" />
      </FormItem>
      <FormItem label="Estimate Value">
        <wd-input type="number" v-model="formData.estimatedValue" placeholder="Enter estimate value" />
      </FormItem>
      <FormItem label="Address">
        <wd-input v-model="formData.dataJson.address" placeholder="Enter address" />
      </FormItem>
      <FormItem label="Ownership Proportions">
        <wd-picker
          :columns="ownershipsColumns"
          v-model="formData.ownershipProportions"
          placeholder="Select ownership proportions"
        />
      </FormItem>
      <view class="flex-col gap-4">
        <view class="flex-y-center justify-between gap-4">
          <text class="font-bold">Insurance</text>
          <AddButton @click="handleCreateInsurance" />
        </view>
        <view v-for="(item, index) in dataJson.insurance" :key="index" class="flex-y-center justify-between gap-4">
          <wd-input v-model="item.name" placeholder="Enter insurance" class="flex-1" />
          <wd-icon name="delete" size="22px" @click="handleDeleteInsurance(index)"></wd-icon>
        </view>
      </view>
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
const { currentExistingProperty, applicationInfo } = toRefs(applicationStore)

const formData = reactive<Application.IExistingProperty>({} as Application.IExistingProperty)

const usagesColumns = ref(['Residential', 'Rural', 'Commercial', 'Industrial'])
const residentialTypeColumns = ref([
  'Apartment Unit Flat',
  'Fully Detached House',
  'Semi Detached House',
  'Serviced Apartment',
  'Townhouse',
  'Unit Student Accommodation',
  'Vacant Land'
])
const purposesColumns = ref(['Business', 'Investment', 'Owner Occupied'])
const statusesColumns = ref(['Established', 'New Building', 'Off the Plan', 'Vacant Land'])
const transactionsColumns = ref(['Owns', 'Sold'])
const methodsColumns = ref(['Completed Construction Value', 'Current Market Value'])
const estimateBasisColumns = ref([
  'Applicant Estimate',
  'Bank Assessment',
  'Certified Valuation',
  'Electronic Valuation',
  'Rates Notice',
  'RP Data'
])
const ownershipsColumns = ref(['Equal', 'Specified'])

const form = ref()
const dataJson = ref<Application.IExistingProperty['dataJson']>({
  address: '',
  insurance: [{ name: '' }],
  purpose: '',
  status: '',
  toBeSold: false,
  transaction: ''
})

const percentJson = ref<Application.IExistingProperty['percentJson']>({
  owner: [{ id: '', percentage: 0 }]
})

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await api.updateExistingProperty(
    applicationInfo.value?.applicationId || '',
    currentExistingProperty.value?.id || '',
    {
      ...formData,
      dataJson: dataJson.value,
      percentJson: percentJson.value
    }
  )
  if (!e && r) {
    currentExistingProperty.value = r as unknown as Application.IExistingProperty
    uni.showToast({
      title: 'Update Success',
      icon: 'success'
    })
  }
}

const handleCreateInsurance = () => {
  dataJson.value.insurance.push({ name: '' })
}

const handleDeleteInsurance = (index: number) => {
  dataJson.value.insurance.splice(index, 1)
}

const handleCreateOwner = () => {
  percentJson.value.owner.push({ id: '', percentage: 0 })
}

const handleDeleteOwner = (index: number) => {
  percentJson.value.owner.splice(index, 1)
}

watch(
  currentExistingProperty,
  (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal)
      if (newVal.dataJson) {
        dataJson.value = newVal.dataJson as unknown as Application.IExistingProperty['dataJson']
      }
      if (newVal.percentJson) {
        percentJson.value = newVal.percentJson as unknown as Application.IExistingProperty['percentJson']
      }
    }
  },
  {
    immediate: true,
    deep: true
  }
)
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
