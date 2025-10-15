<script lang="ts">
  import { Loop } from "$lib/Loop";
  import { onDestroy, onMount } from "svelte";
  import Semaphore, { type Letter } from "./Semaphore.svelte";
  import { writable } from "svelte/store";

  type Props = {
    word: string;
    delay_ms: number;
  };

  let { word, delay_ms }: Props = $props();

  let data = writable({
    word,
  });

  let letterIndex = $state(0);
  let resting = $state(true);
  let flag: [number, number] | Letter = $derived(
    resting ? [4, 4] : (word[letterIndex]?.toUpperCase() as Letter)
  );

  const loop = new Loop({
    deltaTime_ms: delay_ms,
  });

  $effect(() => {
    $data.word = word;
  });

  data.subscribe(() => {
    letterIndex = -1;
    loop.start(false);
  });

  loop.addCallback(() => {
    if (letterIndex >= $data.word.length - 1 && resting) {
      loop.stop();
      return;
    }

    if (resting) {
      letterIndex++;
    }

    resting = !resting;
  });

  onDestroy(() => {
    loop.stop();
  });
</script>

<Semaphore {flag} />
