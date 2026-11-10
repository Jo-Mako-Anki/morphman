import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// Build : un seul app.js + app.css dans dist/, comme l'ancien web_dist.
export default defineConfig({
  plugins: [svelte()],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'src/main.js',
      output: {
        format: 'iife',
        entryFileNames: 'app.js',
        assetFileNames: (a) => (a.name && a.name.endsWith('.css') ? 'app.css' : '[name][extname]'),
        inlineDynamicImports: true,
      },
    },
  },
});
