import http from '@/server/httpGateway'

const methods = {
  getEntityDetail: '/api/v1/investment/entity/detail',
  getEntityAll: '/api/v1/investment/entity/list',
  updateEntity: '/api/v1/investment/entity/update'
}
/**
 * @description getEntityDetail
 * @param query 入参
 */
export function getEntityDetail<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getEntityDetail,
    obj: query
  })
}

/**
 * @description getEntityAll
 * @param query 入参
 */
export function getEntityAll<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getEntityAll,
    obj: query
  })
}

/**
 * @description updateEntity
 * @param query 入参
 */
export function updateEntity<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.updateEntity,
    obj: query
  })
}

export const entityApi = {
  getEntityDetail,
  getEntityAll,
  updateEntity
}
