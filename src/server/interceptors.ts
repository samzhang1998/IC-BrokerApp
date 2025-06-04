import { httpStatus, HttpFn } from "./httpStatus.js"

/**
 * @description http返回值拦截处理方法
 * @param {any} res
 * @return {*}
 */
function customInterceptor(res: any): any {
  const status: any = httpStatus.find((item: Http.HttpStatus) => {
    return item.statusCode === res.statusCode
  })
  return function () {
    return HttpFn[status?.name](res)
  }
}

/**
 * @description 返回处理结果
 * @param {any} res
 * @return {*}
 */
function interceptorData(res: any): any {
  return customInterceptor(res)()
}
export default interceptorData
