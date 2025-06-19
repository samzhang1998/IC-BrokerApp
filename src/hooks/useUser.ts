import { useUserStoreHook } from '@/store/modules/user'

export function useUser() {
  const userStoreHook = useUserStoreHook()

  const { token, roles, clientEmail, userId } = storeToRefs(userStoreHook)

  /**
   * @description 设置client信息
   */
  const setUserInfo = (item: IUserState) => {
    if (item?.token) {
      setPushId()
    }
    return userStoreHook.login(item)
  }

  /**
   * @description 退出登录
   */
  const loginOut = async () => {
    if (roles.value.includes('visitor')) {
      userStoreHook.logout()
      return
    }
    const [e, r] = await api.userLogout({})
    if (!e && r) {
      uni.showToast({
        icon: 'none',
        title: r?.data || ''
      })
      userStoreHook.logout()
    }
  }

  /**
   * @description 退出登录
   */
  const logOff = async () => {
    const [e, r] = await api.userLogout({})
    if (!e && r) {
      uni.showToast({
        icon: 'none',
        title: 'Logout successful'
      })
      userStoreHook.logout()
    }
  }

  /**
   * @description 重置token
   */
  const resetToken = () => {
    userStoreHook.resetToken()
    uni.reLaunch({
      url: '/pages/login/login'
    })
  }

  /**
   * @description 设置推送id
   */
  const setPushId = async () => {
    //#ifdef APP-PLUS
    const clientInfo = plus.push.getClientInfo()
    console.log(clientInfo, 'clientInfo')
    //#endif
  }

  return { token, roles, clientEmail, userId, setUserInfo, loginOut, resetToken, setPushId, logOff }
}
