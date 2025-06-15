<template>
  <BasePage title="Create Application" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <text class="text-28rpx font-bold">Application ID</text>
      <view class="flex-col mt-3 gap-1">
        <view class="flex items-center gap-1">
          <text class="text-24rpx font-bold">Doc Type:</text>
          <text class="text-24rpx">Full Doc</text>
        </view>
        <view>
          <text class="text-24rpx font-bold">Application Type:</text>
          <text class="text-24rpx">Loan</text>
        </view>
      </view>
    </view>
    <view>
      <AppCard title="Current Situation" v-model:data="currentSituationItems"> </AppCard>
      <AppCard title="New Requirements" v-model:data="newRequirementsItems"> </AppCard>
      <AppCard title="Summary" v-model:data="applicationSummaryItems"> </AppCard>
    </view>
    <view class="flex-col gap-1 mt-3 w-full">
      <wd-button type="primary" block class="bg-#FF754C!" size="large">Submit</wd-button>
      <wd-button type="text" class="text-#7A858E! underline">Save as draft</wd-button>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { currentSituationItems, newRequirementsItems, applicationSummaryItems } from './constants'
</script>
