const ctx = document.getElementById('myChart').getContext('2d');
let chart;

function createChart(data) {
    const labels = ["1", "2", "3", "4", "5"];
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Kiválasztott sor adatai',
                data: data,
                borderColor: 'blue',
                backgroundColor: 'lightblue',
                tension: 0.2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

const rows = document.querySelectorAll("#numberTable tr");
rows.forEach(row => {
    row.addEventListener("click", () => {
        const values = Array.from(row.children).map(td => parseFloat(td.textContent));
        createChart(values);
    });
});