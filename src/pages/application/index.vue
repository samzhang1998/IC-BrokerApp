<script setup lang="ts">
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/hooks/useUser'
import applicationTab from '@/static/icon/application-tab.png'
import applicationTabAct from '@/static/icon/application-tab-cur.png'
import progressTab from '@/static/icon/application-tab0.png'
import progressTabAct from '@/static/icon/application-tab0-cur.png'
import { useApplicationStore } from '@/store/modules/application'

import { ApplicationItem, Search } from '@/components'
import { useUserStore } from '@/store/modules/user'
import dayjs from 'dayjs'

const { token, roles } = useUser()
const { langStatus } = useLocale()
const applicationStore = useApplicationStore()
const userStore = useUserStore()
const { userInfo } = toRefs(userStore)
const show = ref(false)

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
const searchParams = ref<AnyObj>({
  limit: 10,
  offset: 0,
  status: 'DRAFT',
  brokerId: userInfo.value?.id
})
const dateValue = ref<number[]>([])
const documents = ref([
  { value: 'Full Doc', label: 'Full Doc' },
  { value: 'Loc Doc', label: 'Loc Doc' },
  { value: 'Expat Doc', label: 'Expat Doc' },
  { value: 'Lease Doc', label: 'Lease Doc' }
])
const documentValue = ref<string>('')
const inputValue = ref<string>('')

const fetchApplicationList = async () => {
  let params = JSON.parse(JSON.stringify(searchParams.value))
  if (documentValue.value) {
    params.documentType = documentValue.value
  }
  if (dateValue.value.length > 0) {
    params.startTime = dayjs(dateValue.value[0]).format('YYYY-MM-DD')
    params.endTime = dayjs(dateValue.value[1]).format('YYYY-MM-DD')
  }
  if (inputValue.value) {
    params.name = inputValue.value
  }
  const [e, res] = await api.getApplicationList(params)
  if (!e && res) {
    console.log(res)
    applicationList.value = res.content
  }
}

const handleActive = (index: number) => {
  tabActive.value = index
  searchParams.value.status = index === 0 ? 'DRAFT' : 'ACTIVE'
  fetchApplicationList()
}

const handleToCreate = () => {
  uni.navigateTo({
    url: '/pages/application/create'
  })
}

onShow(() => {
  console.log('onShow')
  applicationStore.reset()
})

const handleSearch = (value: string) => {
  console.log('🚀 ~ handleSearch ~ value:', value)
  inputValue.value = value
  searchParams.value.offset = 0
  fetchApplicationList()
}

const handleFilter = () => {
  console.log('🚀 ~ handleFilter ~ value:')
  show.value = true
}

const handleToFilter = () => {
  searchParams.value.offset = 0
  show.value = false
  fetchApplicationList()
}

const handleToReset = () => {
  documentValue.value = ''
  dateValue.value = []
  inputValue.value = ''
  searchParams.value.offset = 0
  show.value = false
  fetchApplicationList()
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
      <Search @search="handleSearch">
        <template #right>
          <view class="icon">
            <uni-icons type="settings" color="#7A858E" size="18" @click="handleFilter"></uni-icons>
          </view>
        </template>
      </Search>
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

      <view class="p-4 flex-col gap-20rpx">
        <view v-for="item in applicationList" :key="item.applicationId">
          <ApplicationItem :application="item"></ApplicationItem>
        </view>
      </view>
    </view>

    <wd-action-sheet v-model="show" title="Filter">
      <view class="p-20">
        <view class="mb-4">
          <view class="mb-2">Document Type</view>
          <wd-picker :columns="documents" v-model="documentValue" value-key="value" label-key="label" />
        </view>
        <view class="mb-4">
          <view class="mb-2">Date Range</view>
          <wd-calendar type="daterange" v-model="dateValue" />
        </view>
        <view class="flex justify-center items-center gap-10">
          <wd-button type="info" @click="handleToReset">Reset</wd-button>
          <wd-button custom-class="bg-#FF754C!" @click="handleToFilter">Submit</wd-button>
        </view>
      </view>
    </wd-action-sheet>

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
}

.p-20 {
  padding: 40rpx !important;
}
</style>
