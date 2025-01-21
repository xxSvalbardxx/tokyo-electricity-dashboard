import React, { useState } from "react";
import "./AddForm.css";

function AddForm({ onAdd }) {
    const [month, setMonth] = useState("");
    const [consumption, setConsumption] = useState("");
    const [unit, setUnit] = useState("kW");

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();
        // Convertir la consommation en nombre décimal
        const numConsumption = parseFloat(consumption);
        
        // onAdd est appelée avec les valeurs du formulaire
        // onAdd est définit dans src/App.js et appel la fonction handleAdd qui se charge de vérifier les valeurs et de les ajouter au tableau
        onAdd(month, numConsumption, unit);

        // Réinitialiser les champs pour la prochaine soumission
        setMonth("");
        setConsumption("");
        setUnit("kW");

    };

    return (
        <div className="add-form-container">
            <h2>Ajouter un nouveau mois</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="month-field">Mois (YYYY-MM) :</label>
                    <input
                        id="month-field"
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="consumption-field">Consommation :</label>
                    <input
                        id="consumption-field"
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
