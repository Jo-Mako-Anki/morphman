<!-- Fenêtre de filtre unique pour les 3 types : num, text, choice.
     onapply(valeur) : valeur = chaîne (num/text), tableau (choice), ou null pour effacer. -->
<script>
  let { kind, title = '', x = 0, y = 0, value = null, values = [], onapply, onclose } = $props();

  const width = kind === 'num' ? 230 : 260;
  const left = Math.max(4, Math.min(x, window.innerWidth - width - 8));
  const done = (v) => { onapply(v); onclose(); };

  // num
  const m = String(value || '').replace(/\s/g, '').match(/^(>=|<=|>|<|=)?(-?[\d.,]+)$/);
  let op = $state(m ? m[1] || '=' : '>');
  let text = $state(kind === 'num' ? (m ? m[2] : value || '') : value || '');
  // choice
  let sel = $state(Array.isArray(value) ? [...value] : values.map((v) => v[0]));
  let q = $state('');
  const shown = $derived(values.filter(([v]) => !q || (v || '(blank)').toLowerCase().includes(q.trim().toLowerCase())));

  function ok() {
    if (kind === 'choice') return done(!sel.length || sel.length >= values.length ? null : values.map((v) => v[0]).filter((v) => sel.includes(v)));
    const v = text.trim();
    if (!v) return done(null);
    done(kind === 'num' && !/^(>=|<=|>|<|=)/.test(v) && !/[-,]/.test(v.slice(1)) ? op + v : v);
  }
  const key = (e) => { if (e.key === 'Enter') { e.preventDefault(); ok(); } else if (e.key === 'Escape') onclose(); };
  const focus = (n) => n.focus();
</script>

<div class="nfback" onclick={onclose} oncontextmenu={(e) => { e.preventDefault(); onclose(); }} role="presentation"></div>
<div class="nfpop" style="left:{left}px;top:{y + 8}px;width:{width}px" onkeydown={key} role="dialog" tabindex="-1">
  {#if kind !== 'choice'}<div class="nft">{title}</div>{/if}

  {#if kind === 'num'}
    <div class="row">
      <select bind:value={op}>{#each ['>', '<', '>=', '<=', '='] as o}<option>{o}</option>{/each}</select>
      <input bind:value={text} placeholder="0" use:focus />
    </div>
  {:else if kind === 'text'}
    <input bind:value={text} placeholder="Search…" use:focus />
  {:else}
    {#if values.length > 20}<input bind:value={q} placeholder="Search…" use:focus />{/if}
    <div class="nfl">
      {#each shown as [v, n]}
        <label><input type="checkbox" checked={sel.includes(v)} onchange={(e) => (sel = e.currentTarget.checked ? [...sel, v] : sel.filter((s) => s !== v))} /><span>{v || '(blank)'}</span><i>{n}</i></label>
      {/each}
    </div>
  {/if}

  <div class="nfb">
    {#if kind === 'choice'}
      <button type="button" onclick={() => (sel = values.map((v) => v[0]))}>All</button>
      <button type="button" onclick={() => (sel = [])}>None</button>
    {:else}
      <button type="button" onclick={() => done(null)}>Clear</button>
    {/if}
    <span></span>
    <button type="button" class="pri" onclick={ok}>Apply</button>
  </div>
</div>

<style>
  .nfback { position: fixed; inset: 0; z-index: 20; }
  .nfpop { position: fixed; z-index: 21; background: var(--p); border: 1px solid var(--a); border-radius: 10px; padding: 10px; box-shadow: 0 8px 24px #0009; }
  .nft { color: var(--m); margin-bottom: 6px; }
  .row { display: flex; gap: 6px; }
  select, input:not([type]) { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 6px; padding: 5px 8px; box-sizing: border-box; }
  .row input { flex: 1; min-width: 0; }
  .nfpop > input { width: 100%; margin-bottom: 6px; }
  .nfl { max-height: 300px; overflow: auto; }
  .nfl label { display: flex; align-items: center; gap: 8px; padding: 4px 2px; cursor: pointer; }
  .nfl span { flex: 1; }
  .nfl i { color: var(--m); font-style: normal; font-size: 12px; }
  .nfb { display: flex; gap: 6px; border-top: 1px solid var(--l); margin-top: 6px; padding-top: 8px; }
  .nfb span { flex: 1; }
  .nfb button { background: var(--p2); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 4px 10px; font-size: 12px; cursor: pointer; }
  .nfb button.pri { background: var(--a); color: #0c1020; border-color: var(--a); font-weight: 700; }
</style>
