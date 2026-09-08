import type { BorrowerProfile } from "../types/borrower";
import type { ConfidenceResult } from "./confidence";
import type { RateEngineResult } from "./rates";

import {
  DEFAULT_TENURE_MONTHS,
} from "../config/loanRules";

import {
  calculateLoanAmountFromEMI,
  roundLoanAmount,
} from "../utils/calculations";


export interface LoanAmountEngineResult {
  likelySanction: {
    min: number;
    max: number;
  };

  safeAmount: {
    min: number;
    max: number;
  };

  recommendedAmount: number;

  recommendedTenureMonths: number;

  reason: string;
}


export function calculateLoanAmount(
  borrower: BorrowerProfile,
  availableEMI: number,
  rate: RateEngineResult,
  confidence: ConfidenceResult
): LoanAmountEngineResult {

  const loanType =
    borrower.loanType ?? "personal";


  const tenureMonths =
    DEFAULT_TENURE_MONTHS[loanType];


  const requestedAmount =
    borrower.requestedAmount ?? 0;


  // Use the middle of the fair interest-rate
  // range for affordability calculations.
  const middleRate =
    (
      rate.fairRate.min +
      rate.fairRate.max
    ) / 2;


  // Calculate the maximum loan amount that
  // fits within the borrower's available EMI.
  const safeBaseAmount =
    calculateLoanAmountFromEMI(
      availableEMI,
      middleRate,
      tenureMonths
    );


  // Lender sanction estimate can be higher
  // than the recommended safe amount.
  const lenderBaseAmount =
    calculateLoanAmountFromEMI(
      availableEMI * 1.2,
      middleRate,
      tenureMonths
    );


  // Wider ranges when confidence is lower.
  const rangePercent =
    confidence.level === "high"
      ? 0.1
      : confidence.level === "medium"
      ? 0.2
      : 0.3;


  /* ========================================
     SAFE BORROWING RANGE

     This represents the actual affordability
     capacity of the borrower.
  ======================================== */

  const safeMin =
    roundLoanAmount(
      Math.max(
        0,
        safeBaseAmount *
          (1 - rangePercent)
      )
    );


  const safeMax =
    roundLoanAmount(
      safeBaseAmount *
        (1 + rangePercent)
    );


  /* ========================================
     LIKELY LENDER SANCTION RANGE
  ======================================== */

  const likelyLenderAmount =
    requestedAmount > 0
      ? Math.min(
          lenderBaseAmount,
          requestedAmount * 1.1
        )
      : lenderBaseAmount;


  const lenderMin =
    roundLoanAmount(
      Math.max(
        0,
        likelyLenderAmount *
          (1 - rangePercent)
      )
    );


  const lenderMax =
    roundLoanAmount(
      likelyLenderAmount *
        (1 + rangePercent)
    );


  /* ========================================
     RECOMMENDED AMOUNT

     If the borrower requested an amount,
     recommend whichever is lower:

     - Requested amount
     - Safe affordability capacity
  ======================================== */

  const recommendedAmount =
    roundLoanAmount(
      requestedAmount > 0
        ? Math.min(
            requestedAmount,
            safeBaseAmount
          )
        : safeBaseAmount
    );


  return {

    likelySanction: {
      min: lenderMin,
      max: lenderMax,
    },


    safeAmount: {
      min: safeMin,
      max: safeMax,
    },


    recommendedAmount,


    recommendedTenureMonths:
      tenureMonths,


    reason:
      `Based on your available EMI capacity of ₹${Math.round(
        availableEMI
      )} and a ${tenureMonths}-month tenure, ` +
      `the recommended amount is calculated using your affordability ` +
      `capacity and requested loan amount. The assessment range is ` +
      `adjusted because confidence is ${confidence.level}.`,
  };
}