<script setup lang="ts">
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/hooks/useUser'
import { useUniFunction } from '@/hooks/useUniFunction'

const lang = ref(false)
const { t, handleLanguageChange } = useLocale()
const { token, setUserInfo } = useUser()
const { backToOne } = useUniFunction()
const pinStatus = ref(false)

const handleChange = () => {
  lang.value = !lang.value
  handleLanguageChange(lang.value ? 'en' : 'zh-Hans')
  navBar.value.title = t('login.login')
}

const navBar = ref({
  title: t('login.login'),
  backgroundColor: 'transparent',
  textColor: '#fff',
  isBack: true
})

const loginForm = ref<any>(null)
// const isRegister = ref(false)

onLoad(() => {
  if (token.value) {
    uni.reLaunch({
      url: '/pages/index/index'
    })
  }
})

onShow(() => {
  lang.value = uni.getLocale() === 'en'
  // getType()
})

const privacy = ref(false)

const loginFormData = ref({
  email: '',
  password: ''
})

const rules = {
  email: {
    rules: [
      {
        required: true,
        errorMessage: 'please input your email'
      }
    ]
  },
  password: {
    rules: [
      {
        required: true,
        errorMessage: 'please input your password'
      }
    ]
  }
}

const handleCheck = () => {
  privacy.value = !privacy.value
}

const handleForget = () => {
  uni.navigateTo({
    url: '/pages/login/change'
  })
}

// const handleRegister = () => {
//   uni.navigateTo({
//     url: '/pages/login/register'
//   })
// }

const handleVisitor = () => {
  uni.navigateTo({
    url: '/pages/login/visitor'
  })
}

const handleLogin = () => {
  if (!privacy.value) {
    uni.showToast({
      title: 'Please view privacy policy',
      icon: 'none'
    })
    return
  }
  loginForm.value
    .validate()
    .then(() => {
      userLogin()
    })
    .catch((err: any) => {
      console.log('err', err)
    })
}

async function userLogin() {
  let params = loginFormData.value
  const [e, r] = await api.userLogin(params)
  if (!e && r) {
    if (r?.success) {
      let userInfo: IUserState = {
        token: r.data.token,
        roles: ['client'],
        clientEmail: r.data.clientEmail
      }
      uni.setStorageSync('userInfo', userInfo)
      setUserInfo(userInfo)
      getInfo()
    }
  }
}

const handleShowPrivate = () => {
  uni.navigateTo({
    url: '/pages/login/private'
  })
}

const handleShowTerms = () => {
  uni.navigateTo({
    url: '/pages/login/terms'
  })
}

// const getType = async () => {
//   let params = {}
//   const [e, r] = await api.isRegister(params)
//   if (!e && r) {
//     console.log('🚀 ~ getType ~ r:', r)
//     isRegister.value = r.data
//   }
// }

async function getInfo() {
  if (!token.value) return
  let params = {}
  const [e, r] = await api.getUserInfo(params)

  if (!e && r) {
    if (r?.success) {
      // userInfo.value = r?.data || {}
      pinStatus.value = r?.data?.enablePin || false
      // const pages = getCurrentPages()
      // const currentPage = pages[pages.length - 1]

      // // 获取页面路径
      // const pagePath = currentPage.route
      // console.log('当前页面路径:', pagePath)
      if (pinStatus.value) {
        uni.redirectTo({
          url: '/pages/user/checkPin?type=check'
        })
      } else {
        // backToOne()
        uni.redirectTo({
          url: '/pages/index/index'
        })
      }
    }
  }
}
</script>

<template>
  <view class="login">
    <NavBar v-bind="navBar"></NavBar>
    <view class="lang">
      <view></view>
      <view class="flex align-center justify-center" @click="handleChange">
        {{ lang ? 'English' : '中文' }}
        <uni-icons type="bottom" color="#fff" size="16"></uni-icons>
      </view>
    </view>
    <view class="logo">
      <image class="bg" src="../../static/images/logo.png"></image>
      <view class="text">{{ $t('login.welcome') }}</view>
      <view class="text">{{ $t('login.name') }}</view>
    </view>

    <view class="form">
      <uni-forms ref="loginForm" :rules="rules" :modelValue="loginFormData" label-position="top">
        <uni-forms-item :label="$t('login.email') + ':'" name="email">
          <uni-easyinput v-model="loginFormData.email" placeholder="" />
        </uni-forms-item>
        <uni-forms-item :label="$t('login.password') + ':'" name="password">
          <uni-easyinput v-model="loginFormData.password" placeholder="" type="password" />
          <view class="flex justify-between align-center">
            <view class="visitor" @click="handleVisitor">{{ $t('login.visitor') }}</view>
            <view class="forget" @click="handleForget">{{ $t('login.forget') }}?</view>
          </view>
        </uni-forms-item>
      </uni-forms>

      <view class="login-btn" @click="handleLogin">{{ $t('login.login') }}</view>
      <!-- //v-if="isRegister" -->
      <!-- <view class="register-btn" @click="handleRegister">{{ $t('login.login4') }}</view> -->
    </view>

    <view class="privacy">
      <radio :checked="privacy" color="#be9670" style="transform: scale(0.6)" @click="handleCheck" />
      <!-- {{ $t('login.privacy') }} -->
      {{ $t('login.login1') }} <text class="ts" @click="handleShowPrivate">{{ $t('login.login2') }}</text
      >,<text class="ts" @click="handleShowTerms">{{ $t('login.login3') }}</text>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: url('../../static/images/login-bg.png') no-repeat center;
  background-size: 100% 100%;
  position: relative;

  .lang {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    font-size: 32rpx;
    font-style: normal;
    font-weight: 400;
    padding: 0 60rpx;
  }

  .logo {
    padding-top: 100rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .bg {
      display: block;
      width: 140rpx;
      height: 160rpx;
      margin-bottom: 20rpx;
    }

    .text {
      color: #fff;
      font-size: 44rpx;
      font-style: normal;
      font-weight: 500;
      line-height: 1.3;
    }
  }

  .form {
    padding: 66rpx 56rpx 0;

    .login-btn {
      // position: absolute;
      // bottom: 0;
      // left: 56rpx;
      // width: calc(100% - 112rpx);
      margin-top: 40px;
      height: 80rpx;
      border-radius: 10rpx;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #be9670;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 500;
    }

    .register-btn {
      position: absolute;
      bottom: 200rpx;
      left: 56rpx;
      width: calc(100% - 112rpx);
      height: 80rpx;
      border-radius: 10rpx;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #be9670;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 500;
    }

    .forget {
      color: #fff;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 400;
      padding-top: 10rpx;
    }

    .visitor {
      color: #fff;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 400;
      padding-top: 10rpx;
    }

    ::v-deep .uni-forms-item__label {
      color: #fff;
    }

    ::v-deep .uni-easyinput__content {
      border: none;
    }

    ::v-deep .uni-forms-item__error {
      color: #fff;
    }

    ::v-deep .content-clear-icon {
      color: #be9670 !important;
    }
  }

  .privacy {
    width: 100%;
    border-top: 1rpx solid #ececec;
    height: calc(86rpx + env(safe-area-inset-bottom) / 2);
    padding-bottom: calc(env(safe-area-inset-bottom) / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    bottom: 0;
    color: #fff;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;

    .ts {
      text-decoration: underline;
      padding-left: 10rpx;
    }
  }
}
</style>
