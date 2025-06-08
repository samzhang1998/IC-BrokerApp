import { userApi } from './user/user'
import { productApi } from './product'
import { applicationApi } from './application'

export const api = {
  ...userApi,
  ...productApi,
  ...applicationApi
}
