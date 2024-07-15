<script lang="ts">
  // exportar dependencias
  export let recurso;
  
  // importar dependencias propias
  import { assets, base } from '../../../../assets/static/code/app';
  import { anchorFunction } from '../../../services/shared/utils_web'

  const downloadRecurso = () => {
    anchorFunction(recurso.archivo.replaceAll('inline=', 'inline=false'));
  }
  
  const goRecurso = () => {
    anchorFunction(recurso.archivo.replaceAll('inline=', 'inline=true'));
  }
</script>

<div class="menu-item-wrapper">
  <div class="menu-item-tipo-container">
    <img
      class="menu-item-tipo-imagen"
      src="{ assets }/img/icons/core/tipo_recurso/{ recurso.tipo }.svg"
      alt="Icono del tipo"
    />
  </div>

  <div class="menu-item-data">
    <span class="menu-item-title">
      { recurso.titulo } [{ recurso.especificacion }]
    </span>

    <span class="menu-item-descripcion">
      { recurso.descripcion }
    </span>
  </div>

  <div class="menu-item-actions-wrapper">
    <div class="menu-item-action-wrapper">
      <button
        class="menu-item-button"
        on:click={downloadRecurso}
      >
        <img
          class="menu-item-button-icon"
          src="{base}/icons/utils/chevron_download.svg"
          alt="Descargar recurso"
        />
      </button>
    </div>
    
    <div class="menu-item-action-wrapper">
      <button
        class="menu-item-button"
        on:click={goRecurso}
      >
        <img
          class="menu-item-button-icon"
          src="{base}/icons/utils/chevron_go.svg"
          alt="Ir al recurso"
        />
      </button>
    </div>
  </div>
</div>

<style>
  .menu-item-wrapper {
    --bgc: #d2b7f7;

    --icon-wrappers-size: 30px;
    --section-padding-v-sides: 5px;
    --section-padding-sides: 15px;

    --horizont-gap: 10px;
    --horizont-gap-inner: 5px;

    --no-actions: 2;

    width: -webkit-fill-available;

    display: flex;
    flex-direction: row;
    gap: var(--horizont-gap);

    align-items: center;
    justify-content: flex-start;

  }

  .menu-item-tipo-container,
  .menu-item-data,
  .menu-item-action-wrapper {
    background-color: var(--bgc);
    padding: var(--section-padding-v-sides);
  }
  
  .menu-item-tipo-imagen {
    padding: var(--section-padding-v-sides) !important;
  }

  .menu-item-tipo-container,
  .menu-item-action-wrapper {
    width: var(--icon-wrappers-size);
    height: var(--icon-wrappers-size);
    border-radius: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .menu-item-tipo-imagen,
  .menu-item-button {
    width: -webkit-fill-available;
    height: -webkit-fill-available;

    padding: 0;
  }
  
  .menu-item-data {
    width: calc(100% - (var(--horizont-gap) * 2) - (var(--horizont-gap-inner) * (var(--no-actions) - 1)) - (var(--icon-wrappers-size) * (var(--no-actions) + 1)));
    border-radius: 10px;
    padding: var(--section-padding-v-sides) var(--section-padding-sides);

    display: flex;
    flex-direction: column;

    align-items: flex-start;
    justify-content: space-between;
  }

  .menu-item-actions-wrapper {
    display: flex;
    flex-direction: row;
    gap: var(--horizont-gap-inner);
  }

  .menu-item-button {
    border-style: none;
    background-color: transparent;
    cursor: grab;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .menu-item-title,
  .menu-item-descripcion {
    width: -webkit-fill-available;
  }

  .menu-item-title {
    font-size: 13px;
    font-weight: 600;
    text-shadow: 0.4px 0.4px black;
    color: darkslateblue;
  }
  
  .menu-item-descripcion {
    font-size: 10px;
    color: darkslategray;
  }

</style>