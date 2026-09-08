import type {
  IncomeType,
  IncomeStability,
  LoanType,
} from "../types/borrower";

// --------------------------------------------------
// AFFORDABILITY / FOIR RULES
// --------------------------------------------------

// Maximum percentage of income that should go toward
// all loan EMIs, based on borrower income type.
export const FOIR_LIMITS: Record<IncomeType, number> = {
  salaried: 0.5,
  self_employed: 0.45,
  informal: 0.35,
};

// Additional reduction based on income stability.
export const STABILITY_ADJUSTMENTS: Record<
  IncomeStability,
  number
> = {
  very_stable: 0,
  stable: 0.03,
  variable: 0.08,
  highly_variable: 0.12,
};

// --------------------------------------------------
// INTEREST RATE BANDS
// --------------------------------------------------

export interface RateBand {
  min: number;
  max: number;
}

// Base interest-rate assumptions by loan product.
export const BASE_RATE_BANDS: Record<LoanType, RateBand> = {
  personal: { min: 10.5, max: 16 },
  business: { min: 11, max: 20 },
  vehicle: { min: 8.5, max: 14 },
  two_wheeler: { min: 9, max: 18 },
  home: { min: 8, max: 11 },
  lap: { min: 9, max: 14 },
  gold: { min: 9, max: 18 },
};

// --------------------------------------------------
// PROCESSING FEES
// --------------------------------------------------

export const PROCESSING_FEE_PERCENT: Record<
  LoanType,
  RateBand
> = {
  personal: { min: 1, max: 3 },
  business: { min: 1, max: 3 },
  vehicle: { min: 0.5, max: 2 },
  two_wheeler: { min: 0.5, max: 2 },
  home: { min: 0.25, max: 1 },
  lap: { min: 0.5, max: 2 },
  gold: { min: 0.5, max: 2 },
};

// --------------------------------------------------
// CREDIT SCORE ADJUSTMENTS
// --------------------------------------------------

export const CREDIT_SCORE_ADJUSTMENTS = {
  excellent: -1,
  good: 0,
  average: 1.5,
  weak: 3,
  unknown: 2,
};

// --------------------------------------------------
// LOAN TENURE ASSUMPTIONS
// --------------------------------------------------

export const DEFAULT_TENURE_MONTHS: Record<
  LoanType,
  number
> = {
  personal: 48,
  business: 60,
  vehicle: 60,
  two_wheeler: 36,
  home: 240,
  lap: 120,
  gold: 24,
};

// --------------------------------------------------
// SAFETY THRESHOLDS
// --------------------------------------------------

// Minimum emergency savings before borrowing is considered safer.
export const MIN_EMERGENCY_SAVINGS_MONTHS = 3;

// Existing EMI burden where we become cautious.
export const HIGH_EMI_BURDEN = 0.4;

// Recent EMI bounce is treated as a serious warning signal.
export const RECENT_BOUNCE_PENALTY = 0.1;