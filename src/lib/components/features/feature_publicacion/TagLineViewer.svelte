<script>
  //exportar dependencias
  export let etiquetas = [];
  export let numOpciones = 3;

  let elementoInicial = 0;

  function addElementoInicial (salto) {
    elementoInicial += salto;
    elementoInicial %= etiquetas.length;
    while( elementoInicial <= 0 ) {
      elementoInicial += etiquetas.length;
    }
  }

</script>

<div class="container-hilera">
  <button
    on:click={addElementoInicial(-1)}
    class="boton-navegar boton-anterior"
  >
    <img
      class="boton_navegar_anterior"
      src="/icons/utils/chevron_left.svg"
      alt="Navegar anterior hilera"
    />
  </button>

  <ul class="menuLineal">
    {#each [...etiquetas,...etiquetas].slice(elementoInicial, elementoInicial + Math.min(numOpciones, etiquetas.length)) as etiqueta, indice}
      <li class="etiqueta-envoltura">
        <button
          on:click={() => {}}
          class="etiqueta-boton"
        >
          {etiqueta.etq_nombre}
        </button>
      </li>
    {/each}
  </ul>

  <button
    on:click={addElementoInicial(1)}
    class="boton-navegar boton-siguiente"
  >
    <img
      class="boton_navegar_siguiente"
      src="/icons/utils/chevron_right.svg"
      alt="Navegar siguiente hilera"
    />
  </button>
</div>

<style>
  .container-hilera {
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0px;
  }

  .menuLineal {
    margin: 1px 0;
    padding: 0;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    background-color: #fe6;
  }

  .etiqueta-envoltura {
    list-style: none;
    height: 100%;
  }

  .etiqueta-boton {
    background: none;
    border-style: none;

    padding: 0;
    height: 100%;

    font-family: arial;
    font-size: 15px;
    font-weight: 600;
    color: #1f1d2aad;
  }

  .boton-navegar {
    cursor: grab;
    border: 1px solid;
    border-radius: 0;
  }

  .boton-anterior {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }

  .boton-siguiente {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

</style>