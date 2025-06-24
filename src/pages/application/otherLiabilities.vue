<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Liabilities"
      description="Add all other non mortgage liabilities owed by the applicants which will affect the applicants borrowing capacity."
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
    name: 'Credit Card',
    subname: 'Credit Account'
  },
  {
    name: 'Line of Credit',
    subname: 'Credit Account'
  },

  {
    name: 'Overdraft',
    subname: 'Credit Account'
  },

  {
    name: 'Store Card',
    subname: 'Credit Account'
  },

  {
    name: 'Car Loan',
    subname: 'Loan Account'
  },

  {
    name: 'Hire Purchase',
    subname: 'Loan Account'
  },

  {
    name: 'Lease',
    subname: 'Loan Account'
  },

  {
    name: 'Margin Loan',
    subname: 'Loan Account'
  },

  {
    name: 'Personal Loan',
    subname: 'Loan Account'
  },

  {
    name: 'Term Loan',
    subname: 'Loan Account'
  },

  {
    name: 'Other Loan',
    subname: 'Loan Account'
  },

  {
    name: 'Commercial Bill',
    subname: 'Loan Account'
  },

  {
    name: 'Contingent Liability',
    subname: 'Loan Account'
  },

  {
    name: 'HECS-HELP',
    subname: 'Loan Account'
  },

  {
    name: 'Loan as Guarantor',
    subname: 'Loan Account'
  },

  {
    name: 'Outstanding Taxation',
    subname: 'Loan Account'
  },

  {
    name: 'Other',
    subname: 'Loan Account'
  }
])
</script>

<style scoped></style>
