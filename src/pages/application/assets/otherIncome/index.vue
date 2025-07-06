<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Income"
      description="Add all other income owed by the applicants which will affect the applicants borrowing capacity."
      :actions="assetColumns"
      @action="handleAction"
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in otherIncomeList"
        :key="item.id"
        @click="handleToEdit(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx">
            {{ item.type }}
          </view>
        </view>
        <wd-icon
          name="delete-thin"
          size="22px"
          @click.stop.prevent="handleDeleteOtherIncome(item)"
          v-if="!isViewApplication"
        ></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentOtherIncome, isViewApplication } = toRefs(applicationStore)
const applicationId = ref<string | number>()
const otherIncomeList = ref<Application.IOtherIncome[]>([])
const assetColumns = ref([
  {
    name: 'Annuities'
  },
  {
    name: 'Child Maintenance'
  },
  {
    name: 'Dividends'
  },
  {
    name: 'Foreign Sourced'
  },
  {
    name: 'Government Benefits'
  },
  {
    name: 'Interest Income'
  },
  {
    name: 'Private Pension'
  },
  {
    name: 'Superannuation'
  },
  {
    name: 'Workers Compensation'
  },
  {
    name: 'Other Income'
  }
])

onLoad((options) => {
  console.log(options)
  if (options?.id) {
    applicationId.value = options?.id
  }
})

onShow(() => {
  getOtherIncome()
})

async function getOtherIncome() {
  if (!applicationId.value) return
  const [e, r] = await api.getOtherIncome(applicationId.value)
  if (!e && r) {
    otherIncomeList.value = r as unknown as Application.IOtherIncome[]
  }
}

const handleToEdit = (item: Application.IOtherIncome) => {
  currentOtherIncome.value = item
  uni.navigateTo({
    url: `/pages/application/assets/otherIncome/form?id=${item.id}`
  })
}

const handleAction = async (item: any) => {
  const data = {
    type: item.name
  }
  const [e, r] = await api.postOtherIncome(applicationInfo.value?.applicationId || '', data)
  if (!e && r) {
    console.log(r)
    if (r?.id) {
      currentOtherIncome.value = r as unknown as Application.IOtherIncome
      uni.navigateTo({
        url: `/pages/application/assets/otherIncome/form?id=${r.id}`
      })
    } else {
      uni.showToast({
        title: 'Failed to create other income',
        icon: 'none'
      })
    }
  }
}

const handleDeleteOtherIncome = async (item: Application.IOtherIncome) => {
  const [e, r] = await api.deleteOtherIncome(applicationInfo.value?.applicationId || '', item.id)
  if (!e && r) {
    uni.showToast({
      title: 'Delete other income successfully',
      icon: 'success'
    })
    getOtherIncome()
  }
}
</script>

<style scoped></style>
