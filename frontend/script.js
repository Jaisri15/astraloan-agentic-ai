<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Dashboard</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>

    <h1>Patient Parameters</h1>

    <div class="card-container">
        <div class="card">Sugar Level: 120 mg/dL</div>
        <div class="card">BP Level: 120/80</div>
        <div class="card">SO₂: 97%</div>
        <div class="card">ECG: Normal</div>
        <div class="card">Oxygen: 98%</div>
    </div>

    <div class="button-row">
        <button onclick="getAISuggestions()">AI Suggestion</button>
        <button onclick="startVideo()">Video Call</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
