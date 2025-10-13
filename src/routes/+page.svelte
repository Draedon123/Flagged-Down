<script lang="ts">
  import Guide from "$lib/components/Guide.svelte";
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<main>
  <h1>Flagged Down</h1>

  <Guide />
</main>

<style lang="scss">
  :global(body) {
    margin: 0;
    overflow: hidden scroll;
    color: #000;
    background-color: #fff;
    min-height: 100vh;

    scrollbar-width: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  main {
    padding: 8px;
  }

  h1 {
    text-align: center;
  }
</style>
