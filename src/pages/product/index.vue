<script setup lang="ts">
// import { useLocale } from '@/hooks/useLocale'
// import { useUser } from '@/hooks/useUser'

import { Search } from '@/components'
import { useDownLoad } from '@/hooks/useDownLoad'

const { downloadFileUrl, downloadFile } = useDownLoad()

onMounted(() => {
  getProductList()
})

onShow(() => {})

const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff'
})

const pageNum = ref(0)

const productList = ref<AnyObj[]>([])

async function getProductList() {
  let params = {
    page: pageNum.value,
    size: 20,
    name: ''
  }
  const [e, r] = await api.getProductList(params)
  if (!e && r) {
    if (pageNum.value === 0) {
      productList.value = r?.content || []
    } else {
      if (r?.content.length <= 0) {
        pageNum.value = pageNum.value - 1
        uni.showToast({
          icon: 'none',
          title: `There's no more`
        })
      } else {
        productList.value = productList.value.concat(r?.content || [])
      }
    }
  }
}

function handleDownload(url: string) {
  downloadFile(`api/v1/file/download?filePath=${url}`)
}

onReachBottom(() => {
  pageNum.value = pageNum.value + 1
  getProductList()
})
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
        <view class="item" v-for="item in productList" :key="item.name">
          <view class="top">
            <view class="cover">
              <image :src="item.logoUrl" v-if="item.logoUrl" mode="aspectFill"></image>
            </view>
            <view class="info flex-1">
              <view class="title">{{ item.name }}</view>
              <view class="rate">Interest Rate: {{ item.interestRate }}%</view>
              <view class="rate">Comparison Rate: {{ item.comparisonRate }}%</view>
              <wd-button class="btn" size="small" @click.stop="handleDownload(item.logoUrl)">
                <wd-icon name="download1" size="16px"></wd-icon>
                Download Brochure
              </wd-button>
            </view>
          </view>
          <view class="desc">
            {{ item.description }}
          </view>
          <view class="tips">
            <view class="tip">
              <view class="type">Repayment Type</view>
              <view class="value">{{ item.repaymentType }}</view>
            </view>
            <view class="tip">
              <view class="type">Application Fees</view>
              <view class="value">${{ item.applicationFee }}</view>
            </view>
            <view class="tip">
              <view class="type">Loan to Value Rate</view>
              <view class="value">MAX {{ item.loanToValueRate }} %</view>
            </view>
            <view class="tip">
              <view class="type">Ongoing Fee</view>
              <view class="value">{{ item.ongoingFee }}</view>
            </view>
          </view>
        </view>
      </view>
      <no-data></no-data>
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
          overflow: hidden;

          .image {
            width: 100%;
            height: 100%;
            display: block;
          }
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

        .btn {
          background: #ff754c;
          display: flex;
          justify-content: center;
          align-items: center;
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
