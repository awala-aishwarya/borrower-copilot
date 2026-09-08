import type { BorrowerProfile } from "../types/borrower";

import {
  FOIR_LIMITS,
  STABILITY_ADJUSTMENTS,
  MIN_EMERGENCY_SAVINGS_MONTHS,
} from "../config/loanRules";

export interface AffordabilityResult {
  safeTotalEMI: number;
  availableEMI: number;
  safeMonthlyOutflow: number;
  reason: string;
}

export function calculateAffordability(
  borrower: BorrowerProfile
): AffordabilityResult {

  const reportedIncome =
    borrower.monthlyIncome ?? 0;

  const expenses =
    borrower.monthlyExpenses ?? 0;

  const existingEMI =
    borrower.existingEMI ?? 0;

  // Default to the most cautious income type.
  const incomeType =
    borrower.incomeType ?? "informal";

  // Default to variable income when stability is unknown.
  const stability =
    borrower.incomeStability ?? "variable";

  /*
    For borrowers with variable income, use the lowest
    reported monthly income when available. This prevents
    affordability from being based only on a good month.
  */
  const income =
    stability === "variable" ||
    stability === "highly_variable"
      ? borrower.lowestMonthlyIncome ??
        reportedIncome
      : reportedIncome;

  /*
    Include co-applicant income conservatively.
    Only 50% is considered because the co-applicant's
    income may not always be fully available for repayment.
  */
  const coApplicantIncome =
    borrower.coApplicantIncome ?? 0;

  const usableCoApplicantIncome =
    coApplicantIncome * 0.5;

  const totalUsableIncome =
    income + usableCoApplicantIncome;

  const baseFOIR =
    FOIR_LIMITS[incomeType];

  const stabilityAdjustment =
    STABILITY_ADJUSTMENTS[stability];

  // Adjust FOIR downward when income is less stable.
  let adjustedFOIR = Math.max(
    0.2,
    baseFOIR - stabilityAdjustment
  );

  /*
    Reduce affordability when emergency savings are below
    the recommended safety threshold.
  */
  const emergencySavings =
    borrower.emergencySavingsMonths;

  if (
    emergencySavings !== undefined &&
    emergencySavings < MIN_EMERGENCY_SAVINGS_MONTHS
  ) {
    adjustedFOIR = Math.max(
      0.2,
      adjustedFOIR - 0.05
    );
  }

  // Maximum total EMI based on usable income.
  const incomeBasedEMI =
    totalUsableIncome * adjustedFOIR;

  // Money left after household expenses.
  const expenseBasedEMI =
    Math.max(
      0,
      totalUsableIncome - expenses
    );

  // Use the more conservative limit.
  const safeTotalEMI =
    Math.min(
      incomeBasedEMI,
      expenseBasedEMI
    );

  // EMI capacity remaining after existing obligations.
  const availableEMI =
    Math.max(
      0,
      safeTotalEMI - existingEMI
    );

  // Build explanation.
  const reasons: string[] = [];

  reasons.push(
    `Based on ${Math.round(
      adjustedFOIR * 100
    )}% of usable monthly income`
  );

  if (
    (stability === "variable" ||
      stability === "highly_variable") &&
    borrower.lowestMonthlyIncome !== undefined
  ) {
    reasons.push(
      "using your lowest reported monthly income for a more conservative estimate"
    );
  }

  if (coApplicantIncome > 0) {
    reasons.push(
      "including 50% of co-applicant income"
    );
  }

  if (
    emergencySavings !== undefined &&
    emergencySavings < MIN_EMERGENCY_SAVINGS_MONTHS
  ) {
    reasons.push(
      "with a lower limit because emergency savings are below 3 months"
    );
  }

  reasons.push(
    `after household expenses and existing EMI, approximately ₹${Math.round(
      availableEMI
    )} per month remains available for a new loan.`
  );

  return {
    safeTotalEMI:
      Math.round(safeTotalEMI),

    availableEMI:
      Math.round(availableEMI),

    safeMonthlyOutflow:
      Math.round(availableEMI),

    reason:
      reasons.join(", ") + ".",
  };
}