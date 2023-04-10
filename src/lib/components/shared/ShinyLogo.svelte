<script>
  export let logoRecurso, logoTraza, logoEstilo;

  let src = `img/core/${logoRecurso.nombreArchivo}.svg`;
  let a = 'initial';
</script>

<div
    class="outter-container {logoEstilo.posicion}"
    style='--color:{logoEstilo.colores.secundario}'
>
  <div
      class="inner-container {logoEstilo.posicion}"
      style='--color:{logoEstilo.colores.primario}'
  >
    <a
        href={logoTraza.enlace}
        rel="noreferrer"
        target={logoTraza.redirigir ? "_self" : "_blank"}
    >
      <img
        style='--color:{logoEstilo.colores.secundario}; --colorPrincipal:{logoRecurso.colorPrincipal}'
        {src}
        class="logo"
        alt="logo de {logoTraza.nombre}"
      />
    </a>
  </div>
</div>

<style>
  .outter-container {
    border-style: solid;
    border-width: 1px;
    border-radius: 50%;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    background: var(--color);
  }

  .inner-container {
    border-style: solid;
    border-width: 1px;
    border-radius: 50%;
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    margin: 4px;
    background: var(--color);
  }

  .logo {
    padding: 15%;
    width: 70%;
    will-change: filter;
    transition: filter 300ms;
    filter: invert(50%);
  }

  .logo:hover {
    filter: drop-shadow(-2px -3px 5px var(--colorPrincipal));
  }

  .top-corner.left-corner {
    border-top-left-radius: 0px;
  }

  .top-corner.right-corner {
    border-top-right-radius: 0px;
  }

  .bottom-corner.left-corner {
    border-bottom-left-radius: 0px;
  }

  .bottom-corner.right-corner {
    border-bottom-right-radius: 0px;
  }

</style>