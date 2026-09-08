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

Getting Started
Prerequisites

Make sure you have Node.js and npm installed.

Installation

Clone the repository:

git clone https://github.com/awala-aishwarya/borrower-copilot.git

Navigate to the project folder:

cd borrower-copilot

Install dependencies:

npm install
Run the Application

Start the development server:

npm run dev

Open the local URL shown in the terminal.

Usually, this will be:

http://localhost:5173

If port 5173 is already in use, Vite will automatically use another available port.

Production Build

To verify that the application builds successfully:

npm run build
Assessment Rules and Assumptions

All borrowing rules, thresholds, interest rate bands, FOIR assumptions, processing fees, and decision logic are documented in:

RULES.md
Borrower Run-Throughs

The assessment results for the three borrowers provided in the challenge are documented in:

RUN_THROUGHS.md

The run-throughs include:

Questions asked
Borrowing verdict
Loan amount assessment
Fair interest rate and APR
EMI recommendation
Negotiation Card
Walkthrough

The product walkthrough and future product considerations are documented in:

WALKTHROUGH.md

It includes:

How the application works
Assessment flow
Key design decisions
What would be built next
What could be simplified or removed
Disclaimer

Borrower Copilot is a self-assessment tool and does not provide a loan approval decision, financial guarantee, or official lender quote.

The assessment is based on borrower-provided information and documented assumptions. Actual loan eligibility, interest rates, APR, and repayment terms may vary depending on the lender and their underwriting policies.
