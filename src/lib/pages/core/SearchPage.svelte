<script lang='ts'>
  // importar componentes
  import SearchBox from '../../components/core/SearchBox.svelte';
  import PreviewContainer from '../../components/features/feature_entradas/PreviewContainer.svelte';

  // importar dependencias nativas
  import { onMount } from 'svelte';

  // importar dependencias propias
  import { api } from '../../../assets/static/code/app.js';

  import {
    PrevisualizacionEntrada,
    PrevisualizacionAnuncio,
    PrevisualizacionPrevisualizacion,
  } from '../../models/previsualizacion.ts';

  let previsualizaciones: PrevisualizacionEntrada[] = [];

  onMount(
    async ( ) => {
      fetch (api + '/entradas')
        .then(response => response.json() )
        .then(data => {
          console.log(data);

          if (data && data.length && data.length > 0) {
            previsualizaciones = data.map((previsualizacion: any) => {
              switch (previsualizacion.prev_tipo) {
                case 'ANUNCIO': return new PrevisualizacionAnuncio({
                  medida: previsualizacion.anun_medida,
                  imagen: previsualizacion.anun_img,
                  enlace: previsualizacion.anun_enlace,
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
    }
  );
</script>

<div class="container">
  <div class="search-box-wrapper">
    <div class="search-box-inner">
      <SearchBox />
    </div>
  </div>

  <div class="preview-box-container">
    <PreviewContainer
      { previsualizaciones }
    />

    <div class="pagination-container">
    </div>
  </div>
</div>

<style>

  .container {
    width: 100%;
    /*height: fit-content;*/
    margin-top: 60px;
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

</style>