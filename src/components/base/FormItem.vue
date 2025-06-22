<template>
  <view class="flex-col gap-3">
    <view class="text-28rpx flex-y-center gap-1">
      <text :class="{ 'font-bold': labelBold }">{{ label }}</text>
      <view v-if="required" class="text-red-500">*</view>
    </view>
    <slot />
  </view>
</template>

<script setup lang="ts">
interface IProps {
  label: string
  labelBold?: boolean
  required?: boolean
}

const props = defineProps<IProps>()
</script>

<style scoped></style>
