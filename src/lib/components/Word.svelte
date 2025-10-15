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

  let letterIndex = $state(-1);
  let flag: [number, number] | Letter = $derived(
    (word[letterIndex]?.toUpperCase() as Letter) ?? [4, 4]
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
    if (letterIndex >= $data.word.length - 1) {
      loop.stop();
      return;
    }

    letterIndex++;
  });

  onDestroy(() => {
    loop.stop();
  });
</script>

<Semaphore {flag} />
