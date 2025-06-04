import http from '@/server/httpGateway'

const methods = {
  getInvestmentAll: '/api/v1/investment/page',
  getPurchasedFundDetail: '/api/v1/investment/purchasedFund/detail',
  getInvestmentDetail: '/api/v1/investment/record',
  getPurchasedFundAll: '/api/v1/investment/purchasedFund/page',
  reInvestment: '/api/v1/investment/reInvestment'
}

/**
 * @description getInvestmentAll
 * @param query 入参
 */
export function getInvestmentAll<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getInvestmentAll,
    obj: query
  })
}

/**
 * @description getPurchasedFundDetail
 * @param query 入参
 */
export function getPurchasedFundDetail<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getPurchasedFundDetail,
    obj: query
  })
}

/**
 * @description getInvestmentDetail
 * @param query 入参
 */
export function getInvestmentDetail<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getInvestmentDetail,
    obj: query
  })
}

/**
 * @description getPurchasedFundAll
 * @param query 入参
 */
export function getPurchasedFundAll<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getPurchasedFundAll,
    obj: query
  })
}

/**
 * @description reInvestment
 * @param query 入参
 */
export function reInvestment<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.reInvestment,
    obj: query
  })
}

export const investmentApi = {
  getInvestmentAll,
  getPurchasedFundDetail,
  getInvestmentDetail,
  getPurchasedFundAll,
  reInvestment
}
