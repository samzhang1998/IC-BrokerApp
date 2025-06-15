<script setup lang="ts">
import { PopupContent } from './'
// import { ProfileKey } from '../types'
// import { injectStrict } from '@/utils'
import useProfile from '../hooks/useProfile'

const { editQualification, getQualification } = useProfile()

const qualificationList = ref<AnyObj[]>([])
const currentItem = ref<AnyObj>({})
const show = ref(false)
const popupType = ref<string>('')
const popupTitle = ref<string>('')
const popupData = ref<AnyObj>({})

onMounted(() => {
  getQualificationTypes()
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
  const [e, r] = await api.getQualificationTypes()
  if (!e && r) {
    console.log('🚀 ~ getQualificationTypes ~ r:', r)
    qualificationList.value = (r as any) || []
  }
}

function handleEdit(item: AnyObj) {
  console.log('🚀 ~ handleEdit ~ item:', item)
  const callback = (value: AnyObj) => {
    const typeArray: AnyObj = {
      'Group 1': 'Certification',
      'Group 2': 'TypeSelect',
      'Group 3': 'TypeSelect',
      'Group 4': 'Item'
    }
    popupType.value = typeArray[item.category]
    popupTitle.value = item.name
    currentItem.value = item
    popupData.value = value
    console.log('🚀 ~ callback ~ popupData.value:', popupData.value)
    handleClose()
  }
  getQualification(item.id, callback)
}

function handleClose() {
  show.value = !show.value
}
</script>

<template>
  <view class="list">
    <view class="item" v-for="item in qualificationList" :key="item.id">
      <view class="flex items-center flex-1">
        <view class="icon"></view>
        <view class="title">{{ item.name }}</view>
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
    <PopupContent :type="popupType" :title="popupTitle" @edit="handleSaveEdit"></PopupContent>
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
