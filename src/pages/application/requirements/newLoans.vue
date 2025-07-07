<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Loan Type" labelBold>
        <wd-picker v-model="formData.type" :placeholder="formData.type" disabled />
      </FormItem>
      <FormItem label="Product Name" labelBold>
        <wd-input type="text" v-model="formData.productName" :placeholder="formData.productName" disabled />
      </FormItem>
      <FormItem label="Estimate Settlement Date" labelBold>
        <wd-datetime-picker
          type="date"
          v-model="formData.settlementDate"
          placeholder="Select settlement date"
          :minDate="MIN_DATE"
        />
      </FormItem>
      <FormItem label="Amount Requested" labelBold>
        <view class="flex items-center gap-2">
          <text class="text-28rpx font-bold">$</text>
          <wd-input class="flex-1" type="number" v-model="formData.amountRequested" placeholder="Enter Amount" />
        </view>
      </FormItem>
      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Loan Term</text>
          <view></view>
        </view>
        <view class="flex-col gap-4">
          <FormItem label="Loan Term">
            <view class="flex-y-center justify-between gap-4">
              <wd-picker class="w-[30%]" v-model="loanTerm.term" :placeholder="loanTerm.term" disabled />
              <wd-input class="flex-1" v-model="formData.dataJson.term" placeholder="Enter Term" />
              <wd-picker class="w-[30%]" v-model="loanTerm.time" :placeholder="loanTerm.time" disabled />
            </view>
          </FormItem>
        </view>
        <view class="flex-col gap-4">
          <FormItem label="Interest Type">
            <view class="flex-y-center justify-between gap-4">
              <wd-picker class="w-[30%]" v-model="loanTerm.interest" :placeholder="loanTerm.interest" disabled />
              <wd-picker class="flex-1" v-model="loanTerm.amount" :placeholder="loanTerm.amount" disabled />
              <wd-picker class="w-[30%]" v-model="loanTerm.amount" :placeholder="loanTerm.amount" disabled />
            </view>
          </FormItem>
        </view>
        <view class="flex-col gap-4">
          <FormItem label="Payment Type">
            <view class="flex-y-center justify-between gap-4">
              <wd-picker class="w-[30%]" v-model="loanTerm.type" :placeholder="loanTerm.type" disabled />
              <wd-picker class="flex-1" v-model="loanTerm.amount" :placeholder="loanTerm.amount" disabled />
              <wd-picker class="w-[30%]" v-model="loanTerm.amount" :placeholder="loanTerm.amount" disabled />
            </view>
          </FormItem>
        </view>
      </view>
      <FormItem label="Primary Loan Purpose" labelBold>
        <wd-picker
          :columns="['Owner Occupied']"
          v-model="formData.dataJson.purpose"
          placeholder="Select Primary Loan Purpose"
        />
      </FormItem>
      <FormItem label="NCCP Status" labelBold>
        <wd-picker v-model="formData.dataJson.nccp" :placeholder="formData.dataJson.nccp" disabled />
      </FormItem>
      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Lending Purpose</text>
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateLendingPurpose"
            v-if="!isViewApplication"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
        </view>
        <view v-for="(item, index) in formData.dataJson?.lendingPurpose" :key="index" class="flex-col gap-4">
          <FormItem label="ABS Lending Purpose">
            <view class="flex-y-center justify-between gap-4">
              <wd-input type="number" v-model="item.abs" placeholder="Enter amount" class="flex-1" />
              <wd-icon
                name="delete"
                size="22px"
                @click="handleDeleteLendingPurpose(index)"
                v-if="!isViewApplication"
              ></wd-icon>
            </view>
          </FormItem>
          <FormItem label="Purpose Amount">
            <view class="flex items-center gap-2">
              <text class="text-28rpx font-bold">$</text>
              <wd-input class="flex-1" type="number" v-model="item.amount" placeholder="Enter Amount" />
            </view>
          </FormItem>
        </view>
      </view>
      <view class="flex-col gap-20rpx">
        <view class="flex-y-center justify-between">
          <text class="font-bold">Security</text>
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateSecurity"
            v-if="!isViewApplication"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
        </view>
        <view v-for="(item, index) in formData.dataJson?.security" :key="index" class="flex-col gap-4">
          <FormItem :label="`Security ${index + 1}`">
            <view class="flex-y-center justify-between gap-4">
              <wd-picker
                class="flex-1"
                :columns="newPurchaseList"
                v-model="item.property"
                :value-key="'value'"
                :label-key="'label'"
                placeholder="Select Property"
              />
              <wd-icon
                name="delete"
                size="22px"
                @click="handleDeleteSecurity(index)"
                v-if="!isViewApplication"
              ></wd-icon>
            </view>
          </FormItem>
          <FormItem label="Security Priority">
            <wd-picker :columns="priorities" v-model="item.priority" placeholder="Select Security Priority" />
          </FormItem>
          <FormItem label="Negatively Geared">
            <wd-switch v-model="item.negative" />
          </FormItem>
        </view>
      </view>
      <view class="flex-y-center justify-between">
        <text class="font-bold">Optional Features</text>
        <view></view>
      </view>
      <FormItem label="Redraw" labelBold>
        <wd-switch v-model="formData.dataJson.redraw" />
      </FormItem>
      <FormItem label="Split Loan" labelBold>
        <wd-switch v-model="formData.dataJson.splitLoan" />
      </FormItem>
      <FormItem label="Offset" labelBold>
        <wd-switch v-model="formData.dataJson.offset" />
      </FormItem>
    </wd-form>
    <view class="flex-col gap-1 mt-3 w-full" v-if="!isViewApplication">
      <wd-button type="primary" block class="bg-#FF754C!" size="large" @click="handleSubmit">Save</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import dayjs from 'dayjs'
