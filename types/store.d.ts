/*
 * @Author: taoyongjian taoyongjian-zf@bjebc.com
 * @Date: 2023-01-20 14:15:04
 * @LastEditors: eric taoyongjian-zf@bjebc.com
 * @LastEditTime: 2023-10-13 11:52:16
 * @FilePath: /bhg-app-client/types/store.d.ts
 * @Description:
 *
 * Copyright (c) 2023 by gome, All Rights Reserved.
 */
export {}
declare global {
  interface ITabBarState {
    tabBarList: Array<ITabBar>
    selectKey: string
  }

  interface ITabBar {
    key: string
    name: string
    iconPath: string
    iconActivePath: string
    router: string
  }
}
