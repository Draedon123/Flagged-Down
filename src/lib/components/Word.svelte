<script lang="ts">
  import { onMount } from "svelte";
  import Semaphore, { REST_FLAG, type Letter } from "./Semaphore.svelte";
  import { writable } from "svelte/store";

  type Props = {
    word: string;
    delay_ms: number;
    letterIndex?: number;
  };

  let { word, delay_ms, letterIndex = $bindable(0) }: Props = $props();

  let data = writable({
    word,
  });

  let resting = $state(true);
  let flag: [number, number] | Letter = $derived(
    resting
      ? [REST_FLAG[0], REST_FLAG[1]]
      : (word[letterIndex]?.toUpperCase() as Letter)
  );

  let handle: NodeJS.Timeout | null = null;

  export function nextLetter(): void {
    if (handle !== null) {
      clearTimeout(handle);
      handle = null;
    }

    resting = true;
    letterIndex++;
    handle = setTimeout(() => {
      resting = false;
      handle = setTimeout(() => {
        resting = true;
      }, delay_ms);
    }, delay_ms);
  }

  $effect(() => {
    $data.word = word;
  });

  data.subscribe(() => {
    letterIndex = -1;
  });

  onMount(() => {
    nextLetter();
  });
</script>

<Semaphore {flag} />
