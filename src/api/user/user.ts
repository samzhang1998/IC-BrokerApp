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
 * @description 修改用户密码
 * @param query 入参
 */
export function updatePassword<T = any>(id: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/brokers/${id}/password`,
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
    obj: query || {},
    contentType: 'application/json'
  })
}

/**
 * @description QualificationTypes
 * @param query 入参
 */
export function getQualificationTypes<T = any>(id: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/brokers/${id}/qualifications`,
    obj: query || {}
  })
}
/**
 * @description QualificationTypes
 * @param query 入参
 */
export function getQualification<T = any>(id: string | number, qId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/brokers/${id}/qualifications/${qId}`,
    obj: query || {}
  })
}

/**
 * @description 编辑Qualificatio
 * @param query 入参
 */
export function editQualification<T = any>(id: string | number, qId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.put({
    method: `api/v1/brokers/${id}/qualifications/${qId}/fields`,
    obj: query || {},
    contentType: 'application/x-www-form-urlencoded'
  })
}

/**
 * @description 更新推送id
 * @param query 入参
 */
export function updatePushId<T = any>(query: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/device-tokens`,
    obj: query
  })
}
/**
 * @description 获取推送id
 * @param query 入参
 */
export function getPushId<T = any>(brokerId: string | number, query: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/device-tokens/broker/${brokerId}`,
    obj: query
  })
}

export const userApi = {
  userLogin,
  userLogout,
  getUserInfo,
  editUserInfo,
  getQualificationTypes,
  editQualification,
  getQualification,
  updatePassword,
  updatePushId,
  getPushId
}
