import http from '@/server/httpGateway'

const methods = {
  homePopular: '/api/v1/funds/popular',
  getFundsAll: '/api/v1/funds/page',
  getFundsDetail: '/api/v1/funds/detail',
  enquirySubmit: '/api/v1/info/submit-enquiry'
}

/**
 * @description homeFunds
 * @param query 入参
 */
export function homeFunds<T = any>(query: object): ApiResponse<T> {
  return http.get({
    method: methods.getFundsAll,
    obj: query
  })
}

/**
 * @description homePopular
 * @param query 入参
 */
export function homePopular<T = any>(query: object): ApiResponse<T> {
  return http.get({
    method: methods.homePopular,
    obj: query
  })
}

/**
 * @description getFundsDetail
 * @param query 入参
 */
export function getFundsDetail<T = any>(query: object): ApiResponse<T> {
  return http.get({
    method: methods.getFundsDetail,
    obj: query
  })
}

/**
 * @description enquirySubmit
 * @param query 入参
 */
export function enquirySubmit<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.enquirySubmit,
    obj: query,
    isToken: false
  })
}

export const fundApi = {
  homeFunds,
  homePopular,
  getFundsDetail,
  enquirySubmit
}
