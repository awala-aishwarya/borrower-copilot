// Possible borrowing decisions

export type BorrowVerdict =
  | "borrow"
  | "borrow_less"
  | "dont_borrow";


// Confidence level based on how much information is known

export type ConfidenceLevel =
  | "low"
  | "medium"
  | "high";


// A range of money values

export interface MoneyRange {
  min: number;
  max: number;
}


// A range of interest rates

export interface RateRange {
  min: number;
  max: number;
}


/* ========================================
   O1: BORROWING DECISION
======================================== */

export interface VerdictResult {
  verdict: BorrowVerdict;

  reason: string;

  warnings: string[];
}


/* ========================================
   O2: LOAN AMOUNT ASSESSMENT
======================================== */

export interface AmountResult {
  likelySanction: MoneyRange;

  safeAmount: MoneyRange;

  recommendedAmount: number;

  recommendedTenureMonths: number;

  reason: string;
}


/* ========================================
   O3: FAIR INTEREST RATE AND APR
======================================== */

export interface RateResult {
  fairRate: RateRange;

  estimatedAPR: RateRange;

  processingFeePercent: RateRange;

  reason: string;
}


/* ========================================
   O4: EMI RECOMMENDATION
======================================== */

export interface EMIResult {
  recommendedEMI: number;

  maximumEMI: number;

  suggestedTenureMonths: number;

  stressCaseEMI: number;

  stressCaseDescription: string;

  reason: string;
}


/* ========================================
   NEGOTIATION CARD DATA
======================================== */

export interface NegotiationCard {
  borrowerSummary: string;

  recommendedProduct: string;

  recommendedAmount: number;

  fairRate: RateRange;

  recommendedEMI: number;

  keyReasons: string[];

  confidence: ConfidenceLevel;
}


/* ========================================
   COMPLETE ASSESSMENT RESULT
======================================== */

export interface AssessmentResult {
  verdict: VerdictResult;

  amount: AmountResult;

  rate: RateResult;

  emi: EMIResult;

  negotiationCard: NegotiationCard;

  confidence: ConfidenceLevel;

  confidenceReason: string;
}