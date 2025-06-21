<script lang="ts" setup>
const props = defineProps({
  applicationList: {
    type: Array<Application.IApplication>,
    default: () => []
  }
})
</script>

<template>
  <view class="item" v-for="item in applicationList" :key="item.applicationId">
    <ApplicationItem :application="item"></ApplicationItem>
  </view>
</template>

<style lang="scss" scoped>
.item + .item {
  border-top: 1px solid #e7e8f2;
}
</style>
