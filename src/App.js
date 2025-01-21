import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import ConsumptionChart from "./components/ConsumptionChart/ConsumptionChart";
import DataTable from "./components/DataTable/DataTable";
import Summary from "./components/Summary/Summary";
import AddForm from "./components/AddForm/AddForm";

const toKW = (value, unit) => {
    return unit === "W" ? value / 1000 : value;
};

const toW = (value, unit) => {
    return unit === "W" ? value * 1000 : value;
};

function App() {
    // Contiendra le tableau des données, mais en kW
    const [dataInKW, setDataInKW] = useState([]);

    // Charger le JSON une seule fois au montage
    useEffect(() => {
        fetch("/data.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((jsonData) => {
                // Convertir en kW
                const converted = jsonData.map((item) => ({
                    month: item.month,
                    consumptionKW: toKW(item.consumption, item.unit),
                }));
                // (Optionnel) trier par mois
                // converted.sort((a, b) => a.month.localeCompare(b.month));
                setDataInKW(converted);
            })
            .catch((err) => console.error("Erreur chargement JSON:", err));
    }, []);

    // 1. Ajouter une entrée
    const handleAdd = (month, consumption, unit) => {
        // Vérifier si le mois existe déjà
        const alreadyExists = dataInKW.some((d) => d.month === month);
        if (alreadyExists) {
            alert("Ce mois existe déjà !");
            return;
        }

        if (consumption <= 0) {
            alert("La consommation doit être positive.");
            return;
        }

        if (!["W", "kW"].includes(unit)) {
            alert("Unité invalide. Choisir 'W' ou 'kW'.");
            return;
        }

        const newObj = {
            month,
            consumptionKW: toKW(consumption, unit),
        };

        // Mettre à jour le state
        setDataInKW((prev) => [...prev, newObj]);
    };

    // 2. Modifier une entrée existante
    const handleEdit = (monthToEdit, newConsumption, newUnit) => {
        setDataInKW((prev) =>
            prev.map((item) => {
                if (item.month === monthToEdit) {
                    return {
                        ...item,
                        consumptionKW: toKW(newConsumption, newUnit),
                    };
                }
                return item;
            })
        );
    };

    return (
        <div
            style={{
                maxWidth: "800px",
                margin: "20px auto",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h1>Dashboard Conso Électrique - Tokyo</h1>
            {/* Résumé */}
            <Summary data={dataInKW} />
            {/* Graphique */}
            <ConsumptionChart data={dataInKW} />

            {/* Table + bouton modifier */}
            <DataTable data={dataInKW} onEdit={handleEdit} />

            {/* Formulaire d'ajout */}
            <AddForm onAdd={handleAdd} />
        </div>
    );
}
export default App;
