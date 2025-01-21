import React, { useState } from "react";
import "./DataTable.css";

function DataTable({ data, onEdit, onDelete }) {
    const [editMonth, setEditMonth] = useState(null);
    const [editConsumption, setEditConsumption] = useState("");
    const [editUnit, setEditUnit] = useState("kW");

    const handleStartEdit = (month, currentValue) => {
        setEditMonth(month);
        setEditConsumption(currentValue);
        setEditUnit("kW");
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
        <div className="data-table-container">
            <h2>Données mensuelles</h2>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Mois</th>
                        <th>Consommation (kW)</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => {
                        if (editMonth === item.month) {
                            // Mode édition
                            return (
                                <tr key={item.month}>
                                    <td>{item.month}</td>
                                    <td>
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
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleSave(item.month)
                                            }
                                        >
                                            Enregistrer
                                        </button>
                                        <button
                                            className="cancel-btn"
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
                                    <td>{item.month}</td>
                                    <td>{item.consumptionKW}</td>
                                    <td>
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
                                        <button
                                            onClick={() => onDelete(item.month)}
                                        >
                                            Supprimer
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
