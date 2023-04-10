<script>
  export let consigna;
  import CornerBar from './CornerBar.svelte';
  import { anchorFunction } from '../../services/shared/utils_web.js';
</script>

<div class="frame-of-site">
  <CornerBar
      funcionalidad={{
          funcionAludida: undefined,
          numOpciones: 3,
          posicion: 'nw',
          rutaArchivosOpciones: '/icons/categorias/',
          seleccionActiva: true,
          color: '#d2b7f7',
      }}

      opciones={[
        {
          nombre: 'Arreglista Musical',
          nombreArchivo: 'arreglistaMusical',
          parametrosFuncionAludida: 'filtro arreglistaMusical',
        }, {
          nombre: 'Bellas Artes',
          nombreArchivo: 'bellasArtes',
          parametrosFuncionAludida: 'filtro bellasArtes',
        }, {
          nombre: 'Ciencias de la Computacion',
          nombreArchivo: 'cienciasComputacion',
          parametrosFuncionAludida: 'filtro cienciasComputacion',
        }, {
          nombre: 'Difusion del Conocimiento',
          nombreArchivo: 'difusionConocimiento',
          parametrosFuncionAludida: 'filtro difusionConocimiento',
        }, {
          nombre: 'Edicion Multimedia',
          nombreArchivo: 'edicionMultimedia',
          parametrosFuncionAludida: 'filtro edicionMultimedia',
        }, {
          nombre: 'Escritura Creativa',
          nombreArchivo: 'escrituraCreativa',
          parametrosFuncionAludida: 'filtro escrituraCreativa',
        }, {
          nombre: 'Ideas y Artesanias',
          nombreArchivo: 'ideasArtesanias',
          parametrosFuncionAludida: 'filtro ideasArtesanias',
        }, {
          nombre: 'Ludica y Entretenimiento',
          nombreArchivo: 'ludicaEntretenimiento',
          parametrosFuncionAludida: 'filtro ludicaEntretenimiento',
        }
      ]}

      trazabilidad={{
          colorPrincipal: '#fa5a65aa',
          nombre: 'Ekmajstro Pre Cion',
          nombreArchivo: 'ekmajstro',
          enlace: '/',
          redirigir: true
      }}
  />

  <div class="band-continer">
    <div class="band-title">
      <span> { consigna } </span>
    </div>
  </div>

  <CornerBar
      funcionalidad={{
          funcionAludida: anchorFunction,
          numOpciones: 4,
          posicion: 'ne',
          rutaArchivosOpciones: '/icons/trazabilidad/',
          seleccionActiva: false,
          color: '#d2b7f7',
      }}

      opciones={[
        {
          nombre: 'Redes personales',
          nombreArchivo: 'personalNetwork',
          parametrosFuncionAludida: 'https://www.instagram.com/pedrobarr203',
        }, {
          nombre: 'Redes del consumidor',
          nombreArchivo: 'consumerNetwork',
          parametrosFuncionAludida: 'https://www.youtube.com/@pedrobarr_2037',
        }, {
          nombre: 'Codigo fuente',
          nombreArchivo: 'sourceCode',
          parametrosFuncionAludida: 'https://github.com/PedroBarr',
        }, {
          nombre: 'Fuente de proposito',
          nombreArchivo: 'sourcePurpose',
          parametrosFuncionAludida: 'https://pedrobarr.github.io/',
        }
      ]}

      trazabilidad={{
          colorPrincipal: '#01706cdd',
          nombre: 'Alta Lengua',
          nombreArchivo: 'al',
          enlace: '/about',
          redirigir: true
      }}
  />
</div>

<style>
  .frame-of-site {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 9;
  }

  .band-continer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    background: #545a70;
    display: flex;
    z-index: -1;
    align-items: center;
  }

  .band-title {
    width: 100%;
    text-align: center;
    color: white;
    text-decoration-color: white;
    letter-spacing: 3px;
    word-spacing: 2px;
    font-size: x-large;
    font-family: system-ui;
    text-transform: uppercase;
    font-style: oblique;
    transform: skewY(-3deg) skewX(-6deg) rotate3d(3, -3, 1, 12deg) translateY(-6px);
    filter: drop-shadow(2px 4px 6px black);
    -webkit-text-stroke: thick;
  }

</style>