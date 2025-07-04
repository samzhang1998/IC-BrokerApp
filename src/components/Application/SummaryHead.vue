<template>
  <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
    <view>
      <view class="flex-y-center justify-between">
        <view class="flex-y-center gap-3">
          <check-badge></check-badge>
          <text class="text-28rpx font-bold">{{ title }}</text>
        </view>
        <template v-if="!isViewApplication">
          <wd-picker
            :columns="actions"
            v-model="selectedValue"
            use-default-slot
            v-if="isPicker"
            @confirm="handleConfirm"
          >
            <view class="bg-#ff754c! rounded-full flex-center text-white w-40rpx h-40rpx" @click="showActions">
              <wd-icon name="add1" size="22px"></wd-icon>
            </view>
          </wd-picker>
          <view v-else class="bg-#ff754c! rounded-full flex-center text-white w-40rpx h-40rpx" @click="showActions">
            <wd-icon name="add1" size="22px"></wd-icon>
          </view>
        </template>
      </view>
      <view class="flex-col mt-3 gap-1 text-24rpx">
        {{ description }}
      </view>
    </view>
    <wd-action-sheet
      v-if="!isPicker && actions && actions.length > 0"
      v-model="show"
      :actions="actions"
      @close="close"
      @select="select"
      cancel-text="Cancel"
    />
  </view>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'

const applicationStore = useApplicationStore()
const { isViewApplication } = toRefs(applicationStore)

interface IProps {
  title: string
  description: string
  actions?: any[]
  isPicker?: boolean
}

const props = defineProps<IProps>()
const emit = defineEmits(['action'])
const show = ref<boolean>(false)
const actions = ref(props.actions)
const selectedValue = ref([])

function showActions() {
  if (actions.value && actions.value.length > 0) {
    show.value = true
  }
}

function close() {
  show.value = false
}

function select({ item }: { item: { name: string; value?: string | number } }) {
  emit('action', item)
}

function handleConfirm(e: any) {
  emit('action', e.value)
}

watch(
  () => props.actions,
  (newVal) => {
    actions.value = newVal
  },
  {
    deep: true
  }
)
</script>

<style scoped></style>
