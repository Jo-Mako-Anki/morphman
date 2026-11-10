<!-- Coquille : onglets de pages. Les pages pas encore réécrites restent dans l'ancien app.js. -->
<script>
  import Vocabulary from './pages/Vocabulary.svelte';
  let tab = $state('words');
  const TABS = [['words', 'Vocabulary']];
</script>

<nav>
  {#each TABS as [k, t]}<button class="btn sm" class:on={tab === k} onclick={() => (tab = k)}>{t}</button>{/each}
</nav>
<main>
  {#if tab === 'words'}<Vocabulary />{/if}
</main>

<style>
  nav { display: flex; gap: 6px; padding: 10px 16px; border-bottom: 1px solid var(--l); }
  nav .on { background: var(--a); color: #0c1020; border-color: var(--a); }
  main { padding: 12px 16px; }
</style>
