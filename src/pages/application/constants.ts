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
    checked: false,
    children: [
      {
        title: 'PAYG-Primary Employment',
        name: 'paygPrimaryEmployment',
        checked: false
      },
      {
        title: 'Self Employment - Primary Employment',
        name: 'selfEmploymentPrimaryEmployment',
        checked: false
      }
    ]
  },

  {
    title: 'Proof of Identity',
    name: 'proofOfIdentity',
    checked: false,
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
// {name: "Australian Drivers Licence", category: "Photographic"},
// {name: "Australian Defence Force ldentity Card", category: "Photographic"},
// {name: "Australian Passport", category: "Photographic"},
// {name: "lmmiCard", category: "Photographic"},
// {name: "International Drivers Licence", category: "Photographic"},
// {name: "International Passport", category: "Photographic"},
// {name: "National ldentity Card", category: "Photographic"},
// {name: "Proof of Age Card", category: "Photographic"},
// {name: "State or Federal Government Employee Photo ldentity Card", category: "Photographic"},
// {name: "Australian Birth Certificate", category: "Non Photographic"},
// {name: "Australian Citizenship Certificate", category: "Non Photographic"},
// {name: "Centrelink or Social Security Card", category: "Non Photographic"},
// {name: "Department of Veterans Affairs Card", category: "Non Photographic"},
// {name: "Descent Certificate", category: "Non Photographic"},
// {name: "Foreign Birth Certificate", category: "Non Photographic"},
// {name: "Health Care Card", category: "Non Photographic"},
// {name: "Medicare Card", category: "Non Photographic"},
// {name: "Pension Card", category: "Non Photographic"},
// {name: "Government Benefits Notice", category: "Secondary"},
// {name: "Marriage Certificate", category: "Secondary"},
// {name: "Verification of ldentity Document", category: "Secondary"},
// {name: "Other", category: "Secondary"}

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
