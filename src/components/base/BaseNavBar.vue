<template>
  <wd-navbar
    :title="title"
    :left-arrow="false"
    @click-left="handleClickLeft"
    :bordered="false"
    fixed
    placeholder
    safeAreaInsetTop
  >
    <template #left>
      <wd-button type="primary" @click="handleClickLeft" size="small" class="back-btn" v-if="hasBack">
        <wd-icon name="thin-arrow-left" color="#FF754C" size="22rpx"></wd-icon>
      </wd-button>
    </template>
  </wd-navbar>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  hasBack?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  hasBack: true
})

function handleClickLeft() {
  uni.navigateBack()
}
</script>

<style scoped lang="scss">
:deep(.wd-navbar) {
  .wd-navbar__left {
    padding: 0 1rem;
  }
  .back-btn {
    background-color: #ff754c26;
    border: none;
    padding: 0;
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
