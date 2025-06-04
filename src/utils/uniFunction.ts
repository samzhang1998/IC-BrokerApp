/***
 * @description 封装navigateBack方法，回退几级路由，当前是一级路由，打开首页
 * @params number delta - 回退几级
 */
export function backFn(delta: number) {
  return function () {
    const page = getCurrentPages()
    if (page.length > delta) {
      uni.navigateBack({
        delta: delta
      })
    } else {
      uni.redirectTo({
        url: '/pages/index/index'
      })
    }
  }
}

/***
 * @description 将uni的方法转成异步执行
 */
export const uniAsync = new Proxy({} as any, {
  get(target, name) {
    return (obj: any) =>
      new Promise((resolve, reject) => {
        // @ts-ignore
        uni[name]({
          ...obj,
          success: (ret: any) => {
            resolve(ret)
          },
          fail: (err: any) => {
            reject(err)
          }
        })
      })
  }
})
