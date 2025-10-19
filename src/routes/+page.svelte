<script lang="ts">
  import Guide from "$lib/components/Guide.svelte";
  import Story from "$lib/components/Story.svelte";
  import LostContact from "$lib/stories/lostContact.json";
  import Test from "$lib/stories/test.json";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const logContext = setContext("log", writable<string[]>([]));
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<main>
  <h1>Flagged Down</h1>

  <div class="log">
    <h1>Log</h1>
    <br />

    {#each $logContext as message, i}
      {@const sender = i % 2 === 0 ? "BROADCAST" : "YOU"}

      {sender}: {message}
      <br />
    {/each}
  </div>

  <div class="centre">
    <div class="flag">
      <Story story={Test} delay_ms={2000} />
    </div>
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

    min-width: 100vw;
    min-height: 100vh;
  }

  h1 {
    text-align: center;
  }

  .centre {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;
  }

  .flag {
    width: 30vw;
  }

  .log {
    position: fixed;
    top: 0;
    left: 0;

    width: 20vw;
    min-height: 3em;
    max-height: 75vh;
    padding: 8px;

    color: #fff;
    background-color: #888;
    font-family: monospace;

    overflow-y: scroll;
    scrollbar-width: 0;
    &::-webkit-scrollbar {
      display: none;
    }

    h1 {
      font-size: medium;
      margin: 0;
    }
  }
</style>
