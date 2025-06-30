<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Personal Identity"
      description="Add identification documents which will sufficiently identify the applicant by the customer identification procedure."
      @action="handleAction"
      :actions="proofOfIdentityItems"
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC"
        v-for="item in identityList"
        :key="item.id"
        @click="handleEditIdentity(item)"
      >
        <view class="flex-1">
          <view class="identity-item-title">{{ item.documentType }}</view>
          <view class="text-24rpx text-gray-500">{{ item.documentCategory }}</view>
        </view>
        <wd-icon name="delete-thin" size="22px" @click="handleDeleteIdentity(item)"></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'
import { proofOfIdentityItems } from '@/pages/application/constants'

const applicationStore = useApplicationStore()
const { applicationInfo, currentBorrower } = toRefs(applicationStore)

const handlePostIdentity = async (item: any) => {
  if (!applicationInfo.value?.applicationId || !currentBorrower.value?.id) {
    return
  }
  const [e, r] = await applicationApi.postIdentity(applicationInfo.value?.applicationId, currentBorrower.value?.id, {
    documentType: item.name,
    documentCategory: item.subname
  })
  if (!e && r) {
    console.log(r)
    await applicationStore.fetchBorrowerDetails()
    applicationStore.getCurrentBorrowerById(currentBorrower.value?.id)
  }
}

const handleDeleteIdentity = (item: any) => {
  console.log(item)
  uni.showModal({
    title: 'Warning',
    content: 'Do you want to delete this identity?',
    success: async (res) => {
      if (res.confirm) {
        if (!applicationInfo.value?.applicationId || !currentBorrower.value?.id) {
          return
        }
        const [e, r] = await applicationApi.deleteIdentity(
          applicationInfo.value?.applicationId,
          currentBorrower.value?.id,
          item.id
        )
        if (!e && r) {
          await applicationStore.fetchBorrowerDetails()
          applicationStore.getCurrentBorrowerById(currentBorrower.value?.id)
        }
      } else {
        console.log('点击了取消按钮')
      }
    }
  })
}

const handleEditIdentity = (item: any) => {
  console.log(item)
  applicationStore.currentIdentityItem = item as unknown as Application.IBorrowerDetail['identities'][0]
  uni.navigateTo({
    url: `/pages/application/applicants/personal/identityForm?identityId=${item.id}`
  })
}

const handleAction = (item: any) => {
  handlePostIdentity(item)
}

const identityList = computed(() => {
  return currentBorrower.value?.identities || []
})

onLoad((options) => {
  applicationStore.getCurrentBorrowerById(options?.borrowerId)
})
</script>

<style scoped></style>
