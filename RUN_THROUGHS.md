# Borrower Copilot – Three Borrower Run-Throughs

This document demonstrates how Borrower Copilot can be used with the three borrower scenarios provided in the Lokta Build Challenge.

The outputs below are based on the rules and assumptions documented in `RULES.md`.

---

# 1. Priya – Salaried Borrower

## Borrower Profile

| Detail | Value |
|---|---|
| Age | 29 |
| Location | Bengaluru |
| Income Type | Salaried |
| Occupation | Software Engineer |
| Employment History | 5 years at a large MNC |
| Monthly Income | ₹1,10,000 |
| Existing EMI | ₹14,000 |
| Monthly Expenses | ₹28,000 |
| Credit Score | 780 |
| Loan Type | Personal Loan |
| Requested Amount | ₹8,00,000 |
| Loan Purpose | Wedding |

## Questions Asked

### Core Questions

1. What type of loan do you need?
2. How much do you want to borrow?
3. What is your age?
4. What is your monthly income?
5. What is your income type?
6. How stable is your income?
7. What are your monthly household expenses?
8. What are your existing EMIs?
9. Do you know your credit score?

### Additional Questions

10. How many months of emergency savings do you have?
11. Have you had a recent EMI bounce?
12. Do you have collateral?
13. Will this loan generate additional income?

## Assessment Logic

Priya has stable salaried income and a strong credit score.

However, her existing EMI of ₹14,000 is already considered before calculating capacity for a new loan.

Her assessment separates:

- What she may be able to get sanctioned.
- What she can safely afford.

## O1 – Borrowing Verdict

### Verdict: Borrow / Borrow Less

Priya has a stable income and strong credit profile, but the requested loan should be checked against her remaining EMI capacity after household expenses and her existing car loan.

### Reason

Her income and credit profile are strong, but the new EMI should remain within her safe monthly borrowing capacity.

### Warnings

- Existing car loan EMI should be considered.
- Wedding loans do not generate additional income.
- The borrower should maintain an emergency buffer.

---

## O2 – Loan Amount Assessment

### Likely Lender Sanction

A lender may consider a higher loan amount because Priya has:

- Stable salaried employment.
- Five years of employment history.
- A strong credit score.
- High monthly income.

### Safe Borrowing Amount

The recommended amount is based on Priya's remaining monthly EMI capacity after:

- FOIR limit.
- Monthly expenses.
- Existing car EMI.

### Recommendation

Priya should use the safe amount rather than automatically accepting the highest amount a lender is willing to sanction.

---

## O3 – Fair Interest Rate

### Expected Rate

Priya should expect a personal loan rate near the better end of the personal loan rate band because of her strong credit profile.

### APR

The all-in APR estimate should include:

- Interest rate.
- Processing fee.

### Why

Her credit score of 780 reduces pricing risk compared with a borrower with an average or unknown credit history.

---

## O4 – EMI Recommendation

### Recommended EMI

The recommended EMI is calculated from Priya's available capacity after:

- Existing EMI.
- Household expenses.
- Income-based affordability limit.

### Stress Case

If the interest rate increases, the EMI may rise.

Priya should avoid accepting an EMI that uses all of her remaining monthly capacity.

---

## Negotiation Card

### Borrower Summary

29-year-old salaried software engineer with stable income and a strong credit score.

### Recommended Product

Personal Loan

### Negotiation Position

Ask the lender for:

- A rate near the lower end of the fair rate range.
- Clear disclosure of processing fees.
- APR rather than only the advertised interest rate.
- An EMI that remains below the recommended monthly limit.

### Key Reasons

- Stable salaried income.
- Strong credit score.
- Existing EMI already considered.
- Safe affordability is prioritised over maximum sanction.

---

# 2. Ravi – Self-Employed Borrower

## Borrower Profile

