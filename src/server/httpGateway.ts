import { wrapperEnv } from '@/utils/env'
import { showLoading, hideLoading } from './serviceLoading'
import { getCommonParams } from './commonParams'
import interceptorData from './interceptors'

const { VITE_APP_BASE_URL } = wrapperEnv

const httpRequestGateway = <T>(
  method: Http.method,
  headersMethod: string,
  query: AnyObj,
  isToken = true,
  contentType?: string
): Promise<[any, FcResponse<T> | undefined]> => {
  return new Promise((resolve) => {
    showLoading()

    /**
     * @description 成功回调方法
     * @param {any} response
     * @return {*}
     */
    const appNetworkResponseResolve = (response: UniNamespace.RequestSuccessCallbackResult): any => {
      const toastFn = hideLoading()
      // console.log('response', response)
      const [e, r] = interceptorData(response)
      // console.log([e, r])
      if (e) {
        //todo 异常处理
        toastFn(r.data?.errorMessage || JSON.stringify(r.data))
        if (r?.statusCode == '401') {
          // 延迟导入避免循环依赖
          import('@/hooks/useUser').then(({ useUser }) => {
            const { resetToken } = useUser()
            resetToken()
          })
        }
      }
      resolve([e, r])
    }

    /**
     * @description 失败回调方法
     * @param {any} response
     * @return {*}
     */
    const appNetworkResponseReject = (response: UniNamespace.GeneralCallbackResult): any => {
      const toastFn = hideLoading()
      toastFn(`network is not strong`)
      console.log(response)

      resolve([response, undefined])
      // reject(response)
    }

    //成功或失败都会调用
    const appNetworkResponseComplete = () => {}
    //请求header
    const headers = {
      'content-type': contentType || (method === 'POST' ? 'application/json' : 'application/x-www-form-urlencoded'),
      Authorization: isToken ? uni.getStorageSync('userInfo')?.token || '' : ''
    }

    uni.request({
      url: `${VITE_APP_BASE_URL}${headersMethod}`,
      method: method,
      data: query,
      header: headers,
      success: appNetworkResponseResolve,
      fail: appNetworkResponseReject,
      complete: appNetworkResponseComplete
    })
  })
}

const http = {
  get: <T>(params: Http.Params): Promise<[any, FcResponse<T> | undefined]> =>
    httpRequestGateway(
      'GET',
      params.method,
      {
        ...getCommonParams(),
        ...params.obj
      },
      params?.isToken,
      params?.contentType
    ),
  post: <T>(params: Http.Params): Promise<[any, FcResponse<T> | undefined]> =>
    httpRequestGateway(
      'POST',
      params.method,
      {
        ...getCommonParams(),
        ...params.obj
      },
      params?.isToken,
      params?.contentType
    ),
  put: <T>(params: Http.Params): Promise<[any, FcResponse<T> | undefined]> =>
    httpRequestGateway(
      'PUT',
      params.method,
      {
        ...getCommonParams(),
        ...params.obj
      },
      params?.isToken,
      params?.contentType
    ),
  putJson: <T>(params: Http.Params): Promise<[any, FcResponse<T> | undefined]> =>
    httpRequestGateway(
      'PUT',
      params.method,
      { ...getCommonParams(), ...params.obj },
      params?.isToken,
      'application/json'
    ),
  delete: <T>(params: Http.Params): Promise<[any, FcResponse<T> | undefined]> =>
    httpRequestGateway(
      'DELETE',
      params.method,
      {
        ...getCommonParams(),
        ...params.obj
      },
      params?.isToken,
      params?.contentType
    )
}
export default http
