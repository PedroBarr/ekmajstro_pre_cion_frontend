<script lang="ts">
  // exportar dependencias
  export let seccion;

  // exportar dependencias propias
  import { base } from '../../../../assets/static/code/app';
  import { corregirEntidades } from '../../../../assets/static/code/utils';

  let segmentos;

  const obtenerClaseSegm = (segmento: any) =>
    segmento.segm_medida + ' segmento-contenido';

  function obtenerContenidoSegm (segmento: any) {
    return JSON.parse(segmento.segm_contenido);
  }

  function obtenerClaseImagenSegm (segmento: any) {
    return obtenerContenidoSegm(segmento).clase || '';
  }

  function obtenerAlternativoImagenSegm (segmento: any) {
    return obtenerTextoSegm(segmento, 'alternativo');
  }
  function obtenerClaseTextoSegm (segmento: any) {
    return obtenerContenidoSegm(segmento).clase || '';
  }

  function obtenerClaseListaSegm (segmento: any) {
    return obtenerContenidoSegm(segmento).clase || '';
  }

  function obtenerTextoSegm (
    segmento: any,
    clave_contenedor: string = 'contenido',
  ) {
    let contenido = obtenerContenidoSegm(segmento)[clave_contenedor] || '';
    return corregirEntidades(contenido);
  }

  function obtenerTituloSegm (segmento: any) {
    return obtenerTextoSegm(segmento);
  }

  function obtenerListaSegm (segmento: any) {
    let contenido: string[] = obtenerContenidoSegm(segmento).contenido || [];
    return contenido.map((elemento) => corregirEntidades(elemento));
  }

  function obtenerSeparadorListaSegm (segmento: any) {
    return obtenerTextoSegm(segmento, 'uri_separador');
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
        <div
          class="segmento-contenido-texto {obtenerClaseTextoSegm(segmento)}"
        >
          {obtenerTextoSegm(segmento)}
        </div>
      {:else if obtenerContenidoSegm(segmento).tipo == 'imagen'}
        <div
          class="segmento-contenido-imagen-envoltura {obtenerClaseImagenSegm(segmento)}"
        >
          <img
            class="segmento-contenido-imagen"
            src={obtenerContenidoSegm(segmento).contenido}
            alt={obtenerAlternativoImagenSegm(segmento)}
          />
        </div>
        {:else if obtenerContenidoSegm(segmento).tipo == 'titulo'}
        <div class="segmento-contenido-titulo">
          {obtenerTituloSegm(segmento)}
        </div>
        {:else if obtenerContenidoSegm(segmento).tipo == 'lista'}
        <div
          class="segmento-contenido-lista-envoltura {obtenerClaseListaSegm(segmento)}"
          style="--recurso-separador: url({obtenerSeparadorListaSegm(segmento)});"
        >
          <ul class="segmento-contenido-lista-contenedor">
            {#each obtenerListaSegm(segmento) as elemento}
              <li class="segmento-contenido-lista-contenido">
                {elemento}
              </li>
              {/each}
            </ul>
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

  .segmento-contenido-titulo,
  .segmento-contenido-texto,
  .segmento-contenido-lista-contenido {
    width: 100%;

    font-family: sans-serif;
    font-size: 15px;

    text-align: justify;
    color: white;

    white-space: break-spaces;
  }

  .segmento-contenido:has(> .segmento-contenido-imagen-envoltura) {
    display: flex;
    align-items: center;
    justify-content: center;
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

  .segmento-contenido-imagen-envoltura.circ_img > * {
    border-radius: 50%;
    overflow: hidden;
  }

  .segmento-contenido-imagen-envoltura.med-medd > * {
    width: 50%;
  }

  .segmento-contenido-imagen-envoltura.peq-medd > * {
    width: 25%;
  }

  .segmento-contenido-titulo {
    font-family: system-ui;
    font-size: 15px;
    text-transform: uppercase;
    -webkit-text-stroke: medium;
    letter-spacing: 1px;
    text-align: center;
  }

  .segmento-contenido-texto.vert-cent-texto {
    text-align: center;
  }

  *:has(> .segmento-contenido-texto.horiz-cent-texto) {
    display: flex;
    align-items: center;
  }

  *:has(> .segmento-contenido-texto.poem-text) {
    display: flex;
    align-items: center;
  }

  .segmento-contenido-texto.poem-text {
    text-align: center;
    font-style: italic;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 1.1px;
  }

  .segmento-contenido-lista-contenedor {
    margin: 0;
    padding: 0;
  }

  .segmento-contenido-lista-contenido {
    list-style: none;
    padding: 0 0 20px;
    text-align: center;
    position: relative;
  }

  .segmento-contenido-lista-contenido:before {
    content: '';
    position: absolute;
    z-index: -1;

    border-left-style: solid;
    border-right-style: solid;
    border-left-width: 1px;
    border-right-width: 1px;
    border-left-color: black;
    border-right-color: black;

    left: 37.5%;
    bottom: 0;
    height: 50%;
    width: 25%;

    background-image: var(--recurso-separador);
    background-size: 100% 100%;

    filter: invert(0.5);
    transform: scale(0.5);
  }

  .segmento-contenido-lista-contenido:last-child:before {
    content: none;
    border-left-style: none;
    border-right-style: none;
  }

  .segmento-contenido-lista-contenido:last-child {
    padding: 0;
  }

  </style>