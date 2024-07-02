<script lang='ts'>
  // exportar dependencias
  export let emergente_apertura: boolean;
  export let pie_imagen: string;
  export let imagen: string;

	let emergente: any;

	$: if (emergente && emergente_apertura == true) emergente.showModal();
</script>

<dialog
	bind:this={emergente}
	on:close={() => (emergente_apertura = false)}
	on:click|self={() => emergente.close()}
  class="fondo-dialogo"
  >
  <div
    on:click|stopPropagation
    class="contenido-dialogo"
    >
    {#if imagen}
      <img
        alt={pie_imagen}
        class="imagen-dialogo"
        src={ imagen }
      />
    {/if}
  </div>
</dialog>

<style>
  .fondo-dialogo::backdrop {
		background: rgba(0, 0, 0, 0.9);
    cursor: grab;
	}

  .fondo-dialogo {
    max-width: 90%;
    height: 85vh;
    padding: 0;
    border: none;
  }
  
  .contenido-dialogo {
    height: 100%;
  }
  
  .imagen-dialogo {
    width: auto;
    height: -webkit-fill-available;
  }
</style>