# Borrower Copilot – Walkthrough

## 1. Introduction

Borrower Copilot is a self-assessment tool designed to help Indian borrowers understand their borrowing position before approaching a lender.

The app answers four important questions:

1. Should I borrow?
2. How much can I safely borrow?
3. What is a fair interest rate?
4. What EMI should I agree to?

The app also generates a Negotiation Card that borrowers can use when comparing lender offers.

---

# 2. Borrower Information

The borrower begins by entering basic financial information.

The core questions include:

- Loan type
- Requested loan amount
- Age
- Loan purpose
- Income type
- Monthly income
- Income stability
- Monthly expenses
- Existing EMI
- Credit score

The app can also collect additional information such as:

- Emergency savings
- Recent EMI bounce
- Collateral
- Whether the loan generates income

These additional details improve confidence and provide more context for the assessment.

---

# 3. Affordability Assessment

The affordability engine calculates how much EMI the borrower can safely manage.

It considers:

- Monthly income
- Income type
- Income stability
- Household expenses
- Existing EMI obligations

The app uses a FOIR-style affordability approach.

Different income types have different affordability limits.

For example:

- Salaried borrowers can generally support a higher EMI ratio.
- Self-employed borrowers use a more conservative limit.
- Informal income uses the most conservative limit.

The app also reduces affordability when income stability is lower.

---

# 4. Borrowing Verdict

The app produces one of three verdicts:

- Borrow
- Borrow Less
- Don't Borrow

The verdict is based on affordability and financial risk signals.

Important risk signals include:

- Recent EMI bounce
- High existing EMI burden
- Low emergency savings
- Limited available EMI capacity

The "Don't Borrow" verdict is intentionally reachable.

A borrower may be eligible for a loan from a lender but still be advised not to borrow if the additional EMI creates financial stress.

---

# 5. Loan Amount Assessment

The app calculates two separate numbers:

## Likely Lender Sanction

This estimates what a lender may be willing to sanction.

## Safe Borrowing Amount

This estimates what the borrower can realistically and safely repay.

These numbers are intentionally different.

The borrower is encouraged to use the safe borrowing amount rather than automatically accepting the maximum amount a lender offers.

---

# 6. Fair Interest Rate and APR

The interest rate engine uses:

- Loan type
- Credit score
- Credit score availability
- Income stability
- Assessment confidence

Each loan product has a base interest-rate range.

For example:

- Personal Loan
- Home Loan
- Business Loan
- Vehicle Loan
- Two Wheeler Loan
- Loan Against Property
- Gold Loan

Credit quality adjusts the rate range.

Unknown credit information is never treated as a poor credit score.

Instead, the app uses a wider range and lower confidence.

The app also estimates an all-in APR range by including processing fees.

This helps borrowers compare lender offers more honestly.

---

# 7. EMI Recommendation

The EMI engine calculates:

- Recommended EMI
- Maximum affordable EMI
- Suggested loan tenure
- Stress case EMI

The recommended EMI is based on the borrower's available EMI capacity.

The app also includes a stress test.

For example, it calculates what happens if the interest rate increases by approximately 2 percentage points.

This helps the borrower understand whether the loan remains manageable under less favourable conditions.

---

# 8. Confidence

The app calculates confidence based on how much relevant borrower information is available.

Confidence levels are:

- High
- Medium
- Low

Lower confidence widens:

- Interest-rate ranges
- Loan amount ranges

The app also explains why the confidence level is lower.

This follows the principle that uncertainty should not create false precision.

---

# 9. Negotiation Card

The Negotiation Card summarises the assessment in a borrower-friendly format.

It includes:

- Borrower summary
- Recommended loan product
- Recommended amount
- Fair interest-rate range
- Recommended EMI
- Key reasons behind the assessment
- Confidence level

The borrower can use this information to compare lender offers and ask better questions.

---

# 10. Example Borrower Paths

The app was tested using the three borrowers provided in the challenge.

## Priya

Priya is a salaried software engineer with:

- Stable income
- Strong credit score
- Existing car loan

The app shows that she has a strong borrower profile but should still consider her existing EMI and household expenses.

---

## Ravi

Ravi is a self-employed kirana store owner with:

- Variable income
- Long business history
- Valuable property
- Unknown credit score

The app recommends considering a secured product rather than assuming a large unsecured business loan is the best option.

---

## Anita

Anita has:

- Informal and variable income
- Existing high-cost loans
- Recent EMI bounce
- Household financial pressure

The app can produce a "Don't Borrow" verdict because adding another loan could increase financial stress.

This demonstrates that lender eligibility and borrower affordability are treated separately.

---

# 11. What I Would Build Next

Given more time, I would improve the product in the following areas:

1. More adaptive question flows based on income type and loan purpose.
2. Better secured-product routing based on collateral and loan requirements.
3. More detailed debt and existing loan analysis.
4. Support for comparing multiple lender offers.
5. More advanced APR calculations using actual fee structures.
6. Better mobile-specific interaction and result visualisation.
7. Ability to export or print the Negotiation Card.

---

# 12. What I Would Cut

I would avoid adding features that do not improve the borrowing decision.

For example:

- User login
- Personal data storage
- Complex dashboards
- Unnecessary financial charts
- Machine learning without explainability
- Questions that do not change an output

The focus should remain on helping borrowers make an understandable and practical borrowing decision.

---

# Conclusion

Borrower Copilot is designed as an explainable rule-based self-assessment tool.

It separates:

- Lender sanction from safe borrowing capacity.
- Interest rate from all-in APR.
- Eligibility from affordability.

Every major output is based on visible borrower information and documented rules.

The goal is not to predict exactly what a lender will approve.

The goal is to help the borrower become better informed before accepting a loan.