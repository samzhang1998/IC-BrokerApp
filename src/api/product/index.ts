import http from '@/server/httpGateway'

/**
 * @description 获取产品列表
 * @param query 入参
 */
export function getProductList<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/v1/products',
    obj: query
  })
}

export const productApi = {
  getProductList
}
