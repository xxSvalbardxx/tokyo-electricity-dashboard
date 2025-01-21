import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";
import "./ConsumptionChart.css";

// Enregistrer les composants auprès de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function ConsumptionChart({ data }) {

    // Extraire labels et valeurs
    const labels = data.map((d) => d.month);
    const values = data.map((d) => d.consumptionKW);

    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "Consommation (kW)",
                data: values,
                backgroundColor: "rgba(75,192,192,0.6)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Mois",
                },
                ticks: {
                    autoSkip: false,
                },
            },
            y: {
                type: "linear",
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Consommation (kW)",
                },
                ticks: {
                    stepSize: 10,
                    autoSkip: false,
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <h2>Graphique</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default ConsumptionChart;
