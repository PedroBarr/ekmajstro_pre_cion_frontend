<script>
  // exportar dependencias
  export let consigna;
  export let tipos_recurso = [];
  export let trazabilidad_social = [];

  // importar componentes
  import CornerBar from './CornerBar.svelte';

  // importar dependencias propias
  import { anchorFunction } from '../../services/shared/utils_web.js';
  import { assets } from '../../../assets/static/code/app.js';
</script>

<div class="frame-of-site">
  <CornerBar
      funcionalidad={{
          funcionAludida: undefined,
          numOpciones: 3,
          posicion: 'nw',
          seleccionActiva: true,
          color: '#d2b7f7',
      }}

      opciones={ tipos_recurso }

      trazabilidad={{
          colorPrincipal: '#fa5a65aa',
          nombre: 'Ekmajstro Pre Cion',
          urlArchivo: `${assets}/img/icons/core/ekmajstro.svg`,
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
          seleccionActiva: false,
          color: '#d2b7f7',
      }}

      opciones={ trazabilidad_social }

      trazabilidad={{
          colorPrincipal: '#01706cdd',
          nombre: 'Alta Lengua',
          urlArchivo: `${assets}/img/icons/core/al.svg`,
          enlace: '/acerca_de',
          redirigir: true
      }}

      ocultar_en_movil={ true }
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

  /* Responsive design */

  @media (max-width: 768px) {
    .band-continer {
      height: 50px;
    }

    .band-title {
      margin-left: 22%;
      margin-right: 13%;
      width: 65%;
      font-size: 12px;
    }
  }

</style>