import { userApi } from './user/user'
import { productApi } from './product'

export const api = {
  ...userApi,
  ...productApi
}
