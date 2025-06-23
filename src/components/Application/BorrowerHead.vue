<template>
  <view class="border border-#E8EBEE border-solid rounded-lg px-3 py-3 bg-#FCFCFC">
    <view>
      <view class="flex-y-center justify-between">
        <view class="flex-y-center gap-3">
          <check-badge></check-badge>
          <text class="text-28rpx font-bold">{{ headerMap[type].title }}</text>
        </view>
        <view class="bg-#ff754c! rounded-full flex-center text-white w-40rpx h-40rpx" @click="showActions">
          <wd-icon name="add1" size="22px"></wd-icon>
        </view>
      </view>
      <view class="flex-col mt-3 gap-1 text-24rpx">
        {{ headerMap[type].description }}
      </view>
    </view>
    <wd-action-sheet v-model="show" :actions="actions" @close="close" @select="select" cancel-text="Cancel" />
  </view>
</template>

<script setup lang="ts">
interface IProps {
  type: string
}

const props = defineProps<IProps>()
const emit = defineEmits(['createBorrower'])
const show = ref<boolean>(false)
const actions = ref([
  {
    name: 'Borrower'
  },
  {
    name: 'Guarantor'
  }
])

const headerMap = ref<Record<string, { title: string; description: string }>>({
  personalApplicants: {
    title: 'Personal Applicants',
    description: 'Add all person applicants that are either borrowers or guarantors to this application.'
  },
  companyApplicants: {
    title: 'Company Applicants',
    description: 'Add all company applicants that are either borrowers or guarantors to this application.'
  },
  trustApplicants: {
    title: 'Trust Applicants',
    description: 'Add all trust applicants that are either borrowers or guarantors to this application.'
  }
})

function showActions() {
  if (props.type === 'trustApplicants') {
    emit('createBorrower')
  } else {
    show.value = true
  }
}

function close() {
  show.value = false
}

function select({ item }: { item: Application.IItem }) {
  emit('createBorrower', item.name)
}
</script>

<style scoped></style>
