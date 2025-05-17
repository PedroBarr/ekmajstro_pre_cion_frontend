<script lang='ts'>
  // exportar dependencias
  export let retorno = () => {};

  // importar dependencias nativas
  import { onMount } from 'svelte';
  
  const delta_redireccion: number = 800;
  let url_icono: string;
  let titulo: string;
  let mensaje: string;
  const descripcion: string = "En un momento serás redirigido a la página principal.";

  const fakeAPI ={
    "error": "404",
    "titulo": "P&aacute;gina ignota",
    "mensaje": "Error 404: P&aacute;gina no encontrada",
    "icono": "http://localhost:8000/assets/img/icons/core/ekmajstro.svg",
    "descripcion": "La p&aacute;gina que buscas no existe o no se encuentra disponible. Si crees que esto es un error, por favor contacta al administrador del sitio."
  };

  onMount(() => {
    // Simulando una llamada a la API
    url_icono = fakeAPI.icono;
    titulo = fakeAPI.mensaje;
    mensaje = fakeAPI.descripcion;
    
    setTimeout(() => {
      // retorno();
    }, delta_redireccion);
  });
</script>

<div class="container">
  <div class="background">
    <div>
      <img src={url_icono} alt="Icono de error" />
    </div>
  </div>
  <div class="content">
    <div class="title">
      <h1>{titulo}</h1>
    </div>
    <div class="message">
      <p>{mensaje}</p>
      <span>{descripcion}</span>
    </div>
  </div>
</div>

<style>
  /*
  The style sheet must make the backgroud to be a layer background
  and the content a layer over the background
  */
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 90vh;
    width: -webkit-fill-available;
    position: relative;
  }

  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    display: flex;
    width: -webkit-fill-available;
    height: -webkit-fill-available;
    justify-content: center;
    align-items: center;
  }

  .background > div {
    width: 50vw;
  }

  .background img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }

  .content {
    position: relative;
    z-index: 1;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .title {
        font-size: 2.5rem;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .message {
    font-size: 1.5rem;
    height: 10%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -10%;
    gap: 20px;
  }

  .title h1 {
    margin: 0;
    font-size: 3rem;
    color: white;
    text-decoration-color: white;
    letter-spacing: 6px;
    word-spacing: 6px;
    font-family: system-ui;
    text-transform: uppercase;
    font-style: oblique;
    transform: skewY(-3deg) skewX(-6deg) rotate3d(3, -3, 1, 12deg) translateY(-6px);
    filter: drop-shadow(2px 4px 6px black);
    -webkit-text-stroke: thick;
  }

  .message span,
  .message p {
    margin: 0;
    font-family: system-ui;
    font-size: 1em;
    text-align: center;
    -webkit-text-stroke: medium;
    width: 50%;
    letter-spacing: 2px;
    filter: drop-shadow(4px 7px 4px var(--color-fondo));
  }

  .message span {
    font-size: 0.6em;
    -webkit-text-stroke: thin;
    opacity: 0.4;
  }

</style>