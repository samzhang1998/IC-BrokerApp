export const currentSituationItems = ref<Application.IItem[]>([
  {
    title: 'Borrower and Guarantor',
    children: [
      {
        title: 'Personal Applicants',
        name: 'personalApplicants',
        checked: true
      },
      {
        title: 'Company Applicants',
        name: 'companyApplicants',
        checked: true
      },
      {
        title: 'Trust Applicants',
        name: 'trustApplicants',
        checked: true
      }
    ]
  },
  {
    title: 'Assets and Liabilities',
    children: [
      {
        title: 'Existing Properties',
        name: 'existingProperties',
        checked: true
      },
      {
        title: 'Other Assets',
        name: 'otherAssets',
        checked: true
      },
      {
        title: 'Mortgage Liabilities',
        name: 'mortgageLiabilities',
        checked: true
      },
      {
        title: 'Other Liabilities',
        name: 'otherLiabilities',
        checked: true
      }
    ]
  },
  {
    title: 'Other Sources of Income',
    children: [
      {
        title: 'Other Income',
        name: 'otherIncome',
        checked: true
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
        checked: true
      }
    ]
  },
  {
    title: 'Loan Accounts',
    children: [
      {
        title: 'New Loans',
        name: 'newLoans',
        checked: true
      }
    ]
  },
  {
    title: 'Funds to Complete',
    children: [
      {
        title: 'Contribution Funds',
        name: 'contributionFunds',
        checked: true
      }
    ]
  },
  {
    title: 'Cuarantee',
    children: [
      {
        title: 'Lending Guarantee',
        name: 'lendingGuarantee',
        checked: true
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
        checked: true
      },
      {
        title: 'Statement of Position',
        name: 'statementOfPosition',
        checked: true
      }
    ]
  }
])

export const borrowerSummaryItems = ref<Application.IItem[]>([
  {
    title: 'Contact Details',
    name: 'contactDetails',
    checked: true
  },
  {
    title: 'Other Details',
    name: 'otherDetails',
    checked: true
  },
  {
    title: 'Employment',
    name: 'employment',
    checked: true
  },
  {
    title: 'PAYG-Primary Employment',
    name: 'paygPrimaryEmployment',
    checked: true
  },
  {
    title: 'Self Employment - Primary Employment',
    name: 'selfEmploymentPrimaryEmployment',
    checked: true
  },
  {
    title: 'Proof of Identity',
    name: 'proofOfIdentity',
    checked: true
  },
  {
    title: 'Australian Driver Licence',
    name: 'australianDriverLicence',
    checked: true
  },
  {
    title: 'Australian Passport',
    name: 'australianPassport',
    checked: true
  }
])
