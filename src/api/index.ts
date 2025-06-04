import { userApi } from './user/user'
import { fundApi } from './fund/fund'
import { eventApi } from './event/event'
import { entityApi } from './entity/entity'
import { dictApi } from './dict/dict'
import { investmentApi } from './investment/investment'
import { auditApi } from './audit/audit'
import { notificationApi } from './notification/notification'

export const api = {
  ...userApi,
  ...fundApi,
  ...eventApi,
  ...entityApi,
  ...dictApi,
  ...investmentApi,
  ...auditApi,
  ...notificationApi
}
