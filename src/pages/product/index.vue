<script setup lang="ts">
import { useLocale } from '@/hooks/useLocale'
import { useUser } from '@/hooks/useUser'
import { Search } from '@/components'

const { token, roles } = useUser()
const { langStatus } = useLocale()

onMounted(() => {
  getProductList()
})

onShow(() => {})

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

async function getProductList() {
  let params = {
    page: 1,
    size: 10,
    name: ''
  }
  const [e, r] = await api.getProductList(params)
  if (!e && r) {
    console.log(r)
  }
}

const infoList = ref([
  {
    id: 1,
    title: 'Repayment Type',
    value: 'Interest Only'
  },
  {
    id: 2,
    title: 'Application Fees',
    value: '$450'
  },
  {
    id: 3,
    title: 'Loan to Value Rate',
    value: 'Max 70%'
  },
  {
    id: 4,
    title: 'Ongoing Fee',
    value: 'N/A'
  }
])
</script>

<template>
  <view class="home">
    <NavBar v-bind="navBar">
      <template #content>
        <view class="bar-title act">Product</view>
      </template>
      <template #right> </template>
    </NavBar>
    <view class="content">
      <Search></Search>
      <view class="list">
        <view class="item" v-for="item in 10" :key="item">
          <view class="top">
            <view class="cover"></view>
            <view class="info">
              <view class="title">IC Blue</view>
              <view class="rate">Interest Rate: 5.4%</view>
              <view class="rate">Interest Rate: 5.4%</view>
            </view>
          </view>
          <view class="desc">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam,
          </view>
          <view class="tips">
            <view class="tip" v-for="item in infoList" :key="item.title">
              <view class="type">{{ item.title }}</view>
              <view class="value">{{ item.value }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <TabBar></TabBar>
  </view>
</template>

<style lang="scss" scoped>
.content {
  .list {
    margin-top: 40rpx;
    padding: 0 40rpx;

    .item {
      min-height: 600rpx;
      padding: 40rpx 30rpx;
      border: 1px solid #e8ebee;
      background: #fcfcfc;
      border-radius: 16rpx;

      .top {
        display: flex;
        margin-bottom: 20rpx;

        .cover {
          background: #d9d9d9;
          width: 240rpx;
          height: 280rpx;
          border-radius: 10rpx;
        }

        .info {
          margin-left: 20rpx;
        }

        .title {
          color: #384144;
          font-size: 36rpx;
          margin-bottom: 30rpx;
        }

        .rate {
          color: #384144;
          font-size: 24rpx;
          width: 310rpx;
          height: 48rpx;
          border: 1px solid #e8ebee;
          background: #f5f7fb;
          border-radius: 100rpx;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rate + .rate {
          margin-top: 20rpx;
        }
      }

      .desc {
        color: #7a858e;
        font-weight: 400;
        font-size: 24rpx;
        line-height: 38rpx;
        letter-spacing: 0px;
        margin-bottom: 20rpx;
      }

      .tips {
        display: flex;
        flex-wrap: wrap;
        gap: 20rpx;
        .tip {
          width: calc(50% - 10rpx);
          font-size: 24rpx;
          color: #7a858e;
        }
        .type {
          padding-bottom: 20rpx;
        }
        .value {
          color: #384144;
        }
      }
    }

    .item + .item {
      margin-top: 40rpx;
    }
  }
}
</style>
