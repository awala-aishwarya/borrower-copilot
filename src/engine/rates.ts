import type { BorrowerProfile } from "../types/borrower";
import type { ConfidenceResult } from "./confidence";
import {
  BASE_RATE_BANDS,
  CREDIT_SCORE_ADJUSTMENTS,
  PROCESSING_FEE_PERCENT,
} from "../config/loanRules";

export interface RateEngineResult {
  fairRate: {
    min: number;
    max: number;
  };
  processingFeePercent: {
    min: number;
    max: number;
  };
  estimatedAPR: {
    min: number;
    max: number;
  };
  reason: string;
}

function getCreditAdjustment(
  borrower: BorrowerProfile
): number {
  if (borrower.creditScoreStatus === "unknown") {
    return CREDIT_SCORE_ADJUSTMENTS.unknown;
  }

  const score = borrower.creditScore;

  if (score === undefined) {
    return CREDIT_SCORE_ADJUSTMENTS.unknown;
  }

  if (score >= 750) {
    return CREDIT_SCORE_ADJUSTMENTS.excellent;
  }

  if (score >= 700) {
    return CREDIT_SCORE_ADJUSTMENTS.good;
  }

  if (score >= 650) {
    return CREDIT_SCORE_ADJUSTMENTS.average;
  }

  return CREDIT_SCORE_ADJUSTMENTS.weak;
}

export function calculateRate(
  borrower: BorrowerProfile,
  confidence: ConfidenceResult
): RateEngineResult {
  const loanType = borrower.loanType ?? "personal";

  const baseRate = BASE_RATE_BANDS[loanType];
  const processingFee =
    PROCESSING_FEE_PERCENT[loanType];

  const creditAdjustment =
    getCreditAdjustment(borrower);

  let minRate = baseRate.min + creditAdjustment;
  let maxRate = baseRate.max + creditAdjustment;

  // Less stable income can increase the expected rate.
  if (
    borrower.incomeStability === "highly_variable"
  ) {
    minRate += 1;
    maxRate += 2;
  } else if (
    borrower.incomeStability === "variable"
  ) {
    maxRate += 1;
  }

  // Lower confidence widens the rate band.
  const middleRate = (minRate + maxRate) / 2;
  const halfRange =
    ((maxRate - minRate) / 2) *
    confidence.rangeMultiplier;

  minRate = Math.max(
    0,
    middleRate - halfRange
  );

  maxRate = middleRate + halfRange;

  // Simple estimated all-in APR approximation.
  const estimatedAPRMin =
    minRate + processingFee.min;

  const estimatedAPRMax =
    maxRate + processingFee.max;

  const scoreDescription =
    borrower.creditScoreStatus === "unknown" ||
    borrower.creditScore === undefined
      ? "your credit score is unknown"
      : `your reported credit score is ${borrower.creditScore}`;

  return {
    fairRate: {
      min: Number(minRate.toFixed(1)),
      max: Number(maxRate.toFixed(1)),
    },
    processingFeePercent: processingFee,
    estimatedAPR: {
      min: Number(estimatedAPRMin.toFixed(1)),
      max: Number(estimatedAPRMax.toFixed(1)),
    },
    reason:
      `The rate range is based on the ${loanType} loan product, ` +
      `${scoreDescription}, income stability, and ${confidence.level} confidence.`,
  };
}