<template>
  <view>
    <uni-nav-bar v-bind="navBar">
      <template #default>
        <view class="bar-title act">Create Application</view>
      </template>
      <template #right> </template>
    </uni-nav-bar>
    <wd-button>主要按钮</wd-button>
    <wd-button type="success">成功按钮</wd-button>
    <wd-button type="info">信息按钮</wd-button>
    <wd-button type="warning">警告按钮</wd-button>
    <wd-button type="error">危险按钮</wd-button>
  </view>
</template>

<script setup lang="ts">
const navBar = ref({
  isNotification: true,
  backgroundColor: '#fff',
  title: 'Create Application',
  leftIcon: 'back',
  border: false
})
</script>

<style scoped>

</style>