<script lang='ts'>
  // exportar dependencias
  export let emergente_apertura: boolean;
  export let pie_imagen: string;
  export let imagen: string;

  // importar dependencias nativas
  import { onMount } from 'svelte';

  // importar dependencias propias
  import { api } from '../../../../assets/static/code/app';

	let emergente: any;
  let marco: string = "";
  let nota: string = "";
  let icon_der: string = "";
  let icon_izq: string = "";

  onMount(
    async ( ) => {
      fetch(api + '/emergentes/imagenes')
      .then(response => response.json() )
      .then(data => {
       console.log(data);

        if (data) {
          if (data.marco_url) marco = data.marco_url;
          if (data.nota_url) nota = data.nota_url;
          if (data.icono_derecho_url) icon_der = data.icono_derecho_url;
          if (data.icono_izquierdo_url) icon_izq = data.icono_izquierdo_url;
        }
      })
    }
  );

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
      <div
        class="imagen-envoltura"
        style="--marco-url: url({marco})"
      >
        <img
          alt={pie_imagen}
          class="imagen-dialogo"
          src={ imagen }
        />
      </div>
    {/if}
    
    {#if imagen && pie_imagen}
      <div
        class="pie-imagen-container"
        style="--nota-url: url({nota})"
      >
        {#if icon_izq}
          <img
            src={icon_izq}
            alt="Ícono a la izquierda"
            class="pie-imagen-icono"
            id="icono-izquierdo"
          />
        {/if}

        <span
          class="pie-imagen-content"
        >
          {pie_imagen}
        </span>

        {#if icon_der}
          <img
            src={icon_der}
            alt="Ícono a la derecha"
            class="pie-imagen-icono"
            id="icono-derecho"
          />
        {/if}
      </div>
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

    background-color: transparent;

    padding: 0;
    border: none;
  }
  
  .contenido-dialogo {
    /* height: 100%; */
    height: 75vh;
  }

  .pie-imagen-container {
    --desplazamiento-pie: 35px;

    width: -webkit-fill-available;

    margin-top: calc(-1 * var(--desplazamiento-pie));
    padding: 10px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 20px;
  }
  
  .imagen-dialogo {
    width: auto;
    height: -webkit-fill-available;

    background-color: #d2b7f7;
  }
  
  .imagen-envoltura {
    width: fit-content;
    height: -webkit-fill-available;

    margin-left: auto;
    margin-right: auto;

    border-width: 30px;
    border-style: solid;
    
    border-image-source: var(--marco-url);
    border-image-slice: 20%;
    border-image-repeat: stretch;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pie-imagen-icono {
    max-width: calc(2 * var(--desplazamiento-pie));
    filter: grayscale(1) brightness(0.8);
  }

  .pie-imagen-content {
    max-width: 30vw;
    padding: 15px 30px;

    background-color: #f0f2b3;
    background-size: cover;
    
    border-width: 9px;
    border-style: outset;
    border-radius: 50%;
    border-color: #db9151;
    
    font-family: system-ui;
    font-variant: petite-caps;
    font-weight: 600;
    
    color: #1e1e1e;
    text-shadow: 1px 1px #7b4a07, -1px -1px lightgray;

    display: ruby-text;
    text-align: center;
  }

  #icono-derecho {
    rotate: 20deg;
    filter: grayscale(1) brightness(0.8);
  }
  
  #icono-izquierdo {
    rotate: -20deg;
  }

  ::-webkit-scrollbar {
    display: none;
  }

</style>