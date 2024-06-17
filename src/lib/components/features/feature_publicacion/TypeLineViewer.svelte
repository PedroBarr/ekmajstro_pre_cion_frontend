<script>
  //exportar dependencias
  export let tipos_recurso = [];
  export let numOpciones = 3;

  let elementoInicial = 0;

  function addElementoInicial (salto) {
    elementoInicial += salto;
    elementoInicial %= tipos_recurso.length;
    while( elementoInicial <= 0 ) {
      elementoInicial += tipos_recurso.length;
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
    {#each [...tipos_recurso,...tipos_recurso].slice(elementoInicial, elementoInicial + Math.min(numOpciones, tipos_recurso.length)) as tipo_recurso, indice}
      <li class="tipo_recurso-envoltura">
        <button
          on:click={() => {}}
          class="tipo_recurso-boton"
        >
          <img
            class="tipo-recurso-imagen"
            src={ tipo_recurso.tp_rec_icon_url }
            alt="Boton de recurso {tipo_recurso.tp_rec_nombre}"
          />
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

  .tipo_recurso-envoltura {
    list-style: none;
    height: 100%;
  }

  .tipo_recurso-boton {
    background: none;
    border-style: none;

    padding: 0;
    height: 100%;
  }

  .tipo-recurso-imagen {
    width: 19px;
    height: 19px;
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