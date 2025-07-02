<template>
  <view class="bg-#FF754C! rounded-full p-0 flex-center text-white p-1 w-40rpx h-40rpx" @click="emit('click')">
    <wd-icon name="add" size="18px"></wd-icon>
  </view>
</template>

<script setup lang="ts">
const emit = defineEmits(['click'])
</script>

<style scoped></style>
