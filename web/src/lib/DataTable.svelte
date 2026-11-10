<!-- Tableau unique : tri, filtres de colonne (num/text/choice) et pagination.
     Chaque page ne donne que ses lignes et sa config de colonnes :
       columns = [{ key:'rank', label:'Rank', filter:'num' },
                  { key:'pos',  label:'POS',  filter:'choice' },
                  { key:'word', label:'Word', filter:'text', left:true }]
     Clic sur l'en-tête : tri. Clic droit ou ▾ : filtre.
     Snippet optionnel `cell(row, col)` pour un rendu personnalisé. -->
<script>
  import Pager from './Pager.svelte';
  import FilterPopup from './FilterPopup.svelte';
  import { applyFilters, sortRows, choiceValues } from './filters.js';

  let {
    rows = [], columns = [], noun = 'rows',
    filters = $bindable({}), sort = $bindable({ key: null, dir: 1 }),
    page = $bindable(1), per = $bindable(20),
    cell = null, onrowclick = null,
  } = $props();

  const filtered = $derived(applyFilters(rows, columns, filters));
  const sorted = $derived(sortRows(filtered, columns, sort));
  const shown = $derived(sorted.slice((page - 1) * per, page * per));

  let pop = $state(null); // { col, x, y }

  function sortBy(col) {
    sort = sort.key === col.key ? { key: col.key, dir: -sort.dir } : { key: col.key, dir: col.filter === 'num' ? -1 : 1 };
  }
  function openFilter(e, col) {
    if (!col.filter) return;
    e.preventDefault();
    e.stopPropagation();
    pop = { col, x: e.clientX, y: e.clientY };
  }
  function setFilter(key, v) {
    const f = { ...filters };
    v == null ? delete f[key] : (f[key] = v);
    filters = f;
    page = 1;
  }
  const isOn = (k) => filters[k] != null && filters[k] !== '';
</script>

<div class="tw">
  <table>
    <thead>
      <tr>
        {#each columns as col (col.key)}
          <th class="nfh" class:left={col.left} class:nff={isOn(col.key)} onclick={() => sortBy(col)} oncontextmenu={(e) => openFilter(e, col)}>
            {col.label}{#if sort.key === col.key}{sort.dir > 0 ? ' ▲' : ' ▼'}{/if}
            {#if col.filter}<button class="nf" class:on={isOn(col.key)} onclick={(e) => openFilter(e, col)} aria-label="Filter {col.label}">▾</button>{/if}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each shown as row, i}
        <tr onclick={onrowclick ? () => onrowclick(row) : null}>
          {#each columns as col (col.key)}
            <td class:left={col.left}>{#if cell}{@render cell(row, col)}{:else}{row[col.key] ?? ''}{/if}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<Pager bind:page bind:per total={sorted.length} {noun} />

{#if pop}
  <FilterPopup
    kind={pop.col.filter} title={pop.col.label} x={pop.x} y={pop.y}
    value={filters[pop.col.key] ?? null}
    values={pop.col.filter === 'choice' ? choiceValues(rows, pop.col) : []}
    onapply={(v) => setFilter(pop.col.key, v)}
    onclose={() => (pop = null)}
  />
{/if}

<style>
  .tw { overflow: auto; }
  table { width: 100%; border-collapse: collapse; }
  .nfh { padding: 6px 10px 6px 6px; color: var(--m); font-weight: 600; text-align: center; border-bottom: 1px solid var(--l); white-space: nowrap; position: sticky; top: 0; background: var(--p); cursor: pointer; user-select: none; }
  .nfh.left, td.left { text-align: left; }
  .nfh.nff { color: var(--a); }
  .nf { background: none; border: 1px solid var(--l); color: var(--m); border-radius: 999px; padding: 0 8px; margin-left: 4px; font-size: 11px; cursor: pointer; }
  .nf.on { background: var(--a); color: #0c1020; border-color: var(--a); }
  td { padding: 5px 6px; text-align: center; }
  tbody tr:nth-child(even) { background: var(--zebra); }
  tbody tr:hover { background: var(--hov); }
</style>
