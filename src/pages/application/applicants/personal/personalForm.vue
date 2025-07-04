<template>
  <BasePage :title="applicationInfo?.applicationName || 'Create Application'" hasBack>
    <view class="head-wrap flex-y-center justify-between h-88rpx mb-32rpx">
      <view class="text-28rpx font-bold">
        {{ currentBorrower?.firstName }} ({{ currentBorrower?.applicantType }})
      </view>
      <wd-button type="primary" size="small" class="bg-#FF754C!" @click="handleSubmit">Save</wd-button>
    </view>
    <wd-form ref="form" :model="formData" class="flex-col gap-4">
      <FormItem label="Applicant Type" labelBold>
        <wd-input type="text" v-model="formData.applicantType" placeholder="Enter applicant type" disabled />
      </FormItem>
      <FormItem label="Name Title">
        <wd-picker :columns="nameTitleColumns" v-model="formData.nameTitle" placeholder="Select name title" />
      </FormItem>
      <FormItem label="First Name">
        <wd-input type="text" v-model="formData.firstName" placeholder="Enter first name" />
      </FormItem>
      <FormItem label="Middle Name">
        <wd-input type="text" v-model="formData.middleName" placeholder="Enter middle name" />
      </FormItem>
      <FormItem label="Surname">
        <wd-input type="text" v-model="formData.lastName" placeholder="Enter surname" />
      </FormItem>
      <FormItem label="Known As">
        <wd-input type="text" v-model="formData.knownAs" placeholder="Enter known as" />
      </FormItem>
      <FormItem label="Mother's Maiden Name ">
        <wd-input type="text" v-model="formData.maidenName" placeholder="Enter mother's maiden name" />
      </FormItem>
      <FormItem label="Has Previous Name" labelBold>
        <wd-switch v-model="formData.hasPreName" />
      </FormItem>
      <FormItem label="Previous Name Title" v-if="formData.hasPreName">
        <wd-input type="text" v-model="formData.preNameTitle" placeholder="Enter previous name title" />
      </FormItem>
      <FormItem label="Previous First Name" v-if="formData.hasPreName">
        <wd-input type="text" v-model="formData.preFirstName" placeholder="Enter previous first name" />
      </FormItem>
      <FormItem label="Previous Middle Name" v-if="formData.hasPreName">
        <wd-input type="text" v-model="formData.preMiddleName" placeholder="Enter previous middle name" />
      </FormItem>
      <FormItem label="Previous Surname" v-if="formData.hasPreName">
        <wd-input type="text" v-model="formData.preLastName" placeholder="Enter previous surname" />
      </FormItem>
      <FormItem label="Gender">
        <wd-picker :columns="genderColumns" v-model="formData.gender" placeholder="Select gender" />
      </FormItem>
      <FormItem label="Date of Birth">
        <wd-datetime-picker v-model="formData.dob" type="date" placeholder="Select date of birth" />
      </FormItem>
      <FormItem label="Residency Status" labelBold>
        <wd-picker
          :columns="residencyStatusColumns"
          v-model="formData.residencyStatus"
          placeholder="Select residency status"
        />
      </FormItem>
      <FormItem label="Citizenship">
        <wd-input type="text" v-model="formData.citizenship" placeholder="Enter citizenship" />
      </FormItem>
      <FormItem label="Marital Status" labelBold>
        <wd-picker
          :columns="maritalStatusColumns"
          v-model="formData.maritalStatus"
          placeholder="Select marital status"
        />
      </FormItem>
      <FormItem label="Next of Kin">
        <wd-input type="text" v-model="formData.kinId" placeholder="Enter Next of Kin ID" />
      </FormItem>
      <FormItem label="Kin Relationship">
        <wd-picker :columns="kinRelationColumns" v-model="formData.kinRelation" placeholder="Select kin relation" />
      </FormItem>
      <FormItem label="Household and Living Expenses" labelBold>
        <view class="flex-y-center gap-20rpx">
          <wd-picker
            :columns="livingExpenses"
            v-model="formData.livingExpensesId"
            placeholder="Select living expenses"
            class="flex-1"
          />
          <view
            class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx"
            @click="handleCreateHousehold"
          >
            <wd-icon name="add" size="18px"></wd-icon>
          </view>
        </view>
      </FormItem>
      <FormItem label="Solicitor">
        <view class="flex-y-center justify-between gap-4">
          <wd-picker
            :columns="solicitorColumns"
            v-model="formData.solicitorId"
            placeholder="Select solicitor"
            class="flex-1"
          />
          <add-button @click="handleCreateSolicitor" />
        </view>
      </FormItem>
      <FormItem label="Accountant">
        <view class="flex-y-center justify-between gap-4">
          <wd-picker
            :columns="AccountantColumns"
            v-model="formData.accountantId"
            placeholder="Select accountant"
            class="flex-1"
          />
          <add-button @click="handleCreateAccountant" />
        </view>
      </FormItem>
    </wd-form>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'

