import store from '@/store'
import { defineStore } from 'pinia'
import { api } from '@/api'

export const useUserStore = defineStore(
  'user',
  () => {
    // 状态
    const token = ref('')
    const roles = ref<string[]>([])
    const clientEmail = ref('')
    const userId = ref('')
    const userInfo = ref<AnyObj>({})

    // 设置角色数组
    const setRoles = (newRoles: string[]) => {
      roles.value = newRoles
    }

    // 登录
    const login = (userInfo: IUserState) => {
      token.value = userInfo.token
      roles.value = userInfo.roles
      clientEmail.value = userInfo.clientEmail
      userId.value = String(userInfo.userId)
      getUserInfo()
    }

    // 获取用户信息
    const getUserInfo = async () => {
      const [e, r] = await api.getUserInfo(userId.value)
      if (!e && r) {
        userInfo.value = r
      }
    }

    // 登出
    const logout = () => {
      token.value = ''
      roles.value = []
      clientEmail.value = ''
      userId.value = ''
      uni.removeStorageSync('userInfo')
    }

    // 重置 Token
    const resetToken = () => {
      token.value = ''
      roles.value = []
      clientEmail.value = ''
      userId.value = ''
      uni.removeStorageSync('userInfo')
    }

    return {
      // 状态
      token,
      roles,
      clientEmail,
      userId,
      userInfo,
      // 方法
      setRoles,
      login,
      getUserInfo,
      logout,
      resetToken
    }
  },
  {
    persist: {
      enabled: true
    }
  }
)

// 在 setup 外使用的 hook
export function useUserStoreHook() {
  return useUserStore(store)
}
