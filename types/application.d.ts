declare namespace Application {
  interface IItem {
    title: string
    checked?: boolean
    name?: string
    children?: IItem[]
  }

  interface IApplication {
    adminId: number
    applicationId: number
    applicationName: string
    assessorId: number
    assessorName: string
    bdmId: number
    bdmName: string
    borrowerNames: string[]
    brokerId: number
    brokerName: string
    createTime: string
    documentType: string
    loanInfos: any[]
    mirDocuments: any
    referenceNumber: string
    stage: string
    status: string
    submitTime: string
  }
}
