import http from '@/server/httpGateway'

/**
 * @description 获取申请列表
 * @param query 入参
 */
export function getApplicationList<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/v1/application',
    obj: query
  })
}

/**
 * @description 创建申请
 * @param query 入参
 */
export function createApplication<T = any>(query: AnyObj): ApiResponse<T> {
  return http.post({
    method: 'api/v1/application',
    obj: query
  })
}

export const applicationApi = {
  getApplicationList,
  createApplication
}
