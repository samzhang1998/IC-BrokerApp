<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Existing Properties"
      description="Add properties that are owned by the applicants and are relevant to this application."
      :actions="propertyColumns"
      @action="handleAction"
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in existingProperties"
        :key="item.id"
        @click="handleEditExistingProperty(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx"> {{ item.primaryUsage }} - {{ item.dataJson?.address || 'New Property' }} </view>
          <view class="text-20rpx text-gray-500">{{
            item.dataJson?.status || 'Please fill the property details'
          }}</view>
        </view>
        <view class="flex-col gap-2 items-end">
          <text class="text-20rpx text-gray-500">{{ item.estimatedValue || '-' }}</text>
          <text class="text-20rpx text-gray-500">Secondary Applicant</text>
        </view>
        <wd-icon name="delete-thin" size="22px" @click.stop.prevent="handleDeleteExistingProperty(item)"></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
const existingProperties = ref<Application.IExistingProperty[]>([])

const propertyColumns = ref([
  {
    name: 'Residential',
    subname: 'Residential real estate property'
  },
  {
    name: 'Rural',
    subname: 'Rural real estate property'
  },
  {
    name: 'Commercial',
    subname: 'Commercial real estate property'
  },
  {
    name: 'Industrial',
    subname: 'Industrial real estate property'
  }
])

const fetchExistingProperties = async () => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await api.getExistingProperties(applicationInfo.value?.applicationId)
  if (!e && r) {
    existingProperties.value = r as unknown as Application.IExistingProperty[]
  }
}

const handleAction = async (item: any) => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await api.createExistingProperty(applicationInfo.value?.applicationId, {
    primaryUsage: item.name
  })
  if (!e && r) {
    fetchExistingProperties()
  }
}

const handleEditExistingProperty = (item: any) => {
  console.log(item)
}

const handleDeleteExistingProperty = (item: any) => {
  console.log(item)
  uni.showModal({
    title: 'Warning',
    content: 'Do you want to delete this identity?',
    success: async (res) => {
      if (res.confirm) {
        if (!applicationInfo.value?.applicationId) {
          return
        }
        const [e, r] = await applicationApi.deleteExistingProperty(applicationInfo.value?.applicationId, item.id)
        if (!e && r) {
          fetchExistingProperties()
        }
      } else {
        console.log('点击了取消按钮')
      }
    }
  })
}

onShow(() => {
  fetchExistingProperties()
})
</script>

<style scoped></style>
