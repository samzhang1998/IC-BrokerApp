import http from '@/server/httpGateway'

/**
 * @description 获取申请列表
 * @param query 入参
 */
export function getApplicationList<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/v1/application',
    obj: query
  })
}

/**
 * @description 获取活跃的申请列表
 * @param query 入参
 */
export function getApplicationListByActive<T = any>(query: AnyObj): ApiResponse<T> {
  return http.get({
    method: 'api/v1/application/active',
    obj: query
  })
}

/**
 * @description 创建申请
 * @param query 入参
 */
export function createApplication<T = any>(query: AnyObj): ApiResponse<T> {
  return http.post({
    method: 'api/v1/application',
    obj: query
  })
}

/**
 * @description 获取申请详情
 * @param query 入参
 */
export function getApplicationDetail<T = any>(id: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${id}`,
    obj: query || {}
  })
}

export function getBorrowerDetails<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/borrowers/details`,
    obj: query || {}
  })
}

export function createBorrower<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/borrowers`,
    obj: query || {}
  })
}

export function updateBorrower<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}`,
    obj: query || {}
  })
}

/**
 * @description 创建家庭开支
 * @param applicationId 申请ID
 * @param borrowerId 借款人ID
 * @param query 入参
 */
export function createHousehold<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/livingexpenses`,
    obj: query || {}
  })
}

export function getCompanyApplicants<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/companyapplicants`,
    obj: query || {}
  })
}

export function createCompanyApplicant<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/companyapplicants`,
    obj: query || {}
  })
}

export function getTrustApplicants<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/trustapplicants`,
    obj: query || {}
  })
}

export function createTrustApplicant<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/trustapplicants`,
    obj: query || {}
  })
}

export function getNewPurchase<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/new-properties`,
    obj: query || {}
  })
}

export function getProperties<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/properties`,
    obj: query || {}
  })
}

export function getNewLoan<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/loans`,
    obj: query || {}
  })
}

export function getFee<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/fees/application/${applicationId}`,
    obj: query || {}
  })
}

export function getHistory<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/history`,
    obj: query || {}
  })
}

export function getDocuments<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/documents`,
    obj: query || {}
  })
}

export function postEmployment<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/employment`,
    obj: query || {}
  })
}

export function getMirDocuments<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/applications/${applicationId}/mir/documents`,
    obj: query || {}
  })
}

export function putMirDocuments<T = any>(
  applicationId: string | number,
  documentId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/applications/${applicationId}/mir/documents/${documentId}/notes`,
    obj: query || {}
  })
}

export const applicationApi = {
  getApplicationList,
  getApplicationListByActive,
  createApplication,
  getApplicationDetail,
  getBorrowerDetails,
  createBorrower,
  updateBorrower,
  createHousehold,
  getCompanyApplicants,
  getTrustApplicants,
  createCompanyApplicant,
  createTrustApplicant,
  getNewPurchase,
  getProperties,
  getNewLoan,
  getFee,
  getHistory,
  getDocuments,
  postEmployment,
  getMirDocuments,
  putMirDocuments
}
