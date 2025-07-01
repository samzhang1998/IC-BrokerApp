<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Income"
      description="Add all other income owed by the applicants which will affect the applicants borrowing capacity."
      :actions="assetColumns"
    />
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)

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
</script>

<style scoped></style>