| Detail | Value |
|---|---|
| Age | 42 |
| Location | Mysuru |
| Income Type | Self-Employed |
| Business | Kirana Store |
| Business History | 14 years |
| Monthly Income | ₹40,000 – ₹80,000 |
| ITR Income | ₹4,20,000 per year |
| Credit Score | Unknown |
| Collateral | Shop premises |
| Collateral Value | ₹45,00,000 |
| Co-applicant Income | ₹18,000 |
| Requested Amount | ₹15,00,000 |
| Loan Purpose | Stock line and delivery vehicle |

## Questions Asked

### Core Questions

1. What type of loan do you need?
2. How much do you want to borrow?
3. What is your age?
4. What is your monthly income?
5. What type of income do you earn?
6. How stable is your income?
7. What are your monthly household expenses?
8. What are your existing EMIs?
9. Do you know your credit score?

### Adaptive Questions

Because Ravi is self-employed, the assessment also asks:

10. What is your lowest monthly income?
11. Do you have collateral?
12. What is the estimated collateral value?
13. Do you have a co-applicant?
14. What is the co-applicant's income?
15. Will the loan generate additional income?

## Assessment Logic

Ravi has significant business experience and owns valuable unencumbered property.

However:

- His income varies.
- His credit score is unknown.
- He has no formal borrowing history.

The assessment should not treat unknown credit as a poor credit score.

Instead, it widens uncertainty and reduces confidence.

## O1 – Borrowing Verdict

### Verdict: Borrow Less / Consider Secured Borrowing

Ravi may have a stronger borrowing case through a secured product rather than taking a large unsecured loan.

### Reason

The requested amount is large relative to his documented income, but his collateral and productive loan purpose improve product suitability.

### Warnings

- Income is variable.
- Credit history is unknown.
- The requested amount should be compared with actual affordable EMI capacity.
- Collateral should not automatically be used to justify an unaffordable EMI.

---

## O2 – Loan Amount Assessment

### Likely Lender Sanction

Ravi's potential lender sanction may improve when collateral and the secured nature of the loan are considered.

### Safe Borrowing Amount

The safe amount should remain based primarily on:

- Conservative income.
- Variable income stability.
- Household expenses.
- Existing EMI obligations.

### Recommendation

Ravi should avoid choosing a loan amount based only on the ₹45,00,000 property value.

His safe EMI capacity remains important.

---

## O3 – Fair Interest Rate

### Expected Rate

A secured product such as:

- Loan Against Property.
- Secured business loan.

may offer better pricing than a large unsecured business loan.

### APR

Processing fees must also be considered when comparing lender offers.

### Why

Collateral can reduce lender risk, while unknown credit information and variable income increase uncertainty.

---

## O4 – EMI Recommendation

### Recommended EMI

The recommended EMI should be based on Ravi's more conservative income level rather than his highest earning month.

### Stress Case

If business income falls towards ₹40,000 per month, the loan should still remain manageable.

### Recommendation

Ravi should select a loan structure that does not depend on his highest income months for repayment.

---

## Negotiation Card

### Borrower Summary

42-year-old self-employed kirana store owner with 14 years of business history and valuable unencumbered property.

### Recommended Product

Secured Business Loan or Loan Against Property

### Negotiation Position

Ask lenders to compare:

- Secured business loan.
- Loan Against Property.
- Processing fees.
- APR.
- EMI at a conservative income level.

### Key Reasons

- Long business history.
- Valuable collateral.
- Productive loan purpose.
- Variable income.
- Unknown credit profile.

---

# 3. Anita – Informal Borrower

## Borrower Profile

| Detail | Value |
|---|---|
| Age | 35 |
| Location | Hubballi |
| Income Type | Informal |
| Income Sources | Delivery Platform and Tailoring |
| Monthly Income | ₹26,000 – ₹30,000 |
| Household | Two Children |
| Spouse Employment | Unemployed for 8 months |
| Existing Loans | Three app loans |
| Outstanding Debt | ₹35,000 |
| Existing Loan Rate | 30%+ |
| Recent EMI Bounce | Yes |
| Requested Amount | ₹1,50,000 |
| Loan Purpose | Electric Scooter |

