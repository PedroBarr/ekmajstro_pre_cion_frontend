import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import adapter from '@sveltejs/adapter-static';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  base: "./",
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      //base: ''
      //base: "/ekmajstro_pre_cion_frontend/",
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    }
  }
})