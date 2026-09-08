import { useState } from "react";

import "./App.css";

import BorrowerForm from "./components/BorrowerForm";

import { runAssessment } from "./engine/assessmentEngine";

import type { BorrowerProfile } from "./types/borrower";

import type { AssessmentResult } from "./types/assessment";

function App() {
  const [assessment, setAssessment] =
    useState<AssessmentResult | null>(null);

  function handleAssess(
    borrower: BorrowerProfile
  ) {
    const result = runAssessment(borrower);

    setAssessment(result);

    setTimeout(() => {
      document
        .getElementById("assessment-result")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 100);
  }

  function formatCurrency(
    amount: number
  ) {
    return `₹${amount.toLocaleString("en-IN")}`;
  }

  function getVerdictLabel(
    verdict: string
  ) {
    if (verdict === "borrow") {
      return "Borrow";
    }

    if (verdict === "borrow_less") {
      return "Borrow Less";
    }

    return "Don't Borrow";
  }

  function getVerdictIcon(
    verdict: string
  ) {
    if (verdict === "borrow") {
      return "✓";
    }

    if (verdict === "borrow_less") {
      return "!";
    }

    return "×";
  }

  return (
    <main className="app-container">
      <BorrowerForm
        onAssess={handleAssess}
        onChange={() => setAssessment(null)}
      />

      {assessment && (
        <section
          id="assessment-result"
          className="assessment-result"
        >
          {/* Result Header */}

          <div className="result-header">
            <div>
              <span className="form-eyebrow">
                LOAN ASSESSMENT RESULT
              </span>

              <h1>
                Your Borrowing Assessment
              </h1>

              <p>
                Based on the financial information
                provided, here is a personalised
                borrowing recommendation.
              </p>
            </div>

            <div className="result-status">
              <span>
                Assessment
              </span>

              <strong>
                Complete
              </strong>
            </div>
          </div>

          {/* Verdict Card */}

          <div
            className={`verdict-card verdict-${assessment.verdict.verdict}`}
          >
            <div className="verdict-content">
              <span className="verdict-label">
                BORROWING VERDICT
              </span>

              <h2>
                {getVerdictLabel(
                  assessment.verdict.verdict
                )}
              </h2>

              <p>
                {assessment.verdict.reason}
              </p>
            </div>

            <div className="verdict-icon">
              {getVerdictIcon(
                assessment.verdict.verdict
              )}
            </div>
          </div>
          {/* Warnings & Risk Factors */}

{assessment.verdict.warnings.length > 0 && (
  <section className="result-section">
    <div className="result-section-heading">
      <span>
        !
      </span>

      <div>
        <h2>
          Warnings & Risk Factors
        </h2>

        <p>
          Important factors that may affect your
          borrowing decision or lender eligibility.
        </p>
      </div>
    </div>

    <div className="warnings-card">
      <h3>
        Please consider the following
      </h3>

      <ul>
        {assessment.verdict.warnings.map(
          (warning, index) => (
            <li key={index}>
              {warning}
            </li>
          )
        )}
      </ul>
    </div>
  </section>
)}
          {/* Key Recommendations */}

<section className="result-section">
  <div className="result-section-heading">
    <span>
      01
    </span>

    <div>
      <h2>
        Key Recommendations
      </h2>

      <p>
        The most important borrowing
        recommendations for this assessment.
      </p>
    </div>
  </div>

  {assessment.verdict.verdict === "dont_borrow" ? (
    <div className="no-borrowing-card">
      <h3>
        No Safe Borrowing Recommendation
      </h3>

      <p>
        Based on your current financial situation,
        we cannot recommend taking an additional
        loan at this time.
      </p>

      <p>
        Consider reducing existing obligations,
        lowering monthly expenses, or improving
        your available monthly repayment capacity
        before applying for a new loan.
      </p>
    </div>
  ) : (
    <div className="recommendation-grid">
      <div className="result-card featured-card">
        <span>
          Recommended Loan Amount
        </span>

        <strong>
          {formatCurrency(
            assessment.amount.recommendedAmount
          )}
        </strong>

        <small>
          Recommended borrowing level
        </small>
      </div>

      <div className="result-card">
        <span>
          Recommended EMI
        </span>

        <strong>
          {formatCurrency(
            assessment.emi.recommendedEMI
          )}
        </strong>

        <small>
          Suggested monthly payment
        </small>
      </div>

      <div className="result-card">
        <span>
          Maximum EMI
        </span>

        <strong>
          {formatCurrency(
            assessment.emi.maximumEMI
          )}
        </strong>

        <small>
          Maximum affordable capacity
        </small>
      </div>

      <div className="result-card">
        <span>
          Suggested Tenure
        </span>

        <strong>
          {assessment.emi.suggestedTenureMonths} months
        </strong>

        <small>
          Recommended repayment period
        </small>
      </div>
    </div>
  )}
</section>

          {/* Loan Amount Analysis */}

          <section className="result-section">
            <div className="result-section-heading">
              <span>
                02
              </span>

              <div>
                <h2>
                  Loan Amount Analysis
                </h2>

                <p>
                  Compare the recommended borrowing
                  amount with potential lender
                  sanction ranges.
                </p>
              </div>
            </div>

            <div className="analysis-grid">
              <div className="analysis-card">
                <span>
                  Safe Loan Amount
                </span>

                <strong>
                  {formatCurrency(
                    assessment.amount.safeAmount.min
                  )}
                  {" - "}
                  {formatCurrency(
                    assessment.amount.safeAmount.max
                  )}
                </strong>

                <p>
                  A conservative borrowing range
                  based on your affordability.
                </p>
              </div>

              <div className="analysis-card">
                <span>
                  Likely Sanction Amount
                </span>

                <strong>
                  {formatCurrency(
                    assessment.amount.likelySanction.min
                  )}
                  {" - "}
                  {formatCurrency(
                    assessment.amount.likelySanction.max
                  )}
                </strong>

                <p>
                  The approximate range a lender may
                  be willing to sanction.
                </p>
              </div>
            </div>
          </section>

          {/* Interest Rate Estimate */}

          <section className="result-section">
            <div className="result-section-heading">
              <span>
                03
              </span>

              <div>
                <h2>
                  Interest Rate Estimate
                </h2>

                <p>
                  Estimated rate ranges based on the
                  available borrower information.
                </p>
              </div>
            </div>

            <div className="analysis-grid">
              <div className="analysis-card">
                <span>
                  Fair Interest Rate
                </span>

                <strong>
                  {assessment.rate.fairRate.min}%
                  {" - "}
                  {assessment.rate.fairRate.max}%
                </strong>

                <p>
                  Estimated fair interest-rate range
                  for this borrower profile.
                </p>
              </div>

              <div className="analysis-card">
                <span>
                  Estimated APR
                </span>

                <strong>
                  {assessment.rate.estimatedAPR.min}%
                  {" - "}
                  {assessment.rate.estimatedAPR.max}%
                </strong>

                <p>
                  Approximate annual percentage rate
                  including borrowing costs.
                </p>
              </div>
            </div>
          </section>

          {/* EMI Stress Test */}

          <section className="result-section">
            <div className="result-section-heading">
              <span>
                04
              </span>

              <div>
                <h2>
                  EMI Stress Test
                </h2>

                <p>
                  Understand how your EMI could change
                  if interest rates increase.
                </p>
              </div>
            </div>

            <div className="stress-card">
              <div>
                <span>
                  Stress Case EMI
                </span>

                <strong>
                  {formatCurrency(
                    assessment.emi.stressCaseEMI
                  )}
                </strong>
              </div>

              <p>
                {assessment.emi.stressCaseDescription}
              </p>
            </div>
          </section>

          {/* Assessment Confidence */}

          <section className="result-section">
            <div className="result-section-heading">
              <span>
                05
              </span>

              <div>
                <h2>
                  Assessment Confidence
                </h2>

                <p>
                  How confident the system is in this
                  borrowing assessment.
                </p>
              </div>
            </div>

            <div className="confidence-card">
              <div className="confidence-level">
                <span>
                  Confidence Level
                </span>

                <strong>
                  {assessment.confidence}
                </strong>
              </div>

              <p>
                {assessment.confidenceReason}
              </p>
            </div>
          </section>

          {/* Negotiation Guidance */}

          <section className="result-section">
            <div className="result-section-heading">
              <span>
                06
              </span>

              <div>
                <h2>
                  Negotiation Guidance
                </h2>

                <p>
                  Recommended terms and information
                  to use when discussing your loan
                  with a lender.
                </p>
              </div>
            </div>

            <div className="negotiation-card">
              <div className="negotiation-header">
                <div>
                  <span>
                    RECOMMENDED PRODUCT
                  </span>

                  <h3>
                    {
                      assessment.negotiationCard
                        .recommendedProduct
                    }
                  </h3>
                </div>

                <div className="negotiation-confidence">
                  <span>
                    Confidence
                  </span>

                  <strong>
                    {
                      assessment.negotiationCard
                        .confidence
                    }
                  </strong>
                </div>
              </div>

              <p className="borrower-summary">
                {
                  assessment.negotiationCard
                    .borrowerSummary
                }
              </p>

              <div className="negotiation-grid">
                <div>
                  <span>
                    Recommended Amount
                  </span>

                  <strong>
                    {formatCurrency(
                      assessment.negotiationCard
                        .recommendedAmount
                    )}
                  </strong>
                </div>

                <div>
                  <span>
                    Fair Interest Rate
                  </span>

                  <strong>
                    {
                      assessment.negotiationCard
                        .fairRate.min
                    }%
                    {" - "}
                    {
                      assessment.negotiationCard
                        .fairRate.max
                    }%
                  </strong>
                </div>

                <div>
                  <span>
                    Recommended EMI
                  </span>

                  <strong>
                    {formatCurrency(
                      assessment.negotiationCard
                        .recommendedEMI
                    )}
                  </strong>
                </div>
              </div>

              <div className="negotiation-reasons">
                <h4>
                  Key Reasons
                </h4>

                <ul>
                  {
                    assessment.negotiationCard
                      .keyReasons.map(
                        (reason, index) => (
                          <li key={index}>
                            {reason}
                          </li>
                        )
                      )
                  }
                </ul>
              </div>
            </div>
          </section>

          {/* Bottom Summary */}

          <div className="assessment-summary">
            <h2>
              Borrowing Summary
            </h2>

            <p>
              {assessment.verdict.reason}
            </p>

            <div className="summary-items">
              <div>
                <span>
                  Recommended Amount
                </span>

                <strong>
                  {formatCurrency(
                    assessment.amount.recommendedAmount
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Recommended EMI
                </span>

                <strong>
                  {formatCurrency(
                    assessment.emi.recommendedEMI
                  )}
                </strong>
              </div>

              <div>
                <span>
                  Confidence
                </span>

                <strong>
                  {assessment.confidence}
                </strong>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default App;