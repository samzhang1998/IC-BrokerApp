import type { InjectionKey } from 'vue'
import { inject } from 'vue'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
dayjs.extend(customParseFormat)

/**
 * @description: 返回网络路径的文件名
 */
export function getFilenameFromUrl(url: string) {
  // const pathname = new URL(url).pathname
  const index = url.lastIndexOf('/')
  return -1 !== index ? url.substring(index + 1) : url
}

/**
 * @description:  处理inject注入属性 undefined 问题
 */
export function injectStrict<T>(key: InjectionKey<T>, fallback?: T) {
  const resolved = inject(key, fallback)
  if (!resolved) {
    throw new Error(`Could not resolve ${key.description}`)
  }
  return resolved
}

/***
 * @description vite动态加载静态资源图片
 * @params string name - 图片名称
 */
export function dynamicGetImg(name: string) {
  if (!name) return
  try {
    return new URL(`../static/images/${name}`, import.meta.url).href
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description:  获取当前时间的时间戳
 */
export function getNowFormatDate(): string {
  //时间戳
  const Dates = new Date()
  //年份
  const Year = Dates.getFullYear()
  //星期
  // const data: number = Dates.getDay()
  //月份下标是0-11
  const Months = Dates.getMonth() + 1 < 10 ? '0' + (Dates.getMonth() + 1) : Dates.getMonth() + 1
  //具体的天数
  const Day = Dates.getDate() < 10 ? '0' + Dates.getDate() : Dates.getDate()
  //小时
  const Hours = Dates.getHours() < 10 ? '0' + Dates.getHours() : Dates.getHours()
  //分钟
  const Minutes = Dates.getMinutes() < 10 ? '0' + Dates.getMinutes() : Dates.getMinutes()
  //秒
  const Seconds = Dates.getSeconds() < 10 ? '0' + Dates.getSeconds() : Dates.getSeconds()
  return `${Year}-${Months}-${Day} ${Hours}:${Minutes}:${Seconds}`
}
/**
 * @description:  对比两个时间差几分钟
 */
export function getMinutesDifference(date1: any, date2: any) {
  // 将日期字符串转换为Date对象
  const dateObject1: any = new Date(date1)
  const dateObject2: any = new Date(date2)

  // 计算时间差（毫秒）
  const difference = Math.abs(dateObject1 - dateObject2)

  // 将毫秒转换为分钟
  return Math.floor(difference / 1000 / 60)
}

/**
 * @description:  校验时间大小
 */
export function judgmentTime(startTime: string, endTime: string) {
  const beginDate = new Date(startTime.replace(/-/g, '/'))
  const endDate = new Date(endTime.replace(/-/g, '/'))
  console.log(beginDate, endDate)
  return endDate > beginDate
}

/*
    parameter：
    num：格式化目标数字
    decimal：保留几位小数，默认2位
    split：千分位分隔符，默认为,
    moneyFormat(123456789.87654321, 2, ',') // 123,456,789.88
  */

/**
 * @description: 格式化金钱
 * @param {number} num num：格式化目标数字
 * @param {*} decimal 保留几位小数，默认2位
 * @param {*} split 千分位分隔符，默认为
 * @return {*}
 */
export function moneyFormat(num: number, decimal = 2, split = '') {
  if (isFinite(num)) {
    // num是数字
    if (num === 0) {
      // 为0
      return num.toFixed(decimal)
    } else {
      // 非0
      let res = ''
      const dotIndex = String(num).indexOf('.')
      if (dotIndex === -1) {
        // 整数
        res = String(num).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + '.' + '0'.repeat(decimal)
      } else {
        // 非整数
        // js四舍五入 Math.round()：正数时4舍5入，负数时5舍6入
        // Math.round(1.5) = 2
        // Math.round(-1.5) = -1
        // Math.round(-1.6) = -2
        // 保留decimals位小数
        const numStr = String((Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)) // 四舍五入，然后固定保留2位小数
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1) // 截取小数位
        res = String(numStr.slice(0, dotIndex)).replace(/(\d)(?=(?:\d{3})+$)/g, `$1${split}`) + decimals
      }
      return res
    }
  } else {
    return ''
  }
}

export function isEmail(email: string) {
  // eslint-disable-next-line no-useless-escape
  return RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(
    email
  )
}
export function isPhone(phone: string) {
  // eslint-disable-next-line no-useless-escape
  return RegExp(/^(\+?61|0)4\d{8}$/).test(phone)
  // const australianPhoneRegex = /^\s*(?:\+?61|0|0061)?(\s|-|\.)?(\(0[2-9]\))(\s|-|\.)(\d{3})(\s|-|\.)(\d{4})\s*$/
  // return australianPhoneRegex.test(phone)
}

/**
 * @description:  深拷贝方法
 * @param source 需要拷贝的源
 */
export function deepClone<T>(source: T): T {
  return Array.isArray(source)
    ? source.map((item) => deepClone(item))
    : source instanceof Date
      ? new Date(source.getTime())
      : source && typeof source === 'object'
        ? Object.getOwnPropertyNames(source).reduce(
            (o, prop) => {
              Object.defineProperty(o, prop, Object.getOwnPropertyDescriptor(source, prop)!)
              o[prop] = deepClone((source as { [key: string]: any })[prop])
              return o
            },
            Object.create(Object.getPrototypeOf(source))
          )
        : (source as T)
}

export function formatDate(date: string, format = 'DD MMM') {
  return dayjs(date, 'DD-MM-YYYY').format(format)
}
