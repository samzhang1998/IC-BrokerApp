/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: eric taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-11-02 08:14:17
 * @FilePath: /bhg-app-client/src/store/modules/tabBar.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
import store from '@/store'
import club from '@/static/icon/club.png'
import event from '@/static/icon/event.png'
import home from '@/static/icon/home.png'
import investment from '@/static/icon/investment.png'
import user from '@/static/icon/user.png'
import clubAct from '@/static/icon/club-act.png'
import eventAct from '@/static/icon/event-act.png'
import homeAct from '@/static/icon/home-act.png'
import investmentAct from '@/static/icon/investment-act.png'
import userAct from '@/static/icon/user-act.png'
export const useTabBarStore = defineStore({
  id: 'tabBar',
  state: (): ITabBarState => {
    return {
      tabBarList: [
        {
          key: 'home',
          name: 'Home',
          iconPath: home,
          iconActivePath: homeAct,
          router: '/pages/index/index'
        },
        {
          key: 'event',
          name: 'Event',
          iconPath: event,
          iconActivePath: eventAct,
          router: '/pages/event/index'
        },
        {
          key: 'investment',
          name: 'Investment',
          iconPath: investment,
          iconActivePath: investmentAct,
          router: '/pages/investment/index'
        },
        {
          key: 'club',
          name: 'Club',
          iconPath: club,
          iconActivePath: clubAct,
          router: '/pages/club/index'
        },
        {
          key: 'user',
          name: 'For you',
          iconPath: user,
          iconActivePath: userAct,
          router: '/pages/user/index'
        }
      ],
      selectKey: 'home'
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
