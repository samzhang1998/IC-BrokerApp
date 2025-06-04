import http from '@/server/httpGateway'

const methods = {
  queryDictionary: '/api/v1/info/dictionary'
}

/**
 * @description queryDictionary
 * @param query 入参
 */
export function queryDictionary<T = any>(query: object): ApiResponse<T> {
  return http.get({
    method: methods.queryDictionary,
    obj: query,
    isToken: false
  })
}

export const dictApi = {
  queryDictionary
}
