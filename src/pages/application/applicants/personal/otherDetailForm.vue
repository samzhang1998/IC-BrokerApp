<template>
  <BasePage title="Other Details" hasBack>
    <wd-form :model="formData" ref="formRef" @submit="handleSubmit" class="flex-col gap-4">
      <FormItem label="Privacy Act Consent Signed">
        <wd-switch v-model="formData.privacyActConsentSigned" />
      </FormItem>
      <FormItem label="Signed Date">
        <wd-datetime-picker type="date" v-model="formData.signedDate" placeholder="Select signed date" />
      </FormItem>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
const formRef = ref()
const formData = reactive<Application.IContactDetails>({} as Application.IContactDetails)

const handleSubmit = async () => {
  const { valid } = await formRef.value.validate()
  if (!valid) return
}
</script>

<style scoped></style>
