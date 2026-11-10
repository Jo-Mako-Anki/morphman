<!-- Coquille temporaire : montre le tableau commun avec des données d'essai.
     Les vraies pages (Titles, Vocabulary, Browser…) viendront ici une par une. -->
<script>
  import DataTable from './lib/DataTable.svelte';

  const pos = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Particle'];
  const rows = Array.from({ length: 237 }, (_, i) => ({
    word: '語' + (i + 1), rank: (i * 37) % 5000 + 1, pos: pos[i % pos.length], count: (i * 13) % 90 + 1,
  }));
  const columns = [
    { key: 'word', label: 'Word', filter: 'text', left: true },
    { key: 'rank', label: 'Rank', filter: 'num' },
    { key: 'pos', label: 'POS', filter: 'choice' },
    { key: 'count', label: 'Count', filter: 'num' },
  ];
</script>

<main style="padding:16px">
  <DataTable {rows} {columns} noun="words" />
</main>
