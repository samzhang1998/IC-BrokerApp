import http from '@/server/httpGateway'

const methods = {
  userLogin: '/api/v1/login',
  userLogout: '/api/v1/logout',
  resetPasswordCodeSend: '/api/v1/resetPasswordCodeSend',
  resetPassword: '/api/v1/resetPassword',
  getUserInfo: '/api/v1/account/personal-info',
  editClient: '/api/v1/editClient',
  editPassword: '/api/v1/editPassword',
  documentType: '/api/v1/account/documentType',
  countryCode: '/api/v1/account/countryCode',
  shareApp: '/api/v1/shareApp',
  editPushClientId: '/api/v1/editPushClientId',
  isLogoff: '/api/v1/isLogoff',
  isRegister: '/api/v1/isRegister',
  logoff: '/api/v1/logoff',
  registerCodeSend: '/api/v1/registerCodeSend',
  registerClient: '/api/v1/registerClient',
  resetPasswordCodeMsgSend: '/api/v1/resetPasswordCodeMsgSend',
  setPin: '/api/v1/setPin',
  checkPin: '/api/v1/checkPin',
  editPin: '/api/v1/editPin',
  visitorCodeSend: '/api/v1/visitorCodeSend',
  visitorLogin: '/api/v1/visitorLogin',
  resetPinCodeSend: '/api/v1/resetPinCodeSend',
  resetPinMsgSend: '/api/v1/resetPinMsgSend'
}

/**
 * @description 用户登录方法
 * @param query 入参
 */
export function userLogin<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.userLogin,
    obj: query
  })
}
/**
 * @description 用户退出登录方法
 * @param query 入参
 */
export function userLogout<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.userLogout,
    obj: query
  })
}

/**
 * @description resetPasswordCodeSend
 * @param query 入参
 */
export function resetPasswordCodeSend<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.resetPasswordCodeSend,
    obj: query
  })
}

/**
 * @description resetPasswordCodeMsgSend
 * @param query 入参
 */
export function resetPasswordCodeMsgSend<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.resetPasswordCodeMsgSend,
    obj: query
  })
}

/**
 * @description resetPassword
 * @param query 入参
 */
export function resetPassword<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.resetPassword,
    obj: query
  })
}

/**
 * @description getUserInfo
 * @param query 入参
 */
export function getUserInfo<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getUserInfo,
    obj: query
  })
}

/**
 * @description editClient
 * @param query 入参
 */
export function editClient<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.editClient,
    obj: query
  })
}

/**
 * @description editPassword
 * @param query 入参
 */
export function editPassword<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.editPassword,
    obj: query
  })
}

/**
 * @description documentType
 * @param query 入参
 */
export function documentType<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.documentType,
    obj: query
  })
}

/**
 * @description countryCode
 * @param query 入参
 */
export function countryCode<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.countryCode,
    obj: query
  })
}

/**
 * @description shareApp
 * @param query 入参
 */
export function shareApp<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.shareApp,
    obj: query,
    isToken: false
  })
}

/**
 * @description isLogoff
 * @param query 入参
 */
export function isLogoff<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.isLogoff,
    obj: query
  })
}

/**
 * @description isRegister
 * @param query 入参
 */
export function isRegister<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.isRegister,
    obj: query,
    isToken: false
  })
}

/**
 * @description logoff
 * @param query 入参
 */
export function logoff<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.logoff,
    obj: query
  })
}

/**
 * @description registerCodeSend
 * @param query 入参
 */
export function registerCodeSend<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.registerCodeSend,
    obj: query,
    isToken: false
  })
}

/**
 * @description registerClient
 * @param query 入参
 */
export function registerClient<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.registerClient,
    obj: query,
    isToken: false
  })
}

/**
 * @description editPushClientId
 * @param query 入参
 */
export function editPushClientId<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.editPushClientId,
    obj: query
  })
}

/**
 * @description setPin
 * @param query 入参
 */
export function setPin<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.setPin,
    obj: query
  })
}

/**
 * @description checkPin
 * @param query 入参
 */
export function checkPin<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.checkPin,
    obj: query
  })
}

/**
 * @description editPin
 * @param query 入参
 */
export function editPin<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.editPin,
    obj: query
  })
}

/**
 * @description visitorCodeSend
 * @param query 入参
 */
export function visitorCodeSend<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.visitorCodeSend,
    obj: query
  })
}

/**
 * @description visitorLogin
 * @param query 入参
 */
export function visitorLogin<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.visitorLogin,
    obj: query
  })
}

/**
 * @description resetPinCodeSend
 * @param query 入参
 */
export function resetPinCodeSend<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.resetPinCodeSend,
    obj: query
  })
}

/**
 * @description resetPinMsgSend
 * @param query 入参
 */
export function resetPinMsgSend<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.resetPinMsgSend,
    obj: query
  })
}

export const userApi = {
  userLogin,
  userLogout,
  resetPasswordCodeSend,
  resetPassword,
  getUserInfo,
  editClient,
  editPassword,
  documentType,
  countryCode,
  shareApp,
  editPushClientId,
  isLogoff,
  isRegister,
  logoff,
  registerCodeSend,
  registerClient,
  resetPasswordCodeMsgSend,
  editPin,
  setPin,
  checkPin,
  visitorCodeSend,
  visitorLogin,
  resetPinCodeSend,
  resetPinMsgSend
}
