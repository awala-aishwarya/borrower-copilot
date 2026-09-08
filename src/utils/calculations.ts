// Calculate monthly EMI for a loan.
//
// principal = Loan amount
// annualRate = Annual interest rate as a percentage
// tenureMonths = Loan duration in months

export function calculateEMI(
  principal: number,
  annualRate: number,
  tenureMonths: number
): number {
  const monthlyRate = annualRate / 12 / 100;

  // Handle a zero-interest loan safely.
  if (monthlyRate === 0) {
    return Math.round(principal / tenureMonths);
  }

  const emi =
    (principal *
      monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  return Math.round(emi);
}

// Calculate the maximum loan amount possible
// for a given affordable monthly EMI.
export function calculateLoanAmountFromEMI(
  emi: number,
  annualRate: number,
  tenureMonths: number
): number {
  const monthlyRate = annualRate / 12 / 100;

  if (monthlyRate === 0) {
    return Math.round(emi * tenureMonths);
  }

  const loanAmount =
    (emi *
      (Math.pow(1 + monthlyRate, tenureMonths) - 1)) /
    (monthlyRate *
      Math.pow(1 + monthlyRate, tenureMonths));

  return Math.round(loanAmount);
}

// Format a number as Indian Rupees.
export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Round a loan amount to a practical value.
export function roundLoanAmount(amount: number): number {
  if (amount >= 100000) {
    return Math.round(amount / 10000) * 10000;
  }

  if (amount >= 10000) {
    return Math.round(amount / 1000) * 1000;
  }

  return Math.round(amount / 100) * 100;
}