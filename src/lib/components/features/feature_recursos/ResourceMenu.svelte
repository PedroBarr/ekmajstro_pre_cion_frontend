<script lang="ts">
  // exportar dependencias
  export let recursos;
  
  // importar componentes
  import ResourceMenuItem from '../feature_recursos/ResourceMenuItem.svelte';
  
  // importar dependencias propias
  import { assets } from '../../../../assets/static/code/app';

  let menu_apertura: boolean = false;

  const toggleMenu = (event: any) => {
    noPropagEvent(event);
    menu_apertura = !menu_apertura;
  };
  
  const noPropagEvent = (event: any) => {
    event.stopPropagation();
  }

  const escapeMenu = (event: KeyboardEvent) => {
    if (event.key == "Escape") toggleMenu(event);
  }

</script>

{#if recursos.length}
  {#if menu_apertura}
    <div
      class="resource-menu-backdrop"
      on:click={toggleMenu}
    />
  {/if}

  <div class="resource-menu-wrapper" on:click={toggleMenu}>
      {#if menu_apertura}
        <div
          on:click={noPropagEvent}
          class="resource-menu-items-wrapper"
        >
          {#each recursos as recurso}
            <ResourceMenuItem
              { recurso }
            />
          {/each}
        </div>
      {/if}

      <div class="resource-menu-button-wrapper">
        <button
          class="resource-menu-button"
          class:shiny-logo={menu_apertura}
          on:click={toggleMenu}
          on:keyup={escapeMenu}
        >
          <img
            class="resource-menu-button-image"
            src="{assets}/img/icons/core/ekmajstro.svg"
            alt="Logo de Ekmajstro pre ĉion"
          />
        </button>
      </div>
  </div>
{/if}

<style>
  .resource-menu-backdrop {
		background: #1a1f2af1;
    cursor: grab;
    
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;

    width: 100vw;
    height: 100vh;
	}
  
  .resource-menu-wrapper {
    position: fixed;
    bottom: calc(var(--margin-main-sides) / 2);
    right: calc(var(--margin-main-sides) / 2);
    z-index: 2;
    
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    
    gap: 15px;
  }

  .resource-menu-items-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 10px;

    width: 50vw;
    max-height: 50vh;
    overflow-y: scroll;

    padding-bottom: 10px;
  }

  .resource-menu-button-wrapper {
    width: 60px;
    height: 60px;
    
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .resource-menu-button {
    width: inherit;
    height: inherit;
    background-color: #d2b7f7;
    
    padding: 10px;
    border-radius: 50%;
    border-style: none;

    cursor: grab;
  }

  .resource-menu-button-image {
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    filter: invert(0.5) brightness(0.8);
  }
  
  .resource-menu-button.shiny-logo .resource-menu-button-image,
  .resource-menu-button:hover .resource-menu-button-image {
    filter: drop-shadow(-2px -3px 3px #fa5a65);
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>