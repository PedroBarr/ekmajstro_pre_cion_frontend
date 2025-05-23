<script lang='ts'>
  // exportar dependencias
  export let emergente_apertura: boolean;
  export let id: string = null;
  export let enlace: string = '';

  // importar dependencias nativas
  import { onMount } from 'svelte';

  // importar dependencias propias
  import { api, base } from '../../../../assets/static/code/app';
  import { anchorFunction } from '../../../services/shared/utils_web';

  // importar componentes
  import PostSection from '../feature_publicacion/PostSection.svelte';

  const ES_MOVIL = window.innerWidth <= 768;

	let emergente: any;
  
  let marco: string = "";
  let icono: string = "";
  let esquina_superior_izquierda: string = "";
  let esquina_superior_derecha: string = "";
  let esquina_inferior_izquierda: string = "";
  let esquina_inferior_derecha: string = "";
  let color_marco: string = "";

  let titulo: string = "";
  let portada: string = "";
  let etiquetas: string[] = [];
  let recursos: string[] = [];
  let secciones: string[] = [];
  let seccion_marcada: any = null;

  const cargarPrevisualizacion = async ( ) => {
    if (id) {
      fetch(api + '/entrada/' + id)
        .then(response => response.json() )
        .then(data => {
          console.log(data);
       
          if (data) {

            if (data.titulo) titulo = data.titulo;
            if (data.portada) portada = data.portada;
            if (
              data.etiquetas &&
              data.secciones.length &&
              data.secciones.length > 0
            ) {
              etiquetas = data.etiquetas.map((etiqueta: any) => etiqueta.etq_nombre);
            }

            if (
              data.secciones &&
              data.secciones.length &&
              data.secciones.length > 0
            ) {
              secciones = [];

              data.secciones.forEach((seccion: any) => {
                if (seccion.secciones_marcadas_exists)
                  seccion_marcada = seccion;
                else
                  secciones.push(seccion.secc_nombre);
              });
            }

            if (
              data.recursos &&
              data.recursos.length &&
              data.recursos.length > 0
            ) {
              recursos = data.recursos.map((recurso: any) => recurso.rec_nombre);
            }
          }
        })
      ;
    }
  };

  onMount(
    async ( ) => {
      fetch(api + '/emergentes/previsualizacion')
        .then(response => response.json() )
        .then(data => {
          console.log(data);

          if (data) {
            if (data.decoracion_url) {
              esquina_superior_izquierda = data.decoracion_url;
              esquina_superior_derecha = data.decoracion_url;
              esquina_inferior_izquierda = data.decoracion_url;
              esquina_inferior_derecha = data.decoracion_url;
            }

            if (data.icono_url) icono = data.icono_url;
            if (data.color_marco) color_marco = data.color_marco;
          }
        })
      ;
    }
  );

	$: if (emergente && emergente_apertura == true && id) {
    emergente.showModal();
    cargarPrevisualizacion();
  };
</script>

<dialog
	bind:this={emergente}
	on:close={() => (emergente_apertura = false)}
	on:click|self={() => emergente.close()}
  class="fondo-dialogo"
  style="--color-decorado: {color_marco}"
