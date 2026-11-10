// Format des nombres, comme l'ancien app.js (réglage Settings > format : décimales, virgule, milliers).
import { py } from './bridge.js';

export const format = { decimals: 2, dec: ',', thou: ' ' };
let loaded = null;
export const loadUi = () => (loaded ||= py('ui').then((u) => { if (u && u.format) Object.assign(format, u.format); return u || {}; }));

export function num(t, d = format.decimals) {
  if (t == null || t === '') return '–';
  const s = Math.abs(t).toFixed(d);
  if (+s === 100) return t < 0 ? '-100' : '100';
  const [i, f] = s.split('.');
  return (t < 0 ? '-' : '') + i.replace(/\B(?=(\d{3})+(?!\d))/g, format.thou) + (f ? format.dec + f : '');
}
