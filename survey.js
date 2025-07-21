document.getElementById("survey-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let surveyData = [];
    const selectElements = document.querySelectorAll("select");

    selectElements.forEach((select) => {
        surveyData.push(parseInt(select.value));
    });

    renderBarChart(surveyData);
});

function renderBarChart(data) {
    const ctx = document.getElementById("surveyChart").getContext("2d");

    if (window.myChart) {
        window.myChart.destroy(); // Destroy previous chart before rendering a new one
    }

    window.myChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["1 - Poor", "2 - Fair", "3 - Good", "4 - Very Good", "5 - Excellent"],
            datasets: [{
                label: "Survey Responses",
                data: data,
                backgroundColor: [
                    "#ffb3c1", "#ffcb77", "#a0c4ff", "#b9fbc0", "#f9c74f"
                ],
                borderRadius: 10,
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function addCustomQuestion() {
    const customQuestion = document.getElementById("custom-question").value.trim();

    if (customQuestion !== "") {
        const form = document.getElementById("survey-form");
        const newQuestion = document.createElement("p");
        newQuestion.innerText = customQuestion;

        const selectElement = document.createElement("select");
        selectElement.innerHTML = `
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
        `;

        form.insertBefore(newQuestion, form.lastElementChild);
        form.insertBefore(selectElement, form.lastElementChild);
        
        document.getElementById("custom-question").value = "";
    }
}
