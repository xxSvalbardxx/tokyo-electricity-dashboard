# Run
```bash
npm install
npm start
```

# Features
- Graph to show monthly consumption of electricity
- Summary of the consumption of electricity (total, average, max, min)
- Table with the consumption of electricity per month with a CRUD to add, edit and delete

# Adjustments after GPT proposal
- Graph sorted by month
- Autoskip disabled on month axis and ticks adjusted
- Isolation of the components by folder to add CSS and eventually tests, and to make it reusable
- Little bit of css
- Comments


# Notes

## Update State
Les fonctions handleAdd et handleEdit sont placées dans App.js au lieu de AddForm et DataTable car elles ont besoin de modifier le state de App.js. Le state n'est pas présent dans les autres composants, ce sont simplement des déclencheurs d'événements.

## UseEffect
Le useEffect est utilisé pour mettre à jour le graphique lorsque le state est modifié. Il est également utilisé pour initialiser le state lorsque le composant est monté.

## App.js
Les données ne sont contenu que dans App.js pour les rendre accessibles aux autres composants, elles sont passées en props. Cela assure une seule source de vérité et un update du graphique à chaque modification du state.

# Further improvements
- Delete a date from the table with modal confirmation
