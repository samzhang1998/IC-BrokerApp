<template>
  <view
    class="w-4 h-4 border border-#384144 border-dashed rounded-full flex-center"
    :class="{ 'bg-#ff754c26 border-solid border-#FF754C': checked }"
  >
    <wd-icon name="check" size="18rpx" color="#FF754C" v-if="checked"></wd-icon>
  </view>
</template>

<script setup lang="ts">
interface IProps {
  checked?: boolean
}
defineProps<IProps>()
</script>

<style scoped></style>
