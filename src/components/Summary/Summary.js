import React from "react";
import "./Summary.css";

function Summary({ data }) {
    if (!data || data.length === 0) {
        return <p>Aucune donnée disponible.</p>;
    }

    // Calcul du total
    const total = data.reduce((sum, d) => sum + d.consumptionKW, 0);
    const avg = total / data.length;

    // Repérer le mois max
    let maxEntry = data[0];
    data.forEach((d) => {
        if (d.consumptionKW > maxEntry.consumptionKW) {
            maxEntry = d;
        }
    });

    // Repérer le mois min
    let minEntry = data[0];
    data.forEach((d) => {
        if (d.consumptionKW < minEntry.consumptionKW) {
            minEntry = d;
        }
    });

    return (
        <div className="summary-container">
            <p>Consommation totale : {total.toFixed(2)} kW</p>
            <p>Moyenne mensuelle : {avg.toFixed(2)} kW</p>
            <p className="max">
                Mois le plus élevé : {maxEntry.month} ({maxEntry.consumptionKW}{" "}
                kW)
            </p>

            <p className="min">
                Mois le plus bas : {minEntry.month} ({minEntry.consumptionKW}{" "}
                kW)
            </p>
        </div>
    );
}

export default Summary;
