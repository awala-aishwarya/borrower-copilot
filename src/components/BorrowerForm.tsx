import { useState } from "react";

import type {
  BorrowerProfile,
  LoanType,
  IncomeType,
  IncomeStability,
  CreditScoreStatus,
} from "../types/borrower";

interface BorrowerFormProps {
  onAssess: (borrower: BorrowerProfile) => void;
  onChange: () => void;
}

interface FormErrors {
  requestedAmount?: string;
  age?: string;
  monthlyIncome?: string;
  monthlyExpenses?: string;
  existingEMI?: string;
  creditScore?: string;
}

function BorrowerForm({
  onAssess,
  onChange,
}: BorrowerFormProps) {
  const [borrower, setBorrower] =
    useState<BorrowerProfile>({
      loanType: "personal",
      incomeType: "salaried",
      incomeStability: "stable",
      creditScoreStatus: "known",
      recentEMIBounce: false,
      hasCollateral: false,
      loanGeneratesIncome: false,
    });

  const [errors, setErrors] =
    useState<FormErrors>({});

  function updateBorrower(
    field: keyof BorrowerProfile,
    value: string | number | boolean | undefined
  ) {
    setBorrower((previousBorrower) => ({
      ...previousBorrower,
      [field]: value,
    }));

    setErrors((previousErrors) => ({
      ...previousErrors,
      [field]: undefined,
    }));

    onChange();
  }

  function validateForm() {
    const newErrors: FormErrors = {};

    if (
      borrower.requestedAmount === undefined ||
      borrower.requestedAmount <= 0
    ) {
      newErrors.requestedAmount =
        "Please enter a valid loan amount.";
    }

    if (
      borrower.age === undefined ||
      borrower.age < 18 ||
      borrower.age > 100
    ) {
      newErrors.age =
        "Please enter a valid age between 18 and 100.";
    }

    if (
      borrower.monthlyIncome === undefined ||
      borrower.monthlyIncome <= 0
    ) {
      newErrors.monthlyIncome =
        "Please enter a valid monthly income.";
    }

    if (
      borrower.monthlyExpenses === undefined ||
      borrower.monthlyExpenses < 0
    ) {
      newErrors.monthlyExpenses =
        "Please enter your monthly expenses.";
    }

    if (
      borrower.existingEMI === undefined ||
      borrower.existingEMI < 0
    ) {
      newErrors.existingEMI =
        "Please enter your existing EMI. Enter 0 if none.";
    }

    if (
      borrower.creditScoreStatus === "known" &&
      (borrower.creditScore === undefined ||
        borrower.creditScore < 300 ||
        borrower.creditScore > 900)
    ) {
      newErrors.creditScore =
        "Please enter a credit score between 300 and 900.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      onChange();

      setTimeout(() => {
        document
          .querySelector(".field-error")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
      }, 100);

      return;
    }

    onAssess(borrower);
  }

  return (
    <form
      className="form-card borrower-form"
      onSubmit={handleSubmit}
    >
      {/* Form Header */}

      <div className="form-header">
        <div>
          <span className="form-eyebrow">
            LOAN ASSESSMENT
          </span>

          <h2>
            Borrower Information
          </h2>

          <p>
            Enter the borrower's financial details to
            generate a personalised borrowing assessment.
          </p>
        </div>

        <div className="form-header-badge">
          <span>
            Step 1
          </span>

          <strong>
            Borrower Profile
          </strong>
        </div>
      </div>

      {/* Loan Details */}

      <section className="form-section">
        <div className="section-heading">
          <div className="section-number">
            01
          </div>

          <div>
            <h2>
              Loan Details
            </h2>

            <p>
              Tell us what type of loan the borrower
              is looking for.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>
              Loan Type
            </label>

            <select
              value={borrower.loanType}
              onChange={(event) =>
                updateBorrower(
                  "loanType",
                  event.target.value as LoanType
                )
              }
            >
              <option value="personal">
                Personal Loan
              </option>

              <option value="home">
                Home Loan
              </option>

              <option value="vehicle">
                Vehicle Loan
              </option>

              <option value="business">
                Business Loan
              </option>

              <option value="two_wheeler">
                Two Wheeler Loan
              </option>

              <option value="lap">
                Loan Against Property
              </option>

              <option value="gold">
                Gold Loan
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Requested Loan Amount
            </label>

            <div
              className={`input-with-prefix ${
                errors.requestedAmount
                  ? "input-error"
                  : ""
              }`}
            >
              <span>
                ₹
              </span>

              <input
                type="number"
                min="1"
                placeholder="Enter loan amount"
                value={
                  borrower.requestedAmount ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "requestedAmount",
                    event.target.value
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>

            {errors.requestedAmount && (
              <small className="field-error">
                {errors.requestedAmount}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Age
            </label>

            <input
              className={
                errors.age
                  ? "input-error"
                  : ""
              }
              type="number"
              min="18"
              max="100"
              placeholder="Enter age"
              value={borrower.age ?? ""}
              onChange={(event) =>
                updateBorrower(
                  "age",
                  event.target.value
                    ? Number(event.target.value)
                    : undefined
                )
              }
            />

            {errors.age && (
              <small className="field-error">
                {errors.age}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Loan Purpose
            </label>

            <input
              type="text"
              placeholder="Education, business, home..."
              value={
                borrower.loanPurpose ?? ""
              }
              onChange={(event) =>
                updateBorrower(
                  "loanPurpose",
                  event.target.value
                )
              }
            />
          </div>
        </div>
      </section>

      {/* Income Details */}

      <section className="form-section">
        <div className="section-heading">
          <div className="section-number">
            02
          </div>

          <div>
            <h2>
              Income Details
            </h2>

            <p>
              Provide information about the borrower's
              monthly income and income stability.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>
              Income Type
            </label>

            <select
              value={borrower.incomeType}
              onChange={(event) =>
                updateBorrower(
                  "incomeType",
                  event.target.value as IncomeType
                )
              }
            >
              <option value="salaried">
                Salaried
              </option>

              <option value="self_employed">
                Self Employed
              </option>

              <option value="informal">
                Informal
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Monthly Income
            </label>

            <div
              className={`input-with-prefix ${
                errors.monthlyIncome
                  ? "input-error"
                  : ""
              }`}
            >
              <span>
                ₹
              </span>

              <input
                type="number"
                min="1"
                placeholder="Enter monthly income"
                value={
                  borrower.monthlyIncome ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "monthlyIncome",
                    event.target.value
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>

            {errors.monthlyIncome && (
              <small className="field-error">
                {errors.monthlyIncome}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Income Stability
            </label>

            <select
              value={borrower.incomeStability}
              onChange={(event) =>
                updateBorrower(
                  "incomeStability",
                  event.target.value as IncomeStability
                )
              }
            >
              <option value="very_stable">
                Very Stable
              </option>

              <option value="stable">
                Stable
              </option>

              <option value="variable">
                Variable
              </option>

              <option value="highly_variable">
                Highly Variable
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Lowest Monthly Income
            </label>

            <div className="input-with-prefix">
              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                placeholder="Optional"
                value={
                  borrower.lowestMonthlyIncome ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "lowestMonthlyIncome",
                    event.target.value
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>
          </div>

          {(borrower.incomeType === "self_employed" ||
            borrower.incomeType === "informal" ||
            borrower.incomeStability === "variable" ||
            borrower.incomeStability ===
              "highly_variable") && (
            <div className="form-group">
              <label>
                Highest Monthly Income
              </label>

              <div className="input-with-prefix">
                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  placeholder="Optional"
                  value={
                    borrower.highestMonthlyIncome ?? ""
                  }
                  onChange={(event) =>
                    updateBorrower(
                      "highestMonthlyIncome",
                      event.target.value
                        ? Number(event.target.value)
                        : undefined
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Monthly Expenses */}

      <section className="form-section">
        <div className="section-heading">
          <div className="section-number">
            03
          </div>

          <div>
            <h2>
              Monthly Expenses
            </h2>

            <p>
              Add household expenses and current loan
              obligations.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>
              Monthly Expenses
            </label>

            <div
              className={`input-with-prefix ${
                errors.monthlyExpenses
                  ? "input-error"
                  : ""
              }`}
            >
              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                placeholder="Enter monthly expenses"
                value={
                  borrower.monthlyExpenses ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "monthlyExpenses",
                    event.target.value !== ""
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>

            {errors.monthlyExpenses && (
              <small className="field-error">
                {errors.monthlyExpenses}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Existing EMI
            </label>

            <div
              className={`input-with-prefix ${
                errors.existingEMI
                  ? "input-error"
                  : ""
              }`}
            >
              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                placeholder="Enter 0 if no existing EMI"
                value={
                  borrower.existingEMI ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "existingEMI",
                    event.target.value !== ""
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>

            {errors.existingEMI && (
              <small className="field-error">
                {errors.existingEMI}
              </small>
            )}
          </div>

          <div className="form-group">
            <label>
              Existing Total Debt
            </label>

            <div className="input-with-prefix">
              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                placeholder="Optional"
                value={
                  borrower.existingDebt ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "existingDebt",
                    event.target.value !== ""
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>
          </div>
        </div>
      </section>

      {/* Credit Details */}

      <section className="form-section">
        <div className="section-heading">
          <div className="section-number">
            04
          </div>

          <div>
            <h2>
              Credit Details
            </h2>

            <p>
              Credit information helps estimate a fair
              interest-rate range.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>
              Credit Score Status
            </label>

            <select
              value={
                borrower.creditScoreStatus
              }
              onChange={(event) =>
                updateBorrower(
                  "creditScoreStatus",
                  event.target.value as CreditScoreStatus
                )
              }
            >
              <option value="known">
                Known
              </option>

              <option value="unknown">
                Unknown
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Credit Score
            </label>

            <input
              className={
                errors.creditScore
                  ? "input-error"
                  : ""
              }
              type="number"
              min="300"
              max="900"
              placeholder={
                borrower.creditScoreStatus ===
                "unknown"
                  ? "Credit score not available"
                  : "Enter credit score"
              }
              disabled={
                borrower.creditScoreStatus ===
                "unknown"
              }
              value={
                borrower.creditScore ?? ""
              }
              onChange={(event) =>
                updateBorrower(
                  "creditScore",
                  event.target.value
                    ? Number(event.target.value)
                    : undefined
                )
              }
            />

            {errors.creditScore && (
              <small className="field-error">
                {errors.creditScore}
              </small>
            )}
          </div>
        </div>
      </section>

      {/* Additional Details */}

      <section className="form-section">
        <div className="section-heading">
          <div className="section-number">
            05
          </div>

          <div>
            <h2>
              Additional Details
            </h2>

            <p>
              These optional details can improve the
              confidence and accuracy of the assessment.
            </p>
          </div>
        </div>

        <div className="form-grid">
          <div className="form-group">
            <label>
              Emergency Savings
            </label>

            <div className="input-with-suffix">
              <input
                type="number"
                min="0"
                placeholder="Example: 6"
                value={
                  borrower.emergencySavingsMonths ??
                  ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "emergencySavingsMonths",
                    event.target.value !== ""
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />

              <span>
                Months
              </span>
            </div>
          </div>

          <div className="form-group">
            <label>
              Recent EMI Bounce?
            </label>

            <select
              value={
                borrower.recentEMIBounce
                  ? "yes"
                  : "no"
              }
              onChange={(event) =>
                updateBorrower(
                  "recentEMIBounce",
                  event.target.value === "yes"
                )
              }
            >
              <option value="no">
                No
              </option>

              <option value="yes">
                Yes
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Has Collateral?
            </label>

            <select
              value={
                borrower.hasCollateral
                  ? "yes"
                  : "no"
              }
              onChange={(event) =>
                updateBorrower(
                  "hasCollateral",
                  event.target.value === "yes"
                )
              }
            >
              <option value="no">
                No
              </option>

              <option value="yes">
                Yes
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Does the Loan Generate Income?
            </label>

            <select
              value={
                borrower.loanGeneratesIncome
                  ? "yes"
                  : "no"
              }
              onChange={(event) =>
                updateBorrower(
                  "loanGeneratesIncome",
                  event.target.value === "yes"
                )
              }
            >
              <option value="no">
                No
              </option>

              <option value="yes">
                Yes
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>
              Co-applicant Monthly Income
            </label>

            <div className="input-with-prefix">
              <span>
                ₹
              </span>

              <input
                type="number"
                min="0"
                placeholder="Optional"
                value={
                  borrower.coApplicantIncome ?? ""
                }
                onChange={(event) =>
                  updateBorrower(
                    "coApplicantIncome",
                    event.target.value !== ""
                      ? Number(event.target.value)
                      : undefined
                  )
                }
              />
            </div>
          </div>

          {borrower.hasCollateral && (
            <div className="form-group">
              <label>
                Collateral Value
              </label>

              <div className="input-with-prefix">
                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  placeholder="Estimated collateral value"
                  value={
                    borrower.collateralValue ?? ""
                  }
                  onChange={(event) =>
                    updateBorrower(
                      "collateralValue",
                      event.target.value !== ""
                        ? Number(event.target.value)
                        : undefined
                    )
                  }
                />
              </div>
            </div>
          )}

          {borrower.loanGeneratesIncome && (
            <div className="form-group">
              <label>
                Expected Additional Monthly Income
              </label>

              <div className="input-with-prefix">
                <span>
                  ₹
                </span>

                <input
                  type="number"
                  min="0"
                  placeholder="Expected income per month"
                  value={
                    borrower.expectedAdditionalIncome ??
                    ""
                  }
                  onChange={(event) =>
                    updateBorrower(
                      "expectedAdditionalIncome",
                      event.target.value !== ""
                        ? Number(event.target.value)
                        : undefined
                    )
                  }
                />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Submit */}

      <div className="form-submit-area">
        <div className="submit-info">
          <strong>
            Ready to assess the borrower?
          </strong>

          <span>
            The assessment will calculate affordability,
            loan amount, EMI, rates and borrowing verdict.
          </span>
        </div>

        <button
          type="submit"
          className="assess-button"
        >
          Assess Borrower →
        </button>
      </div>
    </form>
  );
}

export default BorrowerForm;