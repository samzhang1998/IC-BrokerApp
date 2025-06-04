import store from '@/store'

interface ISystemState {
  systemInfo: AnyObj
  isNotification: boolean
}

export const useSystemStore = defineStore({
  id: 'system',
  state: (): ISystemState => {
    return {
      systemInfo: {},
      isNotification: true
    }
  },
  actions: {
    /**
     * @description 设置系统信息参数
     * @param {AnyObj} info
     * @return {*}
     */
    setSystemInfo(info: AnyObj): any {
      this.systemInfo = info
    },

    /**
     * @description 设置系统消息开关
     * @param {AnyObj} info
     * @return {*}
     */
    setIsNotification(status: boolean): any {
      this.isNotification = status
    }
  },
  persist: {
    enabled: true
    // enforceCustomStorage: true
    // strategies: [
    //   {
    //     paths: ['systemInfo', 'isNotification']
    //   }
    // ],
    // detached: true
  }
})

/** 在 setup 外使用 */
export function useSystemStoreHook() {
  return useSystemStore(store)
}