>
  <div
    on:click|stopPropagation
    class="contenido-dialogo"
  >
    {#if esquina_superior_izquierda}
      <img
        class="esquina esquina-superior esquina-izquierda"
        alt="Esquina superior izquierda"
        src={ esquina_superior_izquierda }
      />
    {/if}
    
    {#if esquina_superior_derecha}
      <img
        class="esquina esquina-superior esquina-derecha"
        alt="Esquina superior derecha"
        src={ esquina_superior_derecha }
      />
    {/if}
    
    {#if icono}
      <div class="icono-emergente-envoltura">
        <img
          class="icono-emergente"
          alt="Icono emergente"
          src={ icono }
        />
      </div>
    {/if}

    {#if esquina_inferior_izquierda}
      <img
        class="esquina esquina-inferior esquina-izquierda"
        alt="Esquina inferior izquierda"
        src={ esquina_inferior_izquierda }
      />
    {/if}
    
    {#if esquina_inferior_derecha}
      <img
        class="esquina esquina-inferior esquina-derecha"
        alt="Esquina inferior derecha"
        src={ esquina_inferior_derecha }
      />
    {/if}

    {#if titulo}
    <div class="previsualizacion-titulo-envoltura">
      <span class="previsualizacion-titulo">
        { titulo }
      </span>

      <button
        class="boton-continuar"
        on:click={() => anchorFunction(base + enlace, false)}
      >
        <img
          class="icono_continuar"
          src="{base}/icons/utils/play.svg"
          alt="Boton seguir anuncio"
        />
      </button>
    </div>
    {/if}
    
    <div class="contenido-publicacion">
      <div class="previsualizacion-principal-envoltura">
        {#if seccion_marcada}
          <PostSection
            seccion={ seccion_marcada }
          />
        {/if}
      </div>

      {#if ES_MOVIL}
        <div class="icono-divisor">
          <img
            class="icono-emergente"
            alt="Icono emergente"
            src={ icono }
          />
        </div>
      {/if}

      <div class="previsualizacion-detalles-envoltura">
        {#if portada}
          <div
            class="portada-contenedor"
          >
            <span
              class="portada-titulo"
            >
              Portada de la publicación
            </span>

            <div
              class="portada-envoltura"
            >
              <img
                alt="Portada"
                class="portada-imagen"
                src={ portada }
              />
            </div>
          </div>
        {/if}

        {#if etiquetas && etiquetas.length}
          <div class="parte-envoltura">
            <span class="parte-titulo">
              Etiquetas
            </span>
            
            <ul class="parte-etiquetas-envoltura">
              {#each etiquetas as etiqueta, indice}
                <li
                  class="parte-etiqueta"
                  class:parte-par={indice % 2 == 0}
                >
                  { etiqueta }
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if secciones && secciones.length}
          <div class="parte-envoltura">
            <span class="parte-titulo">
              Secciones
            </span>
            
            <ul class="parte-etiquetas-envoltura">
              {#each secciones as seccion, indice}
                <li
                  class="parte-etiqueta"
                  class:parte-par={indice % 2 == 0}
                >
                  { seccion }
                </li>
              {/each}
            </ul>
          </div>
        {/if}

        {#if recursos && recursos.length}
          <div class="parte-envoltura">
            <span class="parte-titulo">
              Recursos
            </span>
            
            <ul class="parte-etiquetas-envoltura">
              {#each recursos as recurso, indice}
                <li
                  class="parte-etiqueta"
                  class:parte-par={indice % 2 == 0}
                >
                  { recurso }
                </li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    </div>
  </div>
</dialog>

<style>
  .fondo-dialogo::backdrop {
		background: #1a1f2af1;
    cursor: grab;
	}

  .fondo-dialogo {
    --color-remarcado: var(--color-decorado);
    --border-size: 15px;
    --width-size: 90vw;
    --height-size: 85vh;

    width: var(--width-size);
    height: var(--height-size);

    background-color: transparent;

    padding: 0;
    border: none;

    overflow: unset;
  }

  .contenido-dialogo {
    height: -webkit-fill-available;
    width: -webkit-fill-available;

    display: flex;
    flex-direction: column;
    row-gap: 10px;

    border-width: var(--border-size);
    border-style: solid;
    border-color: var(--color-remarcado);

    background-color: #555;

    padding: 0 10px;

    position: relative;
  }

  .contenido-publicacion {
    display: flex;
    flex-direction: row;
    
    overflow: overlay;
  }

  .previsualizacion-titulo-envoltura {
    width: -webkit-fill-available;
    padding: 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    position: relative;
  }
  
  .previsualizacion-principal-envoltura {
    width: 75%;
  }
  
  .previsualizacion-detalles-envoltura {
    width: 25%;

    padding-bottom: 20px;
  }

  .previsualizacion-principal-envoltura,
  .previsualizacion-detalles-envoltura {
    display: flex;
    flex-direction: column;
    gap: 15px;

    overflow: auto;
  }

  .portada-envoltura {
    width: -webkit-fill-available;
    padding: 5px;

    display: flex;
  }
  
  .portada-imagen {
    width: -webkit-fill-available;
    background-color: #d2b7f7;

    border: solid #444 1px;
    border-radius: 10px;
  }

  .previsualizacion-titulo {
    font-size: x-large;
  }
  
  .portada-titulo {
    font-size: 13px;
  }

  .portada-titulo,
  .parte-titulo {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5px;

    background-color: var(--color-remarcado);
    border-radius: 5px;
  }

  .portada-titulo,
  .parte-titulo,
  .previsualizacion-titulo {
    font-family: system-ui;
    text-transform: uppercase;

    color: white;
    -webkit-text-stroke: thick;

    letter-spacing: 3px;
  }

  .portada-contenedor {
    padding: 20px 0;
  }

  .parte-etiquetas-envoltura {
    margin: 15px 0 10px;
  }

  .parte-etiqueta {
    font-family: system-ui;
    text-transform: capitalize;
    font-size: 14px;

    color: white;
    -webkit-text-stroke: medium;
    
    letter-spacing: 2px;
  }
  
  .parte-etiqueta:not(.parte-par) {
    list-style-type: disclosure-closed;
    list-style-type: circle;
    /* list-style-position: inside; */
  }
  
  .parte-etiqueta.parte-par {
    list-style-type: disclosure-open;
    list-style-type: disc;
  }

  .parte-etiqueta::marker {
  }

  .boton-continuar {
    padding: 5px 4px 3px 7px;

    background-color: var(--color-remarcado);
    color: white;
    cursor: pointer;

    border: none;
    border-radius: 50%;

    width: 50px;
    height: 50px;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 10px;

    position: absolute;
    right: 10px;
  }

  .icono_continuar {
    height: -webkit-fill-available;
  }

  .esquina {
    position: absolute;
    
    width: calc(var(--border-size) * 4);
    height: calc(var(--border-size) * 4);

    -webkit-transform: scaleX(var(--reflect-X)) scaleY(var(--reflect-Y));
    transform: scaleX(var(--reflect-X)) scaleY(var(--reflect-Y));
  }

  .esquina-inferior {
    --reflect-Y: 1;
    bottom: calc(var(--border-size) * (-3));
  }

  .esquina-derecha {
    --reflect-X: 1;
    right: calc(var(--border-size) * (-3));
  }
  
  .esquina-izquierda {
    --reflect-X: -1;
    left: calc(var(--border-size) * (-3));
  }
  
  .esquina-superior {
    --reflect-Y: -1;
    top: calc(var(--border-size) * (-3));
  }

  .icono-emergente-envoltura {
    --padding-icono: 5px;
    padding: var(--padding-icono);

    position: absolute;
    bottom: calc((var(--border-size) * (-3)) + (var(--padding-icono) * (0)));
    left: 50%;
    right: 50%;


    width: calc((var(--border-size) * 3) + (var(--padding-icono) * 2));
    height: calc((var(--border-size) * 3) + (var(--padding-icono) * 2));

    border-radius: 50%;
    background-color: var(--color-remarcado);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icono-emergente {
    width: 80%;
    filter: invert(0.5) brightness(0.5);
  }
  
  ::-webkit-scrollbar {
    display: none;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .fondo-dialogo {
      --width-size: 80vw;
      --height-size: 85vh;

      --border-size: 5px;
    }

    .contenido-dialogo {
      width: var(--width-size);
      height: var(--height-size);

      padding: 0 5px;
    }

    .contenido-publicacion {
      flex-direction: column;
    }

    .previsualizacion-principal-envoltura,
    .previsualizacion-detalles-envoltura {
      width: 100%;
    }

    .previsualizacion-titulo-envoltura {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .previsualizacion-titulo {
      font-size: 14px;
    }

    .boton-continuar {
      width: 40px;
      height: 40px;

      position: relative;
      right: 0;
      left: 0;
    }

    .icono-divisor {
      margin: 5px 0;
      --padding-icono: 3px;
      padding: calc(2 * var(--padding-icono)) var(--padding-icono);

      width: 30px;
      height: 30px;

      border-radius: 50%;
      background-color: var(--color-remarcado);

      display: flex;
      align-items: center;
      justify-content: center;

      align-self: center;
    }

    .portada-contenedor {
      padding: 0;
    }
  }

</style>