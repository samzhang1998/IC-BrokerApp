<template>
  <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
    <view>
      <view class="flex-y-center justify-between">
        <view class="flex-y-center gap-3">
          <check-badge></check-badge>
          <text class="text-28rpx font-bold">{{ title }}</text>
        </view>
        <view class="bg-#ff754c! rounded-full flex-center text-white w-40rpx h-40rpx" @click="showActions">
          <wd-icon name="add1" size="22px"></wd-icon>
        </view>
      </view>
      <view class="flex-col mt-3 gap-1 text-24rpx">
        {{ description }}
      </view>
    </view>
    <wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" cancel-text="Cancel" />
  </view>
</template>

<script setup lang="ts">
interface IProps {
  title: string
  description: string
  actions?: {
    name: string
    value?: string | number
    subname?: string
  }[]
}

const props = defineProps<IProps>()
const emit = defineEmits(['action'])
const show = ref<boolean>(false)
const actions = ref(props.actions)

function showActions() {
  show.value = true
}

function close() {
  show.value = false
}

function select({ item }: { item: { name: string; value?: string | number } }) {
  emit('action', item)
}
</script>

<style scoped></style>
