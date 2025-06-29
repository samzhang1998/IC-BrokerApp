<template>
  <BasePage :title="applicationInfo?.applicationName || ''" hasBack>
    <InfoHead :applicationInfo="applicationInfo" :history="history" :showMir="true" :showIssued="true" />
    <wd-button
      type="primary"
      block
      class="bg-#FF754C! rounded flex-y-center"
      size="large"
      :round="false"
      @click="handleToOverview"
    >
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
        <view class="item flex-col justify-center">
          <view class="title">Existed Properties </view>
        </view>
        <wd-table :data="purchases" :border="false" :height="400">
          <wd-table-col prop="dataJson" label="Address" min-width="150">
            <template #value="{ row }">
              <view> {{ row?.dataJson?.address }} </view>
            </template>
          </wd-table-col>
          <wd-table-col prop="primaryUsage" label="Primary Usage" width="150" />
          <wd-table-col prop="estimateBasis" label="Estimate Basis" width="150" />
          <wd-table-col prop="estimateMethod" label="Estimate Method" width="150" />
          <wd-table-col prop="estimatedValue" label="Estimated Value" width="150" />
          <wd-table-col prop="valuationstatus" label="Valuation Status" width="150" />
          <wd-table-col prop="createdAt" label="Created At" width="150" />
        </wd-table>
        <view class="item flex-col justify-center">
          <view class="title">New Properties </view>
        </view>
        <wd-table :data="properties" :border="false" :height="400">
          <wd-table-col prop="dataJson" label="Address" min-width="150">
            <template #value="{ row }">
              <view> {{ row?.dataJson?.address }} </view>
            </template>
          </wd-table-col>
          <wd-table-col prop="primaryUsage" label="Primary Usage" width="150" />
          <wd-table-col prop="estimateBasis" label="Estimate Basis" width="150" />
          <wd-table-col prop="estimateMethod" label="Estimate Method" width="150" />
          <wd-table-col prop="estimatedValue" label="Estimated Value" width="150" />
          <wd-table-col prop="valuationstatus" label="Valuation Status" width="150" />
          <wd-table-col prop="createdAt" label="Created At" width="150" />
        </wd-table>
      </wd-collapse-item>
      <wd-collapse-item custom-body-style="padding:0" title="Solutions" name="solutions">
        <wd-table :data="loan" :border="false" :height="400">
          <wd-table-col prop="productName" label="Loan Product" width="150" />
          <wd-table-col prop="type" label="Type" width="150" />
          <wd-table-col prop="dataJson" label="Term" width="150">
            <template #value="{ row }">
              <view> {{ row?.dataJson?.term }} </view>
            </template>
          </wd-table-col>
          <wd-table-col prop="settlementDate" label="Settlement Date" width="150" />
          <wd-table-col prop="amountRequested" label="Loan Amount" width="150" />
        </wd-table>
      </wd-collapse-item>
      <wd-collapse-item custom-body-style="padding:0" title="Fee Summary" name="feeSummary">
        <wd-table :data="fee" :border="false" :height="400">
          <wd-table-col prop="name" label="Fee Name" width="130" />
          <wd-table-col prop="paid" label="How Fee Paid" width="130" />
          <wd-table-col prop="amount" label="Amount Due" width="130" />
        </wd-table>
      </wd-collapse-item>
    </wd-collapse>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'
import InfoHead from '@/components/Application/InfoHead.vue'

const applicationId = ref('')
const applicationStore = useApplicationStore()

const activeList = ref<string[]>([''])

const applicationInfo: AnyObj = computed(() => applicationStore.applicationInfo)

const purchases = ref<AnyObj[]>([])
const properties = ref<AnyObj[]>([])
const loan = ref<AnyObj[]>([])
const fee = ref<AnyObj[]>([])
const history = ref<AnyObj[]>([
  { status: 'Submit to IC', timeStamp: '' },
  { status: 'Pre-assessment', timeStamp: '' },
  { status: 'Full-assessment', timeStamp: '' },
  { status: 'AIP', timeStamp: '' },
  { status: 'Submit to Funder', timeStamp: '' },
  { status: 'Conditional Approval', timeStamp: '' },
  { status: 'Formal Approval', timeStamp: '' },
  { status: 'Instruct to Solicitor', timeStamp: '' },
  { status: 'Loan doc Issued', timeStamp: '' },
  { status: 'Loan doc Returned', timeStamp: '' },
  { status: 'Settlement Date Booked', timeStamp: '' },
  { status: 'Settled', timeStamp: '' },
  { status: 'Decline', timeStamp: '' },
  { status: 'Withdrawal', timeStamp: '' }
])

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
    getHistory()
  }
})

const handleChange = (e: AnyObj) => {
  if (e.value === 'securities') {
    getPurchases()
    getAllProperties()
  } else if (e.value === 'solutions') {
    getNewLoan()
  } else if (e.value === 'feeSummary') {
    getFee()
  }
}

async function getPurchases() {
  if (!applicationId.value) return
  const [e, r] = await api.getNewPurchase(applicationId.value)
  if (!e && r) {
    console.log(r)
    const data = r || []
    purchases.value = data.filter((item: AnyObj) => item.usedAsSecurity === true)
  }
}

