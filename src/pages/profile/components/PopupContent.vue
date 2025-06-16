<script setup lang="ts">
import { useUser } from '@/hooks/useUser'

const { userId } = useUser()

const props = defineProps<{
  type: string
  title: string
}>()

const emits = defineEmits(['edit'])

const formData = ref<AnyObj>({
  typeValue: '',
  numberValue: '',
  expiredDate: null,
  filePath: ''
})

const columns = ref([
  {
    text: 'Professional',
    value: 'Professional'
  }
])

const urlComputed = computed(() => {
  return `api/v1/brokers/${userId.value}/qualifications/5/upload`
})

function handleConfirm({ value }: any) {
  formData.value.typeValue = value
}

function handleClick() {
  emits('edit', formData.value)
}

const saveFileList = (list: AnyObj[]) => {
  console.log('🚀 ~ saveFileList ~ list:', list)
}
</script>

<template>
  <view class="content">
    <view class="flex items-center justify-center title">{{ type === 'Item' ? 'Extra Checklist file' : title }}</view>
    <uni-forms class="form" :model="formData" label-position="top">
      <view v-if="type === 'Certification'">
        <uni-forms-item label="Certification Number" name="numberValue">
          <uni-easyinput :inputBorder="false" class="item flex items-center" v-model="formData.numberValue" />
        </uni-forms-item>
      </view>
      <view v-if="type === 'TypeSelect'">
        <uni-forms-item label="Type" name="typeValue">
          <wd-picker
            class="item"
            :columns="columns"
            value-key="value"
            label-key="text"
            v-model="formData.typeValue"
            @confirm="handleConfirm"
          />
        </uni-forms-item>
        <uni-forms-item label="Certification Number" name="numberValue">
          <uni-easyinput :inputBorder="false" class="item flex items-center" v-model="formData.numberValue" />
        </uni-forms-item>
        <uni-forms-item label="Expired Date" name="expiredDate">
          <wd-calendar class="item" v-model="formData.expiredDate" />
        </uni-forms-item>
        <uni-forms-item label="File" name="filePath">
          <Upload @saveList="saveFileList" height="88rpx" :requestUrl="urlComputed">
            <template #default>
              <view class="item flex items-center justify-center gap-2">
                <view class="upload">Upload File</view>
                <wd-icon name="upload" color="#FF754C" size="22px"></wd-icon>
              </view>
            </template>
          </Upload>
        </uni-forms-item>
      </view>
      <view v-if="type === 'Item'">
        <uni-forms-item label="Item">
          <view class="item flex items-center text">{{ title }}</view>
        </uni-forms-item>
        <uni-forms-item label="File" name="filePath">
          <Upload @saveList="saveFileList">
            <template #default>
              <view class="item flex items-center justify-center gap-2">
                <view class="upload">Upload File</view>
                <wd-icon name="upload" color="#FF754C" size="22px"></wd-icon>
              </view>
            </template>
          </Upload>
        </uni-forms-item>
      </view>
    </uni-forms>
    <wd-button class="btn" block @click="handleClick">Submit</wd-button>
  </view>
</template>

<style scoped lang="scss">
.content {
  width: 100vw;
  min-height: 400rpx;
  background: #fff;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  padding: 40rpx;

  .item {
    width: calc(100vw - 80rpx);
    height: 88rpx;
    border: 2rpx solid #e8ebee;
    border-radius: 10rpx;
    overflow: hidden;

    .upload {
      font-size: 24rpx;
    }
  }

  .text {
    font-size: 24rpx;
    color: #384144;
    padding: 0 20rpx;
  }

  .title {
    font-size: 28rpx;
    color: #384144;
  }

  ::v-deep .uni-forms-item__label {
    width: 100% !important;
  }

  .btn {
    background: #ff754c;
    color: #fff;
  }
}
</style>
