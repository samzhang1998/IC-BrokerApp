<template>
  <wd-collapse-item custom-body-style="padding:0" :name="name" @click="handleClick">
    <template #title>
      <view class="flex-y-center gap-3 justify-between">
        <view class="flex-y-center gap-3 pl-10rpx">
          <CheckBadge :checked="checked" />
          <text class="text-24rpx font-500">{{ title }}</text>
        </view>
        <wd-icon name="arrow-right" size="20px" :class="{ 'rotate-90': isExpanded }"></wd-icon>
      </view>
    </template>
    <slot></slot>
  </wd-collapse-item>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  name: string
  expandedList?: string[]
  checked?: boolean
}
const props = withDefaults(defineProps<IProps>(), {})
const emit = defineEmits(['click'])

const isExpanded = computed(() => {
  return props.expandedList?.includes(props.name)
})

const handleClick = () => {
  emit('click', props.name)
}
</script>

<style scoped></style>
