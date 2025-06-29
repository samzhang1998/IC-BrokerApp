<script lang="ts" setup>
const inputValue = ref('')

const emits = defineEmits(['search'])

const inputChange = () => {
  emits('search', inputValue.value)
}
</script>

<template>
  <view class="search">
    <view class="input-box">
      <uni-easyinput
        class="input"
        prefixIcon="search"
        v-model="inputValue"
        :inputBorder="false"
        placeholder="Search..."
        @change="inputChange"
        @clear="inputChange"
      >
      </uni-easyinput>
    </view>
    <view class="icon">
      <!-- <uni-icons type="settings" color="#7A858E" size="18"></uni-icons> -->
      <slot name="right"></slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40rpx;

  .input-box {
    flex: 1;
    height: 64rpx;
  }

  .input {
    border-radius: 40rpx;
    overflow: hidden;
    border: 1px solid #e8ebee;
  }

  .icon {
    width: 64rpx;
    height: 64rpx;
    border: 1px solid #e8ebee;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-left: 10rpx;
  }
}
</style>
