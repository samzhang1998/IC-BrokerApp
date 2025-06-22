<template>
  <BasePage title="Notification" hasBack>
    <view class="flex-col h-full content">
      <view class="flex items-center justify-between" v-if="todayList.length > 0">
        <view class="text">
          Today
          <text class="text-primary">{{ todayList.length }}</text>
        </view>
        <!-- <view class="read-all" @click="handleReadAll">Read All</view> -->
      </view>
      <view class="item" v-for="item in todayList" :key="item.id">
        <view class="flex justify-between items-start">
          <view class="title">{{ item.title }}</view>
          <view class="time">{{ item.time }}</view>
        </view>
        <view class="content">{{ item.content }}</view>
      </view>
      <view class="text">Past</view>
      <view class="item" v-for="item in pastList" :key="item.id">
        <view class="flex justify-between items-start">
          <view class="title">{{ item.title }}</view>
          <view class="time">{{ item.time }}</view>
        </view>
        <view class="content">{{ item.content }}</view>
      </view>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import dayjs from 'dayjs'

const userStore = useUserStore()

onMounted(() => {
  getList()
})
const pageNum = ref(0)

const todayList = ref<AnyObj[]>([])
const pastList = ref<AnyObj[]>([])

async function handleReadAll() {
  const [e, r] = await api.readAll({})
  if (!e && r) {
    console.log('🚀 ~ handleReadAll ~ r:', r)
  }
}

async function getList() {
  let params = {
    page: pageNum.value,
    size: 20,
    unreadOnly: false
  }
  const [e, r] = await api.getNotificationsList(params)
  if (!e && r) {
    const data = r?.data?.content || []
    if (pageNum.value > 0) {
      if (data <= 0) {
        pageNum.value = pageNum.value - 1
        uni.showToast({
          icon: 'none',
          title: `There's no more`
        })
      }
    }
    for (let i = 0; i < data.length; i++) {
      data[i].time = formatTimeInterval(data[i]?.createdAt)
      if (checkDateStatus(data[i]?.createdAt)) {
        todayList.value.push(data[i])
      } else {
        pastList.value.push(data[i])
      }
    }
  }
}
const checkDateStatus = (date: any) => {
  date = dayjs(date)
  const today = dayjs()
  if (date.isSame(today, 'day')) {
    return true
  } else if (date.isBefore(today, 'day')) {
    return false
  }
}

/**
 * 智能格式化时间间隔
 * @param {string|Date} startTime - 开始时间
 * @param {string|Date} endTime - 结束时间（默认为当前时间）
 * @returns {string} 格式化后的字符串（如 "5分钟前"、"3小时前"、"2天前"）
 */
function formatTimeInterval(startTime: any, endTime = dayjs()) {
  const start = dayjs(startTime)
  const end = dayjs(endTime)
  const minutesDiff = end.diff(start, 'minute', true)
  const hoursDiff = end.diff(start, 'hour', true)
  const daysDiff = end.diff(start, 'day', true)

  if (minutesDiff < 1) {
    return 'Just now' // Less than 1 minute
  } else if (minutesDiff < 60) {
    return `${Math.floor(minutesDiff)} minute${minutesDiff >= 2 ? 's' : ''} ago` // e.g., "5 minutes ago"
  } else if (hoursDiff < 24) {
    return `${Math.floor(hoursDiff)} hour${hoursDiff >= 2 ? 's' : ''} ago` // e.g., "3 hours ago"
  } else {
    return `${Math.floor(daysDiff)} day${daysDiff >= 2 ? 's' : ''} ago` // e.g., "2 days ago"
  }
}
onReachBottom(() => {
  pageNum.value = pageNum.value + 1
  getList()
})
</script>

<style lang="scss" scoped>
.content {
  padding: 70rpx 0 50rpx;
}
.text {
  color: #7a858e;
  font-size: 32rpx;
  padding: 12rpx;
}

.item {
  border: 1px solid #e8ebee;
  min-height: 120rpx;
  border-radius: 16rpx;
  padding: 20rpx;
  font-size: 24rpx;

  .title {
    color: #384144;
    flex: 1;
  }

  .time {
    color: #7a858e;
  }

  .content {
    color: #384144;
    padding-top: 20rpx;
  }
}

.item + .item {
  margin-top: 20rpx;
}

.text-primary {
  color: #fff;
  background: #ff754c;
  font-size: 20rpx;
  padding: 0 10rpx;
  border-radius: 12rpx;
}
</style>
