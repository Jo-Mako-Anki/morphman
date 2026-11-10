// Données d'essai : quand la page est ouverte hors d'Anki (fichier HTML exporté), pycmd est simulé.
// Rien de réel ici : mots et chiffres inventés, juste pour juger la présentation.
const POS = [['noun', 'Noun', 'Common noun'], ['verb', 'Verb', 'Independent'], ['adj', 'Adjective', 'Independent'], ['prt', 'Particle', 'Case'], ['prt', 'Particle', 'Binding'], ['aux', 'Auxiliary verb', '']];
const rows = Array.from({ length: 400 }, (_, i) => {
  const p = POS[i % POS.length];
  return {
    id: i + 1, key: 'k' + i, base: '語' + (i + 1), word: '語' + (i + 1), reading: 'ご' + (i + 1), cat: p[0], pos: p[1], pos_label: p[1], sub: p[2], subraw: p[2] || '*',
    rank: i + 1, rank_kanji: i % 4 ? null : (i + 1) * 7, rank_kana: i + 1, count: Math.round(4e6 / (i + 3)), pct: 3.7 / (1 + i / 12), cum: Math.min(99.9, 3.8 + i * 0.24),
    spread: i % 5 ? 100 : 99.4, forms: i % 3 ? ['ゴ' + (i + 1), 'ごー'] : [], meaning: 'sample meaning ' + (i + 1) + '; example definition', status: i < 12 ? 'known' : 'new', nc: false,
  };
});
const marks = [];
const reply = {
  ui: () => ({ format: { decimals: 2, dec: ',', thou: ' ' } }),
  word_marks: () => marks,
  ms_info: () => ({ options: { Option_MatchSubPos: 'particles', Option_MatchWritten: 'kanji' } }),
  words: () => { setTimeout(() => window.onPy({ kind: 'words', data: { rows, known: 12, labels: { noun: 'Noun', verb: 'Verb', adj: 'Adjective', prt: 'Particle', aux: 'Auxiliary verb' }, all_media: ['Anime', 'Manga', 'Visual Novel'], meaning: true, cols: null } }), 150); return null; },
  word_mark: (a) => { const i = marks.findIndex((m) => m.key === a.key); i >= 0 && marks.splice(i, 1); a.state && marks.push(a); return marks; },
};
export function installMock() {
  if (window.pycmd) return;
  window.pycmd = (msg, cb) => {
    const i = msg.indexOf(':');
    const name = i < 0 ? msg : msg.slice(0, i);
    const arg = i < 0 ? {} : JSON.parse(msg.slice(i + 1));
    const r = reply[name] ? reply[name](arg) : null;
    cb && setTimeout(() => cb(r == null ? '' : JSON.stringify(r)), 0);
  };
}
