import React from "react";

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

    return (
        <div>
            <p>Consommation totale : {total.toFixed(2)} kW</p>
            <p>Moyenne mensuelle : {avg.toFixed(2)} kW</p>
            <p>
                Mois le plus élevé : {maxEntry.month} ({maxEntry.consumptionKW}{" "}
                kW)
            </p>
        </div>
    );
}

export default Summary;
