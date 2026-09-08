import type { BorrowerProfile } from "../types/borrower";
import type { ConfidenceLevel } from "../types/assessment";

export interface ConfidenceResult {
  level: ConfidenceLevel;
  score: number;
  missingFields: string[];
  rangeMultiplier: number;
  reason: string;
}

export function calculateConfidence(
  borrower: BorrowerProfile
): ConfidenceResult {
  const importantFields = [
    "loanType",
    "requestedAmount",
    "age",
    "incomeType",
    "monthlyIncome",
    "monthlyExpenses",
    "existingEMI",
    "creditScoreStatus",
  ] as const;

  const additionalFields = [
    "incomeStability",
    "emergencySavingsMonths",
    "recentEMIBounce",
    "hasCollateral",
    "loanGeneratesIncome",
  ] as const;

  const allFields = [...importantFields, ...additionalFields];

  const missingFields = allFields.filter(
    (field) => borrower[field] === undefined
  );

  const answeredCount =
    allFields.length - missingFields.length;

  const score = Math.round(
    (answeredCount / allFields.length) * 100
  );

  let level: ConfidenceLevel;
  let rangeMultiplier: number;
  let reason: string;

  if (score >= 80) {
    level = "high";
    rangeMultiplier = 1;
    reason =
      "Most important information is available, so the assessment range can be more specific.";
  } else if (score >= 50) {
    level = "medium";
    rangeMultiplier = 1.25;
    reason =
      "Some important information is missing, so the assessment uses moderately wider ranges.";
  } else {
    level = "low";
    rangeMultiplier = 1.5;
    reason =
      "Several important details are unknown, so the assessment uses wider ranges and more conservative assumptions.";
  }

  return {
    level,
    score,
    missingFields,
    rangeMultiplier,
    reason,
  };
}