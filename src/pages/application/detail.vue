<template>
  <BasePage :title="applicationInfo?.applicationName || ''" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <view class="flex-y-center justify-between">
        <text class="text-28rpx font-bold">{{ applicationInfo?.applicationName }}</text>
        <view class="flex-y-center gap-10rpx">
          <wd-icon name="error-circle" size="22px" color="#EB0000"></wd-icon>
          <wd-icon name="file-paste" size="22px" color="#1CBB8C"></wd-icon>
        </view>
      </view>
      <view class="flex-col mt-3 gap-2">
        <view class="flex items-center gap-1 text-#FF754C">
          <text class="text-24rpx">Case ID:</text>
          <text class="text-24rpx">{{ applicationInfo?.referenceNumber }}</text>
        </view>
        <view class="flex items-center gap-1 text-#7A858E">
          <text class="text-24rpx">Date Create:</text>
          <text class="text-24rpx">{{ applicationInfo?.createTime }}</text>
        </view>
      </view>
      <view
        class="border border-#E8EBEE border-solid rounded-lg bg-white text-24rpx mt-2 px-3 py-2 flex-y-center justify-between"
      >
        <view class="flex-col gap-1">
          <view>Conditional Approval</view>
          <view class="text-#7A858E text-24rpx"> 12/02/2025 11:32:21</view>
        </view>
        <wd-icon name="browse" size="22px" color="#7A858E"></wd-icon>
      </view>
    </view>
    <wd-button type="primary" block class="bg-#FF754C! rounded flex-y-center" size="large" :round="false">
      <view class="flex-y-center gap-20rpx">
        <wd-icon name="browse" size="22px"></wd-icon>
        <text>View Application</text>
      </view>
    </wd-button>
    <wd-collapse v-model="activeList" accordion @change="handleChange">
      <wd-collapse-item custom-body-style="padding:0 20rpx" title="Short Summary" name="summary">
        <view class="item flex-col justify-center">
          <view class="title">Application No</view>
          <view class="value">{{ applicationInfo?.summary?.applicationNumber }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Finance Required</view>
          <view class="value">{{ applicationInfo?.summary?.financeRequired?.split(' ')[0] || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Settlement Required</view>
          <view class="value">{{ applicationInfo?.summary?.settlementRequired || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Date Created</view>
          <view class="value">{{ applicationInfo?.summary?.dateCreated?.split(' ')[0] || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Solution</view>
          <view class="value">{{ applicationInfo?.summary?.solution || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Category</view>
          <view class="value">{{ applicationInfo?.summary?.category || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Funder Case Number</view>
          <view class="value">{{ applicationInfo?.summary?.funderCaseNumber || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Credit Assessment</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Credit Assessor</view>
          <view class="value">{{ applicationInfo?.summary?.assessorName || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">ALO Phone</view>
          <view class="value">{{ applicationInfo?.summary?.aloPhone || '-' }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Business Partner</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Broker ID</view>
          <view class="value">{{ applicationInfo?.summary?.brokerId }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Broker Name</view>
          <view class="value">{{ applicationInfo?.summary?.brokerName }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">Broker Email</view>
          <view class="value">{{ applicationInfo?.summary?.brokerEmail }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">BDM</view>
          <view class="value">{{ applicationInfo?.summary?.bdmName }}</view>
        </view>
        <view class="item flex-col justify-center">
          <view class="title">State</view>
          <view class="value">{{ applicationInfo?.summary?.state }}</view>
        </view>
      </wd-collapse-item>
      <wd-collapse-item custom-body-style="padding:0" title="Applicants" name="applicants">
        <wd-table :data="applicationInfo?.applicant" :border="false" :height="400">
          <wd-table-col prop="applicantName" label="Applicant Name" width="150"></wd-table-col>
          <wd-table-col prop="applicantType" label="Applicant Type" width="150"></wd-table-col>
          <wd-table-col prop="employmentType" label="Employment Type" width="150"></wd-table-col>
          <wd-table-col prop="documentType" label="Document Type" width="150" />
          <wd-table-col prop="abn" label="ABN" width="150" />
          <wd-table-col prop="mobile" label="Mobile" width="150" />
          <wd-table-col prop="email" label="Email" width="150">
            <template #value="{ row }">
              <view>
                {{ returnEmail(row.email) }}
              </view>
            </template>
          </wd-table-col>
        </wd-table>
      </wd-collapse-item>
      <wd-collapse-item custom-body-style="padding:0" title="Securities" name="securities">
        <wd-table :data="purchases" :border="false" :height="400">
          <wd-table-col prop="dataJson.address" label="Address" min-width="150" />
          <wd-table-col prop="primaryUsage" label="Primary Usage" width="150" />
          <wd-table-col prop="estimateBasis" label="Estimate Basis" width="150" />
          <wd-table-col prop="estimateMethod" label="Estimate Method" width="150" />
          <wd-table-col prop="estimatedValue" label="Estimated Value" width="150" />
          <wd-table-col prop="valuationstatus" label="Valuation Status" width="150" />
          <wd-table-col prop="createdAt" label="Created At" width="150" />
        </wd-table>
        <wd-table :data="properties" :border="false" :height="400">
          <wd-table-col prop="dataJson.address" label="Address" min-width="150" />
          <wd-table-col prop="primaryUsage" label="Primary Usage" width="150" />
          <wd-table-col prop="estimateBasis" label="Estimate Basis" width="150" />
          <wd-table-col prop="estimateMethod" label="Estimate Method" width="150" />
          <wd-table-col prop="estimatedValue" label="Estimated Value" width="150" />
          <wd-table-col prop="valuationstatus" label="Valuation Status" width="150" />
          <wd-table-col prop="createdAt" label="Created At" width="150" />
        </wd-table>
      </wd-collapse-item>
      <wd-collapse-item custom-body-style="padding:0" title="Solutions" name="solutions">
        <wd-table :data="properties" :border="false" :height="400">
          <wd-table-col prop="productName" label="Loan Product" width="150" />
          <wd-table-col prop="type" label="Type" width="150" />
          <wd-table-col prop="dataJson.term" label="Term" width="150" />
          <wd-table-col prop="settlementDate" label="Settlement Date" width="150" />
          <wd-table-col prop="amountRequested" label="Loan Amount" width="150" />
        </wd-table>
      </wd-collapse-item>
      <wd-collapse-item title="Fee Summary" name="feeSummary">
        <wd-table :data="loan" :border="false" :height="400">
          <wd-table-col prop="name" label="Fee Name" width="150" />
          <wd-table-col prop="paid" label="How Fee Paid" width="150" />
          <wd-table-col prop="amount" label="Amount Due" width="150" />
        </wd-table>
      </wd-collapse-item>
    </wd-collapse>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationId = ref('')
const applicationStore = useApplicationStore()

const activeList = ref<string[]>(['securities'])

const applicationInfo: AnyObj = computed(() => applicationStore.applicationInfo)

const purchases = ref<AnyObj[]>([])
const properties = ref<AnyObj[]>([])
const loan = ref<AnyObj[]>([])
const getApplicationDetail = async (id: string | undefined) => {
  if (!id) return
  const [e, r] = await api.getApplicationDetail(id)
  if (!e && r) {
    applicationStore.setApplicationInfo({
      ...r,
      applicationId: Number(id)
    } as unknown as Application.IApplication)
  }
}

onLoad((options) => {
  if (options?.id) {
    applicationId.value = options.id
    getApplicationDetail(options.id)
  }
})

const handleChange = (e: AnyObj) => {
  console.log(e)
  if (e.value === 'securities') {
    getPurchases()
    getAllProperties()
  } else if (e.value === 'solutions') {
    getNewLoan()
  }
}

async function getPurchases() {
  if (!applicationId.value) return
  const [e, r] = await api.getNewPurchase(applicationId.value)
  if (!e && r) {
    purchases.value = r.filter((item: AnyObj) => item.usedAsSecurity === true)
  }
}

async function getAllProperties() {
  if (!applicationId.value) return
  const [e, r] = await api.getProperties(applicationId.value)
  if (!e && r) {
    properties.value = r.filter((item: AnyObj) => item.usedAsSecurity === true)
  }
}

const getNewLoan = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getNewLoan(applicationId.value)
  if (!e && r) {
    loan.value = r.filters(Boolean)
  }
}

function returnEmail(str: string) {
  if (!str) return
  const result = isStrictJSON(str)
  if (result) {
    return result[0]?.email_address || ''
  } else {
    return str
  }
}

function isStrictJSON(str: string) {
  try {
    const obj = JSON.parse(str)
    return obj
  } catch (e) {
    return false
  }
}
</script>

<style lang="scss" scoped>
.item {
  font-size: 28rpx;
  height: 120rpx;

  .title {
    color: #384144;
  }

  .value {
    color: #7a858e;
  }
}

.item + .item {
  border-top: 1px solid #e8ebee;
}
</style>
