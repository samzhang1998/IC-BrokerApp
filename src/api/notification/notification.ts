import http from '@/server/httpGateway'

const methods = {
  getNotify: '/api/v1/notify/page',
  getNotifyDetail: '/api/v1/notify/detail',
  readAll: '/api/v1/notify/readAll'
}

/**
 * @description getNotify
 * @param query 入参
 */
export function getNotify<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getNotify,
    obj: query
  })
}

/**
 * @description getNotifyDetail
 * @param query 入参
 */
export function getNotifyDetail<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getNotifyDetail,
    obj: query
  })
}

/**
 * @description readAll
 * @param query 入参
 */
export function readAll<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.readAll,
    obj: query
  })
}

export const notificationApi = {
  getNotify,
  getNotifyDetail,
  readAll
}
