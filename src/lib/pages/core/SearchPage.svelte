<script lang='ts'>
  // exportar dependencias
  export let setConsigna = (_: string) => {};

  // importar componentes
  import SearchBox from '../../components/core/SearchBox.svelte';
  import PreviewContainer from '../../components/features/feature_entradas/PreviewContainer.svelte';

  // importar dependencias nativas
  import { onMount } from 'svelte';

  // importar dependencias propias
  import { api } from '../../../assets/static/code/app';
  import { corregirEntidades } from '../../../assets/static/code/utils';

  import {
    PrevisualizacionEntrada,
    PrevisualizacionAnuncio,
    PrevisualizacionPrevisualizacion,
  } from '../../models/previsualizacion';

  let previsualizaciones: PrevisualizacionEntrada[] = [];

  const obtenerPrevisualizaciones = async (busqueda: String = '') => {
    fetch (api + '/entradas?busqueda=' + busqueda)
        .then(response => response.json() )
        .then(data => {
          console.log(data);

          if (data) {
            previsualizaciones = data.map((previsualizacion: any) => {
              switch (previsualizacion.prev_tipo) {
                case 'ANUNCIO': return new PrevisualizacionAnuncio({
                  medida: previsualizacion.anun_medida,
                  imagen: previsualizacion.anun_img,
                  enlace: previsualizacion.anun_enlace,
                  anun_id: previsualizacion.anun_id,
                });

                case 'PREVISUALIZACION': return (
                  new PrevisualizacionPrevisualizacion({
                    medida: previsualizacion.prev_medida,
                    imagen: previsualizacion.prev_img,
                    resumen: previsualizacion.prev_resumen,
                    descripcion: previsualizacion.prev_descripcion,
                    enlace: previsualizacion.prev_enlace,
                    publicacion_id: previsualizacion.pblc_id,
                    titulo: previsualizacion.pblc_titulo,
                    etiquetas: previsualizacion.pblc_etiquetas,
                    tipos_recurso: previsualizacion.pblc_tipos_recurso,
                  })
                );

                default: return new PrevisualizacionEntrada();
              }
            });
          }
        });
  };

  onMount(
    async ( ) => {
      /*
      * Actualizar consigna del sitio
      */
      fetch(api)
      .then(response => response.json() )
      .then(data => {
        setConsigna('\u269E ' + corregirEntidades(data) + ' \u269F');
      });

      obtenerPrevisualizaciones();
    }
  );
</script>

<div class="container">
  <div class="search-box-wrapper">
    <div class="search-box-inner">
      <SearchBox
        onInput={event => {
          obtenerPrevisualizaciones(event);
        }}
        disparar_al_vaciar={true}
      />
    </div>
  </div>

  <div class="preview-box-container">
    {#if previsualizaciones.length > 0}
      <PreviewContainer
        { previsualizaciones }
      />
    {:else}
      <div class="no-results">
        <p>No se encontraron resultados para la búsqueda.</p>
        <!-- Icono de interrogacion -->
        <svg
          viewBox="0 0 24 24"
          focusable="false"
          class="text-partner-icon">
          <path
            fill="currentColor"
            d="M12,2A10,10,0,1,0,22,12,10.011,10.011,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.009,8.009,0,0,1,12,20ZM11.5,
              7h1v1h-1ZM11.5,9h1v6h-1Z">
          </path>
        </svg>
      </div>
    {/if}

    <div class="pagination-container">
    </div>
  </div>
</div>

<style>

  .container {
    width: 100%;
    margin-top: 60px;
    margin-bottom: 45px;
  }

  .search-box-wrapper {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-box-inner {
    width: 80%;
    height: fit-content;
    display: flex;
    justify-content: center;
  }

  .no-results {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    font-size: 1.5rem;
    color: #888;
    letter-spacing: 3px;
    word-spacing: 2px;
    font-size: x-large;
    font-family: system-ui;
    text-transform: uppercase;
    font-style: oblique;
  }

  .no-results svg {
    transform: scale(2);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .container {
      margin-top: 30px;
      margin-bottom: 30px;
    }
    
    .search-box-wrapper {
      height: auto;
      margin-top: 30px;
    }

    .search-box-inner {
      width: 100%;
      height: auto;
    }

    .no-results {
      font-size: 1.2rem;
      letter-spacing: 2px;
      word-spacing: 1px;
      text-align: center;
    }
  }

</style>