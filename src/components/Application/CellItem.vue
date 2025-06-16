<template>
  <wd-cell title-width="100%" custom-class="cell-item" @click="handleClick" is-link>
    <template #title>
      <view class="flex-y-center h-full gap-3 w-full" :style="{ paddingLeft }">
        <CheckBadge :checked="checked" />
        <text class="text-24rpx">{{ title }}</text>
      </view>
    </template>
  </wd-cell>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  checked?: boolean
  level?: number
}
const props = withDefaults(defineProps<IProps>(), {
  level: 2
})

const emit = defineEmits(['click'])

const paddingLeft = computed(() => {
  return props.level ? props.level * 10 + 'rpx' : '0'
})

const handleClick = () => {
  emit('click')
}
</script>

<style scoped lang="scss">
.cell-item {
  padding: 0;
  :deep() {
    .wd-cell__wrapper {
      height: 76rpx;
      padding-left: 28rpx;
      align-items: center;
    }
  }
}
</style>
