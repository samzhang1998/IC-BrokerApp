import store from '@/store'
import dashboard from '@/static/icon/dashboard.png'
import application from '@/static/icon/application.png'
import product from '@/static/icon/product.png'
import user from '@/static/icon/user.png'
import dashboardAct from '@/static/icon/dashboard-act.png'
import applicationAct from '@/static/icon/application-act.png'
import userAct from '@/static/icon/user-act.png'
import productAct from '@/static/icon/product-act.png'
export const useTabBarStore = defineStore({
  id: 'tabBar',
  state: (): ITabBarState => {
    return {
      tabBarList: [
        {
          key: 'dashboard',
          name: 'Dashboard',
          iconPath: dashboard,
          iconActivePath: dashboardAct,
          router: '/pages/dashboard/index'
        },
        {
          key: 'application',
          name: 'Application',
          iconPath: application,
          iconActivePath: applicationAct,
          router: '/pages/application/index'
        },
        {
          key: 'product',
          name: 'Product',
          iconPath: product,
          iconActivePath: productAct,
          router: '/pages/product/index'
        },
        {
          key: 'profile',
          name: 'Profile',
          iconPath: user,
          iconActivePath: userAct,
          router: '/pages/profile/index'
        }
      ],
      selectKey: 'dashboard'
    }
  },
  actions: {
    /** 设置tabBar数据 */
    setTabBarList(list: Array<ITabBar>) {
      this.tabBarList = list
    },
    /** 设置tabBar选中 */
    setSelectKey(key: string) {
      this.selectKey = key
    }
  }
  // persist: {
  //   enabled: true
  // }
})

/** 在 setup 外使用 */
export function useTabBarStoreHook() {
  return useTabBarStore(store)
}
