<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Primary Usage" labelBold>
        <wd-input type="text" v-model="formData.primaryUsage" placeholder="Enter applicant type" />
      </FormItem>
      <FormItem label="Residential Type">
        <wd-input type="text" v-model="formData.type" placeholder="Enter applicant type" />
      </FormItem>
      <FormItem label="Primary Purpose" labelBold>
        <wd-input type="text" v-model="formData.dataJson.purpose" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Status" labelBold>
        <wd-input type="text" v-model="formData.dataJson.status" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="To be Used as Security" labelBold>
        <wd-switch v-model="formData.usedAsSecurity" />
      </FormItem>

      <FormItem label="Primary Security" labelBold>
        <wd-input type="text" v-model="formData.dataJson.primarySecurity" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Approval In Principle" labelBold>
        <wd-input type="text" v-model="formData.dataJson.principle" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Construction" labelBold>
        <wd-input type="text" v-model="formData.dataJson.construction" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Address" labelBold>
        <wd-input type="text" v-model="formData.dataJson.address" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Valuation Program" labelBold>
        <wd-input type="text" v-model="formData.dataJson.valuation" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Visit Contact Type" labelBold>
        <wd-input type="text" v-model="formData.dataJson.contactType" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Details" labelBold>
        <wd-input type="text" v-model="formData.dataJson.details" placeholder="Enter applicant type" />
      </FormItem>
      <FormItem label="Transaction" labelBold>
        <wd-input type="text" v-model="formData.dataJson.transaction" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Contract Of Sale" labelBold>
        <wd-input type="text" v-model="formData.contractOfSale" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="To be Sold" labelBold>
        <wd-input type="text" v-model="formData.dataJson.toBeSold" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Estimate Methodology" labelBold>
        <wd-input type="text" v-model="formData.estimateMethod" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Estimate Basis" labelBold>
        <wd-input type="text" v-model="formData.estimateBasis" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Estimated Value" labelBold>
        <wd-input type="text" v-model="formData.estimatedValue" placeholder="Enter applicant type" />
      </FormItem>

      <FormItem label="Legal Representative" labelBold>
        <wd-input type="text" v-model="formData.legalRepresentative" placeholder="Enter applicant type" />
      </FormItem>

      <!-- <FormItem label="Owner" labelBold>
        <wd-input type="text" v-model="formData.percentJson.owner" placeholder="Enter applicant type"  />
      </FormItem> -->
    </wd-form>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)

const form = ref()
const formData = ref<Application.IPurchase>({} as Application.IPurchase)
</script>

<style scoped></style>
