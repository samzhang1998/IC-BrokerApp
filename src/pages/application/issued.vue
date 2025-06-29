<template>
  <BasePage title="Issued Document" hasBack>
    <InfoHead :applicationInfo="applicationInfo" :history="history" :showMir="true" :showIssued="false" />
    <view class="title flex items-center">Issued Document</view>
    <wd-table :data="documents" :border="false" :height="400" :showHeader="false">
      <wd-table-col prop="filename" label="File Name" width="80%" />
      <wd-table-col prop="filepath" label="Operations" width="20%">
        <template #value="{ row }">
          <view class="flex justify-end w-full">
            <wd-icon name="file-paste" size="22px" color="#FF754C" @click="handleDownload(row?.filepath)"></wd-icon>
          </view>
        </template>
      </wd-table-col>
    </wd-table>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'
import InfoHead from '@/components/Application/InfoHead.vue'
import { useDownLoad } from '@/hooks/useDownLoad'

const { downloadFile } = useDownLoad()

const applicationId = ref('')
const applicationStore = useApplicationStore()
const applicationInfo = computed(() => applicationStore.applicationInfo as AnyObj)
const documents = ref<AnyObj[]>([])

const history = ref<AnyObj[]>([
  { status: 'Submit to IC', timeStamp: '' },
  { status: 'Pre-assessment', timeStamp: '' },
  { status: 'Full-assessment', timeStamp: '' },
  { status: 'AIP', timeStamp: '' },
  { status: 'Submit to Funder', timeStamp: '' },
  { status: 'Conditional Approval', timeStamp: '' },
  { status: 'Formal Approval', timeStamp: '' },
  { status: 'Instruct to Solicitor', timeStamp: '' },
  { status: 'Loan doc Issued', timeStamp: '' },
  { status: 'Loan doc Returned', timeStamp: '' },
  { status: 'Settlement Date Booked', timeStamp: '' },
  { status: 'Settled', timeStamp: '' },
  { status: 'Decline', timeStamp: '' },
  { status: 'Withdrawal', timeStamp: '' }
])

const getApplicationDetail = async (id: string | undefined) => {
  if (!id) return
  const [e, r] = await api.getApplicationDetail(id)
  if (!e && r) {
    applicationStore.setApplicationInfo({
      ...r,
      applicationId: Number(id)
    } as unknown as Application.IApplication)
  }
}

onLoad((options) => {
  if (options?.id) {
    applicationId.value = options.id
    getApplicationDetail(options.id)
    getHistory()
    getDocuments()
  }
})

const getHistory = async () => {
  if (!applicationId.value) return
  const [e, r] = await api.getHistory(applicationId.value)
  if (!e && r) {
    console.log('🚀 ~ getHistory ~ r:', r)
    history.value = history.value.map((item: AnyObj) => {
      const found = r.find((b: AnyObj) => b.status === item.status)
      if (found) {
        return {
          ...item,
          ...found
        }
      } else {
        return item
      }
    })
  }
}

const getDocuments = async () => {
  if (!applicationId.value) return
  let [e, r] = await api.getDocuments(applicationId.value)
  if (!e && r) {
    console.log('🚀 ~ getDocuments ~ r:', r)
    documents.value = r.filter(Boolean) || []
  }
}

function handleDownload(url: string) {
  if (!url) return
  downloadFile(`api/v1/file/download?filePath=${url}`)
}
</script>

<style lang="scss" scoped>
.title {
  height: 80rpx;
  background: #384144;
  border-top-left-radius: 16rpx;
  border-top-right-radius: 16rpx;
  font-size: 28rpx;
  color: #fafafa;
  padding-left: 20rpx;
  margin-top: 32rpx;
}
</style>
