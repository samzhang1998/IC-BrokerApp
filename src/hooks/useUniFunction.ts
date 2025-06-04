
import { backFn } from '@/utils/uniFunction'
// 暴露hook函数
export function useUniFunction() {
  /**
   * @description: 定义回退1的方法
   */
  const backToOne = backFn(1)

  /**
   * @description 函数防抖
   * @param {AllFunction} fn
   * @param {number} delay
   * @param {array} args
   * @return {*}
   */
  function debounce(fn: AllFunction, delay?: number, ...args: any[]): any {
    delay = delay ? delay : 500
    let timeNo: any = null
    return (...params: any[]) => {
      if (timeNo) {
        clearTimeout(timeNo)
        timeNo = null
      }
      timeNo = setTimeout(() => {
        fn(...args, ...params)
      }, delay)
    }
  }

  /**
   * @description 函数节流
   * @param {AllFunction} fn
   * @param {number} delay
   * @param {array} args
   * @return {*}
   */
  function throttle(fn: AllFunction, delay?: number, ...args: any[]): any {
    delay = delay ? delay : 500
    let timeNo: any = null
    return (...params: any[]) => {
      if (timeNo) return
      timeNo = setTimeout(() => {
        fn(...args, ...params)
        clearTimeout(timeNo)
        timeNo = null
      }, delay)
    }
  }

  // 返回数据
  return { backToOne, debounce, throttle }
}
