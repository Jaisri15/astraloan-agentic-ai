// src/utils/underwritingEngine.js

/**
 * Calculates a Risk Score (0-100) based on financial inputs.
 * Lower score means less risk (better chance of approval).
 * 
 * Weights distribution (approximate):
 * - Credit Score: 35%
 * - DTI (Debt to Income): 30%
 * - Employment & Income Stability: 20%
 * - Loan Purpose & Age Factor: 15%
 */
export const calculateRisk = (data) => {
    let score = 0;
    const explanations = [];
  
    const creditScore = parseInt(data.creditScore) || 0;
    const income = parseFloat(data.monthlyIncome) || 0;
    const debt = parseFloat(data.monthlyDebt) || 0;
    const age = parseInt(data.age) || 0;
    const amount = parseFloat(data.loanAmount) || 0;
    const employment = data.employmentType || "unemployed";
    const purpose = data.loanPurpose || "other";
  
    // 1. Credit Score Evaluation (Max 35 points risk)
    if (creditScore >= 750) {
      score += 5;
      explanations.push({ factor: 'Credit Strength', text: 'Excellent credit score significantly lowers your risk profile.', type: 'positive' });
    } else if (creditScore >= 650) {
      score += 15;
      explanations.push({ factor: 'Credit Strength', text: 'Fair credit score shows responsible borrowing history.', type: 'neutral' });
    } else {
      score += 35;
      explanations.push({ factor: 'Credit Strength', text: 'Low credit score indicates high historical default risk.', type: 'negative' });
    }
  
    // 2. DTI Ratio (Max 30 points risk)
    const dti = income > 0 ? (debt / income) * 100 : 100;
    if (dti < 30) {
      score += 5;
      explanations.push({ factor: 'DTI Ratio', text: 'Your debt-to-income ratio is healthy, ensuring you can manage payments.', type: 'positive' });
    } else if (dti < 45) {
      score += 15;
      explanations.push({ factor: 'DTI Ratio', text: 'Moderate debt-to-income ratio. Manageable, but limits flexibility.', type: 'neutral' });
    } else {
      score += 30;
      explanations.push({ factor: 'DTI Ratio', text: 'High debt relative to income creates a strong repayment risk.', type: 'negative' });
    }
  
    // 3. Employment Type (Max 20 points risk)
    if (employment === 'full-time') {
      score += 5;
      explanations.push({ factor: 'Employment', text: 'Stable full-time employment improves income predictability.', type: 'positive' });
    } else if (employment === 'self-employed' || employment === 'part-time') {
      score += 12;
      explanations.push({ factor: 'Employment', text: 'Variable income source adds slight evaluation complexity.', type: 'neutral' });
    } else {
      score += 20;
      explanations.push({ factor: 'Employment', text: 'Lack of stable employment severely impacts capacity to repay.', type: 'negative' });
    }
  
    // 4. Loan Size vs Income (Max 10 points)
    const ratio = income > 0 ? amount / income : 100;
    if (ratio < 5) {
      score += 2;
    } else if (ratio < 15) {
      score += 5;
      explanations.push({ factor: 'Loan Strain', text: 'Requested amount is moderate compared to monthly income.', type: 'neutral' });
    } else {
      score += 10;
      explanations.push({ factor: 'Loan Strain', text: 'Requested loan is very large for your current income level.', type: 'negative' });
    }
  
    // 5. Age Factor (Max 5 points)
    if (age >= 21) {
      score += 1;
    } else {
      score += 5;
      explanations.push({ factor: 'Age Profile', text: 'Limited credit age history poses minor risk.', type: 'neutral' });
    }

    // 6. Fraud Probability & Doc Clarity (Max 15 points)
    const authenticity = data.ocrData?.authenticityScore || 0;
    if (authenticity > 90 && !data.ocrData?.mismatch) {
       score += 0;
       explanations.push({ factor: 'Document Clarity', text: 'Documents are high quality and 100% matched with stated values.', type: 'positive' });
    } else if (authenticity > 70) {
       score += 5;
       explanations.push({ factor: 'Document Verification', text: 'Documents verified but have some clarity or minor mismatch issues.', type: 'neutral' });
    } else {
       score += 15;
       explanations.push({ factor: 'Fraud Suspicion', text: 'High probability of fraud. Document mismatch or low clarity detected.', type: 'negative' });
    }

    // 7. Bank Verification Status (Max 5 points)
    if (data.bankData?.bankName) {
       score += 0;
       explanations.push({ factor: 'Bank Vault Sync', text: 'Bank details verified securely via Vault.', type: 'positive' });
    } else {
       score += 5;
       explanations.push({ factor: 'Bank Verification', text: 'Bank details missing or unverified.', type: 'negative' });
    }

    // 8. Loan Purpose Risk (Max 5 points)
    if (purpose === 'education' || purpose === 'home') {
       score += 1;
    } else if (purpose === 'business') {
       score += 3;
       explanations.push({ factor: 'Loan Purpose Risk', text: 'Business loans carry inherent market volatility risk.', type: 'neutral' });
    } else {
       score += 5;
    }
  
    // Final Adjustments
    score = Math.min(Math.max(score, 0), 100);
  
    // Decision Rules
    let decision = "REVIEW";
    let statusId = "review";
    let recommendation = "";
  
    if (score <= 39) {
      decision = "APPROVED";
      statusId = "approved";
      recommendation = "Proceed to sign the final loan agreement. Funds will be disbursed within 24 hours.";
    } else if (score <= 69) {
      decision = "REVIEW";
      statusId = "review";
      recommendation = "Submit additional documents (W-2, Tax Returns) to a human underwriter for manual verified clearance.";
    } else {
      decision = "REJECTED";
      statusId = "rejected";
      recommendation = "Work on lowering existing debt and improving credit limits before reapplying in 6 months.";
    }
  
    return {
      score,
      decision,
      statusId,
      explanations,
      recommendation
    };
  };
