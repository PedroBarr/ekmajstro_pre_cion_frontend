<script lang='ts'>
  // exportar dependencias
  export let retorno = () => {};

  // importar dependencias nativas
  import { onMount } from 'svelte';

  // importar dependencias propias
  import { api } from '../../../assets/static/code/app.js';
  
  const delta_redireccion: number = 800;
  let url_icono: string;
  let titulo: string;
  let mensaje: string;
  const descripcion: string = "En un momento serás redirigido a la página principal.";

  onMount(() => {
    fetch(api + '/404')
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (data.icono) {
            url_icono = data.icono;
          }
          if (data.titulo) {
            titulo = data.mensaje;
          }
          if (data.mensaje) {
            mensaje = data.descripcion;
          }
        }
      })
      .catch(error => {
        console.error('Error fetching 404 data:', error);
      })
      .finally(() => {
        setTimeout(() => {
          retorno();
        }, delta_redireccion);
      });
  });
</script>

<div class="container">
  {#if url_icono}
  <div class="background">
    <div>
      <img src={url_icono} alt="Icono de error" id="icono" on:load={() => {
        setTimeout(() => {
          document.querySelector('#icono').insertAdjacentHTML('afterend', '<span></span>');
        }, 2);
      }} />
    </div>
  </div>
  {/if}
  <div class="content">
    <div class="title">
      {#if titulo}
      <h1>{titulo}</h1>
      {:else}
      <h1>404</h1>
      {/if}
    </div>
    <div class="message">
      {#if mensaje}
      <p>{mensaje}</p>
      {/if}
      <span>{descripcion}</span>
    </div>
  </div>
</div>

<style>
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

  .background div:has(span) img {
    --color-luz: #fa5a65aa;

    animation: incrementarFactor 1s;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
    transition: --factor 1s;
    filter: contrast(calc(1 * var(--factor))) blur(calc(10px * (1 - var(--factor)))) drop-shadow(-3px -3px calc(43px * var(--factor)) var(--color-luz));
  }

  @property --factor{
    syntax: '<number>';
    inherits: false;
    initial-value: 0;
  }

  @keyframes incrementarFactor {

    from {
      --factor: 0;
    }

    to {
      --factor: 1;
    }

  }

</style>