import { fileURLToPath, URL } from 'node:url'
import { copyFileSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

/**
 * GitHub Pages serves this repo under /alumni-kac-web/. Deploying to a custom
 * domain or a user page is a single change: build with VITE_BASE=/.
 */
const base = process.env.VITE_BASE ?? '/'

/**
 * GitHub Pages has no SPA rewrite. Shipping 404.html as a copy of index.html
 * makes deep links like /events/annual-meet resolve to the app.
 */
function spaFallback(): Plugin {
  return {
    name: 'khayal:spa-fallback',
    apply: 'build',
    closeBundle() {
      copyFileSync('dist/index.html', 'dist/404.html')
    },
  }
}

export default defineConfig({
  base,
  plugins: [react(), tailwindcss(), spaFallback()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
