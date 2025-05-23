<script lang="ts">
  // exportar dependencias
  export let seccion;

  // importar dependencias propias
  import { corregirEntidades } from '../../../../assets/static/code/utils';
  
  // importar componentes
  import PostImageSegment from './PostImageSegment.svelte';

  let segmentos;

  const obtenerClaseSegm = (segmento: any) =>
    segmento.segm_medida + ' segmento-contenido';

  function obtenerContenidoSegm (segmento: any) {
    return JSON.parse(segmento.segm_contenido);
  }

  function obtenerClaseTextoSegm (segmento: any) {
    return obtenerContenidoSegm(segmento).clase || '';
  }

  function obtenerClaseListaSegm (segmento: any) {
    return obtenerContenidoSegm(segmento).clase || '';
  }

  function obtenerAlgoSegm (
    segmento: any,
    clave_contenedor: string = 'contenido',
  ) {
    let contenido = obtenerContenidoSegm(segmento)[clave_contenedor] || '';
    return corregirEntidades(contenido);
  }

  function obtenerTextoSegm (segmento: any) {
    let contenido = obtenerAlgoSegm(segmento) || '';
    return corregirEntidades(contenido);
  }
  
  function obtenerIconoTextoSegm (segmento: any) {
    return obtenerAlgoSegm(segmento, 'uri_icono');
  }
  
  function obtenerEncabezadoTextoSegm (segmento: any) {
    return obtenerAlgoSegm(segmento, 'encabezado') || 'NOTA';
  }
  
  function obtenerMedidaEncabezadoTextoSegm (segmento: any) {
    return obtenerEncabezadoTextoSegm(segmento).length;
  }

  function obtenerTituloSegm (segmento: any) {
    return obtenerAlgoSegm(segmento);
  }

  function obtenerListaSegm (segmento: any) {
    let contenido: string[] = obtenerContenidoSegm(segmento).contenido || [];
    return contenido.map((elemento) => corregirEntidades(elemento));
  }

  function obtenerSeparadorListaSegm (segmento: any) {
    return obtenerAlgoSegm(segmento, 'uri_separador');
  }

  function esTextoEnriquecidoTexto(segmento: any) {
    return obtenerClaseTextoSegm(segmento).includes('rich-text');
  }

  function obtenerParteRicaTexto(
    texto: string,
    separador: string,
    clase: string,
    clase_prev: string,
  ): any[] {
    return (
      (' ' + texto)
        .split(separador)
        .map((parte: string, indice: number) => {
          let texto = indice == 0 ? parte.substring(1) : parte; // hace nada
          
          if (indice % 2)
            return {
              texto,
              clase: clase_prev + ' ' + clase,
            }
          
          return {
            texto,
            clase: clase_prev,
          }
        })
    );
  }

  function obtenerPartesTextoSegm(segmento: any): any[] {
    let texto: string = obtenerTextoSegm(segmento);
    const partes_texto = [];

    let partes_italica: any[] = obtenerParteRicaTexto(
      texto,
      '&estxit;',
      'ital-texto',
      '',
    );

    partes_italica.forEach((parte_italica) => {
      let partes_negrita: any[] = obtenerParteRicaTexto(
        parte_italica.texto,
        '&estxbld;',
        'bold-texto',
        parte_italica.clase,
      );
console.log(partes_negrita);      
      partes_negrita.forEach((parte_negrita) => {
        partes_texto.push(parte_negrita);
      });
    });

    return partes_texto;
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
          style="
            --recurso-icono: url({obtenerIconoTextoSegm(segmento)});
            --encabezado-texto: '{obtenerEncabezadoTextoSegm(segmento)}';
            --encabezado-medida: {obtenerMedidaEncabezadoTextoSegm(segmento)};
          "
        >
          {#if esTextoEnriquecidoTexto(segmento)}
            {#each obtenerPartesTextoSegm(segmento) as parte_texto}
              <span class={parte_texto.clase}>
                {parte_texto.texto}
              </span>
            {/each}
          {:else}
            {obtenerTextoSegm(segmento)}
          {/if}
        </div>
      {:else if obtenerContenidoSegm(segmento).tipo == 'imagen'}
        <PostImageSegment
          { segmento }
          { obtenerContenidoSegm }
          { obtenerAlgoSegm }
        />
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
    --padding-right: 10px;
    --padding-left: 10px;
    padding: 15px 10px;
  }

  .segmento-contenido.\31-col {
    width: 100%;
  }

  .segmento-contenido.\32-col {
    width: calc(50% - (var(--gap) / 2) - (var(--padding-right) + var(--padding-left)));
  }
  
  .segmento-contenido.\33-col {
    width: calc((100% / 3) - (var(--gap) / (3 / 2)) - (var(--padding-right) + var(--padding-left)));
  }
  
  .segmento-contenido.\34-col {
    width: calc((100% / 4) - (var(--gap) / (4 / 3)) - (var(--padding-right) + var(--padding-left)));
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

  .segmento-contenido:has(> PostImageSegment) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .segmento-contenido-titulo {
    font-family: system-ui;
    font-size: 15px;
    text-transform: uppercase;
    -webkit-text-stroke: medium;
    letter-spacing: 1px;
    text-align: center;
  }

  .segmento-contenido-texto.negrt-texto,
  .segmento-contenido-texto .negrt-texto {
    font-weight: bold;
  }
  
  .segmento-contenido-texto.ital-texto,
  .segmento-contenido-texto .ital-texto {
    font-style: italic;
  }
  
  .segmento-contenido-texto.bold-texto,
  .segmento-contenido-texto .bold-texto {
    font-weight: bold;
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
  
  *:has(> .segmento-contenido-texto.nota-texto) {
    position: relative;
    background-color: #d2b7f7;
    
    height: fit-content;
    display: flex;
    align-items: center;
    align-self: center;
    
    --border-right: 1px;
    --border-left: 30px;
    
    border-color: #483d8b9a;
    border-width: var(--border-right);
    border-left-width: var(--border-left);
    border-style: solid;
    
    --padding-right-inner: 20px;
    --padding-left-inner: 5px;
    --padding-left: calc(var(--padding-left-inner) + var(--border-left));
    --padding-right: calc(var(--padding-right-inner) + var(--border-right));
    
    padding-right: var(--padding-right-inner);
    padding-left: var(--padding-left-inner);
    padding-top: 10px;
    padding-bottom: calc(var(--padding-right-inner) * 2);
    
    border-top-left-radius: 5px;
    border-top-right-radius: 20px;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 20px;

    margin-top: 5px;
    margin-bottom: 5px;
  }
  
  .segmento-contenido-texto.nota-texto {
    color: black;
    font-size: 11px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    line-height: 1;
    letter-spacing: 0.9px;
  }
  
  .segmento-contenido-texto.nota-texto:before {
    --font-size: 12px;
    --width-space: calc((var(--font-size) + 3px) * var(--encabezado-medida) + 30px);
    height: calc(var(--border-left) * 0.8);
    width: calc(var(--border-left) * 0.9 + var(--width-space));

    position: absolute;
    z-index: 1;
    left: calc(-1 * var(--border-left) + (var(--border-left) / 10));
    top: 0;

    content: var(--encabezado-texto);
    transform: rotate(-90deg) translate(calc(-50% + var(--width-space) / 2), calc(var(--width-space) / -2));
    
    background-image: var(--recurso-icono);
    background-size: 100% 100%;
    
    filter: brightness(0) invert(0.2);
    
    display: flex;
    align-items: center;
    
    font-weight: 900;
    font-size: var(--font-size);

    text-transform: uppercase;
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

  *:has(> .segmento-contenido-texto.flyer-texto) {
    background-color: #fdff9c;
    
    height: fit-content;
    display: flex;
    align-items: center;
    align-self: center;
    
    --border-right: 1px;
    
    border-color: #ffd000;
    border-width: var(--border-right);
    border-style: solid;
    
    --padding-inner: 20px;
    
    padding: var(--padding-inner);
    padding-bottom: calc(var(--padding-inner) * 2);
    
    border-radius: 5px;

    margin-top: 5px;
    margin-bottom: 5px;
  }

  .segmento-contenido-texto.flyer-texto {
    position: relative;

    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    
    line-height: 1;
    letter-spacing: 2px;
    filter: drop-shadow(2px 4px 6px black);
  }
  
  .segmento-contenido-texto.flyer-texto::before {
    display: block;
    content: "";
    
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    
    background-image: var(--recurso-icono);
    background-size: auto;
    background-repeat: no-repeat;
    background-position: center;
    
    width: -webkit-fill-available;
    height: auto;

    max-width: 75%;
    margin: auto;
    
    filter: invert(0.5) opacity(0.2);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .segmento-contenedor {
      --gap: 5px;
    }

    .segmento-contenido {
      --padding-right: 5px;
      --padding-left: 5px;
    }

    .segmento-contenido.\31-col,
    .segmento-contenido.\32-col,
    .segmento-contenido.\33-col,
    .segmento-contenido.\34-col {
      width: 100%;
    }

    .segmento-contenido-texto {
      font-size: 12px;
    }

    .segmento-contenido-texto.flyer-texto::before {
      background-size: contain;
    }
  }

</style>