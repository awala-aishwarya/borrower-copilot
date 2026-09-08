import type { BorrowerProfile } from "../types/borrower";
import type { AssessmentResult } from "../types/assessment";

import { calculateVerdict } from "./verdict";
import { calculateAffordability } from "./affordability";
import { calculateConfidence } from "./confidence";
import { calculateRate } from "./rates";
import { calculateLoanAmount } from "./loanAmount";
import { calculateEMIRecommendation } from "./emi";
import { createNegotiationCard } from "./negotiation";

import { calculateEMI } from "../utils/calculations";

export function runAssessment(
  borrower: BorrowerProfile
): AssessmentResult {
  // Step 1: Calculate confidence

  const confidence =
    calculateConfidence(borrower);

  // Step 2: Calculate affordability

  const affordability =
    calculateAffordability(borrower);

  // Step 3: Calculate fair interest rate

  const rate = calculateRate(
    borrower,
    confidence
  );

  // Step 4: Calculate recommended loan amount

  const loanAmount =
    calculateLoanAmount(
      borrower,
      affordability.availableEMI,
      rate,
      confidence
    );

  // Step 5: Calculate EMI recommendation

  const emi =
    calculateEMIRecommendation(
      loanAmount.recommendedAmount,
      affordability.availableEMI,
      loanAmount.recommendedTenureMonths,
      rate
    );

  // Step 6: Calculate EMI for requested amount

  const middleRate =
    (rate.fairRate.min +
      rate.fairRate.max) /
    2;

  const requestedEMI =
    borrower.requestedAmount !== undefined
      ? calculateEMI(
          borrower.requestedAmount,
          middleRate,
          loanAmount.recommendedTenureMonths
        )
      : emi.recommendedEMI;

  // Step 7: Generate borrowing verdict

  const verdict =
    calculateVerdict(
      borrower,
      affordability.availableEMI,
      requestedEMI
    );

  // Step 8: Create Negotiation Card

  const negotiationCard =
    createNegotiationCard(
      borrower,
      loanAmount,
      rate,
      emi,
      confidence.level
    );

  // Step 9: Return complete assessment

  return {
    verdict,
    amount: loanAmount,
    rate,
    emi,
    negotiationCard,
    confidence: confidence.level,
    confidenceReason:
      confidence.reason,
  };
}