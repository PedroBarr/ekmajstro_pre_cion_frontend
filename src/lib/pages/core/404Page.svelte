<script lang='ts'>
  // exportar dependencias
  export let retorno = () => {};

  // importar dependencias nativas
  import { onMount } from 'svelte';
  
  const delta_redireccion: number = 800;

  onMount(() => {
    setTimeout(() => {
      retorno();
    }, delta_redireccion);
  });
</script>

<div class="container">
  <h1>404 - Página no encontrada</h1>
  <p>Lo sentimos, la página que buscas no existe.</p>
  <p>Serás redirigido a la página principal en {delta_redireccion / 1000} segundos.</p>
</div>

<style>
</style>