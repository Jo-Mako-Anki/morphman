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
        cls: key === 'status' ? (r) => (isKnown(r) ? 'known' : 'new') : null,
        title: key === 'status' ? (r) => (markOf(r) ? 'Marked by you: applied at the next Recalc. Click to change.' : 'Click to mark it ' + (isKnown(r) ? 'Not known' : 'Known') + ' (applied at the next Recalc).') : null,
        onclick: key === 'status' ? (r) => !r.nc && toggleStatus(r) : null,
      };
    }),
  );
  const rows = $derived(
    data && data.rows ? data.rows.filter((r) => show === 'all' || (show === 'known') === (r.status === 'known')) : [],
  );

  function load() {
    data = null;
    error = '';
    py('words', { mode: 'both', subs, cat: '', q: q.trim(), qcol: '', exact, group, media, limit: 1000, meaning: on.includes('meaning'), cols: [...on] });
  }
  let tm;
  const typed = () => { clearTimeout(tm); tm = setTimeout(load, 400); };
  $effect(() => onPy(({ kind, data: d }) => {
    if (kind === 'words') d && d.error ? (error = d.error) : (data = d);
  }));
  // Comme l'ancienne page : format des nombres, statuts marqués, réglages Grouping de Settings, puis la liste.
  Promise.all([loadUi(), py('word_marks').then((m) => (marks = m || [])), py('ms_info').then((m) => {
    const o = m && m.options;
    if (!o) return;
    subs = o.Option_MatchSubPos === true ? 'all' : o.Option_MatchSubPos === false ? 'none' : o.Option_MatchSubPos || 'particles';
    group = GROUPS.some((g) => g[0] === o.Option_MatchWritten) ? o.Option_MatchWritten : 'kanji';
  })]).finally(load);

  function toggleCol(k) {
    const hide = !off.includes(k);
    off = hide ? [...off, k] : off.filter((x) => x !== k);
    if (!hide && data && data.cols && !data.cols.includes(k)) load(); // colonne pas encore envoyée par Python
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
  const summary = $derived.by(() => {
    if (!data || data.error) return '';
    let t = `${num(data.known, 0)} known · ${num(data.young, 0)} learning`;
    const need = data.learn_need, tg = Math.round((ui.titles && ui.titles.target) || 85);
    if (need && data.learn_now != null) {
      const n = need[tg];
      t += ` · Now ${num(data.learn_now, 1)} % · ${tg} %: ${n == null ? 'not reachable' : n === 0 ? 'reached' : num(n, 0) + ' words to learn'}`;
    }
    return t;
  });
  const browse = (r, c, e) =>
    py('wtl_browser', { word: c.key === 'base' ? r.base : r.word, pos: r.pos, sub: r.subraw === '*' ? '' : r.subraw, wide: e.shiftKey });
</script>

<div class="bar">
  <select class="msel" bind:value={media} onchange={load} title="The master frequency list of the whole catalog, or of one type of media (its own ranks and counts).">
    <option value="">All media</option>
    {#each (data && data.all_media) || [] as m}<option value={m}>{m}</option>{/each}
  </select>
  <button class="btn sm" onclick={gStart} title="How the list groups the written forms and the sub-types">⚙ Grouping: {groupLabel}</button>
  <Segmented bind:value={show} options={[['learn', 'Not known'], ['known', 'Known'], ['all', 'All']]} />
  <input class="search" placeholder="Search a word…" bind:value={q} oninput={typed} onkeydown={(e) => e.key === 'Enter' && load()} />
  <Segmented bind:value={exact} options={[[false, 'Contains'], [true, 'Equals']]} title="Search mode" onchange={() => q.trim() && load()} />
  <span class="grow"></span>
  <span class="m small summary">{summary}</span>
  <button class="btn sm" onclick={() => (colsOpen = !colsOpen)}>▦ Columns</button>
  <button class="btn sm" onclick={exportList} title="Saves the list as shown (filters, sort, columns and the settings above), all pages, to a tab-separated file (Excel, Google Sheets)">⬇ Export…</button>
  <button class="btn sm" onclick={openFile} title="Opens the master list file of this selection (All the catalog, or the chosen media)">📂 Open file</button>
  {#if colsOpen}
    <div class="cols card">
      {#each order as k}
        <label><input type="checkbox" checked={!off.includes(k)} onchange={() => toggleCol(k)} /> {byKey[k][1]}</label>
      {/each}
    </div>
  {/if}
</div>
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
  <DataTable {rows} {columns} noun="words" bind:result oncelldblclick={browse} onreorder={reorder} />
{/if}

<style>
  .bar { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; position: relative; margin-bottom: 8px; }
  .search { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; width: 220px; }
  .summary { white-space: nowrap; }
  .msel { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; }
  .grow { flex: 1; }
  .cols { position: absolute; right: 0; top: 34px; z-index: 10; background: var(--p); border: 1px solid var(--l); border-radius: 10px; padding: 8px 12px; display: grid; gap: 4px; }
  .pad { padding: 6px 0; }
  .gback { position: fixed; inset: 0; z-index: 30; background: #0008; }
  .gwin { position: fixed; z-index: 31; left: 50%; top: 60px; transform: translateX(-50%); width: min(560px, 92vw); max-height: 80vh; overflow: auto; background: var(--p); border: 1px solid var(--l); border-radius: 12px; padding: 16px; display: grid; gap: 12px; }
  .gwin h3 { margin: 0; }
  .gs { display: grid; gap: 6px; }
  .opt { display: flex; gap: 8px; align-items: flex-start; cursor: pointer; }
  .gft { display: flex; gap: 6px; align-items: center; }
</style>
