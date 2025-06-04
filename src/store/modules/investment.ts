import store from '@/store'
import { defineStore } from 'pinia'
interface InvestmentState {
  investmentInfo: AnyObj
}
export const useInvestmentStore = defineStore({
  id: 'investment',
  state: (): InvestmentState => {
    return {
      investmentInfo: {}
    }
  },
  actions: {
    /** 设置角色数组 */
    setInvestmentInfo(item: AnyObj) {
      this.investmentInfo = item
    }
  }
})

/** 在 setup 外使用 */
export function useInvestmentStoreHook() {
  return useInvestmentStore(store)
}
