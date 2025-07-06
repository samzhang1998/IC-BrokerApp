<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      :title="typeMap[requirementsType].title"
      :description="typeMap[requirementsType].description"
      :actions="optionColumns"
      @action="handleAction"
    />
    <view class="flex-col gap-2 mt-4" v-if="requirementsType === 'contributionFunds'">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in contributionFundsList"
        :key="item.id"
        @click="handleToEdit(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx">
            {{ item.type }}
          </view>
        </view>
        <wd-icon
          name="delete-thin"
          size="22px"
          @click.stop.prevent="handleDeleteContributionFunds(item)"
          v-if="!isViewApplication"
        ></wd-icon>
      </view>
    </view>
    <view class="flex-col gap-2 mt-4" v-if="requirementsType === 'newPurchase'">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in newPurchaseList"
        :key="item.id"
        @click="handleToEdit(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx">
            {{ item.primaryUsage + ' - ' + (item.type || 'New Property') }}
          </view>
        </view>
        <wd-icon
          name="delete-thin"
          size="22px"
          @click.stop.prevent="handleDeleteNewPurchase(item)"
          v-if="!isViewApplication"
        ></wd-icon>
      </view>
    </view>
    <view class="flex-col gap-2 mt-4" v-if="requirementsType === 'newLoans'">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in newLoanList"
        :key="item.id"
        @click="handleToEdit(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx">
            {{ item.type + ' - ' + item.productName }}
          </view>
        </view>
        <wd-icon
          name="delete-thin"
          size="22px"
          @click.stop.prevent="handleDeleteNewLoan(item)"
          v-if="!isViewApplication"
        ></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentContributionFund, currentNewPurchase, currentNewLoan, isViewApplication } =
  toRefs(applicationStore)
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

const contributionFundsList = ref<any[]>([])
const newPurchaseList = ref<any[]>([])
const newLoanList = ref<any[]>([])

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
    postNewPurchase(item.name)
  } else if (requirementsType.value === 'newLoans') {
    postNewLoan(item.id)
  } else if (requirementsType.value === 'contributionFunds') {
    postContributionFunds(item.name)
  }
}

//#region ContributionFunds
const fetchContributionFunds = async () => {
  const [e, r] = await api.getContributionFunds(applicationInfo.value?.applicationId || '', {})
  if (!e && r) {
    console.log(r)
    contributionFundsList.value = r.filter(Boolean)
  }
}

const postContributionFunds = async (value: string) => {
  const data = {
    type: value
  }
  const [e, r] = await api.postContributionFunds(applicationInfo.value?.applicationId || '', data)
  if (!e && r) {
    console.log(r)
    if (r?.id) {
      currentContributionFund.value = r as unknown as Application.IContributionFunds
      uni.navigateTo({
        url: `/pages/application/requirements/contributionFunds?id=${r.id}`
      })
    } else {
      uni.showToast({
        title: 'Failed to create contribution fund',
        icon: 'none'
      })
    }
  }
}
//#endregion

//#region NewPurchase
const fetchNewPurchase = async () => {
  const [e, r] = await api.getNewPurchase(applicationInfo.value?.applicationId || '')
  if (!e && r) {
    console.log(r)
    newPurchaseList.value = r.filter(Boolean)
  }
}

const postNewPurchase = async (value: string) => {
  const data = {
    primaryUsage: value
  }
  const [e, r] = await api.postNewPurchase(applicationInfo.value?.applicationId || '', data)
  if (!e && r) {
    console.log(r)
    if (r?.id) {
      currentNewPurchase.value = r as unknown as Application.IPurchase
      uni.navigateTo({
        url: `/pages/application/requirements/purchaseForm?id=${r.id}`
      })
    } else {
      uni.showToast({
        title: 'Failed to create new purchase',
        icon: 'none'
      })
    }
  }
}
//#endregion

//#region NewLoan
const fetchProducts = async () => {
  const [e, r] = await api.getAllProducts({
    applicationId: applicationInfo.value?.applicationId
  })
  console.log(r)
  if (!e && r) {
    products.value = r.content.map((item: any) => ({
      name: item.name,
      subname: item.repaymentType,
      id: item.id
    }))
  }
}
const fetchNewLoan = async () => {
  const [e, r] = await api.getNewLoan(applicationInfo.value?.applicationId || '')
  if (!e && r) {
    console.log(r)
    newLoanList.value = r.filter(Boolean)
  }
}

const postNewLoan = async (value: string) => {
  const data = {
    productId: value
  }
  const [e, r] = await api.postNewLoan(applicationInfo.value?.applicationId || '', data)
  if (!e && r) {
    console.log(r)
    if (r?.id) {
      currentNewLoan.value = r as unknown as Application.INewLoan
      uni.navigateTo({
        url: `/pages/application/requirements/newLoans?id=${r.id}`
      })
    } else {
      uni.showToast({
        title: 'Failed to create new loan',
        icon: 'none'
      })
    }
  }
}
//#endregion

const handleToEdit = (item: AnyObj) => {
  if (requirementsType.value === 'newPurchase') {
    currentNewPurchase.value = item as Application.IPurchase
    uni.navigateTo({
      url: `/pages/application/requirements/purchaseForm?id=${item.id}`
    })
  } else if (requirementsType.value === 'newLoans') {
    currentNewLoan.value = item as Application.INewLoan
    uni.navigateTo({
      url: `/pages/application/requirements/newLoans?id=${item.id}`
    })
  } else if (requirementsType.value === 'contributionFunds') {
    currentContributionFund.value = item as Application.IContributionFunds
    uni.navigateTo({
      url: `/pages/application/requirements/contributionFunds?id=${item.id}`
    })
  }
}

onLoad((options) => {
  console.log(options)
  requirementsType.value = options?.type
})

onShow(() => {
  if (requirementsType.value === 'newLoans') {
    fetchProducts()
    fetchNewLoan()
  } else if (requirementsType.value === 'contributionFunds') {
    fetchContributionFunds()
  } else if (requirementsType.value === 'newPurchase') {
    fetchNewPurchase()
  }
})

const handleDeleteContributionFunds = async (item: Application.IContributionFunds) => {
  const [e, r] = await api.deleteContributionFunds(applicationInfo.value?.applicationId || '', item.id)
  if (!e && r) {
    uni.showToast({
      title: 'Delete contribution fund successfully',
      icon: 'success'
    })
    fetchContributionFunds()
  }
}

const handleDeleteNewPurchase = async (item: Application.IPurchase) => {
  const [e, r] = await api.deleteNewPurchase(applicationInfo.value?.applicationId || '', item.id)
  if (!e && r) {
    uni.showToast({
      title: 'Delete new purchase successfully',
      icon: 'success'
    })
    fetchNewPurchase()
  }
}

const handleDeleteNewLoan = async (item: Application.INewLoan) => {
  const [e, r] = await api.deleteNewLoan(applicationInfo.value?.applicationId || '', item.id)
  if (!e && r) {
    uni.showToast({
      title: 'Delete new loan successfully',
      icon: 'success'
    })
    fetchNewLoan()
  }
}
</script>

<style scoped></style>
