<script setup lang="ts">
import { injectStrict } from '@/utils'
import { ProfileKey } from '../types'
import useProfile from '../hooks/useProfile'

const { userInfo, handleReset } = injectStrict(ProfileKey)
const { editUserInfo } = useProfile()

const isEdit = ref(false)
const overviewForm = ref<any>(null)
const formData = ref<AnyObj>({
  id: '',
  firstName: '',
  lastName: '',
  businessName: '',
  ic: true,
  accreditationType: '',
  phone: '',
  fax: '',
  bdmId: '',
  abn: '',
  status: 1,
  entityType: '',
  website: '',
  email: '',
  country: '',
  state: '',
  city: '',
  street: '',
  postalCode: '',
  soleTrader: '',
  trusteeName: ''
})

watchEffect(() => {
  formData.value = {
    id: userInfo.value.id,
    firstName: userInfo.value.firstName,
    lastName: userInfo.value.lastName,
    businessName: userInfo.value.businessName,
    ic: userInfo.value.ic,
    accreditationType: userInfo.value.accreditationType,
    phone: userInfo.value.phone,
    fax: userInfo.value.fax,
    bdmId: userInfo.value.bdmId,
    abn: userInfo.value.abn,
    status: userInfo.value.status,
    entityType: userInfo.value.entityType,
    website: userInfo.value.website,
    email: userInfo.value.email,
    country: userInfo.value.country,
    state: userInfo.value.state,
    city: userInfo.value.city,
    street: userInfo.value.street,
    postalCode: userInfo.value.postalCode,
    soleTrader: userInfo.value.soleTrader,
    trusteeName: userInfo.value.trusteeName
  }
})

const rules = {
  firstName: {
    rules: [
      {
        required: true,
        errorMessage: 'please input First Name'
      }
    ]
  },
  lastName: {
    rules: [
      {
        required: true,
        errorMessage: 'please input Last Name'
      }
    ]
  },
  businessName: {
    rules: [
      {
        required: true,
        errorMessage: 'please input Trading/Business Name'
      }
    ]
  },
  bdmId: {
    rules: [
      {
        required: true,
        errorMessage: 'please input BDM'
      }
    ]
  },
  phone: {
    rules: [
      {
        required: true,
        errorMessage: 'please input Phone'
      }
    ]
  },
  email: {
    rules: [
      {
        required: true,
        errorMessage: 'please input Primary Email'
      }
    ]
  }
}
const columns = ref([
  {
    text: 'Active',
    value: 1
  },
  {
    text: 'InActive',
    value: 0
  }
])

function handleConfirm({ value }: any) {
  formData.value.status = value
}

const handleSave = () => {
  overviewForm.value
    .validate()
    .then(() => {
      editUserInfo(formData.value, handleResetBack)
    })
    .catch((err: any) => {
      console.log('err', err)
    })
}

const handleResetBack = () => {
  isEdit.value = false
  handleReset()
}
</script>

<template>
  <view class="list">
    <view class="header">
      <view class="title">Overview</view>
      <view>
        <uni-icons type="compose" color="#7A858E" size="20" v-if="!isEdit" @click="isEdit = true"></uni-icons>
        <view class="text-primary" v-if="isEdit" @click="handleSave">Save</view>
      </view>
    </view>
    <uni-forms class="form" ref="overviewForm" :model="formData" :rules="rules" label-position="top">
      <uni-forms-item class="item" label="Broker ID" name="id" v-if="!isEdit">
        <view class="flex items-center text">{{ formData?.id }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="First Name" name="firstName" :required="isEdit">
        <uni-easyinput v-model="formData.firstName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.firstName }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Last Name" name="lastName" :required="isEdit">
        <uni-easyinput v-model="formData.lastName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.lastName }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Trading Business Name" name="businessName" :required="isEdit">
        <uni-easyinput v-model="formData.businessName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.businessName }}</view>
      </uni-forms-item>
      <uni-forms-item class="item line" name="ic">
        <template #label>
          <view style="display: flex; align-items: center; width: 80px">IC</view>
        </template>
        <view class="flex items-center justify-end">
          <wd-switch v-model="formData.ic" :disabled="!isEdit" />
        </view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Accreditation Type" name="accreditationType">
        <uni-easyinput v-model="formData.accreditationType" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.accreditationType }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Office Phone" name="phone" :required="isEdit">
        <uni-easyinput v-model="formData.phone" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.phone }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="FAX" name="fax">
        <uni-easyinput v-model="formData.fax" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.fax }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="BDM" name="bdmId" :required="isEdit">
        <uni-easyinput v-model="formData.bdmId" type="number" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.bdmId }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="ABN" name="abn">
        <uni-easyinput v-model="formData.abn" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.abn }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Status" name="status">
        <wd-picker
          :columns="columns"
          value-key="value"
          label-key="text"
          v-model="formData.status"
          @confirm="handleConfirm"
          v-if="isEdit"
        />
        <view class="flex items-center text" v-else>{{ formData?.status === 1 ? 'Active' : 'InActive' }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Entity Type" name="entityType">
        <uni-easyinput v-model="formData.entityType" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.entityType }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Website" name="website">
        <uni-easyinput v-model="formData.website" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.website }}</view>
      </uni-forms-item>
      <view class="title">Email Address</view>
      <uni-forms-item class="item" label="Primary Email" name="email" :required="isEdit">
        <uni-easyinput v-model="formData.email" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.email }}</view>
      </uni-forms-item>
      <view class="title">Billing Address</view>
      <uni-forms-item class="item" label="Country" name="country">
        <uni-easyinput v-model="formData.country" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.country }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="State/Region" name="state">
        <uni-easyinput v-model="formData.state" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.state }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="City" name="city">
        <uni-easyinput v-model="formData.city" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.city }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Street" name="street">
        <uni-easyinput v-model="formData.street" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.street }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Postcode" name="postalCode">
        <uni-easyinput v-model="formData.postalCode" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.postalCode }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Director(s)/Sole Trader" name="soleTrader">
        <uni-easyinput v-model="formData.soleTrader" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.soleTrader }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Trustee Name" name="trusteeName">
        <uni-easyinput v-model="formData.trusteeName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.trusteeName }}</view>
      </uni-forms-item>
    </uni-forms>
  </view>
</template>

<style scoped lang="scss">
.list {
  border: 1px solid #e8ebee;
  border-radius: 16rpx;
  min-height: 300rpx;

  .text-primary {
    color: #ff754c;
    font-size: 32rpx;
  }

  .header {
    border-bottom: 1px solid #e8ebee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 96rpx;
    padding: 0 20rpx;
    color: #384144;
    font-size: 32rpx;
  }

  .form {
    padding: 20rpx;

    .item {
      min-height: 150rpx !important;

      .text {
        height: 60rpx;
        color: #7a858e;
        font-size: 28rpx;
      }
    }

    .line {
      display: flex;
      justify-content: space-between !important;
      align-items: center !important;
      flex-direction: row !important;
    }

    .item + .item {
      border-top: 1px solid #e8ebee;
    }

    .title {
      border-top: 1px solid #e8ebee;
      border-bottom: 1px solid #e8ebee;
      font-size: 32rpx;
      height: 80rpx;
      display: flex;
      align-items: center;
    }

    ::v-deep .uni-forms-item__label {
      width: 100% !important;
    }

    ::v-deep .uni-forms-item {
      margin-bottom: 0;
    }

    ::v-deep .uni-forms-item__error {
      position: static !important;
    }
  }
}
</style>
