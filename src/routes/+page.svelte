<script lang="ts">
  import Guide from "$lib/components/Guide.svelte";
  import Story from "$lib/components/Story.svelte";

  import LostContact from "$lib/stories/lostContact.json";
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<main>
  <h1>Flagged Down</h1>

  <div class="centre">
    <div class="flag">
      <Story story={LostContact} delay_ms={2000} />
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

    width: 100vw;
    height: 100vh;
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
</style>
