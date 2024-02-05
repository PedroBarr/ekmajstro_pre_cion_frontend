<script>
  import SearchBox from '../../components/core/SearchBox.svelte';
</script>

<div class="container">
  <div class="search-box-wrapper">
    <div class="search-box-inner">
      <SearchBox />
    </div>
  </div>
</div>

<style>

  .container {
    width: 100%;
    height: fit-content;
    margin-top: 60px;
  }

  .search-box-wrapper {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .search-box-inner {
    width: 80%;
    height: fit-content;
    display: flex;
    justify-content: center;
  }

</style>