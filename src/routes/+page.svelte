<script lang="ts">
  import Guide from "$lib/components/Guide.svelte";
  import type { Letter } from "$lib/components/Semaphore.svelte";
  import Semaphore from "$lib/components/Semaphore.svelte";

  let flag: Letter = $state("A");
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<main>
  <h1>Flagged Down</h1>

  <input
    maxlength="1"
    onkeyup={(event) => {
      const value = event.currentTarget.value as Letter;

      if (/^[A-Z]$/.test(value)) {
        flag = value;
      }
    }}
  />
  <div class="flag">
    <Semaphore {flag} />
  </div>
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
