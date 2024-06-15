<script lang='ts'>
  import {
    PrevisualizacionEntrada,
    PrevisualizacionAnuncio,
  } from '../../../models/previsualizacion.ts';

  import { anchorFunction } from '../../../services/shared/utils_web.js';

  export let previsualizacion: PrevisualizacionEntrada;
</script>

<div class="preview-box">
  {#if previsualizacion}
    {#if previsualizacion.tipo_entrada == 'ANUNCIO'}
      <div class="anuncio {previsualizacion.medida}">
        <button
          class="boton-cerrar"
          on:click={() => {}}
        >
          <img class="icono_cerrar" src="icons/utils/x_mark.svg" />
        </button>

        <button
          class="boton-continuar"
          on:click={() => anchorFunction(previsualizacion.enlace, false)}
        >
          <img class="icono_continuar" src="icons/utils/play.svg" />
        </button>

        <img class="anuncio-imagen" src={previsualizacion.imagen}/>
      </div>
    {/if}
  {/if}
</div>

<style>
  .preview-box {
    width: calc(100% - 60px);
    margin: 5px;
    padding: 5px 10px;
    background-color: #555;
    border-radius: 10px;
    position: relative;
  }

  .anuncio {
    width: auto;
    display: flex;
    position: relative;
  }

  .anuncio.\33x1 {
  }

  .anuncio.\32x1 {
  }

  .anuncio.\31x1 {
  }

  .anuncio-imagen {
    width: 100%;
  }

  .anuncio.\32x1 .boton-cerrar {
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    width: 25px;
    height: 25px;
    color: white;
    cursor: pointer;
  }

  .anuncio.\32x1 .boton-continuar {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: #fe6;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    color: white;
    cursor: pointer;
    padding: 5px 4px 3px 7px;
  }

  .icono_continuar {
    width: calc(100% - 10px);
  }
</style>