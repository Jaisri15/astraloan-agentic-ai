function generateExplanation(creditScore, income, debt) {
    let explanation = "";

    if (creditScore < 650)
        explanation += "Low credit score increases risk. ";

    if (debt / income > 0.4)
        explanation += "High debt-to-income ratio indicates financial stress. ";

    if (explanation === "")
        explanation = "Applicant has stable financial indicators.";

    return explanation;
}

module.exports = generateExplanation;
