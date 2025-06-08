/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare namespace Http {
  type Response<T> = Promise<{
    data?: T
  }>

  type method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT'

  interface HttpStatus {
    statusCode: number
    msg: string
    name: string
  }

  interface Params {
    method: string
    obj: object
    isToken?: boolean
  }
}

interface AnyObj {
  [key: string]: any
}

type Recordable<T = any> = Record<string, T>
interface ViteEnv {
  //项目名称
  VITE_APP_NAME: string
  //启动端口号
  VITE_PORT: number
  //云测试环境
  VITE_APP_ENV: string
  //图片上传地址
  VITE_UPLOAD_IMG: string
  //接口地址
  VITE_APP_BASE_URL: string
  //打包是否去掉console
  VITE_DROP_CONSOLE: boolean
}

interface IUserState {
  token: string
  roles: string[]
  clientEmail: string
  userId: string | number
}

interface FcResponse<T> {
  errno: string
  errMsg: string
  data: T
  success?: boolean
  errorMessage?: string
  [key: string]: any
}

type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

type AsyncFunction = (...args: any[]) => Promise<void>

type TFunction = (...args: any[]) => void

//方法作为入参类型
type AllFunction = AsyncFunction | TFunction
