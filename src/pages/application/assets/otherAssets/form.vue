<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <view class="head-wrap flex-y-center justify-between h-88rpx mb-32rpx">
      <view class="text-28rpx font-bold"> {{ currentOtherAsset?.assetType }} - New Asset </view>
      <wd-button type="primary" size="small" class="bg-#FF754C!" @click="handleSubmit">Save</wd-button>
    </view>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Asset Type">
        <wd-picker :columns="assetTypeColumns" v-model="formData.assetType" placeholder="Select asset type" />
      </FormItem>
      <FormItem label="Financial Asset Type" v-if="formData.assetType === 'Financial Asset'">
        <wd-picker
          :columns="financialAssetTypeColumns"
          v-model="formData.detailsType"
          placeholder="Select financial asset type"
        />
      </FormItem>

      <FormItem label="Other Asset Type" v-if="formData.assetType === 'Other'">
        <wd-picker
          :columns="otherAssetTypeColumns"
          v-model="formData.detailsType"
          placeholder="Enter other asset type"
        />
      </FormItem>

      <FormItem label="Business Name" v-if="formData.assetType === 'Business'">
        <wd-input v-model="dataJson.businessName" placeholder="Enter business name" />
      </FormItem>
      <FormItem label="Main Business Activities" v-if="formData.assetType === 'Business'">
        <wd-input v-model="dataJson.mainActivity" placeholder="Enter main business activities" />
      </FormItem>
      <FormItem label="Vehicle Type" v-if="formData.assetType === 'Motor Vehicle and Transport'">
        <wd-input v-model="formData.detailsType" placeholder="Enter vehicle type" />
      </FormItem>
      <FormItem label="Model" v-if="formData.assetType === 'Motor Vehicle and Transport'">
        <wd-input v-model="dataJson.model" placeholder="Enter model" />
      </FormItem>
      <FormItem label="Registration Number" v-if="formData.assetType === 'Motor Vehicle and Transport'">
        <wd-input v-model="dataJson.registration" placeholder="Enter registration" />
      </FormItem>
      <FormItem label="Year" v-if="formData.assetType === 'Motor Vehicle and Transport'">
        <wd-input v-model="dataJson.year" placeholder="Enter year" />
      </FormItem>

      <FormItem label="Estimate Value">
        <wd-input v-model="formData.estimatedValue" placeholder="Enter estimate value" />
      </FormItem>

      <FormItem label="To Be Sold">
        <wd-switch v-model="dataJson.toBeSold" />
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
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { currentOtherAsset, applicationInfo } = toRefs(applicationStore)

const formData = reactive<Application.IOtherAsset>({} as Application.IOtherAsset)

const assetTypeColumns = ref(['Financial Asset', 'Motor Vehicle and Transport', 'Business', 'Other'])
const financialAssetTypeColumns = ref([
  'Cash',
  'Investment',
  'Managed Funds',
  'Pension Account',
  'Receivables',
  'Savings Account',
  'Shares and Debentures',
  'Superannuation',
  'Term Deposit',
  'Transaction Account',
  'Other'
])
const otherAssetTypeColumns = ref([
  'Art Works',
  'Good Will of Business',
  'Home Contents',
  'Intellectual Property',
  'Stock and Inventory',
  'Other'
])

const form = ref()
const dataJson = ref<Application.IOtherAsset['dataJson']>({
  businessName: '',
  mainActivity: '',
  model: '',
  registration: '',
  toBeSold: false,
  year: ''
})

const percentJson = ref<Application.IOtherAsset['percentJson']>({
  owner: [{ id: '', percentage: 0 }]
})

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await applicationApi.updateOtherAsset(
    applicationInfo.value?.applicationId || '',
    currentOtherAsset.value?.id || '',
    {
      ...formData,
      dataJson: dataJson.value,
      percentJson: percentJson.value
    }
  )
  if (!e && r) {
    currentOtherAsset.value = r as unknown as Application.IOtherAsset
    uni.showToast({
      title: 'Update Success',
      icon: 'success'
    })
  }
}

const handleCreateOwner = () => {
  percentJson.value.owner.push({ id: '', percentage: 0 })
}

const handleDeleteOwner = (index: number) => {
  percentJson.value.owner.splice(index, 1)
}

watch(
  currentOtherAsset,
  (newVal) => {
    if (newVal) {
      Object.assign(formData, newVal)
      if (newVal.dataJson) {
        dataJson.value = newVal.dataJson as unknown as Application.IOtherAsset['dataJson']
      }
      if (newVal.percentJson) {
        percentJson.value = newVal.percentJson as unknown as Application.IOtherAsset['percentJson']
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
