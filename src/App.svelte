<script>
  import FrameSite from './lib/components/core/FrameSite.svelte';
  import { onMount } from 'svelte';
  import { Router, Route, Link, link } from 'svelte-routing';
  import { api } from './assets/static/code/app.js';
  import SearchPage from './lib/pages/core/SearchPage.svelte'

  let consigna = '';
  let tipos_recurso = [];
  let trazabilidad_social = [];

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

      fetch (api + '/tipo_recursos')
        .then(response => response.json() )
        .then(data => {
            console.log(data);

            if (data && data.length && data.length > 0) {
                tipos_recurso = data.map(tipo_recurso => ({
                    nombre: tipo_recurso.tp_rec_nombre,
                    nombreArchivo: tipo_recurso.tp_rec_icon_url,
                    parametrosFuncionAludida: tipo_recurso.tp_rec_filter_key,
                }));
            }
        });

      fetch (api + '/trazabilidad/social')
        .then(response => response.json() )
        .then(data => {
            console.log(data);

            if (data && data.length && data.length > 0) {
              trazabilidad_social = data.map(social => ({
                nombre: social.soc_nombre,
                nombreArchivo: social.soc_icon_url,
                parametrosFuncionAludida: social.soc_anchor_href,
              }));
            }
        });
    }
  );
</script>

<main>
  <FrameSite
    { consigna }
    { tipos_recurso }
    { trazabilidad_social }
  />
  {location.href}
  <Router>
    <div class='main'>
      <Route path="/" component={ SearchPage } />
    </div>
  </Router>
</main>

<style>

  .main {
    position: fixed;
    top: 0;
    left: 0;
    margin: 60px 30px 0;
    width: calc(100% - 60px);
    height: fit-content;
  }

</style>