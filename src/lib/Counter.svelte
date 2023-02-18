<script>
  let cuenta = 0
  const incremento = () => {
    cuenta += 1
  }
</script>

<button on:click={incremento}>
  Contador de ejemplo va en: {cuenta}
</button>