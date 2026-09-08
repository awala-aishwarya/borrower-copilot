# Borrower Copilot – Rules and Assumptions

This document explains the rules, thresholds, rate bands and assumptions used by the Borrower Copilot assessment engine.

The app is a borrower self-assessment tool. It does not make lending decisions, guarantee loan approval, or replace a lender's underwriting process.

---

## 1. FOIR Limits

FOIR (Fixed Obligation to Income Ratio) is used to estimate how much of a borrower's monthly income can safely go towards loan EMIs.

| What | Value | Why | Source |
|---|---|---|---|
| Salaried FOIR | 50% of monthly income | Salaried income is generally more predictable | My judgement |
| Self-employed FOIR | 45% of monthly income | Business income can vary from month to month | My judgement |
| Informal income FOIR | 35% of monthly income | Informal income has higher uncertainty | My judgement |
| Minimum adjusted FOIR | 20% | Prevents the model from producing an unrealistic negative affordability limit | My judgement |

The app calculates affordability using the more conservative of:

1. Income multiplied by the adjusted FOIR.
2. Income remaining after household expenses.

Existing EMIs are then deducted to calculate available EMI capacity.

---

## 2. Income Stability Adjustments

Less stable income reduces the FOIR limit.

| What | Value | Why | Source |
|---|---|---|---|
| Very stable | 0% reduction | Income is considered highly predictable | My judgement |
| Stable | 3% reduction | Small allowance for income variation | My judgement |
| Variable | 8% reduction | Greater income uncertainty | My judgement |
| Highly variable | 12% reduction | Significant uncertainty in monthly income | My judgement |

---

## 3. Interest Rate Bands

Base interest-rate assumptions depend on the loan product.

| Loan Type | Rate Band | Why | Source |
|---|---:|---|---|
| Personal Loan | 10.5% – 16% | Unsecured consumer borrowing | My judgement |
| Business Loan | 11% – 20% | Business income and repayment risk can vary | My judgement |
| Vehicle Loan | 8.5% – 14% | Vehicle acts as financed asset | My judgement |
| Two Wheeler Loan | 9% – 18% | Smaller secured asset with varied borrower profiles | My judgement |
| Home Loan | 8% – 11% | Long-term secured borrowing | My judgement |
| Loan Against Property | 9% – 14% | Secured against property | My judgement |
| Gold Loan | 9% – 18% | Secured against gold with product-specific variation | My judgement |

These are assessment bands and not lender quotes.

---

## 4. Credit Score Adjustments

Credit information adjusts the estimated fair interest-rate range.

| Credit Profile | Adjustment | Why | Source |
|---|---:|---|---|
| Excellent | -1% | Strong credit profile may receive better pricing | My judgement |
| Good | 0% | Base pricing assumption | My judgement |
| Average | +1.5% | Higher perceived credit risk | My judgement |
| Weak | +3% | Higher perceived credit risk | My judgement |
| Unknown | +2% | Missing credit information increases uncertainty | My judgement |

Unknown credit is never treated as a credit score of zero.

---

## 5. Processing Fee Assumptions

Processing fees are included when estimating the all-in borrowing cost.

| Loan Type | Processing Fee Range | Source |
|---|---:|---|
| Personal Loan | 1% – 3% | My judgement |
| Business Loan | 1% – 3% | My judgement |
| Vehicle Loan | 0.5% – 2% | My judgement |
| Two Wheeler Loan | 0.5% – 2% | My judgement |
| Home Loan | 0.25% – 1% | My judgement |
| Loan Against Property | 0.5% – 2% | My judgement |
| Gold Loan | 0.5% – 2% | My judgement |

The estimated APR range is intended to show a more honest all-in borrowing cost by considering both the interest rate and processing fee.

---

## 6. Default Loan Tenure

The app uses the following default tenure assumptions.

| Loan Type | Default Tenure | Why | Source |
|---|---:|---|---|
| Personal Loan | 48 months | Typical medium-term consumer borrowing assumption | My judgement |
| Business Loan | 60 months | Allows longer repayment for business investment | My judgement |
| Vehicle Loan | 60 months | Medium-term asset financing assumption | My judgement |
| Two Wheeler Loan | 36 months | Shorter asset financing assumption | My judgement |
| Home Loan | 240 months | Long-term housing finance assumption | My judgement |
| Loan Against Property | 120 months | Long-term secured borrowing assumption | My judgement |
| Gold Loan | 24 months | Shorter-term secured borrowing assumption | My judgement |

