<template>
  <view class="h-screen">
    <BaseNavBar :title="title" :hasBack="hasBack" class="min-h-88rpx"></BaseNavBar>
    <view class="p-4 flex-1">
      <slot></slot>
    </view>
  </view>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  hasBack?: boolean
}
const props = defineProps<IProps>()
</script>

<style scoped></style>
