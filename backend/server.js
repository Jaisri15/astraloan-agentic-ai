const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// SAMPLE API
app.get("/api/parameters", (req, res) => {
    res.json({
        sugar: 120,
        bp: "120/80",
        so2: "97%",
        ecg: "Normal",
        oxygen: "98%"
    });
});

// AI suggestion API
app.get("/api/ai", (req, res) => {
    res.json({ suggestion: "All parameters normal" });
});

app.listen(3000, () => {
    console.log("Backend running on port 3000");
});
