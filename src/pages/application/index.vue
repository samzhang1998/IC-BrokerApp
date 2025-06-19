<script setup lang="ts">
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/hooks/useUser'
import applicationTab from '@/static/icon/application-tab.png'
import applicationTabAct from '@/static/icon/application-tab-cur.png'
import progressTab from '@/static/icon/application-tab0.png'
import progressTabAct from '@/static/icon/application-tab0-cur.png'

import { ApplicationItem, Search } from '@/components'

const { token, roles } = useUser()
const { langStatus } = useLocale()

onMounted(() => {
  fetchApplicationList()
})

onShow(() => {})

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

const tabActive = ref(0)
const applicationList = ref<Application.IApplication[]>([])
const searchParams = ref({
  limit: 10,
  offset: 0,
  status: 'DRAFT'
})

const fetchApplicationList = async () => {
  const [e, res] = await api.getApplicationList(searchParams.value)
  if (!e && res) {
    console.log(res)
    applicationList.value = res.content
  }
}

const handleActive = (index: number) => {
  tabActive.value = index
  searchParams.value.status = index === 0 ? 'DRAFT' : 'SUBMITTED'
  fetchApplicationList()
}

const handleToCreate = () => {
  uni.navigateTo({
    url: '/pages/application/create'
  })
}
</script>

<template>
  <view class="home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title act">Application</view>
      </template>
      <template #right> </template>
    </NavBar>

    <view class="content">
      <Search></Search>
      <view class="tab-wrapper">
        <view class="flex-y-center">
          <view :class="[tabActive === 0 ? 'item act' : 'item', 'flex-y-center shrink-0']" @click="handleActive(0)">
            <image class="icon" :src="tabActive === 0 ? progressTabAct : progressTab" mode="aspectFit"></image>
            Draft
          </view>
          <view :class="tabActive === 1 ? 'item act' : 'item'" @click="handleActive(1)">
            <image class="icon" :src="tabActive === 1 ? applicationTabAct : applicationTab" mode="aspectFit"></image>
            Submitted
          </view>
        </view>
        <view class="add-btn flex-y-center shrink-0" @click="handleToCreate">
          <uni-icons type="plusempty" color="#FF754C" size="16"></uni-icons>
          Add New Application
        </view>
      </view>

      <view class="list">
        <view class="item" v-for="item in applicationList" :key="item.applicationId">
          <ApplicationItem :application="item"></ApplicationItem>
        </view>
      </view>
    </view>

    <TabBar></TabBar>
  </view>
</template>

<style lang="scss" scoped>
.content {
  .tab-wrapper {
    height: 68rpx;
    border-bottom: 1px solid #e8ebee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 40rpx;
    margin-top: 28rpx;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #384144;
      font-size: 24rpx;
      position: relative;
      height: 68rpx;
    }

    .icon {
      width: 40rpx;
      height: 40rpx;
      margin-right: 10rpx;
    }

    .item + .item {
      margin-left: 30rpx;
    }

    .act {
      color: #ff754c;
    }

    .act::after {
      content: '';
      display: block;
      width: 100%;
      position: absolute;
      height: 6rpx;
      background: #ff754c;
      bottom: 0;
      left: 0;
    }

    .add-btn {
      color: #ff754c;
      margin-left: 30rpx;
      font-size: 24rpx;
    }
  }

  .list {
    padding: 32rpx 40rpx;

    .item {
      background: #fcfcfc;
      border-radius: 16rpx;
    }

    .item + .item {
      margin-top: 20rpx;
    }
  }
}
</style>
