export function useMoney() {
  function moneyFormant(num: number, decimal = 2, split = ',') {
    /*
    parameter：
    num：格式化目标数字
    decimal：保留几位小数，默认2位
    split：千分位分隔符，默认为,
    moneyFormat(123456789.87654321, 2, ',') // 123,456,789.88
  */
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
        return `$${res}`
      }
    } else {
      return ''
    }
  }

  return { moneyFormant }
}
