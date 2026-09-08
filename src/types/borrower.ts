// Income category of the borrower
export type IncomeType =
  | "salaried"
  | "self_employed"
  | "informal";

// Type of loan being assessed
export type LoanType =
  | "personal"
  | "business"
  | "vehicle"
  | "two_wheeler"
  | "home"
  | "lap"
  | "gold";

// Credit score information
export type CreditScoreStatus =
  | "known"
  | "unknown";

// Income stability level
export type IncomeStability =
  | "very_stable"
  | "stable"
  | "variable"
  | "highly_variable";

// Main borrower information collected by the app
export interface BorrowerProfile {
  // Loan details
  loanType?: LoanType;
  loanPurpose?: string;
  requestedAmount?: number;

  // Personal details
  age?: number;

  // Income details
  incomeType?: IncomeType;
  monthlyIncome?: number;

  // Used when income varies
  lowestMonthlyIncome?: number;
  highestMonthlyIncome?: number;

  incomeStability?: IncomeStability;

  // Household expenses
  monthlyExpenses?: number;

  // Existing loans
  existingEMI?: number;
  existingDebt?: number;

  // Credit information
  creditScoreStatus?: CreditScoreStatus;
  creditScore?: number;

  // Financial safety
  emergencySavingsMonths?: number;

  // Repayment history
  recentEMIBounce?: boolean;

  // Collateral
  hasCollateral?: boolean;
  collateralValue?: number;

  // Co-applicant
  coApplicantIncome?: number;

  // Productive loan details
  loanGeneratesIncome?: boolean;
  expectedAdditionalIncome?: number;
}