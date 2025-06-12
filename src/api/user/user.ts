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
 * @description 用户退出登录
 * @param query 入参
 */
export function userLogout<T = any>(query: AnyObj): ApiResponse<T> {
  return http.post({
    method: 'api/v1/logout',
    obj: query
  })
}

/**
 * @description 获取用户信息
 * @param query 入参
 */
export function getUserInfo<T = any>(id: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/brokers/${id}`,
    obj: query || {}
  })
}

/**
 * @description 编辑用户信息
 * @param query 入参
 */
export function editUserInfo<T = any>(id: string | number, query?: AnyObj): ApiResponse<T> {
  return http.put({
    method: `api/v1/brokers/${id}`,
    obj: query || {}
  })
}

export const userApi = {
  userLogin,
  userLogout,
  getUserInfo,
  editUserInfo
}
