<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <SummaryHead
      title="Other Liabilities"
      description="Add all other non mortgage liabilities owed by the applicants which will affect the applicants borrowing capacity."
      :actions="liabilityColumns"
      @action="handleAction"
    />
    <view class="flex-col gap-2 mt-4">
      <view
        class="flex-y-center border-solid border-1 rounded-lg border-color-gray-200 p-4 bg-#FCFCFC gap-1"
        v-for="item in otherLiabilitiesList"
        :key="item.id"
        @click="handleToEdit(item)"
      >
        <view class="flex-1 flex-col gap-2">
          <view class="text-24rpx">
            {{ item.detailType + ' - ' + (item.financialInstitution || 'New Other Liability') }}
          </view>
        </view>
        <wd-icon
          name="delete-thin"
          size="22px"
          @click.stop.prevent="handleDeleteOtherLiabilities(item)"
          v-if="!isViewApplication"
        ></wd-icon>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { applicationInfo, currentOtherLiabilities, isViewApplication } = toRefs(applicationStore)

const applicationId = ref('')
const otherLiabilitiesList = ref<Application.IOtherLiabilities[]>([])
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

onLoad((options) => {
  console.log(options)
  if (options?.id) {
    applicationId.value = options?.id
  }
})

onShow(() => {
  getOtherLiabilities()
})

async function getOtherLiabilities() {
  if (!applicationId.value) return
  const [e, r] = await api.getOtherLiabilities(applicationId.value)
  if (!e && r) {
    otherLiabilitiesList.value = r as unknown as Application.IOtherLiabilities[]
  }
}

const handleToEdit = (item: Application.IOtherLiabilities) => {
  currentOtherLiabilities.value = item
  uni.navigateTo({
    url: `/pages/application/assets/otherLiabilities/form?id=${item.id}`
  })
}

const handleAction = async (item: any) => {
  const data = {
    detailType: item.name,
    type: item.subname
  }
  const [e, r] = await api.postOtherLiabilities(applicationInfo.value?.applicationId || '', data)
  if (!e && r) {
    console.log(r)
    if (r?.id) {
      currentOtherLiabilities.value = r as unknown as Application.IOtherLiabilities
      uni.navigateTo({
        url: `/pages/application/assets/otherLiabilities/form?id=${r.id}`
      })
    } else {
      uni.showToast({
        title: 'Failed to create other liabilities',
        icon: 'none'
      })
    }
  }
}

const handleDeleteOtherLiabilities = async (item: Application.IOtherLiabilities) => {
  const [e, r] = await api.deleteOtherLiabilities(applicationInfo.value?.applicationId || '', item.id)
  if (!e && r) {
    uni.showToast({
      title: 'Delete other liabilities successfully',
      icon: 'success'
    })
    getOtherLiabilities()
  }
}
</script>

<style scoped></style>
