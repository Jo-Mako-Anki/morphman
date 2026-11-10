<!-- Page Vocabulary : la liste de fréquence du catalogue (commande Python "words").
     Le tableau, les filtres et la pagination viennent de lib/DataTable.svelte. -->
<script>
  import DataTable from '../lib/DataTable.svelte';
  import Segmented from '../lib/Segmented.svelte';
  import { py, onPy } from '../lib/bridge.js';
  import { num, loadUi, ui } from '../lib/format.js';

  // Colonnes : [clé, titre, alignement gauche, largeur, filtre, bulle]
  const ALL = [
    ['rank', 'Rank', 0, 64, 'num', 'Learning rank: forms learned from the most frequent to the least, following Settings > Written forms. → = already covered by that form, no need to learn it. – = ignored.'],
    ['word', 'Norm', 0, 130, 'text', 'Normalized written form.'],
    ['base', 'Base', 0, 130, 'text', 'Dictionary form.'],
    ['rank_kanji', 'Rank Kanji', 0, 84, 'num', 'Rank of the kanji form of the word in this list.'],
    ['rank_kana', 'Rank Kana', 0, 84, 'num', 'Rank of the kana form of the word in this list.'],
    ['reading', 'Reading', 0, 140, 'text', 'Reading, in hiragana.'],
    ['pos', 'POS', 1, 130, 'choice', 'Type of the word: noun, verb, particle…, or Proper noun / Noise (fillers, numbers, symbols; list bruits.txt).'],
    ['sub', 'Sub-POS', 1, 130, 'choice', 'Finer part of speech from MeCab: common noun, suru verb…'],
    ['count', 'Count', 0, 80, 'num', 'Times the word appears in this selection.'],
    ['pct', '%', 0, 70, 'num', 'Share of all the words of this selection.'],
    ['cum', 'Cumulative %', 0, 100, 'num', 'Reading the list down to this word, you understand this % of the text.'],
    ['spread', 'Spread', 0, 80, 'num', 'Share of the titles that contain the word (of the chosen media, or of the whole catalog).'],
    ['forms', 'Forms', 1, 160, 'text', 'The other written forms of the word found in the texts.'],
    ['meaning', 'Meaning', 1, 320, 'text', 'Short definition from your Yomitan dictionaries (Jitendex by default), as in Words to learn.'],
    ['status', 'Status', 0, 100, 'choice', 'Known if the word is in your known words (last Recalc), otherwise Not known.'],
    ['basket', 'Basket', 0, 80, null, 'Add the word to the basket to make cards.'],
    ['origin', 'Origin', 0, 80, null, 'Click to see which cards make this word Known (opens them in the Browser).'],
  ];
  const SHOWN = ['rank', 'word', 'base', 'reading', 'pos', 'count', 'pct', 'cum', 'spread', 'status', 'basket', 'origin'];

  let data = $state.raw(null); // .raw : 160 000 lignes sans proxy réactif (bien plus rapide)
  let error = $state('');
  let q = $state('');
  let exact = $state(false); // Contains / Equals
  let show = $state('learn'); // learn | known | all
  let media = $state('');
  let group = $state('kanji');
  let subs = $state('particles');
  let order = $state(ALL.map((c) => c[0])); // ordre de toutes les colonnes (glisser les en-têtes)
  let off = $state(ALL.map((c) => c[0]).filter((k) => !SHOWN.includes(k)));
  const on = $derived(order.filter((k) => !off.includes(k)));
  let result = $state([]); // lignes filtrées et triées, toutes pages (Export)
  let fileMsg = $state('');
  let colsOpen = $state(false);
  let filters = $state({});
  let page = $state(1);
  let basket = $state([]);
  const saveUi = () => py('save_ui', { ...ui, basket, vocab: { ...(ui.vocab || {}) } });
  const bid = (r) => r.rid ?? r.id;
  const inBasket = (r) => basket.some((o) => o.id === bid(r));
  function toggleBasket(r) {
    const i = basket.findIndex((o) => o.id === bid(r));
    basket = i >= 0 ? basket.filter((_, j) => j !== i)
      : [...basket, { from: 'words', id: bid(r), word: r.word, pos: r.pos_label || r.pos, sublab: r.sub || '', title: media || '', rank: r.rank, bq: { word: r.base ?? r.word, pos: r.pos || '', sub: r.subraw && r.subraw !== '*' ? r.subraw : '' } }];
    saveUi();
  }
  const origin = (r) => py('wtl_known_source', { key: r.key || '', base: r.base, sub: r.subraw || '*' });
  // Les étiquettes du dictionnaire arrivent collées au premier sens (« aux-verbcopula; be; is ») : on les retire.
  const TAG = /^(?:(?:na|no|taru|ku|shiku|nari|pre)-adj|aux-verb|aux-adj|aux|adjectival|adjective|adverbial|adverb|nouns?|pronoun|\d-dan|ichidan|godan|suru|kuru|verb|transitive|intransitive|auxiliary|interjection|conjunction|copula|prefix|suffix|kana|polite|particle|counter|expressions?)+/i;
  const glossParts = (r) => {
    const out = [];
    String(r.meaning || '').split(/;\s*/).filter(Boolean).forEach((g, i) => {
      if (i < 2) { const rest = g.replace(TAG, '').trim(); if (rest !== g) { if (rest) out.push(rest); return; } }
      out.push(g);
    });
    return out;
  };
  // Filtres actifs : une puce par filtre
  const chips = $derived(
    Object.entries(filters).filter(([, v]) => v != null && v !== '' && !(Array.isArray(v) && !v.length)).map(([k, v]) => {
      const c = byKey[k];
      return { k, text: (c ? c[1] : k) + ' : ' + (Array.isArray(v) ? v.join(', ') : v) };
    }),
  );
  const clearFilter = (k) => { const f = { ...filters }; delete f[k]; filters = f; page = 1; };
  const clearAll = () => { filters = {}; page = 1; };
  let marks = $state([]); // statuts changés à la main (appliqués au prochain Recalc)

  const GROUPS = [
    ['script', 'By script', 'One line per script: kanji, hiragana, katakana.', '素敵 · すてき · ステキ → 3 lines'],
    ['kana', 'By kana', 'One line for the kanji, one line for all the kana (hiragana + katakana).', '素敵 · すてき+ステキ → 2 lines'],
    ['kanji', 'By kanji, if more frequent', 'The kanji line takes the kana only when the kanji spelling is the most frequent; otherwise the lines stay separate. If you know 素敵, すてき and ステキ count as known.', 'kanji most frequent → 1 line · kana most frequent → 2 or 3 lines'],
    ['kanjiall', 'By kanji, always', 'The kanji line always takes the kana, whatever their frequency.', '素敵+すてき+ステキ → 1 line (2 lines if the word has no kanji form)'],
    ['word', 'By word', 'One line per word: the most frequent spelling, with all the others counted in it.', 'すてき (the most frequent) → 1 line'],
  ];
  const SUBS = [['particles', 'Particles only'], ['all', 'All words'], ['none', 'None']];
  const groupLabel = $derived((GROUPS.find((g) => g[0] === group) || GROUPS[2])[1] + ' · ' + (SUBS.find((x) => x[0] === subs) || SUBS[0])[1].toLowerCase());

  // Fenêtre Grouping
  let gOpen = $state(false), gGroup = $state('kanji'), gSubs = $state('particles'), gNote = $state('');
  const gStart = () => { gGroup = group; gSubs = subs; gNote = ''; gOpen = true; };
  const gApply = () => { gOpen = false; group = gGroup; subs = gSubs; load(); };
  const gSettings = async () => {
    const r = await py('ms_save', { options: { Option_MatchWritten: gGroup, Option_MatchSubPos: gSubs } });
    gNote = r && r.error ? r.error : 'Copied to Settings. Run Recalc to apply.';
  };

  const label = (k) => (data && data.labels && data.labels[k]) || k;
  const markOf = (r) => { const m = marks.find((x) => x.key === r.key && x.base === r.base && x.sub === r.subraw); return m ? m.state : null; };
  const isKnown = (r) => { const m = markOf(r); return m ? m === 'known' : r.status === 'known'; };
  async function toggleStatus(r) {
    const want = isKnown(r) ? 'unknown' : 'known', base = r.status === 'known' ? 'known' : 'unknown';
    marks = (await py('word_mark', { key: r.key, base: r.base, sub: r.subraw, state: want === base ? null : want })) || marks;
    window.dispatchEvent(new Event('focus'));
  }

  const getters = {
    pos: (r) => (r.cat === 'noise' ? r.pos_label : label(r.cat) || r.pos_label),
    status: (r) => (r.nc ? 'Ignored' : isKnown(r) ? 'Known' : 'Not known'),
  };
  const shows = {
    rank: (r) => (r.covered ? '→ ' + r.covered : num(r.rank, 0)),
    rank_kanji: (r) => (r.rank_kanji ? num(r.rank_kanji, 0) : '–'),
    rank_kana: (r) => (r.rank_kana ? num(r.rank_kana, 0) : '–'),
    count: (r) => num(r.count, 0),
    pct: (r) => num(r.pct, 2),
    cum: (r) => num(r.cum, 1),
    spread: (r) => num(r.spread, 1) + ' %',
    forms: (r) => (r.forms || []).join('・'),
    status: (r) => getters.status(r) + (markOf(r) ? ' ●' : ''),
  };
  const byKey = Object.fromEntries(ALL.map((c) => [c[0], c]));
  const columns = $derived(
    on.map((key) => {
      const [, lbl, left, width, filter, tip] = byKey[key];
      return {
        key, label: lbl, left: !!left, width, filter, tip, get: getters[key], show: shows[key],
        jp: ['word', 'base', 'reading', 'forms'].includes(key),
        big: ['word', 'base', 'reading'].includes(key),
        parts: key === 'meaning' ? glossParts : null,
        btn: key === 'basket' ? (r) => ({ label: inBasket(r) ? '✓ In' : '＋', on: inBasket(r) }) : key === 'origin' ? (r) => (isKnown(r) && !r.nc ? { label: 'Origin' } : null) : null,
        cls: key === 'status' ? (r) => (isKnown(r) ? 'known' : 'new') : null,
        title: key === 'status' ? (r) => (markOf(r) ? 'Marked by you: applied at the next Recalc. Click to change.' : 'Click to mark it ' + (isKnown(r) ? 'Not known' : 'Known') + ' (applied at the next Recalc).') : null,
        onclick: key === 'status' ? (r) => !r.nc && toggleStatus(r) : key === 'basket' ? toggleBasket : key === 'origin' ? origin : null,
      };
    }),
  );
  const rows = $derived(
    data && data.rows ? data.rows.filter((r) => show === 'all' || (show === 'known') === (r.status === 'known')) : [],
  );

  function load(keep = false) {
    if (!keep) data = null; // keep : la liste reste affichée pendant qu'on va chercher une colonne de plus
    error = '';
    py('words', { mode: 'both', subs, cat: '', q: q.trim(), qcol: '', exact, group, media, limit: 1000, meaning: on.includes('meaning'), cols: [...on] });
  }
  let tm;
  const typed = () => { clearTimeout(tm); tm = setTimeout(() => load(), 400); };
  $effect(() => onPy(({ kind, data: d }) => {
    if (kind === 'words') d && d.error ? (error = d.error) : (data = d);
  }));
  // Comme l'ancienne page : format des nombres, statuts marqués, réglages Grouping de Settings, puis la liste.
  Promise.all([loadUi().then((u) => { basket = (u && u.basket) || []; }), py('word_marks').then((m) => (marks = m || [])), py('ms_info').then((m) => {
    const o = m && m.options;
    if (!o) return;
    subs = o.Option_MatchSubPos === true ? 'all' : o.Option_MatchSubPos === false ? 'none' : o.Option_MatchSubPos || 'particles';
    group = GROUPS.some((g) => g[0] === o.Option_MatchWritten) ? o.Option_MatchWritten : 'kanji';
  })]).finally(() => load());

  function toggleCol(k) {
    const hide = !off.includes(k);
    off = hide ? [...off, k] : off.filter((x) => x !== k);
    if (!hide && data && data.cols && !data.cols.includes(k)) load(true); // colonne pas encore envoyée par Python
  }
  function reorder(from, to) {
    const rest = order.filter((k) => k !== from), i = rest.indexOf(to);
    rest.splice(order.indexOf(from) > order.indexOf(to) ? i : i + 1, 0, from);
    order = rest;
  }
  const cellText = (c, r) => String(c.show ? c.show(r) : c.get ? c.get(r) ?? '' : r[c.key] ?? '');
  async function exportList() {
    fileMsg = '';
    const name = 'MorphMan words - ' + (media || 'all media') + ' - ' + group + ' - ' + { learn: 'not known', known: 'known', all: 'all' }[show];
    const r = await py('wtl_words_export', { name, header: columns.map((c) => c.label), rows: result.map((row) => columns.map((c) => cellText(c, row))) });
    if (r && r.error) fileMsg = r.error;
  }
  async function openFile() {
    fileMsg = '';
    const r = await py('words_file', { media, group });
    if (r && r.error) fileMsg = r.error;
  }
  const browse = (r, c, e) =>
    py('wtl_browser', { word: c.key === 'base' ? r.base : r.word, pos: r.pos, sub: r.subraw === '*' ? '' : r.subraw, wide: e.shiftKey });
