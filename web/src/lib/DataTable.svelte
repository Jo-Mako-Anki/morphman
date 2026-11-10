<!-- Tableau unique : tri, filtres de colonne (num/text/choice), pagination, colonnes déplaçables.
     Chaque page ne donne que ses lignes et sa config de colonnes :
       columns = [{ key:'rank', label:'Rank', filter:'num' },
                  { key:'pos',  label:'POS',  filter:'choice' },
                  { key:'word', label:'Word', filter:'text', left:true }]
     Clic sur l'en-tête : tri. Clic droit : filtre. Glisser l'en-tête : réorganiser (onreorder(de, vers)).
     Options de colonne : tip (bulle), width (px), left, jp (police japonaise), get(row) (valeur filtrée et triée),
     show(row) (texte affiché), cls(row) (classe), title(row) (bulle de la cellule), onclick(row) (cellule cliquable).
     `result` (bindable) : les lignes filtrées et triées, toutes pages (pour l'export). -->
<script>
  import Pager from './Pager.svelte';
  import FilterPopup from './FilterPopup.svelte';
  import { applyFilters, sortRows, choiceValues, valueOf } from './filters.js';

  let {
    rows = [], columns = [], noun = 'rows',
    filters = $bindable({}), sort = $bindable({ key: null, dir: 1 }),
    page = $bindable(1), per = $bindable(20), result = $bindable([]),
    cell = null, onrowclick = null, oncelldblclick = null, onreorder = null,
  } = $props();

  const filtered = $derived(applyFilters(rows, columns, filters));
  const sorted = $derived(sortRows(filtered, columns, sort));
  const shown = $derived(sorted.slice((page - 1) * per, page * per));
  $effect(() => { result = sorted; });

  let pop = $state(null); // { col, x, y }
  let drag = null;
  let justDragged = false;

  function sortBy(col) {
    if (justDragged) return;
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

  function down(e, col) {
    if (!onreorder || e.button !== 0) return;
    drag = { key: col.key, x: e.clientX, y: e.clientY, on: false };
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
  }
  function move(e) {
    if (!drag) return;
    if (!drag.on && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 6) drag.on = true;
    if (!drag.on) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const th = el && el.closest ? el.closest('th[data-k]') : null;
    if (th && th.dataset.k !== drag.key) onreorder(drag.key, th.dataset.k);
  }
  function up() {
    removeEventListener('pointermove', move);
    removeEventListener('pointerup', up);
    if (drag && drag.on) { justDragged = true; setTimeout(() => (justDragged = false), 0); }
    drag = null;
  }

  const text = (col, row) => (col.show ? col.show(row) : valueOf(col, row) ?? '');
  const isOn = (k) => filters[k] != null && filters[k] !== '';
</script>

<div class="tblcard">
  <div class="tw">
    <table>
      <thead>
        <tr>
          {#each columns as col (col.key)}
            <th class:left={col.left} class:act={isOn(col.key)} data-k={col.key}
              title={(col.tip ? col.tip + ' ' : '') + 'Click: sort.' + (col.filter ? ' Right-click: filter.' : '') + (onreorder ? ' Drag: move.' : '')}
              style={col.width ? `width:${col.width}px;min-width:${col.width}px;max-width:${col.width}px` : ''}
              onpointerdown={(e) => down(e, col)} onclick={() => sortBy(col)} oncontextmenu={(e) => openFilter(e, col)}>
              {col.label}{#if sort.key === col.key}{sort.dir > 0 ? ' ↑' : ' ↓'}{/if}{#if isOn(col.key)} ●{/if}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each shown as row}
          <tr onclick={onrowclick ? () => onrowclick(row) : null}>
            {#each columns as col (col.key)}
              <td class={(col.cls ? col.cls(row) : '') + (col.left ? ' left' : '') + (col.jp ? ' jp' : '')}
                style={col.width ? `width:${col.width}px;max-width:${col.width}px` : ''}
                title={col.title ? col.title(row) : text(col, row)}
                class:click={!!col.onclick}
                ondblclick={oncelldblclick ? (e) => oncelldblclick(row, col, e) : null}
                onclick={col.onclick ? (e) => { e.stopPropagation(); col.onclick(row); } : null}>
                {#if cell}{@render cell(row, col)}{:else}{text(col, row)}{/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
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
  .tblcard { background: var(--p); border: 1px solid var(--l); border-radius: 14px; padding: 2px 8px; }
  .tw { overflow: auto; }
  table { table-layout: fixed; width: max-content; max-width: none; border-collapse: collapse; font-size: 13px; }
  th { color: #cdd6ea; font-size: 11.5px; font-weight: 600; padding: 8px 6px; border-bottom: 1px solid var(--l); text-align: center; position: sticky; top: 0; z-index: 2; background: var(--p); white-space: nowrap; cursor: pointer; user-select: none; overflow: hidden; text-overflow: ellipsis; }
  th.act { color: var(--a); }
  th.left, td.left { text-align: left; }
  td { padding: 6px; border-bottom: 1px solid var(--p2); text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  th + th, td + td { border-left: 1px solid var(--p2); }
  td.jp { font-size: 15px; }
  td.click { cursor: pointer; }
  td.click:hover { text-decoration: underline; }
  td.known { color: var(--g); }
  td.new { color: var(--m); }
  tbody tr:nth-child(even) td { background: var(--zebra); }
  tbody tr:hover td { background: var(--hov); }
</style>
