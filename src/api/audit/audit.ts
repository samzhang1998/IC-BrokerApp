import http from '@/server/httpGateway'

const methods = {
  getAudit: '/api/v1/audit/page',
  getAuditDetail: '/api/v1/audit/detail'
}

/**
 * @description getAudit
 * @param query 入参
 */
export function getAudit<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getAudit,
    obj: query
  })
}

/**
 * @description getAuditDetail
 * @param query 入参
 */
export function getAuditDetail<T = any>(query: object): ApiResponse<T> {
  return http.post({
    method: methods.getAuditDetail,
    obj: query
  })
}

export const auditApi = {
  getAudit,
  getAuditDetail
}
