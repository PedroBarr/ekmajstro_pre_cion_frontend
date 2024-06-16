<script lang='ts'>
  // exportar dependencias
  export let previsualizacion: PrevisualizacionEntrada;

  // importar dependencias propias
  import {
    PrevisualizacionEntrada,
    PrevisualizacionAnuncio,
    PrevisualizacionPrevisualizacion,
  } from '../../../models/previsualizacion.ts';

  import { anchorFunction } from '../../../services/shared/utils_web.js';
</script>

<div class="preview-box">
  {#if previsualizacion}
    {#if previsualizacion.tipo_entrada == 'ANUNCIO'}
      <div class="anuncio {previsualizacion.medida}">
        <button
          class="boton-cerrar"
          on:click={() => {}}
        >
          <img
            class="icono_cerrar"
            src="icons/utils/x_mark.svg"
            alt="Boton cerrar anuncio"
          />
        </button>

        <button
          class="boton-continuar"
          on:click={() => anchorFunction(previsualizacion.enlace, false)}
        >
          <img
            class="icono_continuar"
            src="icons/utils/play.svg"
            alt="Boton seguir anuncio"
          />
        </button>

        <img
          class="anuncio-imagen"
          src={previsualizacion.imagen}
          alt="Imagen anuncio"
        />
      </div>
    {/if}

    {#if previsualizacion.tipo_entrada == 'PREVISUALIZACION'}
      <div class="previsualizacion {previsualizacion.medida}">
        <button
          class="boton-cerrar"
          on:click={() => {}}
        >
          <img
            class="icono_cerrar"
            src="icons/utils/x_mark.svg"
            alt="Boton cerrar anuncio"
          />
        </button>

        <button
          class="boton-continuar"
          on:click={() => anchorFunction(previsualizacion.enlace, false)}
        >
          <img
            class="icono_continuar"
            src="icons/utils/play.svg"
            alt="Boton seguir anuncio"
          />
        </button>

        <img
          class="anuncio-imagen"
          src={previsualizacion.imagen}
          alt="Imagen anuncio"
        />
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