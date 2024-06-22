<script lang="ts">
  //exportar dependencias
  export let seccion_marcada;
  export let secciones;

  //importar dependencias nativas
  import { slide } from 'svelte/transition';

  //importar dependencias propias
  import { base } from '../../../../assets/static/code/app.js';

  //importar componentes
  import PostSection from './PostSection.svelte';

  let secciones_aperturas;

  $: if(secciones) {
    if (!secciones_aperturas)
      secciones_aperturas = {};

    secciones.forEach((seccion) => {
      if (!secciones_aperturas[seccion.secc_id])
        secciones_aperturas[seccion.secc_id] = false;
    });
  }

  const conmutarApertura = (secc_id) => {
    secciones_aperturas[secc_id] = !secciones_aperturas[secc_id];
  }
</script>

<div class="seccion-envoltura">
  {#if seccion_marcada}
    <PostSection
      seccion={seccion_marcada}
    />
  {/if}

  {#if secciones && secciones_aperturas}
    {#each secciones as seccion}
      <div class="acordeon">
        <div
          class="acordeon-cabecera"
          on:click={() => conmutarApertura(seccion.secc_id)}
          on:keypress={(e) => {e.stopPropagation()}}
        >
          <div class="acordeon-cabecera-texto">
            {seccion.secc_nombre}
          </div>

          <button
            class="acordeon-cabecera-boton"
          >
            {#if secciones_aperturas[seccion.secc_id]}
              <img
                class="acordeon-cabecera-boton-abrir"
                src="{base}/icons/utils/chevron_up.svg"
                alt="Navegar siguiente ne"
              />
            {:else}
              <img
                class="acordeon-cabecera-boton-cerrar"
                src="{base}/icons/utils/chevron_down.svg"
                alt="Navegar siguiente ne"
              />
            {/if}
          </button>
        </div>

        {#if secciones_aperturas[seccion.secc_id]}
        <div class="acordeon-contenedor" transition:slide>
          <PostSection
            { seccion }
          />
        </div>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style>
  .seccion-envoltura {
    width: 100%;
    display: flex;

    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .acordeon {
    width: 100%;
  }

  .acordeon-cabecera {
    --padding-sides: 10px;
    padding: 10px var(--padding-sides);
    
    width: calc(100% - 2 * var(--padding-sides));
    height: max-content;
    position: relative;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: #fe6;
    border-radius: 5px;
  }
  
  .acordeon-cabecera,
  .acordeon-cabecera * {
    cursor: grab;
  }

  .acordeon-cabecera-texto {
    font-family: system-ui;
    font-size: 16px;

    text-transform: uppercase;
    -webkit-text-stroke: medium;

    letter-spacing: 3px;
  }

  .acordeon-cabecera-boton {
    padding: 2px 5px;

    position: absolute;
    right: 10px;
    top: calc(50% - 10px);

    background: transparent;
    border: none;
  }

  .acordeon-contenedor {
    padding:1rem;
  }
</style>