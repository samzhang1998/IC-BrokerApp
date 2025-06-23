<script setup lang="ts">
import dashboard1 from '@/static/icon/dashboard-1.png'
import dashboard2 from '@/static/icon/dashboard-2.png'
import dashboard3 from '@/static/icon/dashboard-3.png'
import dashboard4 from '@/static/icon/dashboard-4.png'
import { ApplicationItem } from '@/components'
import { useUser } from '@/hooks/useUser'

const { userId } = useUser()
const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

const dashboardList = ref([
  {
    id: 1,
    title: 'Submit to IC',
    value: '36',
    icon: dashboard1
  },
  {
    id: 2,
    title: 'Conditional Approval',
    value: '14',
    icon: dashboard2
  },
  {
    id: 3,
    title: 'Formal Approval',
    value: '24',
    icon: dashboard3
  },
  {
    id: 4,
    title: 'Settled',
    value: '24',
    icon: dashboard4
  }
])

const pageNum = ref(0)

async function getStatistics() {
  const [e, r] = await api.getStatistics({})
  if (!e && r) {
    // console.log('🚀 ~ getStatistics ~ r:', r)
    dashboardList.value[0].value = r[0].count
    dashboardList.value[1].value = r[5].count
    dashboardList.value[2].value = r[6].count
    dashboardList.value[3].value = r[11].count
  }
}

const applicationList = ref<Application.IApplication[]>([])

// const fetchApplicationList = async () => {
//   const [e, res] = await api.getApplicationListByActive({})
//   if (!e && res) {
//     console.log(res)
//     applicationList.value = res.content
//   }
// }

const fetchApplicationList = async () => {
  const params = {
    limit: 10,
    offset: pageNum.value,
    status: 'ACTIVE',
    brokerId: userId.value
  }
  const [e, res] = await api.getApplicationList(params)
  if (!e && res) {
    if (pageNum.value === 0) {
      applicationList.value = res?.content || []
    } else {
      if (res?.content.length <= 0) {
        pageNum.value = pageNum.value - 1
        uni.showToast({
          icon: 'none',
          title: `There's no more`
        })
      } else {
        applicationList.value = applicationList.value.concat(res?.content || [])
      }
    }
  }
}

onShow(() => {
  fetchApplicationList()
  getStatistics()
})

onReachBottom(() => {
  pageNum.value = pageNum.value + 1
  fetchApplicationList()
})
</script>

<template>
  <view class="home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title">Dashboard</view>
      </template>
      <template #right></template>
    </NavBar>

    <view class="content">
      <view>Insight Overview</view>
      <view class="list">
        <view class="item" v-for="(item, index) in dashboardList" :key="index">
          <view class="icon">
            <image class="icon" :src="item.icon" mode="aspectFit"></image>
          </view>
          <view class="value">{{ item.value }}</view>
          <view class="title">{{ item.title }}</view>
        </view>
      </view>
      <view class="submit">
        <view class="header">
          <view class="title">Submit to IC</view>
          <view class="filter">
            <view class="text">Filter</view>
            <uni-icons type="bottom" color="#7A858E" size="16"></uni-icons>
          </view>
        </view>
        <view class="p-4 flex-col gap-20rpx">
          <view v-for="item in applicationList" :key="item.applicationId">
            <ApplicationItem :application="item"></ApplicationItem>
          </view>
        </view>
      </view>
    </view>

    <TabBar></TabBar>
  </view>
</template>

<style lang="scss" scoped>
.content {
  padding: 0 40rpx;

  .list {
    margin-top: 32rpx;
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    .item {
      width: calc(50% - 10rpx);
      height: 192rpx;
      border: 2rpx solid #e1e1e1;
      padding: 20rpx 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border-radius: 10rpx;

      .icon {
        width: 48rpx;
        height: 48rpx;
      }

      .value {
        color: #2e3538;
        font-weight: 600;
        font-size: 36rpx;
      }

      .title {
        font-weight: 400;
        font-size: 28rpx;
        color: #505d69;
      }
    }
  }

  .submit {
    margin: 32rpx 0;
    border: 1px solid #e7e8f2;
    border-radius: 12rpx;
    min-height: 300rpx;

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 90rpx;
      padding: 0 20rpx;
      border-bottom: 1px solid #e7e8f2;

      .title {
        font-weight: 600;
        font-size: 32rpx;
        color: #384144;
      }

      .filter {
        display: flex;
        align-items: center;
        padding: 0 16rpx;
        color: #7a858e;
        font-size: 24rpx;
        border: 1px solid #dadada;
        border-radius: 8rpx;
      }

      .text {
        margin-right: 4rpx;
      }
    }
  }
}
</style>
