<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Assets"
      description="Add assets that are owned by the applicants and are relevant to this application."
      :actions="assetColumns"
      @action="handleAction"
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in otherAssets"
        :key="item.id"
        @click="handleEditOtherAsset(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx"> {{ item.assetType }} </view>
          <view class="text-20rpx text-gray-500">{{ item.detailsType || 'Please fill the asset details' }}</view>
        </view>
        <view class="flex-col gap-2 items-end">
          <text class="text-20rpx text-gray-500">{{ item.estimatedValue || '-' }}</text>
          <text class="text-20rpx text-gray-500">Secondary Applicant</text>
        </view>
        <wd-icon
          name="delete-thin"
          size="22px"
          @click.stop.prevent="handleDeleteOtherAsset(item)"
          v-if="!isViewApplication"
        ></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { applicationInfo, isViewApplication } = toRefs(applicationStore)
const otherAssets = ref<Application.IOtherAsset[]>([])

const assetColumns = ref([
  {
    name: 'Financial Asset',
    subname: 'Cash, cash equivalents, and accounts at financial institutions'
  },
  {
    name: 'Motor Vehicle and Transport',
    subname: 'Cash, cash equivalents, and accounts at financial institutions'
  },
  {
    name: 'Business',
    subname: 'Cash, cash equivalents, and accounts at financial institutions'
  },
  {
    name: 'Other',
    subname: 'Cash, cash equivalents, and accounts at financial institutions'
  }
])

const fetchOtherAssets = async () => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await applicationApi.getOtherAssets(applicationInfo.value?.applicationId)
  if (!e && r) {
    otherAssets.value = r as unknown as Application.IOtherAsset[]
  }
}

const handleEditOtherAsset = (item: Application.IOtherAsset) => {
  applicationStore.currentOtherAsset = item
  uni.navigateTo({
    url: `/pages/application/assets/otherAssets/form?applicationId=${applicationInfo.value?.applicationId}`
  })
}

const handleDeleteOtherAsset = async (item: Application.IOtherAsset) => {
  if (!applicationInfo.value?.applicationId || !item.id) return
  const [e, r] = await applicationApi.deleteOtherAsset(applicationInfo.value?.applicationId, item.id)
  if (!e && r) {
    fetchOtherAssets()
  }
}

const handleAction = async (item: any) => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await applicationApi.createOtherAsset(applicationInfo.value?.applicationId, {
    assetType: item.name
  })
  if (!e && r) {
    fetchOtherAssets()
  }
}

onShow(() => {
  fetchOtherAssets()
})
</script>

<style scoped></style>
