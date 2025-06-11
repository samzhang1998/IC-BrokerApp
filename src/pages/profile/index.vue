<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
const { resetToken, userId } = useUser()

onMounted(() => {
  if (userId.value) {
    getUserInfo()
  } else {
    handleLogout()
  }
})

onShow(() => {})

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

const userInfo = ref<AnyObj>({})
const isOverview = ref(false)
const isCommissionAccount = ref(false)
const isQualifications = ref(false)

const handleShowOverview = () => {
  isOverview.value = !isOverview.value
}
const handleShowCommissionAccount = () => {
  isCommissionAccount.value = !isCommissionAccount.value
}
const handleShowQualifications = () => {
  isQualifications.value = !isQualifications.value
}

const handleLogout = () => {
  resetToken()
}

async function getUserInfo() {
  const [e, r] = await api.getUserInfo(userId.value)
  if (!e && r) {
    console.log(r)
    userInfo.value = r
  }
}

const handleSetting = () => {
  uni.navigateTo({
    url: '/pages/profile/setting'
  })
}
</script>

<template>
  <view class="home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title act">Profile</view>
      </template>
      <template #right> </template>
    </NavBar>

    <view class="content">
      <view class="user">
        <view class="box">
          <view class="top">
            <view class="left">
              <view class="name">{{ userInfo?.firstName }}{{ userInfo?.lastName }}</view>
              <view class="broker">Broker ID: {{ userInfo?.id }}</view>
            </view>
            <view class="right">{{ userInfo?.status === 1 ? 'Active' : 'InActive' }}</view>
          </view>
          <view class="bottom">
            <view>Date Create: {{ userInfo?.createdAt }}</view>
            <uni-icons type="gear-filled" color="#7A858E" size="20" @click="handleSetting"></uni-icons>
          </view>
        </view>
      </view>
      <view class="line" @click="handleShowOverview">
        <view class="title">Overview</view>
        <uni-icons :type="isOverview ? 'bottom' : 'right'" color="#7A858E" size="20"></uni-icons>
      </view>
      <view class="list" v-if="isOverview">
        <view class="header">
          <view class="title">Overview</view>
          <uni-icons type="compose" color="#7A858E" size="20"></uni-icons>
        </view>
        <uni-forms class="form" ref="loginForm" :modelValue="userInfo" label-position="top">
          <uni-forms-item class="item" label="Broker ID" name="id">
            {{ userInfo?.id }}
          </uni-forms-item>
          <uni-forms-item class="item" label="First Name" name="firstName">
            {{ userInfo?.firstName }}
            <!-- <uni-easyinput v-model="userInfo.firstName" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Last Name" name="lastName">
            {{ userInfo?.lastName }}
            <!-- <uni-easyinput v-model="userInfo.lastName" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Trading Business Name" name="businessName">
            {{ userInfo?.businessName }}
            <!-- <uni-easyinput v-model="userInfo.businessName" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="IC" name="ic">
            {{ userInfo?.ic }}
            <uni-easyinput v-model="userInfo.ic" />
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Accreditation Type" name="accreditationType">
            {{ userInfo?.accreditationType }}
            <!-- <uni-easyinput v-model="userInfo.accreditationType" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Office Phone" name="phone">
            {{ userInfo?.phone }}
            <!-- <uni-easyinput v-model="userInfo.phone" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="FAX" name="fax">
            {{ userInfo?.fax }}
            <!-- <uni-easyinput v-model="userInfo.fax" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="BDM" name="bdmId">
            {{ userInfo?.bdmId }}
            <!-- <uni-easyinput v-model="userInfo.bdmId" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="ABN" name="abn">
            {{ userInfo?.abn }}
            <!-- <uni-easyinput v-model="userInfo.abn" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Status" name="status">
            {{ userInfo?.status === 1 ? 'Active' : 'InActive' }}
            <!-- <uni-easyinput v-model="userInfo.status" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Entity Type" name="entityType">
            {{ userInfo?.entityType }}
            <!-- <uni-easyinput v-model="userInfo.entityType" /> -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Website" name="password">
            {{ userInfo?.website }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <view class="title">Email Address</view>
          <uni-forms-item class="item" label="Primary Email" name="emailList">
            {{ userInfo?.emailList[0].email }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <view class="title">Billing Address</view>
          <uni-forms-item class="item" label="Country" name="country">
            {{ userInfo?.country }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="State/Region" name="state">
            {{ userInfo?.state }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="City" name="city">
            {{ userInfo?.city }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Street" name="street">
            {{ userInfo?.street }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Postcode" name="postalCode">
            {{ userInfo?.postalCode }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Director(s)/Sole Trader" name="soleTrader">
            {{ userInfo?.soleTrader }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Trustee Name" name="trusteeName">
            {{ userInfo?.trusteeName }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="line" @click="handleShowCommissionAccount">
        <view class="title">Commission Account</view>
        <uni-icons :type="isOverview ? 'bottom' : 'right'" color="#7A858E" size="20"></uni-icons>
      </view>
      <view class="list" v-if="isCommissionAccount">
        <view class="header">
          <view class="title">Commission Account</view>
          <uni-icons type="compose" color="#7A858E" size="20"></uni-icons>
        </view>
        <uni-forms class="form" ref="loginForm" :modelValue="userInfo" label-position="top">
          <uni-forms-item class="item" label="Bank Name" name="bankName">
            {{ userInfo?.bankName }}
          </uni-forms-item>
          <uni-forms-item class="item" label="Bank Account Name" name="bankAccountName">
            {{ userInfo?.bankAccountName }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="BSB" name="bsb">
            {{ userInfo?.bsb }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Account No" name="accountNumber">
            {{ userInfo?.accountNumber }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Contact Name for Commission" name="commissionContactName">
            {{ userInfo?.commissionContactName }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Email for Commission" name="commissionContactEmail">
            {{ userInfo?.commissionContactEmail }}
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
        </uni-forms>
      </view>
      <view class="line" @click="handleShowQualifications">
        <view class="title">Qualifications & Checklist</view>
        <uni-icons :type="isOverview ? 'bottom' : 'right'" color="#7A858E" size="20"></uni-icons>
      </view>
      <view class="list" v-if="isQualifications">
        <!-- <view class="header">
          <view class="title">Commission Account</view>
          <uni-icons type="compose" color="#7A858E" size="20"></uni-icons>
        </view> -->
        <uni-forms class="form" ref="loginForm" :modelValue="userInfo" label-position="top">
          <uni-forms-item class="item" label="CRN" name="bankName">
            <!-- {{ userInfo?.bankName }} -->
          </uni-forms-item>
          <uni-forms-item class="item" label="ACL" name="bankAccountName">
            <!-- {{ userInfo?.bankAccountName }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="MFAA/FBAA" name="bsb">
            <!-- {{ userInfo?.bsb }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="AFCA 1" name="accountNumber">
            <!-- {{ userInfo?.accountNumber }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="AFCA 2" name="commissionContactName">
            <!-- {{ userInfo?.commissionContactName }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Photographic ID" name="commissionContactEmail">
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Training Certificate" name="commissionContactEmail">
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Financial Service Certificate" name="commissionContactEmail">
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item
            class="item"
            label="Bank Statement with bank details reflection corresponding name of agreement"
            name="commissionContactEmail"
          >
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item
            class="item"
            label="Copy of current resume and a brief business description."
            name="commissionContactEmail"
          >
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item class="item" label="Organisation chart/Corporate structure." name="commissionContactEmail">
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
          <uni-forms-item
            class="item"
            label="Trust Deed (if applying for accreditation with a Trust)"
            name="commissionContactEmail"
          >
            <!-- {{ userInfo?.commissionContactEmail }} -->
            <!-- <uni-easyinput /> -->
          </uni-forms-item>
        </uni-forms>
      </view>
    </view>

    <TabBar></TabBar>
  </view>
</template>

<style lang="scss" scoped>
.content {
  padding: 0 40rpx;

  .user {
    background: #fcfcfc;
    border: 1px solid #e8ebee;
    height: 274rpx;
    border-radius: 20rpx;
    padding: 20rpx;

    .box {
      background: #ffffff;
      border: 1px solid #e8ebee;
      height: 234rpx;
      border-radius: 16rpx;
      padding: 20rpx;

      .top {
        display: flex;
        justify-content: space-between;
        padding: 20rpx 0;
        border-bottom: 1px solid #e8ebee;

        .name {
          font-size: 36rpx;
          color: #000000;
        }

        .broker {
          padding-top: 10rpx;
          font-size: 28rpx;
          color: #7a858e;
        }

        .right {
          border-radius: 30rpx;
          padding: 0 20rpx;
          background: rgba(28, 187, 140, 0.15);
          color: #1cbb8c;
          font-size: 24rpx;
          height: 40rpx;
          line-height: 40rpx;
        }
      }

      .bottom {
        padding-top: 20rpx;
        display: flex;
        justify-content: space-between;
        color: #939393;
        font-size: 28rpx;
      }
    }
  }

  .line {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 64rpx;
    margin: 32rpx 0;

    .title {
      color: #384144;
      font-size: 32rpx;
    }
  }

  .list {
    border: 1px solid #e8ebee;
    border-radius: 16rpx;
    min-height: 300rpx;

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
        height: 120rpx !important;
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
    }
  }
}
</style>
