<script lang="ts">
  import Guide from "$lib/components/Guide.svelte";
  import Semaphore from "$lib/components/Semaphore.svelte";

  let orientations: [number, number] = $state([0, 0]);

  let selected: 0 | 1 = 0;
  function onKeyDown(event: KeyboardEvent): void {
    if (event.code.startsWith("Arrow")) {
      event.preventDefault();
    }

    switch (event.code) {
      case "ArrowUp": {
        orientations[selected]++;
        break;
      }
      case "ArrowDown": {
        orientations[selected]--;
        break;
      }
      case "ArrowLeft": {
        selected = 0;
        break;
      }
      case "ArrowRight": {
        selected = 1;
        break;
      }
    }
  }
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<svelte:document onkeydown={onKeyDown} />

<main>
  <h1>Flagged Down</h1>

  <div class="centre">
    <p>Use Left and Right arrows to select the arm</p>
    <p>
      Use the Up and Down arrows to rotate Clockwise and Anti-Clockwise
      respectively
    </p>
    <div class="flag">
      <Semaphore flag={orientations} />
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
    width: 50vw;
  }
</style>
