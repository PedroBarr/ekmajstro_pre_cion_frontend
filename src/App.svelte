<script>
  import icono from './assets/ekmajstro.svg';
  import Counter from './lib/Counter.svelte';
  import { onMount } from 'svelte';
  import { api } from './lib/app.js';

  let datosObtenidos = '';

  onMount(
    async ( ) => {
      fetch(api)
        .then(response => response.json() )
        .then(data => {
          datosObtenidos = data;
        });
    }
  );
</script>

<main>
  <div>
    <a
        href={api}
        target="_blank"
        rel="noreferrer"
      >
      <img
        src={icono}
        class="logo"
        alt="Icono" />
    </a>
  </div>
  <h1>{ datosObtenidos }</h1>

  <div class="card">
    <Counter/>
  </div>

  <p>
    Cliquee el icono de Ekmajstro Pre Cion para ir al api.
  </p>

  <p class="read-the-docs">
    O acceda al
    <a
        href="https://github.com/PedroBarr/ekmajstro_pre_cion_frontend#readme"
        target="_blank"
        rel="noreferrer">
      repositorio
    </a>
    con la documentacion.
  </p>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #fa5a65aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