## Questions Asked

### Core Questions

1. What type of loan do you need?
2. How much do you want to borrow?
3. What is your age?
4. What is your monthly income?
5. What type of income do you earn?
6. How stable is your income?
7. What are your monthly household expenses?
8. What are your existing EMIs?
9. Do you know your credit score?

### Adaptive Questions

Because Anita has informal income and repayment risk, the assessment also asks:

10. What is your lowest monthly income?
11. How many months of emergency savings do you have?
12. Have you had a recent EMI bounce?
13. Will the loan generate additional income?
14. What additional income do you expect from the scooter?

## Assessment Logic

Anita has multiple significant risk factors:

- Informal and variable income.
- Existing high-cost app loans.
- Recent EMI bounce.
- Household financial pressure.
- Unemployed spouse.

The scooter may be productive because it could increase delivery income.

However, future income is uncertain and should not automatically justify additional debt.

## O1 – Borrowing Verdict

### Verdict: Don't Borrow

Anita should not take an additional large loan under the current financial situation.

### Reason

Her current repayment stress and recent EMI bounce indicate that adding another loan could increase financial risk.

### Warnings

- Recent EMI bounce.
- Multiple existing loans.
- High-cost existing debt.
- Limited and variable income.
- Household financial pressure.
- Future additional income is not guaranteed.

---

## O2 – Loan Amount Assessment

### Likely Lender Sanction

A formal lender may sanction a limited amount depending on the product and vehicle financing structure.

### Safe Borrowing Amount

The safe borrowing amount may be very low or zero because current repayment capacity is already stressed.

### Recommendation

Anita should not treat a possible lender sanction as proof that the loan is affordable.

The priority should be reducing existing expensive debt and stabilising monthly finances.

---

## O3 – Fair Interest Rate

### Expected Rate

Anita's profile has higher uncertainty because of:

- Informal income.
- Recent repayment problems.
- Unknown or limited credit information.

### APR

The borrower should be especially careful about:

- Processing fees.
- High interest rates.
- Hidden charges.
- High-cost app loans.

### Recommendation

Anita should compare the all-in APR rather than accepting a loan based only on a low advertised EMI.

---

## O4 – EMI Recommendation

### Recommended EMI

No additional EMI should be recommended until current repayment stress improves.

### Stress Case

If income falls or delivery work decreases, an additional EMI could become unmanageable.

### Recommendation

The immediate priority should be:

1. Reduce or restructure expensive existing debt.
2. Avoid another high-cost app loan.
3. Improve monthly repayment capacity.
4. Consider whether a lower-cost productive asset option is available.

---

## Negotiation Card

### Borrower Summary

35-year-old informal worker with variable income, existing high-cost debt and a recent EMI bounce.

### Recommended Product

No additional loan recommended currently.

If finances improve, a lower-cost secured or vehicle-specific financing option may be explored.

### Negotiation Position

Before accepting another loan:

- Ask for the full APR.
- Ask for all processing fees.
- Compare total repayment cost.
- Avoid replacing one expensive app loan with another expensive loan.
- Check whether the new EMI remains affordable after existing obligations.

### Key Reasons

- Current repayment stress.
- Recent EMI bounce.
- Multiple existing loans.
- High-cost debt.
- Variable income.
- Productive purpose alone does not guarantee repayment ability.

---

# Summary

The three borrowers demonstrate different assessment paths.

| Borrower | Primary Assessment Direction |
|---|---|
| Priya | Strong borrower profile, but safe EMI should account for existing obligations |
| Ravi | Consider secured borrowing and use conservative income assumptions |
| Anita | Do not add significant new debt while current repayment stress remains high |

Borrower Copilot separates lender eligibility from borrower affordability and prioritises the amount the borrower can safely repay.