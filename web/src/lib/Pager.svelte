<!-- Barre de pagination unique (modèle : Vocabulary / Titles).
     Rows [5..100]  « ‹  Page [n] of N  › »   a–b of total <noun> -->
<script>
  let { page = $bindable(1), per = $bindable(20), total = 0, noun = 'rows', sizes = [5, 10, 15, 20, 50, 100] } = $props();

  const pages = $derived(Math.max(1, Math.ceil(total / per)));
  const go = (p) => { page = Math.min(pages, Math.max(1, Math.round(+p) || 1)); };
  $effect(() => { if (page > pages) page = pages; });
  const first = $derived(total ? (page - 1) * per + 1 : 0);
  const last = $derived(Math.min(total, page * per));
</script>

<div class="pager">
  <span class="m">Rows</span>
  <select class="msel" bind:value={per} onchange={() => (page = 1)}>
    {#each sizes as n}<option value={n}>{n}</option>{/each}
  </select>
  <button class="btn" disabled={page <= 1} onclick={() => go(1)}>«</button><button class="btn" disabled={page <= 1} onclick={() => go(page - 1)}>‹</button>
  <span class="m">Page</span><input value={page} onchange={(e) => go(e.currentTarget.value)} /><span class="m">of {pages}</span>
  <button class="btn" disabled={page >= pages} onclick={() => go(page + 1)}>›</button><button class="btn" disabled={page >= pages} onclick={() => go(pages)}>»</button>
  <span class="m small">{first}–{last} of {total} {noun}</span>
</div>

<style>
  .pager { display: flex; align-items: center; gap: 6px; justify-content: center; margin: 12px 0; }
  .pager input { width: 56px; text-align: center; background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px; }
  .msel { background: var(--bg); color: var(--t); border: 1px solid var(--l); border-radius: 8px; padding: 5px 8px; }
  .small { margin-left: 12px; }
</style>
