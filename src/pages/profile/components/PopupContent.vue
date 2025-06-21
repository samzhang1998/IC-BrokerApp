<script setup lang="ts">
import { useUser } from '@/hooks/useUser'
import { getFilenameFromUrl } from '@/utils'

import useProfile from '../hooks/useProfile'
import { useDownLoad } from '@/hooks/useDownLoad'

const { downloadFile } = useDownLoad()
const { getQualification } = useProfile()
import dayjs from 'dayjs'

const { userId } = useUser()

const props = defineProps<{
  type: string
  title: string
  id: string | number | undefined
}>()

const emits = defineEmits(['edit'])
const isShow = ref(false)

const formData = ref<AnyObj>({
  typeValue: '',
  numberValue: '',
  expiredDate: null
})

const popupData = ref<AnyObj>({})

const typeComputed = computed(() => {
  let result: AnyObj = {
    nameText: 'Name',
    dateText: 'Expiry Date',
    columns: []
  }
  if (popupData.value.id === 8 || popupData.value.id === 7) {
    result.dateText = 'Completion Date'
  }

  if (popupData.value.id === 4) {
    result.nameText = 'Certification Number'
  }

  if (popupData.value.id === 3 || popupData.value.id === 5) {
    result.columns = [
      {
        text: 'Company',
        value: 'Company'
      },
      {
        text: 'Individual',
        value: 'Individual'
      },
      {
        text: 'Company & Individual',
        value: 'Company & Individual'
      }
    ]
  }

  if (popupData.value.id === 8) {
    result.columns = [
      {
        text: 'Cert IV',
        value: 'Cert IV'
      },
      {
        text: 'Diploma',
        value: 'Diploma'
      }
    ]
  }

  if (popupData.value.id === 4) {
    result.columns = [
      {
        text: 'MFAA',
        value: 'MFAA'
      },
      {
        text: 'FBAA',
        value: 'FBAA'
      }
    ]
  }

  if (popupData.value.id === 6) {
    result.columns = [
      {
        text: 'Passport',
        value: 'Passport'
      },
      {
        text: 'DL',
        value: 'DL'
      }
    ]
  }
  if (popupData.value.id === 7) {
    result.columns = [
      {
        text: 'AML',
        value: 'AML'
      },
      {
        text: 'CTF',
        value: 'CTF'
      }
    ]
  }

  return result
})

const urlComputed = computed(() => {
  return `api/v1/brokers/${userId.value}/qualifications/${popupData.value.qualificationTypeId}/upload`
})

function handleConfirm({ value }: any) {
  formData.value.typeValue = value
}

function handleClick() {
  let params: AnyObj = {}
  if (props.type === 'Certification') {
    params.numberValue = formData.value.numberValue
  } else if (props.type === 'Item') {
    // params.filePath = formData.value.filePath
  } else {
    params = JSON.parse(JSON.stringify(formData.value))
    params.expiredDate = dayjs(params.expiredDate).format('YYYY-MM-DD')
  }
  emits('edit', params)
  setTimeout(() => {
    isShow.value = false
    formData.value = {
      typeValue: '',
      numberValue: '',
      expiredDate: null
    }
  }, 300)
}

watch(
  () => props.id,
  (newVal) => {
    if (newVal) {
      getQualification(String(newVal), setInfo)
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const saveFileList = (list: AnyObj[]) => {
  console.log('🚀 ~ saveFileList ~ list:', list)
  if (list.length > 0) {
    popupData.value.filePath = list[0].url
  }
}

function setInfo(r: AnyObj) {
  popupData.value = r
  formData.value.typeValue = r?.typeValue || ''
  formData.value.numberValue = r?.numberValue || ''
  if (r?.expiredDate) {
    formData.value.expiredDate = dayjs(r.expiredDate).valueOf()
  }
  // formData.value.filePath = r?.filePath || ''
  isShow.value = true
}

function strCut(str: string) {
  return str.split('?')[0]
}

function handleDownload(url: string) {
  downloadFile(`api/v1/file/download?filePath=${url}`)
}
</script>

<template>
  <view class="content">
    <view class="flex items-center justify-center title">{{ type === 'Item' ? 'Extra Checklist file' : title }}</view>
    <uni-forms class="form" :model="formData" label-position="top" v-if="isShow">
      <view v-if="type === 'Certification'">
        <uni-forms-item label="Certification Number" name="numberValue">
          <uni-easyinput :inputBorder="false" class="item flex items-center" v-model="formData.numberValue" />
        </uni-forms-item>
      </view>
      <view v-if="type === 'TypeSelect'">
        <uni-forms-item label="Type" name="typeValue">
          <wd-picker
            class="item"
            :columns="typeComputed.columns"
            value-key="value"
            label-key="text"
            v-model="formData.typeValue"
            @confirm="handleConfirm"
          />
        </uni-forms-item>
        <uni-forms-item :label="typeComputed.nameText" name="numberValue">
          <uni-easyinput :inputBorder="false" class="item flex items-center" v-model="formData.numberValue" />
        </uni-forms-item>
        <uni-forms-item :label="typeComputed.dateText" name="expiredDate">
          <wd-calendar class="item" v-model="formData.expiredDate" />
        </uni-forms-item>
        <uni-forms-item label="File">
          <view class="flex justify-between items-center" v-if="popupData.filePath">
            {{ strCut(getFilenameFromUrl(popupData.filePath)) }}
            <wd-icon name="file" color="#FF754C" size="22px" @click.stop="handleDownload(popupData.filePath)"></wd-icon>
          </view>
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
          <view class="item flex items-center justify-between text">
            {{ title }}
          </view>
        </uni-forms-item>
        <uni-forms-item label="File">
          <view class="flex justify-between items-center" v-if="popupData.filePath">
            {{ strCut(getFilenameFromUrl(popupData.filePath)) }}
            <wd-icon name="file" color="#FF754C" size="22px" @click.stop="handleDownload(popupData.filePath)"></wd-icon>
          </view>
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
    </uni-forms>
    <wd-button class="btn" block @click="handleClick">Submit</wd-button>
  </view>
</template>

<style lang="scss" scoped>
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

::v-deep .wd-picker {
  .wd-picker__cell {
    border: none !important;
  }
  .wd-picker__cell {
    padding: 5px 0 !important;
  }
  .wd-picker__value-wraper {
    border: none !important;
  }
}
</style>
