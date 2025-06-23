<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack> </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
</script>

<style scoped></style>
