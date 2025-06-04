import store from '@/store'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: (): IUserState => {
    return {
      token: '',
      roles: [],
      clientEmail: ''
    }
  },
  actions: {
    /** 设置角色数组 */
    setRoles(roles: string[]) {
      this.roles = roles
    },
    /** 登录 */
    login(userInfo: IUserState) {
      this.token = userInfo.token
      this.roles = userInfo.roles
      this.clientEmail = userInfo.clientEmail
    },
    /** 登出 */
    logout() {
      this.token = ''
      this.roles = []
      this.clientEmail = ''
      uni.removeStorageSync('userInfo')
    },
    /** 重置 Token */
    resetToken() {
      this.token = ''
      this.roles = []
      this.clientEmail = ''
      uni.removeStorageSync('userInfo')
    }
  },
  persist: {
    enabled: true
  }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
