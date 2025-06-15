import type { InjectionKey, Ref } from 'vue'

interface Profile {
  userInfo: Ref<AnyObj>
  handleReset: () => void
}

/**
 * @description Popup InjectionKey Symbol
 */
export const ProfileKey: InjectionKey<Profile> = Symbol('profile')