const applicationStore = useApplicationStore()
const { currentBorrower, applicationInfo } = toRefs(applicationStore)

const formData = reactive<Application.IBorrowerDetail>({} as Application.IBorrowerDetail)
const nameTitleColumns = ref(['Mr', 'Miss', 'Mrs'])
const residencyStatusColumns = ref(['Permanently in Australia', 'Temporarily in Australia', 'Non Resident'])
const genderColumns = ref(['Male', 'Female'])
const maritalStatusColumns = ref(['De Facto', 'Divorced', 'Married', 'Separated', 'Single', 'Widowed'])
const kinRelationColumns = ref(['Child', 'Friend', 'Grandparent', 'Parent', 'Sibling', 'Other Relative'])
const solicitorColumns = ref([])
const AccountantColumns = ref([])
const livingExpenses = ref<{ value: number; label: string }[]>([])

watch(
  currentBorrower,
  (newVal) => {
    if (newVal) {
      const cleanNewVal = { ...newVal } as any
      for (const key in cleanNewVal) {
        if (cleanNewVal[key] === null && key !== 'address') {
          cleanNewVal[key] = ''
        }
      }
      Object.assign(formData, cleanNewVal)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const form = ref()

const handleSubmit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) return
  const [e, r] = await api.updateBorrower(applicationInfo.value?.applicationId || '', currentBorrower.value?.id || '', {
    ...formData,
    applicationId: applicationInfo.value?.applicationId,
    type: currentBorrower.value?.applicantType
  })
  currentBorrower.value = r as unknown as Application.IBorrowerDetail
  if (!e && r) {
    uni.showToast({
      title: 'Update Success',
      icon: 'success'
    })
  }
}

const handleCreateHousehold = () => {
  uni.navigateTo({
    url: `/pages/application/applicants/personal/householdForm?applicationId=${applicationInfo.value?.applicationId}`
  })
}

const handleCreateSolicitor = () => {
  uni.navigateTo({
    url: `/pages/application/applicants/personal/solicitorForm?applicationId=${applicationInfo.value?.applicationId}`
  })
}

const handleCreateAccountant = () => {
  uni.navigateTo({
    url: `/pages/application/applicants/personal/accountantForm?applicationId=${applicationInfo.value?.applicationId}`
  })
}

const getCompanyList = async () => {
  const [e, r] = await api.getCompanies(applicationInfo.value?.applicationId || '')
  if (!e && r) {
    solicitorColumns.value = r
      .filter((item: any) => item.type === 'Solicitor')
      .map((item: any) => ({
        value: item.id,
        label: item.companyName
      }))
    AccountantColumns.value = r
      .filter((item: any) => item.type === 'Accountant')
      .map((item: any) => ({
        value: item.id,
        label: item.companyName
      }))
  }
}

const getLivingExpenses = async () => {
  const [e, r] = await api.getLivingExpenses(applicationInfo.value?.applicationId || '')
  if (!e && r) {
    livingExpenses.value = (r as unknown as Application.IHousehold[]).map((item) => ({
      value: item.id,
      label: item.name
    }))
  }
}

onShow(() => {
  getCompanyList()
  getLivingExpenses()
})
</script>

<style scoped lang="scss">
.head-wrap {
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: -32rpx;
    width: calc(100% + 64rpx);
    height: 1rpx;
    background-color: #e5e5e5;
  }
}
</style>
