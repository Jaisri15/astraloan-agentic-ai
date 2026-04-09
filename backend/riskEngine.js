function calculateRisk(creditScore, income, debt, employment) {
    
    let risk = 0;

    // Credit score contribution
    if (creditScore > 750) risk += 10;
    else if (creditScore > 650) risk += 25;
    else risk += 45;

    // Debt-to-Income Ratio
    const dti = debt / income;
    if (dti < 0.2) risk += 10;
    else if (dti < 0.4) risk += 25;
    else risk += 45;

    // Employment Type
    if (employment === "Salaried") risk += 5;
    else if (employment === "Self-Employed") risk += 15;
    else risk += 25;

    return Math.min(risk, 100);
}

module.exports = calculateRisk;
