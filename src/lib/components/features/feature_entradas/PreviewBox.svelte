<script lang='ts'>
  // exportar dependencias
  export let previsualizacion: PrevisualizacionEntrada, onClose;

  // importar componentes
  import TagLineViewer from '../feature_publicacion/TagLineViewer.svelte';
  import TypeLineViewer from '../feature_publicacion/TypeLineViewer.svelte';
  import DialogPreviewPost from './DialogPreviewPost.svelte';

  // importar dependencias nativas
  import { navigate } from 'svelte-routing';

  // importar dependencias propias
  import {
    PrevisualizacionEntrada,
    PrevisualizacionAnuncio,
    PrevisualizacionPrevisualizacion,
  } from '../../../models/previsualizacion';

  import { base } from '../../../../assets/static/code/app';
  import { anchorFunction } from '../../../services/shared/utils_web';

  const DURACION_MANTENIDO = 300;

  let extendido = false;
  let emergente_apertura = false;

  let es_mantenido = false;

  function conmutarExtension () {
    extendido = !extendido;
  }
  
  function conmutarAperturaEmergente () {
    emergente_apertura = !emergente_apertura;
  }

  function activarMantenido () {
    es_mantenido = true;
  }

  function desactivarMantenido () {
    es_mantenido = false;
  }

</script>

