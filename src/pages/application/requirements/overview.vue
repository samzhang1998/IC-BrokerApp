<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      :title="typeMap[requirementsType].title"
      :description="typeMap[requirementsType].description"
      :actions="optionColumns"
      @action="handleAction"
    />
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { productApi } from '@/api/product'

const applicationStore = useApplicationStore()
const { applicationInfo } = toRefs(applicationStore)
const requirementsType = ref('newPurchase')
const products = ref<any[]>([])

const typeMap: Record<string, { title: string; description: string }> = {
  newPurchase: {
    title: 'New Properties',
    description: 'Add properties that are to be used as security and purchased following the settlement of this loan.'
  },
  newLoans: {
    title: 'Loan Accounts',
    description: 'Add loan accounts representing new money applied for with this application to this lender.'
  },
  contributionFunds: {
    title: 'Contribution Funds',
    description:
      'Add amounts and sources of funds that are going to be used to complete the transaction. These funds are used to make up the difference between the amount required for the transaction and the borrowed amount. Contribution Funds may have been already added as assets in "Other Assets" section. For them to be nominated as Contribution Funds, they should be added here as well. These are also known as Funds To Complete.'
  }
}

const newPurchaseColumns = ref([
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

const contributionFundsColumns = ref([
  { name: 'Cash', subname: '' },
  { name: 'Existing Equity', subname: '' },
  { name: 'First Home Owner Grant', subname: '' },
  { name: 'Genuine Savings', subname: '' },
  { name: 'Gift', subname: '' },
  { name: 'Inheritance', subname: '' },
  { name: 'Net Proceeds from Sale of Property', subname: '' },
  { name: 'Redraw', subname: '' },
  { name: 'Sale of Non Real Estate Asset', subname: '' },
  { name: 'Secured VISA', subname: '' },
  { name: 'Superannuation', subname: '' },
  { name: 'Term Deposit', subname: '' },
  { name: 'Unsecured Borrowing', subname: '' },
  { name: 'Other', subname: '' }
])

const optionColumns = computed(() => {
  if (requirementsType.value === 'newPurchase') {
    return newPurchaseColumns.value
  } else if (requirementsType.value === 'newLoans') {
    return products.value
  } else if (requirementsType.value === 'contributionFunds') {
    return contributionFundsColumns.value
  }
  return []
})

const handleAction = (item: any) => {
  if (requirementsType.value === 'newPurchase') {
    uni.navigateTo({
      url: `/pages/application/requirements/purchaseForm?type=${item.name}`
    })
  }
}

const fetchProducts = async () => {
  const [e, r] = await productApi.getAllProducts({
    applicationId: applicationInfo.value?.applicationId
  })
  console.log(r)
  if (!e && r) {
    products.value = r.content.map((item: any) => ({
      name: item.name,
      subname: item.repaymentType
    }))
  }
}

onLoad((options) => {
  console.log(options)
  requirementsType.value = options?.type
  if (options?.type === 'newLoans') {
    fetchProducts()
  }
})
</script>

<style scoped></style>
