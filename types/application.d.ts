declare namespace Application {
  interface IItem {
    title: string
    checked?: boolean
    name?: string
    isCollapse?: boolean
    [key: string]: any
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
          startDate: string
          endDate: string
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

  interface IHousehold {
    id: number
    applicationId: number
    name: string
    adultsCount: number
    dependantsCount: number
    expensesJson: string
  }

  interface ICompanyApplicant {
    abn: string
    acn: string
    applicationId: number
    companyName: string
    dataJson: string
    dateRegistered: string
    id: number
    incomeJson: any
    numberOfDirectors: number
    officePhone: string
    registeredAddress: string
    registeredCountry: string
    registeredGst: string
    registeredState: string
    tradingAddress: string
    type: string
  }

  interface ITrustApplicant {
    id: number
    applicationId: number
    established: string
    trustStructure: string
    trustPurpose: string
    trustName: string
    establishmentDate: string
    numberOfTrustees: number
    numberOfBeneficiaries: number
    officePhone: string
    dataJson: string
    incomeJson: any
    tradingAddress: string
    registeredAddress: string
  }

  interface IPurchase {
    id: number
    primaryUsage: string
    type: string
    estimateMethod: string
    estimateBasis: string
    estimatedValue: string
    usedAsSecurity: boolean
    contractOfSale: string
    legalRepresentative: string
    ownershipProportions: string
    dataJson: {
      purpose: string
      status: string
      primarySecurity: boolean
      principle: boolean
      construction: boolean
      address: string
      valuation: string
      contactType: string
      details: string
      transaction: string
      toBeSold: boolean
    }
    percentJson: { owner: [{ id: string; percentage: number }] }
    createdAt: string
    updatedAt: string
  }

  interface IContactDetails {
    applicationId: number
    applicationStatus: string
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
    email: { address: string; type: string; email_address: string; email_type: string }[]
    address: {
      current_address: {
        residential_address: string
        start_date: string
        housing_status: string
        mailing_address: string
      }
      previous_addresses: [
        { residential_address: string; start_date: string; end_date: string; housing_status: string }
      ]
      post_settlement_address: { residential_address: string; housing_status: string; mailing_address: string }
    }
    privacyActConsentSigned: boolean
    signedDate: string
    createdAt: string
    updatedAt: string
    type: string
    applicantType: string
  }

  interface IExistingProperty {
    id: number
    primaryUsage: string
    type: string
    estimateMethod: string
    estimateBasis: string
    estimatedValue: string
    usedAsSecurity: boolean
    contractOfSale: string
    legalRepresentative: string
    ownershipProportions: string
    dataJson: {
      address: string
      insurance: [{ name: string }]
      purpose: string
      status: string
      toBeSold: boolean
      transaction: string
    }
    percentJson: { owner: [{ id: string; percentage: number }] }
  }

  interface IContributionFunds {
    id: number
    amount: number
    description: string
    fundsFromLoan: boolean
    type: string
  }

  interface IOtherAsset {
    id: number
    applicationId: number
    assetType: string
    detailsType: string
    estimatedValue: string
    dataJson: {
      businessName: string
      mainActivity: string
      model: string
      registration: string
      toBeSold: boolean
      year: string
    }
    percentJson: { owner: [{ id: string; percentage: number }] }
  }

  interface INewLoan {
    id: number
    applicationId: number
    productId: number
    productName: string
    type: string
    settlementDate: number | string
    amountRequested: number
    dataJson: {
      nccp: string
      term: string
      offset: boolean
      redraw: boolean
      purpose: string
      security: { negative: boolean; priority: string; property: number }[]
      splitLoan: boolean
      lendingPurpose: { abs: string; amount: string }[]
    }
  }

  interface IMortgageLiability {
    id: number
    applicationId: number
    liabilityType: string
    financialInstitution: string
    accountNumber: string
    outstandingBalance: number
    originalAmount: number
    dataJson: {
      purpose: string
      security: [
        {
          property: string
          priority: string
          negative: boolean
        }
      ]
      clearing: string
      repayment: string
      repaymentFrequency: string
      repaymentType: string
      tax: string
      arrears: string
    }
    percentJson: {
      owner: [
        {
          id: string
          percentage: number
        }
      ]
    }
  }
  interface IOtherIncome {
    id: number
    type: string
    startDate: number | string
    endDate: number | string
    amount: number
    previousYearAmount: number
    frequency: string
    isTaxable: boolean
    type: string
    percentJson: { owner: [{ id: string; percentage: number }] }
  }

  interface IOtherLiabilities {
    id: number
    detailType: string
    financialInstitution: string
    outstandingBalance: string
    originalAmount: string
    dataJson: {
      credit: string
      interest: number
      clearing: string
      repayment: string
      repaymentFrequency: string
      repaymentType: string
      tax: string
      arrears: string
    }
    percentJson: { owner: [{ id: string; percentage: number }] }
  }
}
