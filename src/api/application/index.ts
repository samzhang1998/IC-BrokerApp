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

export function updateCompanyApplicant<T = any>(
  applicationId: string | number,
  companyApplicantId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/companyapplicants/${companyApplicantId}`,
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

export function updateTrustApplicant<T = any>(
  applicationId: string | number,
  trustApplicantId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/trustapplicants/${trustApplicantId}`,
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

export function putPaygEmployment<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  employmentId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/employment/${employmentId}/payg`,
    obj: query || {}
  })
}
export function putSelfEmployment<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  employmentId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/employment/${employmentId}/self`,
    obj: query || {}
  })
}

export function putNotEmployment<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  employmentId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/unemployment/${employmentId}`,
    obj: query || {}
  })
}

export function deleteEmployment<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  employmentId: string | number
): ApiResponse<T> {
  return http.delete({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/employment/${employmentId}`,
    obj: {}
  })
}

export function postIdentity<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/identity`,
    obj: query || {}
  })
}

export function deleteIdentity<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  identityId: string | number
): ApiResponse<T> {
  return http.delete({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/identity/${identityId}`,
    obj: {}
  })
}

export function putIdentity<T = any>(
  applicationId: string | number,
  borrowerId: string | number,
  identityId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/borrowers/${borrowerId}/identity/${identityId}`,
    obj: query || {}
  })
}

export function getExistingProperties<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/properties`,
    obj: query || {}
  })
}

export function createExistingProperty<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/properties`,
    obj: query || {}
  })
}

export function updateExistingProperty<T = any>(
  applicationId: string | number,
  propertyId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/properties/${propertyId}`,
    obj: query || {}
  })
}

export function deleteExistingProperty<T = any>(
  applicationId: string | number,
  propertyId: string | number
): ApiResponse<T> {
  return http.delete({
    method: `api/v1/application/${applicationId}/properties/${propertyId}`,
    obj: {}
  })
}

//#region ContributionFunds
export function getContributionFunds<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/contribution-funds`,
    obj: query || {}
  })
}
export function postContributionFunds<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/contribution-funds`,
    obj: query || {}
  })
}

export function putContributionFunds<T = any>(
  applicationId: string | number,
  contributionFundsId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/contribution-funds/${contributionFundsId}`,
    obj: query || {}
  })
}
//#endregion

//#region NewPurchase
export function getNewPurchase<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/new-properties`,
    obj: query || {}
  })
}

export function postNewPurchase<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/new-property`,
    obj: query || {}
  })
}

export function putNewPurchase<T = any>(
  applicationId: string | number,
  newPurchaseId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/new-property/${newPurchaseId}`,
    obj: query || {}
  })
}
//#endregion

export function getAllApplicants<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/applicants`,
    obj: query || {}
  })
}

export function postNewLoan<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/loan`, //api/v1/application/43/loan
    obj: query || {}
  })
}
export function putNewLoan<T = any>(
  applicationId: string | number,
  loanId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/loan/${loanId}`,
    obj: query || {}
  })
}

export function getOtherAssets<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.get({
    method: `api/v1/application/${applicationId}/assets`,
    obj: query || {}
  })
}

export function createOtherAsset<T = any>(applicationId: string | number, query?: AnyObj): ApiResponse<T> {
  return http.post({
    method: `api/v1/application/${applicationId}/assets`,
    obj: query || {}
  })
}

export function updateOtherAsset<T = any>(
  applicationId: string | number,
  assetId: string | number,
  query?: AnyObj
): ApiResponse<T> {
  return http.putJson({
    method: `api/v1/application/${applicationId}/assets/${assetId}`,
    obj: query || {}
  })
}

export function deleteOtherAsset<T = any>(applicationId: string | number, assetId: string | number): ApiResponse<T> {
  return http.delete({
    method: `api/v1/application/${applicationId}/assets/${assetId}`,
    obj: {}
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
  putMirDocuments,
  putPaygEmployment,
  putSelfEmployment,
  putNotEmployment,
  postIdentity,
  deleteIdentity,
  putIdentity,
  deleteEmployment,
  updateCompanyApplicant,
  updateTrustApplicant,
  getContributionFunds,
  postContributionFunds,
  putContributionFunds,
  getExistingProperties,
  createExistingProperty,
  updateExistingProperty,
  deleteExistingProperty,
  getOtherAssets,
  createOtherAsset,
  updateOtherAsset,
  deleteOtherAsset,
  postNewPurchase,
  putNewPurchase,
  getAllApplicants,
  postNewLoan,
  putNewLoan
}
