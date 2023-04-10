<script>
  export let trazabilidad, funcionalidad, opciones;
  import ShinyLogo from '../shared/ShinyLogo.svelte';

  let posicion;

  let elementoInicial = 0, desfase = 0, centro = [50, 50];

  if (funcionalidad) {
    if (funcionalidad.posicion.toLowerCase().includes('n')) {
      posicion = "top-corner ";
      desfase = 225;
    } else if (funcionalidad.posicion.toLowerCase().includes('s')) {
      posicion = "bottom-corner ";
      desfase = 45;
      centro[0] = 75;
    }

    if (funcionalidad.posicion.toLowerCase().includes('w')) {
      posicion += "left-corner";
      desfase += (-1)^Math.floor((desfase - 45) / 180) * (45);
    } else if (funcionalidad.posicion.toLowerCase().includes('e')) {
      posicion += "right-corner";
      desfase += (-1)^Math.floor((desfase - 45) / 180) * (-45);
      centro[1] = 75;
    }
  }

  function addElementoInicial (salto) {
    elementoInicial += salto;
    elementoInicial %= opciones.length;
    while( elementoInicial <= 0 ) {
      elementoInicial += opciones.length;
    }
  }

  function getStyleElemento (subindice) {
    const rotacion = ((360 * subindice) / (funcionalidad.numOpciones * 4)) + desfase;
    const torsion = (-360 / (funcionalidad.numOpciones * 4)) + 90;
    const desfaseCentro = (
        funcionalidad.numOpciones % 2 ?
        (4 * (5 * funcionalidad.numOpciones)) / ((funcionalidad.numOpciones - 1) ** 2) :
        (-2 * (5 * funcionalidad.numOpciones)) / funcionalidad.numOpciones / (-(funcionalidad.numOpciones / 2) + 1)) * subindice * (subindice - (funcionalidad.numOpciones - 1)
    );
    return `--rotacion: ${rotacion}deg; --torsion: ${torsion}deg; --centroY: ${centro[1] + desfaseCentro}%; --centroX: ${centro[0] + desfaseCentro}%`;
  }

</script>

<div class="container {posicion}">
  <ul class="menuRadial" style="--color: {funcionalidad.color}">
    {#each [...opciones,...opciones].slice(elementoInicial, elementoInicial + funcionalidad.numOpciones) as opcion, indice}
      <li class="elemento" style={getStyleElemento(indice)}>
        <button on:click={funcionalidad.funcionAludida(opcion.parametrosFuncionAludida)} class="subelemento" style={getStyleElemento(indice)}>
          <img class="background" src={funcionalidad.rutaArchivosOpciones + opcion.nombreArchivo + '.svg'}/>
        </button>
      </li>
    {/each}
  </ul>

  <div class="logotipo">
    <ShinyLogo

        logoEstilo={{
          colores: {
            primario: funcionalidad.color,
            secundario: 'darkslateblue'
          },
          posicion: posicion
        }}

        logoRecurso={{
            nombreArchivo:trazabilidad.nombreArchivo,
            colorPrincipal: trazabilidad.colorPrincipal
        }}

        logoTraza={{
            enlace: trazabilidad.enlace,
            nombre: trazabilidad.nombre,
            redirigir: trazabilidad.redirigir
        }}
    />
  </div>
  {#if funcionalidad.seleccionActiva}
    <div class="panel-botones">
      {#if funcionalidad.numOpciones < opciones.length}
        <button
          class="boton-seguir"
          on:click={() => addElementoInicial(1)}
        >
        </button>
        <button
          class="boton-volver"
          on:click={() => addElementoInicial(-1)}
        >
        </button>
      {/if}
    </div>
  {/if}
</div>

<style>

  .container {
    width: fit-content;
    position: fixed;
    width: 100px;
    height: 100px;
  }

  .container button {
    cursor: grab;
  }



  .top-corner {
    top: -15px;
  }

  .bottom-corner {
    bottom: -15px;
  }

  .left-corner {
    left: -15px;
  }

  .right-corner {
    right: -15px;
  }

  .top-corner.left-corner .menuRadial {
    translate: 0;
    border-bottom-right-radius: 50%;
  }

  .top-corner.right-corner .menuRadial {
    translate: -50% 0%;
    border-bottom-left-radius: 50%;
  }

  .bottom-corner.left-corner .menuRadial {
    translate: 0 -50%;
    border-top-right-radius: 50%;
  }

  .bottom-corner.right-corner .menuRadial {
    translate: -50% -50%;
    border-top-left-radius: 50%;
  }

  .top-corner.left-corner .elemento {
    translate: calc(200% / -3) calc(200% / -3);
  }

  .top-corner.right-corner .elemento {
    translate: calc(200% / 3) calc(200% / -3);
  }

  .bottom-corner.left-corner .elemento {
    translate: calc(200% / -3) calc(200% / 3);
  }

  .bottom-corner.right-corner .elemento {
    translate: calc(200% / 3) calc(200% / 3);
  }

  .top-corner .subelementos {
    -webkit-transform-origin-x: 50%;
  }

  .bottom-corner .subelementos {
    -webkit-transform-origin-x: 75%;
  }

  .left-corner .subelementos {
    -webkit-transform-origin-y: 50%;
  }

  .right-corner .subelementos {
    -webkit-transform-origin-y: 75%;
  }



  .logotipo {
    width: 130px;
    height: 130px;
    translate: 0 -202px;
  }

  .right-corner .logotipo {
    translate: -30px -202px;
  }



  .menuRadial {
    position: relative;
    overflow: hidden;
    margin: 0;
    padding: 0;

    width: 200px;
    height: 200px;

    border: 1px solid;
    background: var(--color);
  }

  .elemento {
    display: block;
    width: calc(200px * 2/3);
    height: calc(200px * 2/3);

    position: absolute;
    bottom: 50%;
    right: 50%;

    border-right: 1px solid;

    transform-origin: 100% 100% 0px;
    transform: rotate(var(--rotacion)) skew(var(--torsion));
  }

  .subelemento {
    transform-origin: var(--centroX) var(--centroY);
    transform: skew(calc(var(--torsion) * -1)) rotate(calc(var(--rotacion) * -1));
    width: 30px;
    height: 30px;

    position: relative;
    top: 60%;
    left: 30%;

    padding: 0;
    margin: 0;
    border: 0;
    background: transparent;
  }

  .background {
    width: 100%;
    height: 100%;
  }


  .panel-botones {
    position: absolute;
    top: 0;
    left: 0;
  }

  .boton-seguir {
    position: absolute;
    top: 187px;
    left: 15px;
    width: 30px;
    height: 30px;
    border: 1px solid;
    border-radius: 0;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
  }

  .boton-volver {
    position: absolute;
    top: 15px;
    left: 187px;
    width: 30px;
    height: 30px;
    border: 1px solid;
    border-radius: 0;
    border-bottom-left-radius: 50%;
    border-bottom-right-radius: 50%;
  }
</style>