import { useTabBarStoreHook } from "@/store/modules/tabBar"

// 暴露hook函数
export function useTabBar() {
  const tabBarStoreHook = useTabBarStoreHook()
  const { tabBarList, selectKey } = storeToRefs(tabBarStoreHook)

  /**
   * @description 设置tabBar数据
   * @param {Array} item
   * @return {*}
   */
  const setTabBarList = (item: Array<ITabBar>): any => {
    tabBarStoreHook.setTabBarList(item)
  }

  /**
   * @description 设置tabBar全局选中
   * @param {string} item
   * @return {*}
   */
  const setSelectKey = (item: string): any => {
    tabBarStoreHook.setSelectKey(item)
  }

  // 返回数据
  return { tabBarList, selectKey, setTabBarList, setSelectKey }
}
