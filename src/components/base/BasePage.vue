<template>
  <view>
    <BaseNavBar :title="title" :hasBack="hasBack"></BaseNavBar>
    <view class="p-4">
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

<style scoped>

</style>