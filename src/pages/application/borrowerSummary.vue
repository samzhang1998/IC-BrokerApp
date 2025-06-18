<template>
  <BasePage title="Create Application" hasBack>
    <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
      <view class="flex-y-center justify-between">
        <view class="flex-y-center gap-3">
          <check-badge></check-badge>
          <text class="text-28rpx font-bold">Personal Applicants</text>
        </view>
        <view class="bg-#ff754c! rounded-full flex-center text-white">
          <wd-icon name="add1" size="22px"></wd-icon>
        </view>
      </view>
      <view class="flex-col mt-3 gap-1 text-24rpx">
        Add all person applicants that are either borrowers or guarantors to this application
      </view>
    </view>
    <view>
      <AppCard title="Name(Borrower)" v-model:data="borrowerSummaryItems" @item-click="handleItemClick"> </AppCard>
    </view>
  </BasePage>
</template>

<script setup lang="ts">
import { borrowerSummaryItems } from './constants'

const handleItemClick = (name: string, item: Application.IItem) => {
  console.log(name, item)
}
</script>

<style scoped></style>
