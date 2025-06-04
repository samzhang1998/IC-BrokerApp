const commonParams = {}

/**
 * @description 返回公共请求参数
 * @return {*}
 */
export function getCommonParams(): any {
  return Object.assign({}, commonParams)
}

/**
 * @description: 添加公共请求参数
 * @param {Object} params
 * @return {*}
 */
export function setCommonParams(params: Object): any {
  Object.assign(commonParams, params)
}
