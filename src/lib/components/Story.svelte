<script lang="ts" module>
  type Story = {
    broadcast: string;
    replies: string[];
  }[];

  export type { Story };
</script>

<script lang="ts">
  import Semaphore, { FLAGS } from "./Semaphore.svelte";

  import Word from "./Word.svelte";

  type Props = {
    story: Story;
    delay_ms: number;
  };

  let { story, delay_ms }: Props = $props();

  let stageIndex = $state(0);
  let stage = $derived(story[stageIndex]);
  let action: "receive" | "send" = $state("receive");
  let _interpretation = $state("");
  let interpretation = $derived(_interpretation.toUpperCase());
  let orientation: [number, number] = $state([4, 4]);
  let selectedArm = 0;
  let response = $state("");
  let error = $state("");

  function check(): void {
    const correct =
      interpretation.replaceAll(" ", "") ===
      stage.broadcast.replaceAll(" ", "");

    if (correct) {
      action = "send";
    }
  }

  function sendFlag(): void {
    const letters = Object.entries(FLAGS);
    const letter = letters.find(
      ([key, value]) =>
        (8 + (orientation[0] % 8)) % 8 === value[0] &&
        (8 + (orientation[1] % 8)) % 8 === value[1]
    );

    if (letter !== undefined) {
      error = "";
      response += letter[0];
      orientation = [4, 4];
    } else {
      error = "Invalid flag combination!";
    }
  }

  function sendMessage(): void {
    if (stage.replies.includes(response)) {
      error = "";
      stageIndex++;
      action = "receive";
      _interpretation = "";
    } else {
      error = "Invalid response!";
    }
  }

  function onKeyDown(event: KeyboardEvent): void {
    const code = event.code;

    if (!code.startsWith("Arrow") || action !== "send") {
      return;
    }

    event.preventDefault();
    switch (code) {
      case "ArrowLeft": {
        selectedArm = 0;
        break;
      }
      case "ArrowRight": {
        selectedArm = 1;
        break;
      }
      case "ArrowUp": {
        orientation[selectedArm]++;
        break;
      }
      case "ArrowDown": {
        orientation[selectedArm]--;
        break;
      }
    }
  }
</script>

<svelte:document onkeydown={onKeyDown} />

<div class="container">
  {#if action === "receive"}
    <Word word={stage.broadcast} {delay_ms} />
  {:else}
    <Semaphore flag={orientation} />
  {/if}
  {#if action === "receive"}
    <label for="interpretation">
      <p>What did they send?</p>

      <input
        name="interpretation"
        id="interpretation"
        bind:value={_interpretation}
      />
    </label>

    <button onclick={check}>Check</button>
  {:else}
    <p>Send a response back!</p>
    <ul>
      {#each stage.replies as reply (reply)}
        <li>{reply}</li>
      {/each}
    </ul>

    <p>
      Use the left and right arrows to select the left and right flags
      respectively
    </p>
    <p>
      Use the up and down arrows to rotate the selected arm clockwise and
      anti-clockwise respectively
    </p>

    <p>Your message: {response}</p>

    {#if error !== ""}
      <p style="color: red">{error}</p>
    {/if}
    <button onclick={sendFlag}>Send Flag</button>
    <button onclick={sendMessage}>Finalise Message</button>
  {/if}
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;

    width: 100%;
    height: 100%;

    text-align: center;
  }

  ul {
    text-align: left;
  }
</style>
