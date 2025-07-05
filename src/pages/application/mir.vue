<template>
  <BasePage title="MIR" hasBack>
    <InfoHead :applicationInfo="applicationInfo" :history="history" :showMir="false" :showIssued="true" />
    <view class="title flex items-center">Pre-settlement Conditions</view>
    <wd-table :data="presettle" :border="false" :height="400" :showHeader="false">
      <wd-table-col prop="ref" label="Ref#" width="10%" />
      <wd-table-col prop="description" label="Description" width="80%" />
      <wd-table-col prop="filepath" label="Operations" width="10%">
        <template #value="{ row }">
          <view class="flex justify-center w-full">
            <wd-icon name="upload" size="22px" color="#7A858E" @click="handleUpload(row)"></wd-icon>
          </view>
        </template>
      </wd-table-col>
    </wd-table>
    <view class="title flex items-center color-green">Resolved Conditions</view>
    <wd-table :data="resolved" :border="false" :height="400" :showHeader="false">
      <wd-table-col prop="ref" label="Ref#" width="10%" />
      <wd-table-col prop="description" label="Description" width="80%" />
      <wd-table-col prop="filepath" label="Operations" width="10%">
        <template #value="{ row }">
          <view class="flex justify-center w-full">
            <wd-icon
              name="file-paste"
              size="22px"
              color="#FF754C"
              @click="handleDownload(row?.docPath)"
              v-if="row?.docPath"
            ></wd-icon>
            <wd-icon name="upload" size="22px" color="#7A858E" @click="handleUpload(row)" v-else></wd-icon>
          </view>
        </template>
      </wd-table-col>
    </wd-table>
    <view class="title flex items-center color-red">Rejected Conditions</view>
    <wd-table :data="rejected" :border="false" :height="400" :showHeader="false">
      <wd-table-col prop="ref" label="Ref#" width="10%" />
      <wd-table-col prop="description" label="Description" width="80%" />
      <wd-table-col prop="filepath" label="Operations" width="10%">
        <template #value="{ row }">
          <view class="flex justify-center w-full">
            <wd-icon
              name="file-paste"
              size="22px"
              color="#FF754C"
              @click="handleDownload(row?.docPath)"
              v-if="row?.docPath"
            ></wd-icon>
            <wd-icon name="upload" size="22px" color="#7A858E" @click="handleUpload(row)" v-else></wd-icon>
          </view>
        </template>
      </wd-table-col>
    </wd-table>

    <wd-action-sheet v-model="show" title="Upload File" @close="close">
      <view class="p-20">
        <view class="mb-4">
          <view class="flex justify-between items-center mb-4" v-if="current?.docPath">
            {{ strCut(getFilenameFromUrl(current.docPath)) }}
            <wd-icon name="file" color="#FF754C" size="22px" @click.stop="handleDownload(current.docPath)"></wd-icon>
          </view>
          <Upload @saveList="saveFileList" height="88rpx" :requestUrl="urlComputed">
            <template #default>
              <view class="upload flex items-center justify-center gap-2">
                <view class="">Upload</view>
                <wd-icon name="upload" color="#FF754C" size="22px"></wd-icon>
              </view>
            </template>
          </Upload>
        </view>
        <view class="mb-4">
          <view class="mb-2">Add Note</view>
          <wd-input type="text" class="h-[88rpx]" v-model="note" placeholder="" />
        </view>

        <wd-button custom-class="bg-#FF754C!" block @click="handleChange">Submit</wd-button>
      </view>
    </wd-action-sheet>
  </BasePage>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@/store/modules/application'
import { api } from '@/api'
import InfoHead from '@/components/Application/InfoHead.vue'
import { useDownLoad } from '@/hooks/useDownLoad'
import { getFilenameFromUrl } from '@/utils'

const { downloadFile } = useDownLoad()

const applicationId = ref('')
const documentId = ref('')
const applicationStore = useApplicationStore()
const applicationInfo = computed(() => applicationStore.applicationInfo as AnyObj)
const presettle = ref([])
const resolved = ref([])
const rejected = ref([])
const show = ref(false)
const note = ref('')
const current = ref<AnyObj>({})

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

const urlComputed = computed(() => {
  return `api/applications/${applicationId.value}/mir/documents/${documentId.value}/upload`
})

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
    getMirDocuments()
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

const getMirDocuments = async () => {
  if (!applicationId.value) return
  let [e, r] = await api.getMirDocuments(applicationId.value)
  if (!e && r) {
    console.log('🚀 ~ getMirDocuments ~ r:', r)
    presettle.value = r.documents['Pre-settlement Conditions'] || []
    resolved.value = r.documents['Resolved Conditions'] || []
    rejected.value = r.documents['Rejected Conditions'] || []
  }
}

const handleUpload = (row: AnyObj) => {
  console.log('🚀 ~ handleUpload ~ row:', row)
  documentId.value = row.id
  current.value = row
  show.value = true
}

const handleDownload = (url: string) => {
  if (!url) return
  downloadFile(`api/v1/file/download?filePath=${url}`)
}

const close = () => {
  note.value = ''
  current.value = {}
  getMirDocuments()
}

const handleChange = async (value: string) => {
  console.log('🚀 ~ handleChange ~ value:', value)
  let params = {
    notes: note.value
  }
  let [e, r] = await api.putMirDocuments(applicationId.value, documentId.value, params)
  if (!e && r) {
    show.value = false
    close()
  }
}

const saveFileList = (list: AnyObj[]) => {
  console.log('🚀 ~ saveFileList ~ list:', list)
  if (list.length > 0) {
    current.value.docPath = list[0].url
  }
}
function strCut(str: string) {
  return str.split('?')[0]
}
</script>

<style lang="scss">
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

.color-green {
  background: #3c8a34;
}

.color-red {
  background: rgb(235, 0, 0);
}

.p-20 {
  padding: 40rpx;
}

.upload {
  height: 88rpx;
  border: 1px solid #e1e1e1;
}
</style>
