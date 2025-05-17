<script lang='ts'>
  // exportar dependencias
  export let id;
  export let setConsigna = (_: string) => {};
  export let trazaIgnota = () => {};
  
  // importar dependencias nativas
  import { onMount } from 'svelte';
  import { bind } from 'svelte/internal';

  // importar dependencias propias
  import { api } from '../../../assets/static/code/app.js';
  
  // importar componentes
  import TagLineViewer from '../../components/features/feature_publicacion/TagLineViewer.svelte';
  import PostSectionsContainer from '../../components/features/feature_publicacion/PostSectionsContainer.svelte';
  import DialogImage from '../../components/features/feature_emergentes/DialogImage.svelte';
  import ResourceMenu from '../../components/features/feature_recursos/ResourceMenu.svelte';


  let portada, etiquetas, seccion_marcada, secciones, titulo, recursos;
  let emergente_apertura: boolean = false;

  onMount(
    async ( ) => {
      
      /*
      * Obtener publicacion
      */
     fetch(api + '/entrada/' + id)
     .then(response => response.json() )
     .then(data => {
       console.log(data);
       
        if (data) {
          if (data.titulo) {
          titulo = data.titulo;
          setConsigna('\u269E ' + titulo + ' \u269F');
          }
          
          if (data.portada) {
              portada = data.portada;
          }

          if (data.etiquetas) {
            etiquetas = data.etiquetas;
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
                secciones.push(seccion);
            });

          }

          if (
            data.recursos &&
            data.secciones.length &&
            data.secciones.length > 0
          ) {
            recursos = data.recursos.map((recurso: any) => ({
              titulo: recurso.rec_nombre,
              descripcion: recurso.rec_descripcion,
              especificacion: recurso.especificaciones.espc_descripcin,
              tipo: recurso.tipos.tp_rec_diminutivo,
              archivo: recurso.archivos.arch_uri,
            }));
          }
        }
      })
      .catch((error) => {
        console.error('Error al obtener la publicación:', error);
        trazaIgnota();
      });
    }
  );
</script>

<div class="container">
  {#if portada}
  <div class="portada-envoltura">
    <button
      class="boton-portada"
      on:click={() => (emergente_apertura = true)}
    >
      <img
        alt="Portada de la publicacion "
        class="imagen-portada"
        src={ portada }
      />
    </button>

    <DialogImage
      bind:emergente_apertura
      imagen={ portada }
      pie_imagen="Portada de la publicación {titulo}"
    >
    </DialogImage>
  </div>
  {:else}
    <div class="no-portada-caja">
    </div>
  {/if}

  {#if etiquetas}
    <TagLineViewer
      { etiquetas }
    />
  {/if}

  <div class="publicacion-contenido">
    {#if secciones || seccion_marcada}
    <PostSectionsContainer
      { seccion_marcada }
      { secciones }
    />
    {/if}
  </div>
  
  {#if recursos && recursos.length}
    <ResourceMenu
      { recursos }
    />
  {/if}
</div>

<style>
  .container {
    --margin-page-bottom: 65px;
    width: 100%;
    margin-bottom: var(--margin-page-bottom);
  }
  
  .portada-envoltura {
    width: 100%;
    height: 50vh;
    overflow: hidden;
    
    display: flex;
    align-items: center;
  }
  
  .boton-portada {
    width: 100%;
    
    border: none;
    padding: 0;
    cursor: grab;
  }

  .imagen-portada {
    width: 100%;
    height: fit-content;
  }

  .publicacion-contenido {
    width: 100%;
    display: flex;
    gap: 25px;
    
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .no-portada-caja {
    display: block;
    width: 100%;
    height: 25vh;
  }
</style>
