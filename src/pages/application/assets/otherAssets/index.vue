<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Assets"
      description="Add assets that are owned by the applicants and are relevant to this application."
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
</script>

<style scoped></style>
