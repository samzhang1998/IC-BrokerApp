<script setup lang="ts">
import { PopupContent } from './'
// import { ProfileKey } from '../types'
// import { injectStrict } from '@/utils'
import useProfile from '../hooks/useProfile'
import { useUser } from '@/hooks/useUser'

const { userId } = useUser()

const { editQualification } = useProfile()

const qualificationList = ref<AnyObj[]>([])
const currentItem = ref<AnyObj>({})
const show = ref(false)
const popupType = ref<string>('')
const popupTitle = ref<string>('')

onMounted(() => {
  if (userId.value) {
    getQualificationTypes()
  }
})

const statusComputed = computed(() => {
  return function (item: AnyObj) {
    return item.status === 'Approved' ? 'green' : item.isComplete ? '' : 'red'
  }
})

const handleSaveEdit = async (formData: AnyObj) => {
  console.log('🚀 ~ handleSaveEdit ~ formData:', formData)
  editQualification(currentItem.value.id, formData, handleReset)
}

const handleReset = () => {
  getQualificationTypes()
  handleClose()
}

async function getQualificationTypes() {
  const [e, r] = await api.getQualificationTypes(userId.value)
  if (!e && r) {
    console.log('🚀 ~ getQualificationTypes ~ r:', r)
    qualificationList.value = (r as any) || []
  }
}

function handleEdit(item: AnyObj) {
  console.log('🚀 ~ handleEdit ~ item:', item)
  const typeArray: AnyObj = {
    'Group 1': 'Certification',
    'Group 2': 'TypeSelect',
    'Group 3': 'TypeSelect',
    'Group 4': 'Item'
  }
  popupType.value = typeArray[item.category]
  popupTitle.value = item.qualificationTypeName
  currentItem.value = item
  handleClose()
}

function handleClose() {
  show.value = !show.value
  if (!show.value) {
    currentItem.value = {}
  }
}
</script>

<template>
  <view class="list">
    <view class="item" v-for="item in qualificationList" :key="item.id">
      <view class="flex items-center flex-1">
        <view class="icon" :class="statusComputed(item)"></view>
        <view class="title">{{ item.qualificationTypeName }}</view>
      </view>
      <uni-icons type="compose" color="#7A858E" size="20" @click="handleEdit(item)"></uni-icons>
    </view>
  </view>
  <wd-popup
    v-model="show"
    lock-scroll
    position="bottom"
    custom-style="background: inherit;"
    :safe-area-inset-bottom="true"
    @close="handleClose"
  >
    <PopupContent
      :type="popupType"
      :title="popupTitle"
      :id="currentItem.qualificationTypeId"
      @edit="handleSaveEdit"
    ></PopupContent>
  </wd-popup>
</template>

<style scoped lang="scss">
.list {
  border: 1px solid #e8ebee;
  border-radius: 16rpx;
  min-height: 300rpx;
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;
    height: 80rpx;

    .icon {
      width: 30rpx;
      height: 30rpx;
      border: 1px dashed #384144;
      border-radius: 50%;
    }

    .green {
      border: 1px dashed #0be554;
    }
    .red {
      border: 1px dashed #ff754c;
    }

    .title {
      padding-left: 20rpx;
      color: #384144;
      font-size: 24rpx;
      line-height: 1;
      width: 90%;
    }
  }

  .item + .item {
    border-top: 1px solid #e8ebee;
  }
}
</style>
