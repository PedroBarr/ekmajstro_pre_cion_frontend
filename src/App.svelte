<script>
  import FrameSite from './lib/components/core/FrameSite.svelte';
  import { onMount } from 'svelte';
  import { api } from './assets/static/code/app.js';

  let consigna;

  function setConsigna(nuevaConsigna) {
    consigna = nuevaConsigna;
  }

  onMount(
    async ( ) => {
      fetch(api)
        .then(response => response.json() )
        .then(data => {
          setConsigna('\u269E ' + data + ' \u269F');
        });
    }
  );
</script>

<main>
  <FrameSite { consigna } />
</main>