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

const notifyList = ref<AnyObj[]>([])
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
    notifyList.value = []
    uni.navigateTo({
      url: '/pages/notification/notification'
    })
  } else {
    uni.showToast({
      icon: 'none',
      title: 'please login'
    })
  }
}

async function getNotify() {
  let params = {
    pageNum: 1,
    pageSize: 10,
    readFlag: false
  }
  const [e, r] = await api.getNotify(params)
  if (!e && r) {
    if (r?.success) {
      // console.log('🚀 ~ file: NavBar.vue:62 ~ getNotify ~ r:', r)
      notifyList.value = r?.data?.list || []
    }
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
            <div class="round" v-if="notifyList.length > 0 && userRole === 'client'"></div>
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
  z-index: 98;

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
      background: #fff;
      box-shadow: 0px 8rpx 8rpx 0px #d5d5d540;
      border-radius: 50%;
      .icon {
        width: 40rpx;
        height: 40rpx;
      }

      .pos-icon {
        position: relative;

        .round {
          position: absolute;
          width: 10rpx;
          height: 10rpx;
          top: 2rpx;
          right: 6rpx;
          background: #e92c2c;
          border-radius: 5000rpx;
        }
      }
    }
  }
}
</style>
