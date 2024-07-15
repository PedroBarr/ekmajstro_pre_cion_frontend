<script>
  // exportar dependencias
  export let buttonClass = '';
</script>

<form class="container">
  <div class="input-group">
    <div class="icon-wrapper">
      <svg
          viewBox="0 0 24 24"
          focusable="false"
          class="text-partner-icon">
        <path
            fill="currentColor"
            d="M23.384,21.619,16.855,15.09a9.284,9.284,0,1,0-1.768,
                1.768l6.529,6.529a1.266,1.266,0,0,0,1.768,0A1.251,
                1.251,0,0,0,23.384,21.619ZM2.75,9.5a6.75,6.75,0,1,
                1,6.75,6.75A6.758,6.758,0,0,1,2.75,9.5Z">
        </path>
      </svg>
    </div>

    <input
        placeholder="Ingrese datos relacionados al recurso..."
        value=""
        class="grouped-input" />
  </div>

  <div class="flex-row flex-align-center box100 flex-around">
    <button
        disabled
        type="submit"
        class={"bottom-side-button " + buttonClass}>
      Buscar
    </button>
  </div>
</form>

<style>
  .container {
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    align-items: center;
    width: 60%;
    margin-top: 1rem;
    row-gap: 1rem;
  }

  .input-group {
    width: 100%;
    display: flex;
    position: relative;
    color: rgb(118, 118, 118);
  }

  .icon-wrapper {
    left: 0px;
    width: 1.5rem;
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    position: absolute;
    top: 0px;
    z-index: 2;
    pointer-events: none;
  }

  .text-partner-icon {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    line-height: 1em;
    flex-shrink: 0;
    color: currentcolor;
    vertical-align: middle;
  }

  .grouped-input {
    width: 100%;
    outline: 0px;
    position: relative;
    appearance: none;
    transition: all 0.2s ease 0s;
    font-size: 1rem;
    padding-left: 3rem;
    padding-right: 1rem;
    height: 2.5rem;
    border-radius: 0.375rem;
    border-width: 1px;
    border-style: solid;
    border-image: initial;
    background: inherit;
    color: #ddd;
  }

  button[disabled] {
    opacity: 0.4;
    cursor: not-allowed;
    box-shadow: none;
  }

  .bottom-side-button {
    position: relative;
    
    appearance: none;
    background: #545a70;
    
    -webkit-box-align: center;
    -webkit-box-pack: center;
    
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    transition: all 250ms ease 0s;
    
    user-select: none;
    outline: none;
    
    white-space: nowrap;
    vertical-align: middle;
    line-height: 1.2;
    
    width: auto;
    height: 2.5rem;
    min-width: 75%;
    
    font-weight: 600;
    font-size: 1rem;
    color: rgb(218, 218, 218);
    
    border-radius: 0.375rem;
    
    padding-left: 1rem;
    padding-right: 1rem;
  }

</style>