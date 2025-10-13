<script lang="ts">
  import Semaphore, { type Letter } from "$lib/components/Semaphore.svelte";

  const LETTERS: Letter[] = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<main>
  <h1>Flagged Down</h1>

  {#each LETTERS as letter (letter)}
    <Semaphore flag={letter} />
  {/each}
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