---

## 7. Emergency Savings

| What | Value | Why | Source |
|---|---:|---|---|
| Minimum emergency savings | 3 months | Provides a basic buffer against income or expense shocks | My judgement |

Borrowers with fewer than three months of emergency savings may receive additional warnings or lower confidence.

---

## 8. Existing EMI Burden

| What | Value | Why | Source |
|---|---:|---|---|
| High EMI burden threshold | 40% of income | High existing obligations reduce room for additional borrowing | My judgement |

A high existing EMI burden makes the app more cautious about recommending additional borrowing.

---

## 9. Recent EMI Bounce

| What | Value | Why | Source |
|---|---:|---|---|
| Recent EMI bounce penalty | Additional caution | A recent missed or bounced EMI is treated as a serious repayment warning signal | My judgement |

A recent EMI bounce can contribute to a "Borrow Less" or "Don't Borrow" recommendation depending on affordability and other risk factors.

---

## 10. Loan Amount Assessment

The app shows two separate loan amounts:

### Likely Sanction Amount

This is an estimated range representing the amount a lender may be willing to sanction based on the borrower profile and loan product assumptions.

### Safe Amount

This is based on the borrower's affordable monthly EMI capacity.

The safe amount is calculated using:

- Monthly income
- Income type
- Income stability
- Household expenses
- Existing EMIs
- Interest-rate assumptions
- Suggested loan tenure

The borrower is recommended to prioritise the safe amount over the likely sanction amount.

---

## 11. Borrowing Verdict

The app can return one of three outcomes.

| Verdict | Meaning |
|---|---|
| Borrow | The requested loan appears affordable within the current assessment assumptions |
| Borrow Less | Some borrowing may be possible, but the requested amount or EMI is above the recommended level |
| Don't Borrow | Current repayment capacity or risk factors make additional borrowing unsafe |

A "Don't Borrow" result is intentionally reachable and is not treated as an error.

---

## 12. EMI Stress Test

The app estimates how the EMI could change if the interest rate increases.

The stress test helps borrowers understand that an EMI should not be evaluated only at today's assumed interest rate.

The borrower should avoid agreeing to an EMI that leaves no room for:

- Income reduction
- Higher household expenses
- Interest-rate increases
- Financial emergencies

---

## 13. Confidence Levels

Confidence reflects how much information is available for the assessment.

| Confidence | Meaning |
|---|---|
| High | Most important borrower information is available |
| Medium | Core information is available but some useful details are missing |
| Low | Important information is missing, so ranges should be treated more cautiously |

Fewer answers should result in greater uncertainty. Missing information should not be silently treated as zero.

---

## 14. Collateral

Collateral can influence product suitability and potential lender willingness.

Examples include:

- Property
- Gold
- Other valuable secured assets

For borrowers with meaningful collateral, the assessment may indicate that a secured product could be more suitable than an unsecured loan.

This is particularly relevant for borrowers seeking a large loan amount with variable income.

---

## 15. Productive Loans

The app records whether the requested loan is expected to generate additional income.

Examples:

- Business expansion
- Vehicle used for earning income
- Equipment purchase
- Productive inventory

This information can be used to provide context about the purpose of borrowing, but future income is not automatically treated as guaranteed repayment capacity.

---

## 16. Known Limitations

This app is a self-assessment tool and has important limitations:

- It does not access a credit bureau.
- It does not verify income or expenses.
- It does not access real-time lender interest rates.
- It does not guarantee loan approval.
- It does not model every lender's underwriting policy.
- Interest-rate and fee ranges are assessment assumptions, not guaranteed offers.
- Actual APR calculations may vary based on lender fees, repayment structure and other charges.
- Future income from a productive loan is uncertain.
- Collateral value does not guarantee a particular loan amount.

The borrower should use the results to ask better questions and compare lender offers, not as a final credit decision.

---

## 17. Core Design Principle

Borrower Copilot deliberately separates:

1. What a lender may be willing to sanction.
2. What the borrower can safely afford.

These numbers may be different.

The app prioritises borrower affordability over maximum possible borrowing and explains the reasoning behind each recommendation.