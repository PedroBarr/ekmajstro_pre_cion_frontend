<script lang="ts">
  // exportar dependencias
  export let seccion;

  let segmentos;

  const obtenerClaseSegm = (segmento: any) =>
    segmento.segm_medida + ' segmento-contenido';

  function obtenerContenidoSegm (segmento: any) {
    return JSON.parse(segmento.segm_contenido);
  }

  $: if (seccion) {
    segmentos = (seccion.segmentos || [])
      .sort((segmento_1: any, segmento_2: any) =>
        segmento_1.segm_posicion - segmento_2.segm_posicion
      )
    ;
  }
</script>

<div class="segmento-contenedor">
  {#each segmentos as segmento}
    <div class={obtenerClaseSegm(segmento)}>
      {#if obtenerContenidoSegm(segmento).tipo == 'texto'}
        <div class="segmento-contenido-texto">
          {obtenerContenidoSegm(segmento).contenido}
        </div>
      {:else if obtenerContenidoSegm(segmento).tipo == 'imagen'}
        <div class="segmento-contenido-imagen-envoltura">
          <img
            class="segmento-contenido-imagen"
            src={obtenerContenidoSegm(segmento).contenido}
            alt="Imagen de la publicacion"
          />
        </div>
      {:else}
        {obtenerContenidoSegm(segmento)}
      {/if}
    </div>
  {/each}
</div>

<style>

  .segmento-contenedor {
    --gap: 10px;

    width: 100%;
    display: flex;

    flex-direction: row;
    flex-wrap: wrap;

    row-gap: 0px;
    column-gap: var(--gap);
  }

  .segmento-contenido {
    --padding-sides: 10px;
    padding: 15px 10px;
  }

  .segmento-contenido.\31-col {
    width: 100%;
  }

  .segmento-contenido.\32-col {
    width: calc(50% - var(--gap) / 2 - var(--padding-sides) * 2);
  }

  .segmento-contenido-texto {
    width: 100%;

    font-family: sans-serif;
    font-size: 15px;

    color: white;
  }

  .segmento-contenido-imagen-envoltura {
    width: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
  }

  .segmento-contenido-imagen {
    max-width: 80%;
  }

</style>