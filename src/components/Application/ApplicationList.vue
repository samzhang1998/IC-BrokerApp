<script lang="ts" setup>
import ApplicationItem from './ApplicationItem.vue'
const props = defineProps({
  applicationList: {
    type: Array<AnyObj>,
    default: () => []
  }
})
</script>

<template>
  <view class="item" v-for="item in applicationList" :key="item.id">
    <ApplicationItem :application="item"></ApplicationItem>
  </view>
</template>

<style lang="scss" scoped>
.item + .item {
  border-top: 1px solid #e7e8f2;
}
</style>
