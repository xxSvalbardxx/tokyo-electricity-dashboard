import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
} from "chart.js";

// Enregistrer les composants auprès de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function ConsumptionChart({ data }) {
    // Trier dans l'ordre par mois
    data.sort((a, b) => a.month.localeCompare(b.month));
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
            },
            y: {
                type: "linear",
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Consommation (kW)",
                },
                // ticks 10 by 10
                ticks: {
                    stepSize: 20,
                    autoSkip: false,
                },
            },
        },
    };

    return (
        <div>
            <h2>Graphique</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}

export default ConsumptionChart;
