<script lang="ts" module>
  type Story = {
    broadcast: string;
    replies: string[];
  }[];

  export type { Story };
</script>

<script lang="ts">
  import { getContext } from "svelte";

  import Semaphore, { FLAGS, REST_FLAG } from "./Semaphore.svelte";
  import Word from "./Word.svelte";
  import type { Writable } from "svelte/store";

  type Props = {
    story: Story;
    delay_ms: number;
  };

  let { story, delay_ms }: Props = $props();

  let stageIndex = $state(0);
  let stage = $derived(story[stageIndex]);
  let action: "receive" | "send" | "end" = $state("receive");
  let letter = $state("");
  let letterIndex = $state(0);
  let broadcastWord: Word | null = $state(null);
  let orientation: [number, number] = $state([REST_FLAG[0], REST_FLAG[1]]);
  let selectedArm = 0;
  let response = $state("");
  let message: { message: string; error: boolean } = $state({
    message: "",
    error: false,
  });

  const logContext = getContext<Writable<string[]>>("log");

  function setMessage(_message: string = "", error: boolean = false) {
    message.message = _message;
    message.error = error;
  }

  function check(event: Event): void {
    event.preventDefault();

    setMessage();
    const correct = letter.toUpperCase() === stage.broadcast[letterIndex];

    if (correct) {
      if (letterIndex === 0) {
        $logContext.push("");
      }

      $logContext[$logContext.length - 1] += letter.toUpperCase();
      if (letterIndex === stage.broadcast.length - 1) {
        action = "send";
        return;
      }

      broadcastWord?.nextLetter();
      letter = "";
      setMessage("Correct!");
    } else {
      setMessage("Wrong letter", true);
    }
  }

  function sendFlag(): void {
    const letters = Object.entries(FLAGS);
    const letter = letters.find(
      ([_, letterOrientation]) =>
        (8 + (orientation[0] % 8)) % 8 === letterOrientation[0] &&
        (8 + (orientation[1] % 8)) % 8 === letterOrientation[1]
    );

    if (letter === undefined) {
      setMessage("Invalid flag combination!", true);
      return;
    }

    const newResponse = response + letter[0];

    if (!stage.replies.some((reply) => reply.startsWith(newResponse))) {
      setMessage(`No valid reply starts with, or is, "${newResponse}"!`, true);
      return;
    }

    setMessage();

    if (response === "") {
      $logContext.push("");
    }

    $logContext[$logContext.length - 1] += letter[0].toUpperCase();
    response += letter[0];
    orientation = [REST_FLAG[0], REST_FLAG[1]];
  }

  function sendMessage(): void {
    if (stage.replies.includes(response)) {
      setMessage();

      if (stageIndex === story.length - 1) {
        action = "end";
        return;
      }

      stageIndex++;
      action = "receive";
      letter = "";
      response = "";
    } else {
      setMessage("Invalid response!", true);
    }
  }

  function onKeyDown(event: KeyboardEvent): void {
    const code = event.code;

    if (code.startsWith("Arrow") && action === "send") {
      selectArm(event);
      return;
    }

    if (code === "Enter" && action === "send") {
      sendFlag();
    }
  }

  function selectArm(event: KeyboardEvent): void {
    event.preventDefault();
    switch (event.code) {
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
    <Word
      word={stage.broadcast}
      {delay_ms}
      bind:letterIndex
      bind:this={broadcastWord}
    />
  {:else if action === "send"}
    <Semaphore flag={orientation} />
  {/if}
  {#if action === "receive"}
    <label for="interpretation">
      <p>What letter did they send?</p>

      <form onsubmit={check} autocomplete="off">
        <input
          name="interpretation"
          id="interpretation"
          maxlength="1"
          bind:value={letter}
        />
      </form>
    </label>

    <button type="submit" onclick={check}>Check</button>
    {#if message.message !== ""}
      <p class:error={message.error}>{message.message}</p>
    {/if}
  {:else if action === "send"}
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
    <p>Click Enter to send flag</p>

    {#if message.message !== ""}
      <p class:error={message.error}>{message.message}</p>
    {/if}
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

  .error {
    color: red;
  }
</style>
