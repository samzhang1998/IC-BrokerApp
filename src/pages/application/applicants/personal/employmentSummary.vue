<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Employment"
      description="Add employment for this applicant to detail their current and previous activities whether employed, unemployed or retired."
      @action="handleAction"
      :actions="employmentColumns"
      isPicker
    />
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { applicationApi } from '@/api/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentBorrower } = toRefs(applicationStore)

const employmentColumns = ref([
  ['Previous', 'Primary', 'Secondary'],
  [
    { value: 'EMPLOYED', label: 'PAYG', sub: 'Employees who do not own the business' },
    { value: 'SELF_EMPLOYED', label: 'Self employed', sub: 'Self Employed individual' },
    { value: 'UNEMPLOYED', label: 'Not employed', sub: 'No employment recorded' }
  ]
])

const handlePostEmployment = async (item: any) => {
  if (!applicationInfo.value?.applicationId || !currentBorrower.value?.id) {
    return
  }
  const typeStatus = item[0]
  const statusCode = item[1]
  const [e, r] = await applicationApi.postEmployment(applicationInfo.value?.applicationId, currentBorrower.value?.id, {
    typeStatus,
    statusCode
  })
  if (!e && r) {
    console.log(r)
    applicationStore.fetchBorrowerDetails()
  }
}

const handleAction = (item: any) => {
  handlePostEmployment(item)
}

onLoad((options) => {
  applicationStore.getCurrentBorrowerById(options?.borrowerId)
})
</script>

<style scoped></style>
