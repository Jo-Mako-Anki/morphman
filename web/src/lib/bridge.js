// Pont avec Python (Anki). Même contrat que l'ancien app.js :
//  py("commande:json") -> réponse JSON ; onPy(fn) reçoit les messages poussés par Python.
import { installMock } from './mock.js';
if (location.protocol === 'file:') installMock(); // page exportée, ouverte hors d'Anki

const ready = () => new Promise((ok) => {
  const wait = () => (window.pycmd ? ok() : setTimeout(wait, 30));
  wait();
});

export async function py(cmd, arg) {
  await ready();
  const msg = arg === undefined ? cmd : cmd + ':' + JSON.stringify(arg);
  return new Promise((ok) => window.pycmd(msg, (s) => ok(s ? JSON.parse(s) : null)));
}

const listeners = [];
window.onPy = (m) => listeners.forEach((f) => f(m));
export function onPy(fn) {
  listeners.push(fn);
  return () => listeners.splice(listeners.indexOf(fn), 1);
}
