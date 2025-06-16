declare namespace Application {
  interface IItem {
    title: string
    checked?: boolean
    name?: string
    children?: IItem[]
  }
}
