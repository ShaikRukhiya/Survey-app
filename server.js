const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

let surveyResponses = [];  // Stores survey responses in memory

app.post("/submit-survey", (req, res) => {
    surveyResponses.push(req.body);
    res.json({ message: "Survey submitted successfully" });
});

app.get("/survey-data", (req, res) => {
    let aggregatedData = {};

    surveyResponses.forEach(response => {
        Object.entries(response).forEach(([question, answer]) => {
            if (!aggregatedData[question]) {
                aggregatedData[question] = [];
            }
            aggregatedData[question].push(answer);
        });
    });

    res.json(aggregatedData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
