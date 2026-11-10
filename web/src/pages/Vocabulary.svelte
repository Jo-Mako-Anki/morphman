<!-- Page Vocabulary : la liste de fréquence du catalogue (commande Python "words").
     Le tableau, les filtres et la pagination viennent de lib/DataTable.svelte. -->
<script>
  import DataTable from '../lib/DataTable.svelte';
  import { py, onPy } from '../lib/bridge.js';

  // Colonnes : [clé, titre, alignement gauche, largeur, filtre, bulle]
  const ALL = [
    ['rank', 'Rank', 0, 64, 'num', 'Learning rank: forms learned from the most frequent to the least, following Settings > Written forms. → = already covered by that form, no need to learn it. – = ignored.'],
    ['word', 'Norm', 1, 120, 'text', 'Normalized written form.'],
    ['base', 'Base', 1, 120, 'text', 'Dictionary form.'],
    ['rank_kanji', 'Rank Kanji', 0, 84, 'num', 'Rank of the kanji form of the word in this list.'],
    ['rank_kana', 'Rank Kana', 0, 84, 'num', 'Rank of the kana form of the word in this list.'],
    ['reading', 'Reading', 1, 130, 'text', 'Reading, in hiragana.'],
    ['pos', 'POS', 1, 130, 'choice', 'Type of the word: noun, verb, particle…, or Proper noun / Noise (fillers, numbers, symbols; list bruits.txt).'],
    ['sub', 'Sub-POS', 1, 130, 'choice', 'Finer part of speech from MeCab: common noun, suru verb…'],
    ['count', 'Count', 0, 80, 'num', 'Times the word appears in this selection.'],
    ['pct', '%', 0, 70, 'num', 'Share of all the words of this selection.'],
    ['cum', 'Cumulative %', 0, 100, 'num', 'Reading the list down to this word, you understand this % of the text.'],
    ['spread', 'Spread', 0, 80, 'num', 'Share of the titles that contain the word (of the chosen media, or of the whole catalog).'],
    ['forms', 'Forms', 1, 160, 'text', 'The other written forms of the word found in the texts.'],
    ['meaning', 'Meaning', 1, 320, 'text', 'Short definition from your Yomitan dictionaries (Jitendex by default), as in Words to learn.'],
    ['status', 'Status', 0, 100, 'choice', 'Known if the word is in your known words (last Recalc), otherwise Not known.'],
  ];
  const SHOWN = ['rank', 'word', 'base', 'reading', 'pos', 'count', 'pct', 'cum', 'spread', 'status'];

  let data = $state(null);
  let error = $state('');
  let q = $state('');
  let show = $state('all'); // all | known | learn
  let media = $state('');
  let on = $state([...SHOWN]);
  let colsOpen = $state(false);

  const label = (k) => (data && data.labels && data.labels[k]) || k;
  const getters = {
    pos: (r) => (r.cat === 'noise' ? r.pos_label : label(r.cat) || r.pos_label),
    status: (r) => (r.nc ? 'Ignored' : r.status === 'known' ? 'Known' : 'Not known'),
  };
  const columns = $derived(
    ALL.filter((c) => on.includes(c[0])).map(([key, lbl, left, width, filter, tip]) => ({
      key, label: lbl, left: !!left, width, filter, tip, get: getters[key],
    })),
  );
  const rows = $derived(
    data && data.rows ? data.rows.filter((r) => show === 'all' || (show === 'known') === (r.status === 'known')) : [],
  );

  function load() {
    data = null;
    error = '';
    py('words', { mode: 'both', q: q.trim(), media, limit: 1000, meaning: on.includes('meaning') });
  }
  $effect(() => onPy(({ kind, data: d }) => {
    if (kind === 'words') d && d.error ? (error = d.error) : (data = d);
  }));
  load();

  function toggleCol(k) {
    on = on.includes(k) ? on.filter((x) => x !== k) : ALL.map((c) => c[0]).filter((x) => x === k || on.includes(x));
    if (k === 'meaning' && on.includes('meaning') && data && !data.meaning) load();
  }
  const browse = (r, c, e) =>
    py('wtl_browser', { word: c.key === 'base' ? r.base : r.word, pos: r.pos, sub: r.subraw === '*' ? '' : r.subraw, wide: e.shiftKey });
</script>

<div class="bar">
  <input class="search" placeholder="Search a word…" bind:value={q} onkeydown={(e) => e.key === 'Enter' && load()} />
  <span class="seg">
    {#each [['learn', 'To learn'], ['known', 'Known'], ['all', 'All']] as [v, t]}
      <button class="btn sm" class:on={show === v} onclick={() => (show = v)}>{t}</button>
    {/each}
  </span>
  {#if data && data.all_media && data.all_media.length}
    <select class="msel" bind:value={media} onchange={load}>
      <option value="">All media</option>
      {#each data.all_media as m}<option value={m}>{m}</option>{/each}
    </select>
  {/if}
  <span class="grow"></span>
  <button class="btn sm" onclick={() => (colsOpen = !colsOpen)}>Columns ▾</button>
  {#if colsOpen}
    <div class="cols card">
      {#each ALL as [k, t]}
        <label><input type="checkbox" checked={on.includes(k)} onchange={() => toggleCol(k)} /> {t}</label>
      {/each}
    </div>
  {/if}
</div>

{#if error}
  <div class="m pad">{error}</div>
{:else if !data}
  <div class="m pad">Loading words…</div>
{:else}
  <div class="m small pad">Known words: {data.known}</div>
  <DataTable {rows} {columns} noun="words" oncelldblclick={browse} />
{/if}

<style>
  .bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; position: relative; margin-bottom: 8px; }
  .search { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; width: 220px; }
  .seg { display: inline-flex; gap: 2px; }
  .seg .on { background: var(--a); color: #0c1020; border-color: var(--a); }
  .msel { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; }
  .grow { flex: 1; }
  .cols { position: absolute; right: 0; top: 34px; z-index: 10; background: var(--p); border: 1px solid var(--l); border-radius: 10px; padding: 8px 12px; display: grid; gap: 4px; }
  .pad { padding: 6px 0; }
</style>