<div class="preview-box">
  {#if previsualizacion}
    {#if previsualizacion.tipo_entrada == 'ANUNCIO'}
      <div class="anuncio {previsualizacion.medida}">
        <button
          class="boton-cerrar"
          on:click={() => {
            onClose(previsualizacion.get_id());
          }}
        >
          <img
            class="icono_cerrar"
            src="icons/utils/x_mark.svg"
            alt="Boton cerrar anuncio"
          />
        </button>

        <a
          class="boton-continuar"
          href=null
          on:click={(e) => {
            e.preventDefault();
            navigate(base + previsualizacion.enlace, { replace: false });
          }}
        >
          <img
            class="icono_continuar"
            src="icons/utils/play.svg"
            alt="Boton seguir anuncio"
          />
        </a>

        <img
          class="anuncio-imagen"
          src={previsualizacion.imagen}
          alt="Imagen anuncio"
        />
      </div>
    {/if}

    {#if previsualizacion.tipo_entrada == 'PREVISUALIZACION'}
      <div
        class="previsualizacion
        {previsualizacion.medida}"
        on:dblclick={(e) => {
          e.preventDefault();
          conmutarAperturaEmergente();
        }}
      >
        <DialogPreviewPost
          bind:emergente_apertura
          id={previsualizacion.get_id()}
          enlace={previsualizacion.enlace}
        />

        <a 
          class="miniatura-envoltura"
          href=null
          on:mousedown={(e) => {
            e.preventDefault();
            activarMantenido();

            setTimeout(() => {
              if (es_mantenido) {
                conmutarAperturaEmergente();
                es_mantenido = false;
              }
            }, DURACION_MANTENIDO);
          }}
          on:click={(e) => {
            e.preventDefault();
            navigate(base + previsualizacion.enlace, { replace: false });
          }}
          on:mouseup={() => {
            desactivarMantenido();
          }}
        >
          <img
            class="miniatura-imagen"
            src={previsualizacion.imagen}
            alt="Imagen anuncio"
          />
        </a>

        {#if !extendido}
        <div class="contenedor-datos resumido">
          <div class="titulo-envoltura">
            <span class="titulo-elemento">
              {previsualizacion.titulo}
            </span>

            <a
              class="boton-continuar"
              href=null
              on:click={(e) => {
                e.preventDefault();
                navigate(base + previsualizacion.enlace, { replace: false });
              }}
            >
              <img
                class="icono_continuar"
                src="{base}/icons/utils/play.svg"
                alt="Boton seguir anuncio"
              />
            </a>
          </div>

          <div class="resumen-envoltura">
            <span class="resumen-elemento">
              {previsualizacion.resumen}
            </span>

            <button
              class="boton-extender"
              on:click={() => conmutarExtension()}
            >
              <img
                class="icono_extender"
                src="{base}/icons/utils/chevron_down.svg"
                alt="Boton extender previsualizacion"
              />
            </button>
          </div>
        </div>
        {/if}

        {#if extendido}
        <div class="contenedor-datos extendido">
          <div class="titulo-envoltura">
            <span class="titulo-elemento">
              {previsualizacion.titulo}
            </span>

            <a
              class="boton-continuar"
              href=null
              on:click={(e) => {
                e.preventDefault();
                navigate(base + previsualizacion.enlace, { replace: false });
              }}
            >
              <img
                class="icono_continuar"
                src="{base}/icons/utils/play.svg"
                alt="Boton seguir anuncio"
              />
            </a>
          </div>

          <div class="extension-envoltura">
            <span class="descripcion-elemento">
              {previsualizacion.descripcion}
            </span>

            <div class="extension-acciones">
              <button
                class="boton-extender"
                on:click={() => conmutarExtension()}
              >
                <img
                  class="icono_extender"
                  src="{base}/icons/utils/chevron_up.svg"
                  alt="Boton retraer previsualizacion"
                />
              </button>

              <button
                class="boton-prever"
                on:click={() => {}}
              >
                <img
                  on:click={conmutarAperturaEmergente}
                  on:keydown|self={conmutarAperturaEmergente}
                  class="icono_prever"
                  src="{base}/icons/utils/preview.svg"
                  alt="Boton previsualizar"
                />
              </button>
            </div>
          </div>

          <TagLineViewer
            etiquetas={previsualizacion.etiquetas}
            numOpciones=1
          />

          <TypeLineViewer
            tipos_recurso={previsualizacion.tipos_recurso}
            numOpciones=3
          />
        </div>
        {/if}

      </div>
    {/if}
  {/if}
</div>

<style>
  .preview-box {
    --medida-boton: 30px;

    position: relative;
    margin: 5px;
    padding: 5px 10px;

    width: calc(100%);
    display: flex;

    background-color: #555;
    border-radius: 10px;
  }

  .preview-box:has(> .anuncio) {
    background-color: transparent;
  }

  .preview-box:has(> .previsualizacion) {
    height: fit-content;
  }

  .previsualizacion {
    margin-bottom: 20px;
  }

  .anuncio {
    width: auto;
    height: auto;

    display: flex;
    align-self: center;

    position: relative;
  }

  /* .anuncio.\33x1 {
  }

  .anuncio.\32x1 {
  } */

  .anuncio.\31x1 {
    height: 100%;
  }

  .miniatura-imagen,
  .anuncio-imagen {
    width: 100%;
    height: fit-content;

    align-self: center;
  }

  .boton-cerrar {
    background-color: transparent;
    color: white;
    cursor: pointer;

    border: none;

    width: 25px;
    height: 25px;
  }

  .anuncio .boton-cerrar {
    position: absolute;
    top: 10px;
    right: 10px;

    cursor: grab;
  }

  .anuncio.\31x1 .boton-cerrar {
    position: absolute;
    top: 10px;
    left: 10px;
    right: auto;
  }

  .boton-continuar {
    box-sizing: border-box;
  }

  .boton-extender,
  .boton-prever,
  .boton-continuar {
    background-color: #fe6;
    color: white;
    cursor: grab;

    border: none;
    border-radius: 50%;

    width: 40px;
    height: 40px;
  }

  .anuncio .boton-continuar {
    position: absolute;
    bottom: 10px;
    right: 10px;

    padding: 6px !important;
    padding-left: 11px !important;
  }

  .anuncio.\31x1 .boton-continuar {
    left: calc(50% - 20px);
  }

  .icono_prever,
  .icono_extender,
  .icono_continuar {
    height: -webkit-fill-available;
  }
  
  .icono_extender {
    width: -webkit-fill-available;
  }
  
  .contenedor-datos {
    display: flex;
    flex-direction: column;
    gap: 10px;

    padding-left: 10px;
    padding-right: 10px;
  }

  .miniatura-envoltura {
    display: block;
    margin-top: 10px;
    margin-bottom: 15px;

    cursor: grab;
  }

  .miniatura-imagen {
    --border-width: 4px;
    border-radius: 15px;
    border-style: inset;

    border-width: var(--border-width);
    width: calc(100% - 2 * var(--border-width));

    border-color: #1f1d2a;
    border-block: none;
  }

  .titulo-envoltura,
  .resumen-envoltura,
  .extension-envoltura {
    --resumen-desc-gap: 5px;
    display: flex;
    flex-direction: row;

    gap: var(--resumen-desc-gap);
    justify-content: space-between;
    align-items: center;
  }

  .titulo-envoltura .boton-continuar {
    padding: 4px;
    padding-left: 8px;

    width: var(--medida-boton);
    height: var(--medida-boton);
  }

  .resumen-envoltura,
  .extension-envoltura {
    align-items: start;
  }

  .extension-envoltura {
    gap: 10px;
  }

  .extension-acciones {
    display: flex;
    flex-direction: column;

    gap: 5px;
    justify-content: start;
    align-items: center;
  }

  .resumen-envoltura .boton-extender,
  .extension-envoltura .boton-extender,
  .extension-envoltura .boton-prever {
    width: var(--medida-boton);
    height: var(--medida-boton);
    
  }
  
  .resumen-envoltura .boton-extender,
  .extension-envoltura .boton-extender {
    padding: 4px 5px !important;
  }

  .extension-envoltura .boton-prever {
    padding: 5px 4px !important;
  }

  .titulo-elemento,
  .resumen-elemento,
  .descripcion-elemento {
    font-family: sans-serif;
    color: white;
    text-align: justify;
  }

  .resumen-elemento,
  .descripcion-elemento {
    --resumen-desc-padding-right: 5px;
    padding-right: var(--resumen-desc-padding-right);
    max-width: calc(100% - var(--medida-boton) - var(--resumen-desc-gap) - var(--resumen-desc-padding-right));
  }
  
  .titulo-elemento {
    font-family: system-ui;
    font-weight: 800;
    font-size: 19px;
    
    text-transform: uppercase;
    -webkit-text-stroke: medium;
    letter-spacing: 3px;
    line-height: 1;
    
    text-align: start;
    color: #1f1d2a;
    
    max-width: calc(100% - var(--medida-boton) - var(--resumen-desc-gap));
  }

</style>