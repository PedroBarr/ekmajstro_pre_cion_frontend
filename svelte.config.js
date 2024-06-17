import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  base: "./ekmajstro_pre_cion_frontend/",
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      //base: ''
      base: "/ekmajstro_pre_cion_frontend",
      //base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    }
  }
}