async function getAllProperties() {
  if (!applicationId.value) return
  const [e, r] = await api.getProperties(applicationId.value)
  if (!e && r) {
    console.log('getAllProperties', r)
    const data = r || []
    properties.value = data.filter((item: AnyObj) => item.usedAsSecurity === true)
  }
}

const getNewLoan = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getNewLoan(applicationId.value)
  if (!e && r) {
    const data = r || []
    console.log('🚀 ~ getNewLoan ~ data:', data)
    loan.value = data.filter(Boolean)
  }
}

const getFee = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getFee(applicationId.value)
  if (!e && r) {
    console.log('🚀 ~ getFee ~ r:', r)
    let allFees: AnyObj[] = []
    const data = r || []
    // fee.value = data.filter(Boolean)
    // Parse feeJson (existing fees) - handle both object and array formats
    if (data.feeJson) {
      try {
        const feeJson = typeof data.feeJson === 'string' ? JSON.parse(data.feeJson) : data.feeJson

        if (typeof feeJson === 'object' && !Array.isArray(feeJson)) {
          // API object format: { "Application Fee": { "Amount": 100, "Selected": true, "Payment Method": "Pay Now" } }
          const activeFees = Object.entries(feeJson)
            .filter(([feeName, feeData]) => (feeData as any)['Selected'])
            .map(([feeName, feeData]) => ({
              feeName: feeName,
              amount: (feeData as any)['Amount'] || 0,
              paymentMethod: (feeData as any)['Payment Method'] || 'Pay Now',
              checked: (feeData as any)['Selected']
            }))
          allFees.push(...activeFees)
        } else if (Array.isArray(feeJson)) {
          // Legacy array format
          const activeFees = feeJson.filter((fee) => fee.checked)
          allFees.push(...activeFees)
        }
      } catch (e) {
        console.warn('Failed to parse feeJson:', e)
      }
    }

    // Parse newFeeJson (additional fees) - handle both object and array formats
    if (data.newFeeJson) {
      try {
        const newFeeJson = typeof data.newFeeJson === 'string' ? JSON.parse(data.newFeeJson) : data.newFeeJson

        if (typeof newFeeJson === 'object' && !Array.isArray(newFeeJson)) {
          // API object format
          const activeNewFees = Object.entries(newFeeJson)
            .filter(([feeName, feeData]: any) => feeData['Selected'])
            .map(([feeName, feeData]) => ({
              feeName: feeName,
              amount: (feeData as any)['Amount'] || 0,
              paymentMethod: (feeData as any)['Payment Method'] || 'Pay Now',
              checked: (feeData as any)['Selected']
            }))
          allFees.push(...activeNewFees)
          console.log('Active fees from newFeeJson (object format):', activeNewFees)
        } else if (Array.isArray(newFeeJson)) {
          // Legacy array format
          const activeNewFees = newFeeJson.filter((fee) => fee.checked)
          allFees.push(...activeNewFees)
          console.log('Active fees from newFeeJson (array format):', activeNewFees)
        }
      } catch (e) {
        console.warn('Failed to parse newFeeJson:', e)
      }
    }

    // Parse tempFeeJson (temporary fees) - usually array format
    if (data.tempFeeJson) {
      try {
        const tempFeeJson = typeof data.tempFeeJson === 'string' ? JSON.parse(data.tempFeeJson) : data.tempFeeJson
        if (Array.isArray(tempFeeJson)) {
          const activeTempFees = tempFeeJson.filter((fee) => fee.checked)
          allFees.push(...activeTempFees)
          console.log('Active fees from tempFeeJson:', activeTempFees)
        }
      } catch (e) {
        console.warn('Failed to parse tempFeeJson:', e)
      }
    }
    console.log('🚀 ~ getFee ~ allFees:', allFees)
    if (allFees.length > 0) {
      allFees = allFees.map((fee) => ({
        name: fee.feeName || 'Unknown Fee',
        amount: fee.amount ? `$${parseFloat(fee.amount).toFixed(2)}` : '$0.00',
        paid: fee.paymentMethod || 'Not specified'
      }))
      console.log('Updated fee summary data:', allFees)
    } else {
      console.log('No active fees found')
      allFees = []
    }
    fee.value = allFees
  }
}

const getHistory = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getHistory(applicationId.value)
  if (!e && r) {
    console.log('🚀 ~ getHistory ~ r:', r)
    history.value = history.value.map((item: AnyObj) => {
      const found = r.find((b: AnyObj) => b.status === item.status)
      if (found) {
        return {
          ...item,
          ...found
        }
      } else {
        return item
      }
    })
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

const handleToOverview = () => {
  uni.navigateTo({
    url: `/pages/application/overview?id=${applicationId.value}`
  })
}
</script>

<style lang="scss">
.item {
  font-size: 28rpx;
  height: 120rpx;
}

.title {
  color: #384144;
}

.value {
  color: #7a858e;
}

.item + .item {
  border-top: 1px solid #e8ebee;
}
</style>
