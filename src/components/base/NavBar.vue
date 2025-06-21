<script setup lang="ts">
import { useUniFunction } from '@/hooks/useUniFunction'
import { useSystem } from '@/hooks/useSystem'
import { useUser } from '@/hooks/useUser'
const { backToOne } = useUniFunction()
const { token, roles } = useUser()
// import notificationIcon from '@/static/icon/notification.png'

interface NavbarProps {
  backgroundColor?: string
  title?: string
  textColor?: string
  // isCustom?: boolean
  isBack?: boolean
  isNotification?: boolean
  // isFixed?: boolean
  // isShare?: boolean
}

const props = withDefaults(defineProps<NavbarProps>(), {
  backgroundColor: '#fff',
  title: '',
  textColor: '#BE9670',
  // isCustom: false,
  isBack: false
  // isFixed: true,
  // isShare: false
})
const { systemInfo } = useSystem()
// console.log(systemInfo.value)

const navbarStyle = computed(() => {
  return {
    background: `${props.backgroundColor}`,
    width: `100%`
  }
})
const titleStyle = computed(() => {
  return {
    color: `${props.textColor}`
  }
})
const statusBarStyle = computed(() => {
  return {
    height: `${systemInfo.value?.safeAreaInsets.top}px`,
    width: `100%`
  }
})
// console.log('🚀 ~ statusBarStyle ~ statusBarStyle:', statusBarStyle.value)

const notifyListLength = ref<number>(0)
const userRole = ref('')

onMounted(() => {
  if (token.value && props.isNotification) {
    userRole.value = roles.value.includes('client') ? 'client' : 'visitor'
    getNotify()
  }
})

const handleBack = () => {
  backToOne()
}

const handleToNotify = () => {
  if (token.value) {
    // notifyListLength.value
    uni.navigateTo({
      url: '/pages/notifications/index'
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: 'please login'
    })
  }
}

async function getNotify() {
  const [e, r] = await api.unreadCount()
  if (!e && r) {
    notifyListLength.value = r?.data?.unreadCount || 0
  }
}
</script>
<template>
  <view class="navbar" :style="navbarStyle">
    <view :style="statusBarStyle"></view>
    <view class="container">
      <view class="flex justify-between align-center">
        <view class="left">
          <uni-icons type="back" size="20" :color="textColor" v-if="props.isBack" @click="handleBack"></uni-icons>
          <slot name="content" />
        </view>
        <view class="center" :style="titleStyle"> {{ props.title }} </view>
        <view class="right">
          <slot name="right" />
          <view class="pos-icon" v-if="props.isNotification">
            <image class="icon" src="../../static/icon/notifications.png" @click="handleToNotify"></image>
            <div class="round" v-if="notifyListLength > 0"></div>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  // background: #000;
  position: sticky;
  top: 0;
  z-index: 9;

  .container {
    padding: 20px;
    min-height: 60rpx;
    overflow: hidden;
    // background: #000;

    .center {
      // background: #fff;
      font-size: 42rpx;
      font-weight: 600;
    }

    // .left {
    // }

    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 80rpx;
      height: 80rpx;
      .icon {
        width: 40rpx;
        height: 40rpx;
      }

      .pos-icon {
        position: relative;
        width: 80rpx;
        height: 80rpx;
        background: #fff;
        box-shadow: 0px 8rpx 8rpx 0px #d5d5d540;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .round {
          position: absolute;
          width: 10rpx;
          height: 10rpx;
          top: 10rpx;
          right: 10rpx;
          background: #e92c2c;
          border-radius: 5000rpx;
        }
      }
    }
  }
}
</style>
