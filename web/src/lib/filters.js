// Les 3 types de filtre de colonne, en un seul endroit.
//   num    : "100", ">5", "<=3", "100-500", "<500, >=3" (liste = OU)
//   text   : contient (sans casse)
//   choice : valeur dans la liste cochée
// Une colonne : { key, label, filter: 'num'|'text'|'choice', get?: row => valeur }

export const valueOf = (col, row) => (col.get ? col.get(row) : row[col.key]);

const toNum = (s) => Number(String(s).replace(',', '.'));

export function numTest(expr) {
  const parts = String(expr).replace(/\s/g, '').split(/[;,](?=[<>=\d-])/).filter(Boolean);
  const tests = parts.map((p) => {
    let m = p.match(/^(-?[\d.]+)-(-?[\d.]+)$/);
    if (m) { const a = toNum(m[1]), b = toNum(m[2]); return (v) => v >= a && v <= b; }
    m = p.match(/^(>=|<=|>|<|=)?(-?[\d.,]+)$/);
    if (!m) return () => true;
    const n = toNum(m[2]);
    switch (m[1]) {
      case '>': return (v) => v > n;
      case '<': return (v) => v < n;
      case '>=': return (v) => v >= n;
      case '<=': return (v) => v <= n;
      default: return (v) => v === n;
    }
  });
  return (v) => v != null && v !== '' && !isNaN(+v) && tests.some((t) => t(+v));
}

// state : { [key]: valeur du filtre } ; num/text -> chaîne, choice -> tableau des valeurs gardées
export function applyFilters(rows, columns, state) {
  const active = columns.filter((c) => c.filter && state[c.key] != null && state[c.key] !== '');
  if (!active.length) return rows;
  const tests = active.map((c) => {
    const f = state[c.key];
    if (c.filter === 'num') { const t = numTest(f); return (r) => t(valueOf(c, r)); }
    if (c.filter === 'choice') { const s = new Set(f); return (r) => s.has(String(valueOf(c, r) ?? '')); }
    const q = String(f).toLowerCase();
    return (r) => String(valueOf(c, r) ?? '').toLowerCase().includes(q);
  });
  return rows.filter((r) => tests.every((t) => t(r)));
}

// Valeurs distinctes d'une colonne "choice", avec leur nombre : [[valeur, n], ...]
export function choiceValues(rows, col) {
  const cnt = new Map();
  rows.forEach((r) => { const v = String(valueOf(col, r) ?? ''); cnt.set(v, (cnt.get(v) || 0) + 1); });
  return [...cnt].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'ja'));
}

export function sortRows(rows, columns, sort) {
  if (!sort || !sort.key) return rows;
  const col = columns.find((c) => c.key === sort.key);
  if (!col) return rows;
  const num = col.filter === 'num' || col.sort === 'num';
  return [...rows].sort((a, b) => {
    const x = valueOf(col, a), y = valueOf(col, b);
    if (x == null || x === '') return 1;
    if (y == null || y === '') return -1;
    return (num ? x - y : String(x).localeCompare(String(y), 'ja')) * sort.dir;
  });
}
