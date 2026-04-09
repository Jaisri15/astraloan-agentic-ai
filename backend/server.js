const express = require("express");
const cors = require("cors");
const calculateRisk = require("./riskEngine");
const generateExplanation = require("./explainability");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/evaluate", (req, res) => {
    const { creditScore, income, debt, employment } = req.body;

    const riskScore = calculateRisk(creditScore, income, debt, employment);

    const decision = riskScore < 40 ? "Approved" :
                     riskScore < 70 ? "Review Manually" :
                     "Rejected";

    const explanation = generateExplanation(creditScore, income, debt);

    res.json({ decision, riskScore, explanation });
});

app.listen(5000, () => console.log("Server running on port 5000"));
