import { useUser } from '@/hooks/useUser'
const { userId } = useUser()

export default function useProfile() {
  async function editUserInfo(formData: AnyObj, fn: () => void) {
    const [e, r] = await api.editUserInfo(userId.value, formData)
    if (!e && r) {
      fn()
    }
  }

  async function editQualification(qId: string, formData: AnyObj, fn: () => void) {
    const [e, r] = await api.editQualification(userId.value, qId, formData)
    if (!e && r) {
      fn()
    }
  }

  async function getQualification(qId: string, fn: (value: AnyObj) => void) {
    const [e, r] = await api.getQualification(userId.value, qId)
    if (!e && r) {
      fn(r)
    }
  }

  return {
    editUserInfo,
    editQualification,
    getQualification
  }
}
