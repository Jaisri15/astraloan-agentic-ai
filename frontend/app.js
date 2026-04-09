document.getElementById("loanForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        creditScore: Number(document.getElementById("creditScore").value),
        income: Number(document.getElementById("income").value),
        debt: Number(document.getElementById("debt").value),
        employment: document.getElementById("employment").value
    };

    const response = await fetch("http://localhost:5000/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("result").innerHTML =
        `<h3>Decision: ${result.decision}</h3>
         <p>Risk Score: ${result.riskScore}</p>
         <h4>Explanation</h4>
         <p>${result.explanation}</p>`;
});
