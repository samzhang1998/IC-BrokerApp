import http from '@/server/httpGateway'

/**
 * @description 获取列表
 * @param query 入参
 */
export function getNotificationsList<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/notifications',
    obj: query
  })
}

/**
 * @description 获取未读数量
 * @param query 入参
 */
export function unreadCount<T = any>(query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/notifications/unread-count',
    obj: query || {}
  })
}

/**
 * @description 批量删除通知
 * @param query 入参
 */
export function notificationsBatch<T = any>(query: AnyObj): ApiResponse<T> {
  return http.delete({
    method: 'api/notifications/batch',
    obj: query
  })
}

/**
 * @description 批量已读
 * @param query 入参
 */
export function readAll<T = any>(query: AnyObj): ApiResponse<T> {
  return http.put({
    method: 'api/notifications/read-all',
    obj: query
  })
}

/**
 * @description 批量已读
 * @param query 入参
 */
export function readOne<T = any>(id: string | number, query: AnyObj): ApiResponse<T> {
  return http.put({
    method: `api/notifications/${id}/read`,
    obj: query
  })
}

export const notificationsApi = {
  getNotificationsList,
  unreadCount,
  notificationsBatch,
  readAll
}
