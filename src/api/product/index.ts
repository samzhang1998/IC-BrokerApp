import http from '@/server/httpGateway'

/**
 * @description 获取产品列表
 * @param query 入参
 */
export function getProductList<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/v1/products/search',
    obj: query
  })
}
/**
 * @description 获取首页statistics
 * @param query 入参
 */
export function getStatistics<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/v1/application/statistics',
    obj: query
  })
}

export function getAllProducts(params: AnyObj) {
  return http.get({
    method: 'api/v1/products',
    obj: params
  })
}

export const productApi = {
  getProductList,
  getStatistics,
  getAllProducts
}
