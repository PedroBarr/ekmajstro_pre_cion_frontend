<script>
  // importar componentes
  import FrameSite from './lib/components/core/FrameSite.svelte';

  // importar dependencias nativas
  import { onMount } from 'svelte';
  import { Router, Route } from 'svelte-routing';

  // importar dependencias propias
  import { api, base } from './assets/static/code/app';

  // importar paginas
  import SearchPage from './lib/pages/core/SearchPage.svelte'
  import PostPage from './lib/pages/core/PostPage.svelte'
  import Ignota from './lib/pages/core/404Page.svelte'

  // variables
  let consigna = '';
  let tipos_recurso = [];
  let trazabilidad_social = [];

  function setConsigna(nuevaConsigna) {
    consigna = nuevaConsigna;
  }

  function irAPagina(url = '/') {
    window.location.href = url;
  }

  onMount(
    async ( ) => {
      /*
       * Asignar lista de tipos recurso
       */
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

      /*
       * Asignar lista de trazabilidad
       */
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

  <Router>
    <div class='main'>
      <Route path="/">
        <SearchPage
          { setConsigna }
        />
      </Route>

      <Route path="{base}/publicacion/:id" let:params>
        <PostPage
          id="{params.id}"
          { setConsigna }
          trazaIgnota="{() => irAPagina('/404')}"
        />
      </Route>

      <Route path="{base}/acerca_de">
        <PostPage
          id="acerca_de"
          { setConsigna }
        />
      </Route>
      
      <Route default>
        <Ignota
          retorno="{() => irAPagina()}"
        />
      </Route>
    </div>
  </Router>

</main>

<style>

  .main {
    --margin-main-sides: 30px;
    margin: 60px var(--margin-main-sides) 0;
    width: calc(100% - 60px);
    height: auto;
  }

</style>