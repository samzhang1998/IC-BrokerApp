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
      // setTimeout(() => {
      //   uni.redirectTo({
      //     url: '/pages/login/login'
      //   })
      // }, 1000)
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
      // setTimeout(() => {
      //   uni.redirectTo({
      //     url: '/pages/login/login'
      //   })
      // }, 1000)
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
    const clientInfo = plus.push.getClientInfo()
    console.log(clientInfo, 'clientInfo')
    // if (clientInfo?.clientid) {
    //   const lang = uni.getLocale()
    //   const params = {
    //     pushId: clientInfo?.clientid,
    //     language: lang.includes('zh') ? 0 : 1
    //   }
    //   console.log('设置pushId', params)
    //   const [e, r] = await api.editPushClientId(params)
    //   if (!e && r) {
    //     console.log('push', r)
    //     console.log('push', clientInfo?.clientid)
    //   }
    // }
  }

  return { token, roles, clientEmail, userId, setUserInfo, loginOut, resetToken, setPushId, logOff }
}
