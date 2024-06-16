<script lang='ts'>
  // exportar dependencias
  export let previsualizaciones: PrevisualizacionEntrada[];

  // importar dependencias propias
  import {
    PrevisualizacionEntrada,
    PrevisualizacionAnuncio,
    PrevisualizacionPrevisualizacion,
  } from '../../../models/previsualizacion.ts';

  // importar componentes
  import PreviewBox from './PreviewBox.svelte';
</script>

<div class="preview-container-box">
  {#if previsualizaciones && previsualizaciones.length}
    {#each previsualizaciones as previsualizacion, indice}
      <div class="preview-box-wrapper {previsualizacion.medida}">
        <PreviewBox
          { previsualizacion }
        />
      </div>
    {/each}
  {/if}
</div>

<style>
  .preview-container-box {
    --espacio-intermedio: 10px;

    margin: 0;

    width: 100%;
    max-width: 100%;
    height: auto;

    display: flex;
    gap: var(--espacio-intermedio);

    flex-direction: row;
    flex-wrap: wrap;
  }

  .preview-box-wrapper {
    width: 100%;
    height: auto;

    display: flex;
    flex-direction: row;
  }

  .preview-box-wrapper.\33x1 {
    width: 100%;
  }

  .preview-box-wrapper.\32x1 {
    width: calc((200% / 3) - (var(--espacio-intermedio) / 3));
  }

  .preview-box-wrapper.\31x1 {
    width: calc((100% / 3) - (2 * var(--espacio-intermedio) / 3));
  }
</style>