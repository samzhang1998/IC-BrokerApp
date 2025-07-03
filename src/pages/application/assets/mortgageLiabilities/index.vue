<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Mortgage Liabilities"
      description="Add all mortgage secured loans that the applicants are liable for as borrowers or guarantors."
      :actions="liabilityColumns"
      @action="handleAction"
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in mortgageLiabilities"
        :key="item.id"
        @click="handleEditMortgageLiability(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx"> {{ item.liabilityType }} - {{ item.financialInstitution || 'New Property' }} </view>
          <view class="text-20rpx text-gray-500">{{
            item.financialInstitution || 'Please fill the mortgage details'
          }}</view>
        </view>
        <view class="flex-col gap-2 items-end">
          <text class="text-20rpx text-gray-500">{{ item.outstandingBalance || '-' }}</text>
          <text class="text-20rpx text-gray-500">{{ item.dataJson?.repaymentType || '-' }}</text>
        </view>
        <wd-icon name="delete-thin" size="22px" @click.stop.prevent="handleDeleteMortgageLiability(item)"></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
const mortgageLiabilities = ref<Application.IMortgageLiability[]>([])

const liabilityColumns = ref([
  {
    name: 'Term Loan',
    subname: 'Secured credit facilities with fixed term'
  },
  {
    name: 'Line of Credit',
    subname: 'Secured credit facilities with credit limit'
  }
])

const fetchMortgageLiabilities = async () => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await api.getMortgageLiabilities(applicationInfo.value?.applicationId)
  if (!e && r) {
    mortgageLiabilities.value = r as unknown as Application.IMortgageLiability[]
  }
}

const handleAction = async (item: any) => {
  if (!applicationInfo.value?.applicationId) return
  const [e, r] = await api.createMortgageLiabilities(applicationInfo.value?.applicationId, {
    liabilityType: item.name
  })
  if (!e && r) {
    fetchMortgageLiabilities()
  }
}

const handleEditMortgageLiability = (item: any) => {
  console.log(item)
  applicationStore.currentMortgageLiability = item
  uni.navigateTo({
    url: `/pages/application/assets/mortgageLiabilities/form?id=${item.id}`
  })
}

const handleDeleteMortgageLiability = (item: any) => {
  console.log(item)
  uni.showModal({
    title: 'Warning',
    content: 'Do you want to delete this mortgage?',
    success: async (res) => {
      if (res.confirm) {
        if (!applicationInfo.value?.applicationId) {
          return
        }
        const [e, r] = await applicationApi.deleteMortgageLiabilities(applicationInfo.value?.applicationId, item.id)
        if (!e && r) {
          fetchMortgageLiabilities()
        }
      } else {
        console.log('点击了取消按钮')
      }
    }
  })
}

onShow(() => {
  fetchMortgageLiabilities()
})
</script>

<style scoped></style>
