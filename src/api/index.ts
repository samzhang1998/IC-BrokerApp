import { userApi } from './user/user'
import { productApi } from './product'
import { applicationApi } from './application'
import { notificationsApi } from './notifications'

export const api = {
  ...userApi,
  ...productApi,
  ...applicationApi,
  ...notificationsApi
}
