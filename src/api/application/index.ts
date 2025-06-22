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

/**
 * @description 获取申请详情
 * @param query 入参
 */
export function getApplicationDetail<T = any>(id: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${id}`,
    obj: query || {}
  })
}

export function getBorrowerDetails<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/borrowers/details`,
    obj: query || {}
  })
}

export function createBorrower<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/borrowers`,
    obj: query || {}
  })
}

export function updateBorrower<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.put({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}`,
    obj: query || {}
  })
}

export const applicationApi = {
  getApplicationList,
  createApplication,
  getApplicationDetail,
  getBorrowerDetails,
  createBorrower,
  updateBorrower
}
