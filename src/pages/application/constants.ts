export const currentSituationItems = ref<Application.IItem[]>([
  {
    title: 'Borrower and Guarantor',
    children: [
      {
        title: 'Personal Applicants',
        name: 'personalApplicants',
        checked: false
      },
      {
        title: 'Company Applicants',
        name: 'companyApplicants',
        checked: false
      },
      {
        title: 'Trust Applicants',
        name: 'trustApplicants',
        checked: false
      }
    ]
  },
  {
    title: 'Assets and Liabilities',
    children: [
      {
        title: 'Existing Properties',
        name: 'existingProperties',
        checked: false
      },
      {
        title: 'Other Assets',
        name: 'otherAssets',
        checked: false
      },
      {
        title: 'Mortgage Liabilities',
        name: 'mortgageLiabilities',
        checked: false
      },
      {
        title: 'Other Liabilities',
        name: 'otherLiabilities',
        checked: false
      }
    ]
  },
  {
    title: 'Other Sources of Income',
    children: [
      {
        title: 'Other Income',
        name: 'otherIncome',
        checked: false
      }
    ]
  }
])

export const newRequirementsItems = ref<Application.IItem[]>([
  {
    title: 'New Real Estate',
    children: [
      {
        title: 'New Purchase',
        name: 'newPurchase',
        checked: false
      }
    ]
  },
  {
    title: 'Loan Accounts',
    children: [
      {
        title: 'New Loans',
        name: 'newLoans',
        checked: false
      }
    ]
  },
  {
    title: 'Funds to Complete',
    children: [
      {
        title: 'Contribution Funds',
        name: 'contributionFunds',
        checked: false
      }
    ]
  },
  {
    title: 'Cuarantee',
    children: [
      {
        title: 'Lending Guarantee',
        name: 'lendingGuarantee',
        checked: false
      }
    ]
  }
])

export const applicationSummaryItems = ref<Application.IItem[]>([
  {
    title: 'Application Summary',
    children: [
      {
        title: 'Summary Data',
        name: 'summaryData',
        checked: false
      },
      {
        title: 'Statement of Position',
        name: 'statementOfPosition',
        checked: false
      }
    ]
  }
])

export const borrowerSummaryItems = ref<Application.IItem[]>([
  {
    title: 'Contact Details',
    name: 'contactDetails',
    checked: false
  },
  {
    title: 'Other Details',
    name: 'otherDetails',
    checked: false
  },
  {
    title: 'Employment',
    name: 'employment',
    checked: false
  },
  {
    title: 'PAYG-Primary Employment',
    name: 'paygPrimaryEmployment',
    checked: false
  },
  {
    title: 'Self Employment - Primary Employment',
    name: 'selfEmploymentPrimaryEmployment',
    checked: false
  },
  {
    title: 'Proof of Identity',
    name: 'proofOfIdentity',
    checked: false
  },
  {
    title: 'Australian Driver Licence',
    name: 'australianDriverLicence',
    checked: false
  },
  {
    title: 'Australian Passport',
    name: 'australianPassport',
    checked: false
  }
])
