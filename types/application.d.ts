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

  interface IBorrowerDetail {
    id: number
    applicationId: number
    applicationStatus: string
    applicantType: string
    primaryApplicant: boolean
    nameTitle: string
    firstName: string
    middleName: string
    lastName: string
    knownAs: string
    maidenName: string
    hasPreName: boolean
    preNameTitle: string
    preFirstName: string
    preMiddleName: string
    preLastName: string
    gender: string
    dob: string
    residencyStatus: string
    principalForeignResidence: string
    citizenship: string
    maritalStatus: string
    spouse: number
    kinType: string
    kinId: number
    kinRelation: string
    livingExpensesId: number
    solicitorId: number
    accountantId: number
    homePhone: string
    workPhone: string
    mobile: string
    email: string
    maidenName: string
    hasPreName: boolean
    preNameTitle: string
    preFirstName: string
    preMiddleName: string
    preLastName: string
    gender: string
    dob: string
    residencyStatus: string
    principalForeignResidence: string
    citizenship: string
    maritalStatus: string
    spouse: number
    kinType: string
    kinId: number
    kinRelation: string
    livingExpensesId: number
    solicitorId: number
    accountantId: number
    homePhone: string
    workPhone: string
    mobile: string
    email: string
    privacyActConsentSigned: boolean
    signedDate: string
    createdAt: string
    updatedAt: string
    address: {
      current_address: {
        residential_address: string
        start_date: string
        housing_status: string
        mailing_address: string
      }
      previous_addresses: [
        {
          residential_address: string
          start_date: string
          end_date: string
          housing_status: string
        }
      ]
      post_settlement_address: {
        residential_address: string
        housing_status: string
        mailing_address: string
      }
    }
    employmentStatuses: [
      {
        id: number
        borrowerId: number
        statusCode: string
        typeStatus: string
        startDate: string
        endDate: string
        createdAt: string
        paygDetails: {
          basis: string
          positionTitle: string
          occupation: string
          employerType: string
          employerSource: string
          employerId: number
          businessActivity: string
          onProbation: boolean
          maintainedCompanyCar: boolean
          incomeJson: string
        }
        selfDetails: {
          basis: string
          occupation: string
          employerSource: string
          employerId: number
          businessStartDate: string
          businessActivity: string
          industry: string
          industryCode: string
          numberOfEmployees: number
          numberOfLocations: number
          isFranchise: boolean
          ownPremises: boolean
          accountantId: number
          incomes: [
            {
              id: number
              startDate: string
              endDate: string
              incomeJson: string
            }
          ]
        }
        notEmployedDetails: {
          homeDuties: boolean
          onBenefits: boolean
          student: boolean
          retired: boolean
          incomeJson: string
        }
      }
    ]
    identities: [
      {
        id: number
        borrowerId: number
        documentType: string
        documentCategory: string
        documentNumber: string
        issueDate: string
        dataJson: string
      }
    ]
  }
}
