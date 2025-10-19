<script lang="ts" module>
  import type { Letter } from "./Semaphore.svelte";
  import Semaphore from "./Semaphore.svelte";

  const LETTERS: Readonly<Letter[]> = [
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

<script lang="ts">
  let show = $state(true);
</script>

<div class="container" class:show>
  <div class="caret">
    <input
      type="image"
      src="arrow-right.svg"
      alt="Arrow"
      class:rotate={!show}
      onclick={() => {
        show = !show;
      }}
    />
  </div>
  <div class="flags">
    {#each LETTERS as letter (letter)}
      <div class="flag">
        <Semaphore flag={letter} />
        <p>{letter}</p>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  $backgorund-color: #0041;
  $background-colour-hover: #0042;
  $transition-time: 0.5s;

  .container {
    position: fixed;
    top: 0;
    right: 0;

    width: 33vw;
    height: 100vh;

    transition: width $transition-time cubic-bezier(0.65, 0, 0.35, 1);

    z-index: 999;

    &:not(.show) {
      width: 0;
    }
  }

  .flags {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: flex-start;

    width: 100%;
    height: 100%;
    padding-top: 8px;

    float: right;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: background-color 0.25s;

    background-color: $backgorund-color;
    &:hover {
      background-color: $background-colour-hover;
    }

    overflow-y: scroll;
    scrollbar-width: 0;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .flag {
    width: 5em;
    aspect-ratio: 1;
    margin: 0 0.5ch;

    p {
      text-align: center;
    }
  }

  .caret {
    position: absolute;
    top: 1em;
    right: 100%;
    border-radius: 5px;

    display: flex;
    height: max-content;
    font-size: medium;

    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    transition: background-color 0.25s;

    background-color: $backgorund-color;
    &:hover {
      background-color: $background-colour-hover;
    }

    input {
      font-size: medium;
      height: 4em;
      padding: 5px;

      transition: transform $transition-time ease-in-out;

      &.rotate {
        transform: rotate(180deg);
      }
    }
  }
</style>
