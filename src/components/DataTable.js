import React, { useState } from "react";

function DataTable({ data, onEdit }) {
    // État local pour savoir quel mois on est en train d'éditer
    const [editMonth, setEditMonth] = useState(null);
    const [editConsumption, setEditConsumption] = useState("");
    const [editUnit, setEditUnit] = useState("kW");

    const handleStartEdit = (month, currentValue) => {
        setEditMonth(month);
        setEditConsumption(currentValue);
        setEditUnit("kW"); // Par défaut, on part de kW
    };

    const handleSave = (month) => {
        const numValue = parseFloat(editConsumption);
        if (isNaN(numValue) || numValue <= 0) {
            alert("Valeur invalide pour la consommation.");
            return;
        }
        if (!["W", "kW"].includes(editUnit)) {
            alert("Unité invalide (W ou kW).");
            return;
        }
        onEdit(month, numValue, editUnit);
        setEditMonth(null);
    };

    return (
        <div>
            <h2>Données mensuelles</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                            Mois
                        </th>
                        <th
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                            Consommation (kW)
                        </th>
                        <th
                            style={{ border: "1px solid #ccc", padding: "8px" }}
                        >
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        if (editMonth === item.month) {
                            // Mode édition
                            return (
                                <tr key={item.month}>
                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                        }}
                                    >
                                        {item.month}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                        }}
                                    >
                                        <input
                                            type="number"
                                            value={editConsumption}
                                            onChange={(e) =>
                                                setEditConsumption(
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <select
                                            value={editUnit}
                                            onChange={(e) =>
                                                setEditUnit(e.target.value)
                                            }
                                        >
                                            <option value="kW">kW</option>
                                            <option value="W">W</option>
                                        </select>
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                handleSave(item.month)
                                            }
                                        >
                                            Enregistrer
                                        </button>
                                        <button
                                            onClick={() => setEditMonth(null)}
                                        >
                                            Annuler
                                        </button>
                                    </td>
                                </tr>
                            );
                        } else {
                            // Mode lecture seule
                            return (
                                <tr key={item.month}>
                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                        }}
                                    >
                                        {item.month}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                        }}
                                    >
                                        {item.consumptionKW}
                                    </td>
                                    <td
                                        style={{
                                            border: "1px solid #ccc",
                                            padding: "8px",
                                        }}
                                    >
                                        <button
                                            onClick={() =>
                                                handleStartEdit(
                                                    item.month,
                                                    item.consumptionKW
                                                )
                                            }
                                        >
                                            Modifier
                                        </button>
                                    </td>
                                </tr>
                            );
                        }
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default DataTable;
