import { mount } from 'svelte';
import './lib/theme.css';
import App from './App.svelte';

// Anki peut charger app.js avant <div id="app"> : on attend la page.
const start = () => mount(App, { target: document.getElementById('app') });
document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', start) : start();
