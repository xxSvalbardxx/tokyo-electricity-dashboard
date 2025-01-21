import React, { useState } from "react";

function AddForm({ onAdd }) {
    const [month, setMonth] = useState("");
    const [consumption, setConsumption] = useState("");
    const [unit, setUnit] = useState("kW");

    const handleSubmit = (e) => {
        e.preventDefault();
        // On convertit la saisie en number
        const numConsumption = parseFloat(consumption);
        onAdd(month, numConsumption, unit);
        // Reset du formulaire
        setMonth("");
        setConsumption("");
        setUnit("kW");
    };

    return (
        <div>
            <h2>Ajouter un nouveau mois</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Mois (YYYY-MM) : </label>
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Consommation : </label>
                    <input
                        type="number"
                        value={consumption}
                        onChange={(e) => setConsumption(e.target.value)}
                        required
                    />
                    <select
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    >
                        <option value="kW">kW</option>
                        <option value="W">W</option>
                    </select>
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
}

export default AddForm;
