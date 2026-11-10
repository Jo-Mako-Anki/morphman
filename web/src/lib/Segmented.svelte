<!-- Contrôle segmenté : boutons collés, un seul actif (Not known / Known / All, Contains / Equals…). -->
<script>
  let { options = [], value = $bindable(), onchange = null, title = '' } = $props();
</script>

<div class="seg" role="group" {title}>
  {#each options as [v, t]}
    <button type="button" class:on={value === v} onclick={() => { value = v; onchange && onchange(v); }}>{t}</button>
  {/each}
</div>

<style>
  .seg { display: inline-flex; border: 1px solid var(--l); border-radius: 10px; background: var(--p); overflow: hidden; }
  button { background: none; border: 0; border-left: 1px solid var(--l); color: var(--t); padding: 6px 14px; font: inherit; cursor: pointer; }
  button:first-child { border-left: 0; }
  button:hover { background: var(--p2); }
  button.on { background: var(--a); color: #fff; }
</style>
