import http from '@/server/httpGateway'

const methods = {
  getEventDetail: '/api/v1/events/detail',
  getEventAll: '/api/v1/events/page'
}

/**
 * @description getEventDetail
 * @param query 入参
 */
export function getEventDetail<T = any>(query: object): ApiResponse<T> {
  return http.get({
    method: methods.getEventDetail,
    obj: query
  })
}

/**
 * @description getEventAll
 * @param query 入参
 */
export function getEventAll<T = any>(query: object): ApiResponse<T> {
  return http.get({
    method: methods.getEventAll,
    obj: query
  })
}

export const eventApi = {
  getEventDetail,
  getEventAll
}
