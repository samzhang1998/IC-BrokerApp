export const MIN_DATE = -1577952000000

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
    isCollapse: true,
    checked: false,
    children: []
  },

  {
    title: 'Proof of Identity',
    name: 'proofOfIdentity',
    checked: false,
    isCollapse: true,
    children: [
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
    ]
  }
])

//proof of identity 21种
export const proofOfIdentityItems = [
  { name: 'Australian Drivers Licence', subname: 'Photographic' },
  { name: 'Australian Defence Force ldentity Card', subname: 'Photographic' },
  { name: 'Australian Passport', subname: 'Photographic' },
  { name: 'lmmiCard', subname: 'Photographic' },
  { name: 'International Drivers Licence', subname: 'Photographic' },
  { name: 'International Passport', subname: 'Photographic' },
  { name: 'National ldentity Card', subname: 'Photographic' },
  { name: 'Proof of Age Card', subname: 'Photographic' },
  { name: 'State or Federal Government Employee Photo ldentity Card', subname: 'Photographic' },
  { name: 'Australian Birth Certificate', subname: 'Non Photographic' },
  { name: 'Australian Citizenship Certificate', subname: 'Non Photographic' },
  { name: 'Centrelink or Social Security Card', subname: 'Non Photographic' },
  { name: 'Department of Veterans Affairs Card', subname: 'Non Photographic' },
  { name: 'Descent Certificate', subname: 'Non Photographic' },
  { name: 'Foreign Birth Certificate', subname: 'Non Photographic' },
  { name: 'Health Care Card', subname: 'Non Photographic' },
  { name: 'Medicare Card', subname: 'Non Photographic' },
  { name: 'Pension Card', subname: 'Non Photographic' },
  { name: 'Government Benefits Notice', subname: 'Secondary' },
  { name: 'Marriage Certificate', subname: 'Secondary' },
  { name: 'Verification of ldentity Document', subname: 'Secondary' },
  { name: 'Other', subname: 'Secondary' }
]

export const companyApplicantSummaryItems = ref<Application.IItem[]>([
  {
    title: 'Contact Details',
    name: 'contactDetails',
    checked: false
  },
  {
    title: 'Year to Date Income',
    name: 'yearToDateIncome',
    checked: false
  }
])

export const trustApplicantSummaryItems = ref<Application.IItem[]>([
  {
    title: 'Contact Details',
    name: 'contactDetails',
    checked: false
  },
  {
    title: 'Year to Date Income',
    name: 'yearToDateIncome',
    checked: false
  }
])

export const StageMap: Record<string, { status: string; color: string }> = {
  'Submit to IC': { status: 'Submit to IC', color: '#FF754C' },
  'Pre-assessment': { status: 'Pre-assessment', color: '#FF754C' },
  'Full-assessment': { status: 'Full-assessment', color: '#FF754C' },
  AIP: { status: 'AIP', color: '#FF754C' },
  'Submit to Funder': { status: 'Submit to Funder', color: '#FF754C' },
  'Conditional Approval': { status: 'Conditional Approval', color: '#1CBB8C' },
  'Formal Approval': { status: 'Formal Approval', color: '#1CBB8C' },
  'Instruct to Solicitor': { status: 'Instruct to Solicitor', color: '#2196F3' },
  'Loan doc Issued': { status: 'Loan doc Issued', color: '#2196F3' },
  'Loan doc Returned': { status: 'Loan doc Returned', color: '#2196F3' },
  'Settlement Date Booked': { status: 'Settlement Date Booked', color: '#2196F3' },
  Settled: { status: 'Settled', color: '#2196F3' },
  Decline: { status: 'Decline', color: '#EB0000' },
  Withdrawal: { status: 'Withdrawal', color: '#EB0000' }
}