</script>

<div class="bar">
  <div class="sec"><span class="lab">Source</span>
    <select class="msel" bind:value={media} onchange={() => load()} title="The master frequency list of the whole catalog, or of one type of media (its own ranks and counts).">
      <option value="">All media</option>
      {#each (data && data.all_media) || [] as m}<option value={m}>{m}</option>{/each}
    </select>
    <button class="btn sm" onclick={gStart} title="How the list groups the written forms and the sub-types">⚙ Grouping: {groupLabel}</button>
  </div>
  <div class="sec"><span class="lab">Status</span>
    <Segmented bind:value={show} options={[['learn', 'Not known'], ['known', 'Known'], ['all', 'All']]} />
  </div>
  <div class="sec"><span class="lab">Search</span>
    <input class="search" placeholder="Search a word…" bind:value={q} oninput={typed} onkeydown={(e) => e.key === 'Enter' && load()} />
    <Segmented bind:value={exact} options={[[false, 'Contains'], [true, 'Equals']]} title="Search mode" onchange={() => q.trim() && load()} />
  </div>
  <span class="grow"></span>
  <button class="btn sm" onclick={() => (colsOpen = !colsOpen)}>▦ Columns</button>
  <button class="btn sm" onclick={exportList} title="Saves the list as shown (filters, sort, columns and the settings above), all pages, to a tab-separated file (Excel, Google Sheets)">⬇ Export…</button>
  <button class="btn sm" onclick={openFile} title="Opens the master list file of this selection (All the catalog, or the chosen media)">📂 Open file</button>
  {#if colsOpen}
    <div class="cgone" onclick={() => (colsOpen = false)} role="presentation"></div>
    <div class="cols card">
      {#each order as k}
        <label><input type="checkbox" checked={!off.includes(k)} onchange={() => toggleCol(k)} /> {byKey[k][1]}</label>
      {/each}
    </div>
  {/if}
</div>
{#if chips.length}
  <div class="chips">
    <span class="m small">Filters:</span>
    {#each chips as c}<button class="chip" onclick={() => clearFilter(c.k)} title="Remove this filter">{c.text} ✕</button>{/each}
    <button class="btn sm" onclick={clearAll}>Clear all filters</button>
  </div>
{/if}
{#if fileMsg}<div class="m small pad">{fileMsg}</div>{/if}

{#if gOpen}
  <div class="gback" onclick={() => (gOpen = false)} role="presentation"></div>
  <div class="gwin">
    <h3>Grouping of the list</h3>
    <div class="gs"><b>Written forms</b><div class="m small">How the spellings of a word are listed. Example: 素敵 / すてき / ステキ.</div>
      {#each GROUPS as [v, t, d, ex]}
        <label class="opt"><input type="radio" bind:group={gGroup} value={v} /><span><b>{t}</b><br /><span class="m small">{d}<br />{ex}</span></span></label>
      {/each}
    </div>
    <div class="gs"><b>Separate by sub-type</b><div class="m small">Lists the same word several times by its Sub-POS (の: case particle / nominalizing / sentence-ending).</div>
      {#each SUBS as [v, t]}<label class="opt"><input type="radio" bind:group={gSubs} value={v} /><span>{t}</span></label>{/each}
    </div>
    <div class="m small">These two choices only change how this list is shown. They do not change the database or your cards: Recalc uses the choices in Settings.</div>
    {#if gNote}<div class="m small">{gNote}</div>{/if}
    <div class="gft">
      <button class="btn" onclick={gSettings} title="Copies these two choices to Settings (Recalc will use them).">Use in Settings too</button>
      <span class="grow"></span>
      <button class="btn" onclick={() => (gOpen = false)}>Cancel</button><button class="btn pri" onclick={gApply}>Apply</button>
    </div>
  </div>
{/if}

{#if error}
  <div class="m pad">{error}</div>
{:else if !data}
  <div class="m pad">Loading words…</div>
{:else}
  <DataTable {rows} {columns} noun="words" bind:filters bind:page bind:result oncelldblclick={browse} onreorder={reorder} />
{/if}

<style>
  .bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; position: relative; margin-bottom: 8px; background: var(--p); border: 1px solid var(--l); border-radius: 12px; padding: 6px 8px; }
  .sec { display: flex; align-items: center; gap: 8px; background: var(--p2); border-radius: 10px; padding: 4px 8px; }
  .lab { font-size: 10.5px; text-transform: uppercase; letter-spacing: .06em; color: var(--m); }
  .chips { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
  .chip { background: var(--p2); color: var(--t); border: 1px solid var(--a); border-radius: 12px; padding: 2px 10px; font-size: 12px; cursor: pointer; }
  .search { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; width: 220px; }
  .msel { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; }
  .grow { flex: 1; }
  .cgone { position: fixed; inset: 0; z-index: 9; }
  .cols { position: absolute; right: 0; top: 46px; z-index: 10; background: var(--p); border: 1px solid var(--l); border-radius: 10px; padding: 8px 12px; display: grid; gap: 4px; }
  .pad { padding: 6px 0; }
  .gback { position: fixed; inset: 0; z-index: 30; background: #0008; }
  .gwin { position: fixed; z-index: 31; left: 50%; top: 60px; transform: translateX(-50%); width: min(560px, 92vw); max-height: 80vh; overflow: auto; background: var(--p); border: 1px solid var(--l); border-radius: 12px; padding: 16px; display: grid; gap: 12px; }
  .gwin h3 { margin: 0; }
  .gs { display: grid; gap: 6px; }
  .opt { display: flex; gap: 8px; align-items: flex-start; cursor: pointer; }
  .gft { display: flex; gap: 6px; align-items: center; }
</style>
