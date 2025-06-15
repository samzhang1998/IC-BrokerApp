<script setup lang="ts">
import { injectStrict } from '@/utils'
import { ProfileKey } from '../types'
import useProfile from '../hooks/useProfile'

const { userInfo, handleReset } = injectStrict(ProfileKey)
const { editUserInfo } = useProfile()

const isEdit = ref(false)
const accountForm = ref<any>(null)
const formData = ref<AnyObj>({
  bankName: '',
  bankAccountName: '',
  bsb: '',
  accountNumber: '',
  commissionContactName: '',
  commissionContactEmail: ''
})

watchEffect(() => {
  formData.value = {
    bankName: userInfo.value.bankName,
    bankAccountName: userInfo.value.bankAccountName,
    bsb: userInfo.value.bsb,
    accountNumber: userInfo.value.accountNumber,
    commissionContactName: userInfo.value.commissionContactName,
    commissionContactEmail: userInfo.value.commissionContactEmail
  }
})

const handleSave = () => {
  accountForm.value
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
      <view class="title">Commission Account</view>
      <view>
        <uni-icons type="compose" color="#7A858E" size="20" v-if="!isEdit" @click="isEdit = true"></uni-icons>
        <view class="text-primary" v-if="isEdit" @click="handleSave">Save</view>
      </view>
    </view>
    <uni-forms class="form" ref="accountForm" :model="formData" label-position="top">
      <uni-forms-item class="item" label="Bank Name" name="bankName">
        <uni-easyinput v-model="formData.bankName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.bankName }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Bank Account Name" name="bankAccountName">
        <uni-easyinput v-model="formData.bankAccountName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.bankAccountName }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="BSB" name="bsb">
        <uni-easyinput v-model="formData.bsb" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.bsb }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Account No" name="accountNumber">
        <uni-easyinput v-model="formData.accountNumber" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.accountNumber }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Contact Name for Commission" name="commissionContactName">
        <uni-easyinput v-model="formData.commissionContactName" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.commissionContactName }}</view>
      </uni-forms-item>
      <uni-forms-item class="item" label="Email for Commission" name="commissionContactEmail">
        <uni-easyinput v-model="formData.commissionContactEmail" v-if="isEdit" />
        <view class="flex items-center text" v-else>{{ formData?.commissionContactEmail }}</view>
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
