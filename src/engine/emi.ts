import type { RateEngineResult } from "./rates";

import {
  calculateEMI,
} from "../utils/calculations";


export interface EMIEngineResult {
  recommendedEMI: number;

  maximumEMI: number;

  suggestedTenureMonths: number;

  stressCaseEMI: number;

  stressCaseDescription: string;

  reason: string;
}


export function calculateEMIRecommendation(
  recommendedAmount: number,
  maximumAffordableEMI: number,
  tenureMonths: number,
  rate: RateEngineResult
): EMIEngineResult {

  // Use the middle of the fair interest-rate
  // range for the primary EMI recommendation.
  const middleRate =
    (
      rate.fairRate.min +
      rate.fairRate.max
    ) / 2;


  /* ========================================
     RECOMMENDED EMI
  ======================================== */

  const calculatedEMI =
    calculateEMI(
      recommendedAmount,
      middleRate,
      tenureMonths
    );


  // Maximum EMI represents the borrower's
  // available monthly affordability capacity.
  const maximumEMI =
    Math.round(
      maximumAffordableEMI
    );


  const recommendedEMI =
    Math.round(
      calculatedEMI
    );


  /* ========================================
     EMI STRESS TEST

     Simulate a 2 percentage-point increase
     in the interest rate.
  ======================================== */

  const stressedRate =
    middleRate + 2;


  const stressCaseEMI =
    calculateEMI(
      recommendedAmount,
      stressedRate,
      tenureMonths
    );


  return {

    recommendedEMI,


    maximumEMI,


    suggestedTenureMonths:
      tenureMonths,


    stressCaseEMI:
      Math.round(stressCaseEMI),


    stressCaseDescription:
      `If your interest rate rises by 2 percentage points to approximately ${stressedRate.toFixed(
        1
      )}%, your EMI could increase to about ₹${Math.round(
        stressCaseEMI
      ).toLocaleString(
        "en-IN"
      )} per month.`,


    reason:
      `Your recommended EMI is calculated from the recommended loan amount, estimated fair interest rate, and suggested repayment tenure. The maximum EMI represents your available monthly affordability capacity.`,
  };
}