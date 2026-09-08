import type { BorrowerProfile } from "../types/borrower";
import type { BorrowVerdict } from "../types/assessment";

export interface VerdictEngineResult {
  verdict: BorrowVerdict;
  reason: string;
  warnings: string[];
}

export function calculateVerdict(
  borrower: BorrowerProfile,
  safeEMI: number,
  requestedEMI: number
): VerdictEngineResult {
  const warnings: string[] = [];

  // Serious repayment warning
  if (borrower.recentEMIBounce === true) {
    warnings.push(
      "A recent EMI bounce indicates current repayment stress."
    );
  }

  // No capacity for another EMI
  if (safeEMI <= 0) {
    warnings.push(
      "Your current income and expenses leave no safe capacity for a new EMI."
    );
  }

  // Very high existing EMI burden
  const income = borrower.monthlyIncome;

  if (
    income !== undefined &&
    borrower.existingEMI !== undefined &&
    borrower.existingEMI / income >= 0.4
  ) {
    warnings.push(
      "Your existing EMI burden is already high compared with your income."
    );
  }

  // DON'T BORROW
  // Recent repayment stress + no/very low safe capacity
  if (
    borrower.recentEMIBounce === true &&
    safeEMI < requestedEMI * 0.5
  ) {
    return {
      verdict: "dont_borrow",
      reason:
        "Your recent repayment stress and limited safe EMI capacity make another loan too risky right now.",
      warnings,
    };
  }

  if (safeEMI <= 0) {
    return {
      verdict: "dont_borrow",
      reason:
        "Based on your income, household expenses and existing obligations, taking another loan is not currently safe.",
      warnings,
    };
  }

  // BORROW LESS
  if (safeEMI < requestedEMI) {
    return {
      verdict: "borrow_less",
      reason:
        "You may be able to borrow, but the EMI for your requested amount is above your recommended monthly limit.",
      warnings,
    };
  }

  // BORROW
  return {
    verdict: "borrow",
    reason:
      "Your requested EMI is within the current safe monthly borrowing capacity based on the information provided.",
    warnings,
  };
}