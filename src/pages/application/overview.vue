<template>
  <BasePage title="Create Application" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <text class="text-28rpx font-bold">{{ applicationInfo?.referenceNumber }}</text>
      <view class="flex-col mt-3 gap-1">
        <view class="flex items-center gap-1">
          <text class="text-24rpx font-bold">Application Name:</text>
          <text class="text-24rpx">{{ applicationInfo?.applicationName }}</text>
        </view>
        <view class="flex items-center gap-1">
          <text class="text-24rpx font-bold">Documentation Type:</text>
          <text class="text-24rpx">{{ applicationInfo?.documentType }}</text>
        </view>
      </view>
    </view>
    <view>
      <AppCard title="Current Situation" v-model:data="currentSituationItems" @item-click="handleItemClick"> </AppCard>
      <AppCard title="New Requirements" v-model:data="newRequirementsItems" @item-click="handleItemClick"> </AppCard>
      <AppCard title="Summary" v-model:data="applicationSummaryItems" @item-click="handleItemClick"> </AppCard>
    </view>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large">Submit</wd-button>
      <wd-button type="text" class="text-#7A858E! underline">Save as draft</wd-button>
    </view>
    <wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" cancel-text="Cancel" />
  </BasePage>
</template>

<script setup lang="ts">
import { currentSituationItems, newRequirementsItems, applicationSummaryItems } from './constants'
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
console.log('🚀 ~ applicationInfo:', applicationInfo.value)

const show = ref<boolean>(false)
const actions = ref([
  {
    name: 'Borrower'
  },
  {
    name: 'Guarantor'
  }
])

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}

const handleItemClick = (name: string, item: Application.IItem) => {
  console.log(name, item)
  switch (name) {
    case 'personalApplicants':
      showActions()
      break
    default:
      break
  }
}

function select({ item, index }: { item: Application.IItem; index: number }) {
  console.log(`当前选中项: ${item.name}, 下标: ${index}`)
  if (item.name === 'Borrower') {
    uni.navigateTo({
      url: '/pages/application/borrowerSummary'
    })
  }
}
</script>
