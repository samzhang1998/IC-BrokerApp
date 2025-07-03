<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Income"
      description="Add all other income owed by the applicants which will affect the applicants borrowing capacity."
      :actions="assetColumns"
      @action="handleAction"
    />
    <AppCard v-for="item in otherIncomeList" :key="item.id" :title="item.type" @click="handleToEdit(item)" />
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentOtherIncome } = toRefs(applicationStore)
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
</script>

<style scoped></style>
