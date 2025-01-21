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
    // dataInKW est l'état actuel du tableau d'objets { month: "YYYY-MM", consumptionKW: 123 }
    // setDataInKW est une fonction pour mettre à jour ce tableau
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
                converted.sort((a, b) => a.month.localeCompare(b.month));

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

        // Vérifier les valeurs
        if (consumption <= 0 || isNaN(consumption)) {
            alert("La consommation doit être positive.");
            return;
        }

        // Vérifier l'unité
        if (!["W", "kW"].includes(unit)) {
            alert("Unité invalide. Choisir 'W' ou 'kW'.");
            return;
        }

        const newObj = {
            month,
            consumptionKW: toKW(consumption, unit),
        };

        // Mettre à jour le state
        // Prev est le tableau actuel et on ajoute le nouvel objet
        setDataInKW((prev) => [...prev, newObj]);
    };

    // 2. Modifier une entrée existante
    const handleEdit = (monthToEdit, newConsumption, newUnit) => {
        setDataInKW((prev) =>
            // parcourir le tableau et remplacer l'objet correspondant
            prev.map((item) => {
                // Si c'est le mois à éditer, on remplace la consommation
                if (item.month === monthToEdit) {
                    return {
                        // On garde les autres propriétés inchangées
                        ...item,
                        // On remplace la consommation
                        consumptionKW: toKW(newConsumption, newUnit),
                    };
                }
                return item;
            })
        );
    };

    // 3. Supprimer une entrée existante
    const handleDelete = (monthToDelete) => {
        // êtes sûr de vouloir supprimer ?
        if (!window.confirm("Voulez-vous vraiment supprimer ce mois ?")) {
            return;
        }
        setDataInKW((prev) => prev.filter((item) => item.month !== monthToDelete));
    }

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
            <DataTable data={dataInKW} onEdit={handleEdit} onDelete={handleDelete} />

            {/* Formulaire d'ajout */}
            <AddForm onAdd={handleAdd} />
        </div>
    );
}
export default App;
