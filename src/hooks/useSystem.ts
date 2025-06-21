import { useSystemStoreHook } from '@/store/modules/system'

export function useSystem() {
  const useSystemStore = useSystemStoreHook()
  const { systemInfo, isNotification } = storeToRefs(useSystemStore)

  function setNavBarHeight() {
    uni.getSystemInfo({
      success: function (e) {
        // console.log('systemInfo', e)
        useSystemStore.setSystemInfo(e)
      },
      fail(e) {
        console.log(e, '获取失败')
      }
    })
  }

  function setIsNotification(status: boolean) {
    useSystemStore.setIsNotification(status)
  }

  function pushMessage() {
    uni.onPushMessage((res) => {
      console.log('收到推送消息：', res.data.payload) //监听推送消息
      plus.runtime.setBadgeNumber(0)
      const data: any = res.data.payload
      // console.log(data?.pushType === 0)

      if (data?.pushType === 0) {
        uni.navigateTo({
          url: '/pages/notifications/index'
        })
      }
    })
  }

  return { systemInfo, isNotification, setNavBarHeight, setIsNotification, pushMessage }
}
