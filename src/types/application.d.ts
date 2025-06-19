declare module 'vue' {
  interface ComponentCustomProperties {
    $application: {
      IItem: {
        title: string
        checked?: boolean
        name?: string
        children?: IItem[]
      }
    }
  }
}

export interface IItem {
  title: string
  checked?: boolean
  name?: string
  children?: IItem[]
}

// 全局类型声明
declare global {
  interface IItem {
    title: string
    checked?: boolean
    name?: string
    children?: IItem[]
  }
}
