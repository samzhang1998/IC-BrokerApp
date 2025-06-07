import http from '@/server/httpGateway'

/**
 * @description 用户登录方法
 * @param query 入参
 */
export function userLogin<T = any>(query: AnyObj): ApiResponse<T> {
  return http.post({
    method: 'api/v1/login',
    obj: query
  })
}
/**
 * @description 用户登录方法
 * @param query 入参
 */
export function userLogout<T = any>(query: AnyObj): ApiResponse<T> {
  return http.post({
    method: 'api/v1/logout',
    obj: query
  })
}

export const userApi = {
  userLogin,
  userLogout
}
