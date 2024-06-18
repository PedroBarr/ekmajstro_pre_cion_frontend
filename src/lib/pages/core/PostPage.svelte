<script lang='ts'>
  // exportar dependencias
  export let id;

  // importar dependencias nativas
  import { onMount } from 'svelte';

  // importar dependencias propias
  import { api } from '../../../assets/static/code/app.js';

  // importar componentes
  import TagLineViewer from '../../components/features/feature_publicacion/TagLineViewer.svelte';


  let portada, etiquetas;

  onMount(
    async ( ) => {
      /*
       * Obtener publicacion
       */
      fetch(api + '/entrada/' + id)
        .then(response => response.json() )
        .then(data => {
          console.log(data);

          if (data) {
            if (data.portada) {
              portada = data.portada;
            }

            if (data.etiquetas) {
              etiquetas = data.etiquetas;
            }
          }
        });
    }
  );
</script>

<div class="container">
  {#if portada}
  <div class="portada-envoltura">
    <button
      class="boton-portada"
    >
      <img
        alt="Portada de la publicacion "
        class="imagen-portada"
        src={ portada }
      />
    </button>
  </div>
  {/if}

  {#if etiquetas}
    <TagLineViewer
      { etiquetas }
    />
  {/if}
</div>

<style>
  .container {
    width: 100%;
    margin-bottom: 45px;
  }

  .portada-envoltura {
    width: 100%;
    height: 50vh;
    overflow: hidden;

    display: flex;
    align-items: center;
  }

  .boton-portada {
    border: none;
    padding: 0;
    cursor: grab;
  }

  .imagen-portada {
    width: 100%;
    height: fit-content;
  }
</style>
