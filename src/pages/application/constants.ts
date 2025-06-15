import type { IItem } from '@/components/Application/AppCard.vue'

export const currentSituationItems = ref<IItem[]>([
  {
    title: 'Borrower and Guarantor',
    children: [
      {
        title: 'Personal Applicants',
        checked: true
      },
      {
        title: 'Company Applicants',
        checked: true
      },
      {
        title: 'Trust Applicants',
        checked: true
      }
    ]
  },
  {
    title: 'Assets and Liabilities',
    children: [
      {
        title: 'Existing Properties',
        checked: true
      },
      {
        title: 'Other Assets',
        checked: true
      },
      {
        title: 'Mortgage Liabilities',
        checked: true
      },
      {
        title: 'Other Liabilities',
        checked: true
      }
    ]
  },
  {
    title: 'Other Sources of Income',
    children: [
      {
        title: 'Other Income',
        checked: true
      }
    ]
  }
])

export const newRequirementsItems = ref<IItem[]>([
  {
    title: 'New Real Estate',
    children: [
      {
        title: 'New Purchase',
        checked: true
      }
    ]
  },
  {
    title: 'Loan Accounts',
    children: [
      {
        title: 'New Loans',
        checked: true
      }
    ]
  },
  {
    title: 'Funds to Complete',
    children: [
      {
        title: 'Contribution Funds',
        checked: true
      }
    ]
  },
  {
    title: 'Cuarantee',
    children: [
      {
        title: 'Lending Guarantee',
        checked: true
      }
    ]
  }
])

export const applicationSummaryItems = ref<IItem[]>([
  {
    title: 'Application Summary',
    children: [
      {
        title: 'Summary Data',
        checked: true
      },
      {
        title: 'Statement of Position',
        checked: true
      }
    ]
  }
])