import { cloneDeep } from 'lodash'
import { MIN_DATE } from '../constants'

const applicationStore = useApplicationStore()
const { applicationInfo, currentNewLoan, isViewApplication } = toRefs(applicationStore)
const loanTerm = ref({
  term: 'Total Term',
  time: 'Years',
  interest: 'Variable',
  type: 'Principle',
  amount: ''
})

const priorities = ref([
  'First Mortgage',
  'Registered Security',
  'Second after DSH',
  'Second Mortgage',
  'Third Mortgage',
  'Unregistered Mortgage'
])
const newPurchaseList = ref<Application.IPurchase[]>([])
const form = ref()
const formData = ref<Application.INewLoan>({} as Application.INewLoan)

onLoad((options) => {
  if (options?.id) {
    formData.value.id = options.id
  }
  if (currentNewLoan.value) {
    Object.assign(formData.value, currentNewLoan.value)
    if (formData.value.settlementDate) {
      formData.value.settlementDate = dayjs(formData.value.settlementDate).valueOf()
    }

    if (!formData.value.dataJson) {
      formData.value.dataJson = {
        nccp: '',
        term: '',
        offset: false,
        redraw: false,
        purpose: '',
        security: [{ negative: true, priority: '', property: 0 }],
        splitLoan: false,
        lendingPurpose: [
          {
            abs: '',
            amount: ''
          }
        ]
      }
    }
  }
  getProperties()
})

const getProperties = async () => {
  const [e, r] = await api.getProperties(applicationInfo.value?.applicationId || '')
  if (!e && r) {
    newPurchaseList.value = r.filter(Boolean).map((item: AnyObj) => {
      return {
        value: item.id,
        label: item.primaryUsage + '-' + (item.dataJson?.address || 'No address provided')
      }
    })
  }
}

const handleCreateLendingPurpose = () => {
  formData.value.dataJson.lendingPurpose.push({ abs: '', amount: '' })
}

const handleDeleteLendingPurpose = (index: number) => {
  formData.value.dataJson.lendingPurpose.splice(index, 1)
}

const handleCreateSecurity = () => {
  formData.value.dataJson.security.push({ negative: false, priority: '', property: 0 })
}

const handleDeleteSecurity = (index: number) => {
  formData.value.dataJson.security.splice(index, 1)
}

const handleSubmit = async () => {
  let data = cloneDeep(formData.value)
  data.settlementDate = dayjs(data.settlementDate).format('YYYY-MM-DD')
  const [e, r] = await api.putNewLoan(applicationInfo.value?.applicationId || '', formData.value.id, data)
  if (!e && r) {
    uni.showToast({
      title: 'Success',
      icon: 'success'
    })
    uni.navigateBack()
  }
}
</script>

<style scoped></style>
