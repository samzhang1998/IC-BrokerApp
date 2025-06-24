<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Mortgage Liabilities"
      description="Add all mortgage secured loans that the applicants are liable for as borrowers or guarantors."
      :actions="liabilityColumns"
    />
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)

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
</script>

<style scoped></style>
