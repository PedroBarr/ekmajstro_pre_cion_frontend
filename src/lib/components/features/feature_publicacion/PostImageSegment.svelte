<script lang="ts">
  // exportar dependencias
  export let segmento, obtenerContenidoSegm, obtenerAlgoSegm;
  
  // importar componentes
  import DialogImage from '../feature_emergentes/DialogImage.svelte';

  let emergente_apertura: boolean = false;

  function obtenerClaseImagenSegm (segmento: any) {
    return obtenerContenidoSegm(segmento).clase || '';
  }

  function obtenerAlternativoImagenSegm (segmento: any) {
    return obtenerAlgoSegm(segmento, 'alternativo');
  }

</script>

{#if obtenerContenidoSegm(segmento).tipo == 'imagen'}
  <div
    class="segmento-contenido-imagen-envoltura {obtenerClaseImagenSegm(segmento)}"
  >
    <button
      class="segmento-contenido-imagen-boton"
      on:click={() => (emergente_apertura = true)}
    >
      <img
        class="segmento-contenido-imagen"
        src={obtenerContenidoSegm(segmento).contenido}
        alt={obtenerAlternativoImagenSegm(segmento)}
      />
    </button>

    <DialogImage
      bind:emergente_apertura
      imagen={obtenerContenidoSegm(segmento).contenido}
      pie_imagen={obtenerAlternativoImagenSegm(segmento)}
    >
    </DialogImage>
  </div>
{/if}

<style>
  .segmento-contenido-imagen-envoltura {
    width: 100%;
    height: 100%;
    display: flex;

    align-items: center;
    justify-content: center;
  }

  .segmento-contenido-imagen-boton {
    cursor: grab;
  }

  .segmento-contenido-imagen-envoltura:not(.cuadro-exposicion) .segmento-contenido-imagen-boton {
    max-width: 80%;
    /* width: -webkit-fill-available; */
  }
  
  .segmento-contenido-imagen {
    width: 100%;
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
  
  .segmento-contenido-imagen-envoltura.cuadro-exposicion {
    --corner: 1em;
    --bg: #605762;
    
    /* border: var(--corner) solid;
    border-image-source:
    conic-gradient(
        transparent 10%,
        var(--bg)   10%,
        var(--bg)   40%,
        transparent 40%,
        transparent 60%,
        var(--bg)   60%,
        var(--bg)   90%,
        transparent 90%
        );
        border-image-slice: 0.1%; */
        /* border: var(--corner) solid;
        border-image-source: url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" fill="SlateBlue"><path d="M3 0h1a.5.5 0 0 1 0 1c0 1.1.9 2 2 2a.5.5 0 0 1 1 0v1a.5.5 0 0 1-1 0 2 2 0 0 0-2 2 .5.5 0 0 1 0 1H3a.5.5 0 0 1 0-1 2 2 0 0 0-2-2 .5.5 0 0 1-1 0V3a.5.5 0 0 1 1 0 2 2 0 0 0 2-2 .5.5 0 0 1 0-1Z" /></svg>');
        border-image-slice: 3;
        height: -webkit-fill-available;
        box-sizing: border-box;
        background-color: var(--bg);
    background-clip: content-box; */
    border-style: solid;
    border-width: var(--corner);
    border-bottom-color: #573245;
    border-left-color: #826f81;
    border-right-color: #3d2b44;
    border-top-color: #b196b8;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25) inset, 0 5px 10px 5px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    display: flex;
    height: 100%;
    /* --corner-bg: rgb(78 58 111);
    background-image:
    radial-gradient(calc(2 * var(--corner)) at 0 0,transparent 50%,var(--corner-bg) 50%,var(--corner-bg) 99.99%,transparent 99.99%),
    radial-gradient(calc(2 * var(--corner)) at 0 100%,transparent 50%,var(--corner-bg) 50%,var(--corner-bg) 99.99%,transparent 99.99%),
    radial-gradient(calc(2 * var(--corner)) at 100% 100%,transparent 50%,var(--corner-bg) 50%,var(--corner-bg) 99.99%,transparent 99.99%),
    radial-gradient(calc(2 * var(--corner)) at 100% 0,transparent 50%,var(--corner-bg) 50%,var(--corner-bg) 99.99%,transparent 99.99%),
    linear-gradient(to bottom,transparent var(--corner),var(--bg) var(--corner),var(--bg) calc(100% - var(--corner)),transparent calc(100% - var(--corner)))
    ;
    height: -webkit-fill-available;
    display: flex;
    padding: var(--corner); */
  }
  
  .segmento-contenido-imagen-envoltura.cuadro-exposicion > button {
    padding: var(--corner);
    border: none;
    height: -webkit-fill-available;
    background-color: var(--bg);
  }
  
  .segmento-contenido-imagen-envoltura.cuadro-exposicion img {
    background-color: #d2b7f7;
    border: solid #444 1px;
  }

  .segmento-contenido-imagen-envoltura:not(.cuadro-exposicion) > button {
    padding: 0;
    border: none;
    height: fit-content;
    background-color: transparent;
  }
</style>