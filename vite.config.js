import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import site from './site.config.js'

const pages = ['index', 'install', 'cli', 'terms', 'privacy']

// <!--@include name--> pulls in src/partials/name.html; {{KEY}} comes from site.config.js.
function htmlTemplate() {
  return {
    name: 'html-template',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const withPartials = html.replace(/<!--@include (\w+)-->/g, (_, name) =>
          readFileSync(resolve(__dirname, `src/partials/${name}.html`), 'utf8'))
        return withPartials.replace(/\{\{(\w+)\}\}/g, (m, key) => {
          if (!(key in site)) throw new Error(`Unknown site key ${m}`)
          return site[key]
        })
      },
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [htmlTemplate()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(p => [p, resolve(__dirname, `${p}.html`)])),
    },
  },
})
