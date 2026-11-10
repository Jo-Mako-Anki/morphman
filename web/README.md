# Interface MorphMan (sources Svelte)

Nouvelle base propre de l'interface. L'ancien `web_dist/app.js` (compilé, sans sources) reste utilisé par l'add-on jusqu'à la bascule.

## Composants partagés (`src/lib/`)

| Fichier | Rôle |
|---|---|
| `Pager.svelte` | La seule barre de pagination : Rows, « ‹ Page n of N › », « a–b of total ». |
| `FilterPopup.svelte` | La seule fenêtre de filtre de colonne : `num` (> < >= <= =, aussi `100-500`, `<5, >=3`), `text`, `choice` (recherche seulement au-delà de 20 valeurs). |
| `filters.js` | La logique des filtres et du tri, sans interface. |
| `DataTable.svelte` | Tableau = tri + filtres + pagination. Une page ne donne que ses lignes et ses colonnes. |
| `bridge.js` | Pont avec Python : `py("commande", arg)` et `onPy(fn)`. |
| `theme.css` | Couleurs et boutons communs. |

Exemple de colonnes :

```js
[{ key: 'word', label: 'Word', filter: 'text', left: true },
 { key: 'rank', label: 'Rank', filter: 'num' },
 { key: 'pos',  label: 'POS',  filter: 'choice' }]
```

## Ordre de réécriture des pages

1. Vocabulary
2. Titles : liste, overview, words, script
3. Words to learn + panier (Add to deck)
4. Browser (recherche au double-clic)
5. Settings, raccourcis, Recalc, corpus

## Construire

```
cd web
npm install
npm run build      # -> dist/app.js et dist/app.css
```
