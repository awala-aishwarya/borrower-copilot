import type { BorrowerProfile } from "../types/borrower";

import type {
  AmountResult,
  ConfidenceLevel,
  EMIResult,
  NegotiationCard,
  RateResult,
} from "../types/assessment";


export function createNegotiationCard(
  borrower: BorrowerProfile,
  amount: AmountResult,
  rate: RateResult,
  emi: EMIResult,
  confidence: ConfidenceLevel
): NegotiationCard {

  const keyReasons: string[] = [];


  /* ========================================
     INCOME AND AFFORDABILITY
  ======================================== */

  if (borrower.monthlyIncome !== undefined) {
    keyReasons.push(
      `Monthly income of ₹${borrower.monthlyIncome.toLocaleString(
        "en-IN"
      )} was considered when estimating repayment capacity.`
    );
  }


  if (borrower.monthlyExpenses !== undefined) {
    keyReasons.push(
      `Monthly expenses of ₹${borrower.monthlyExpenses.toLocaleString(
        "en-IN"
      )} were deducted when calculating affordable borrowing capacity.`
    );
  }


  if (
    borrower.existingEMI !== undefined &&
    borrower.existingEMI > 0
  ) {
    keyReasons.push(
      `Existing EMI obligations of ₹${borrower.existingEMI.toLocaleString(
        "en-IN"
      )} were included before recommending a new monthly payment.`
    );
  }


  /* ========================================
     CREDIT PROFILE
  ======================================== */

  if (
    borrower.creditScoreStatus === "unknown" ||
    borrower.creditScore === undefined
  ) {
    keyReasons.push(
      "Credit score information is unavailable, so a wider interest-rate range is used for a more cautious recommendation."
    );
  } else {
    keyReasons.push(
      `Credit score of ${borrower.creditScore} was considered when estimating the fair interest-rate range.`
    );
  }


  /* ========================================
     COLLATERAL
  ======================================== */

  if (borrower.hasCollateral === true) {
    keyReasons.push(
      "Available collateral may strengthen loan eligibility and provide additional room for negotiation."
    );
  }


  /* ========================================
     LOAN PURPOSE
  ======================================== */

  if (borrower.loanGeneratesIncome === true) {
    keyReasons.push(
      "The loan purpose may generate additional income, which can strengthen the repayment case when discussing terms with a lender."
    );
  }


  /* ========================================
     REPAYMENT HISTORY
  ======================================== */

  if (borrower.recentEMIBounce === true) {
    keyReasons.push(
      "Recent EMI repayment issues may reduce lender confidence, so it is important to negotiate conservatively and avoid additional repayment stress."
    );
  }


  /* ========================================
     FALLBACK
  ======================================== */

  if (keyReasons.length === 0) {
    keyReasons.push(
      "The recommendation is based on the borrower information currently available."
    );
  }


  /* ========================================
     DYNAMIC BORROWER SUMMARY
  ======================================== */

  const borrowerSummary =
    `Based on your financial profile, the recommended borrowing amount is ₹${amount.recommendedAmount.toLocaleString(
      "en-IN"
    )} with an estimated EMI of ₹${emi.recommendedEMI.toLocaleString(
      "en-IN"
    )}. The fair interest-rate estimate is between ${rate.fairRate.min}% and ${rate.fairRate.max}%.`;


  return {

    borrowerSummary,


    recommendedProduct:
      getRecommendedProduct(
        borrower.loanType
      ),


    recommendedAmount:
      amount.recommendedAmount,


    fairRate:
      rate.fairRate,


    recommendedEMI:
      emi.recommendedEMI,


    keyReasons,


    confidence,
  };
}


/* ========================================
   PRODUCT RECOMMENDATION
======================================== */

function getRecommendedProduct(
  loanType: BorrowerProfile["loanType"]
): string {

  switch (loanType) {

    case "home":
      return "Home Loan";


    case "vehicle":
      return "Vehicle Loan";


    case "business":
      return "Business Loan";


    case "two_wheeler":
      return "Two Wheeler Loan";


    case "lap":
      return "Loan Against Property";


    case "gold":
      return "Gold Loan";


    default:
      return "Personal Loan";
  }
}