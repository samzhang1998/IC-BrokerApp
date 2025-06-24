<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Existing Properties"
      description="Add properties that are owned by the applicants and are relevant to this application."
      :actions="propertyColumns"
    />
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)

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
</script>

<style scoped></style>
