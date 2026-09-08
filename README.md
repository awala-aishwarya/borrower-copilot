# Borrower Copilot

A personal loan self-assessment tool designed to help Indian borrowers make better borrowing decisions before approaching a lender.

Borrower Copilot helps answer four important questions:

1. Should I borrow?
2. How much can I safely borrow?
3. What is a fair interest rate?
4. What EMI should I agree to?

The application also generates a Negotiation Card that borrowers can use to understand and discuss their borrowing position with lenders.

---

## Features

### O1: Borrowing Verdict

The app provides one of three borrowing decisions:

- Borrow
- Borrow Less
- Don't Borrow

The verdict is based on affordability, existing EMI obligations, repayment capacity, and borrower risk factors.

### O2: Loan Amount Assessment

The app clearly separates:

- Likely Sanction Amount
- Safe Borrowing Amount
- Recommended Loan Amount

This helps borrowers understand that the amount a lender may approve can be different from the amount they can safely repay.

### O3: Fair Interest Rate

The app provides:

- Fair Interest Rate Range
- Estimated APR Range
- Processing Fee Range

The interest rate estimate considers the loan type and available credit information.

### O4: EMI Recommendation

The app calculates:

- Recommended EMI
- Maximum Affordable EMI
- Suggested Loan Tenure
- Stress Case EMI

The stress case helps borrowers understand how their EMI may change if interest rates increase.

### Negotiation Card

The Negotiation Card summarises:

- Recommended Loan Product
- Recommended Loan Amount
- Fair Interest Rate
- Recommended EMI
- Key Reasons
- Assessment Confidence

---

## Adaptive Borrower Information

The application collects borrower information including:

- Loan type and requested amount
- Age and loan purpose
- Income type
- Monthly income
- Income stability
- Household expenses
- Existing EMI obligations
- Credit score information
- Emergency savings
- Recent EMI repayment issues
- Collateral availability
- Productive loan income potential

Some additional questions appear based on the borrower's answers.

---

## Supported Loan Types

- Personal Loan
- Home Loan
- Vehicle Loan
- Business Loan
- Two Wheeler Loan
- Loan Against Property
- Gold Loan

---

## Technology Stack

- React
- TypeScript
- Vite
- CSS

The application runs entirely on the client side.

No backend, login, bureau integration, or personal data storage is required.

---

## Project Structure

```text
src/
├── components/       # UI components
├── config/           # Loan rules and assumptions
├── services/         # Assessment calculations
├── types/            # TypeScript types
├── utils/            # EMI and formatting utilities
├── App.tsx
└── main.tsx