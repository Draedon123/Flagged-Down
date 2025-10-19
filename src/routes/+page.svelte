<script lang="ts">
  import Guide from "$lib/components/Guide.svelte";
  import Story, { type StoryData } from "$lib/components/Story.svelte";
  import LostContact from "$lib/stories/lostContact.json";
  import TheListeningPost from "$lib/stories/theListeningPost.json";
  import Test from "$lib/stories/test.json";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";

  const stories: { name: string; story: StoryData }[] = Object.entries({
    "Lost Contact": LostContact,
    Test: import.meta.env.DEV ? Test : [],
    "The Listening Post": TheListeningPost,
  })
    .map(([name, story]) => {
      return {
        name,
        story,
      };
    })
    .filter((story) => story.story.length > 0)
    .sort((a, b) => a.name.localeCompare(b.name));
  const context: StoryContext = setContext(
    "story",
    writable({
      log: [],
    })
  );

  let storyComponent: Story;
  let storyState: "receive" | "send" | "end" = $state("receive");
  let storyIndex = $state("0");
  let selectedStory = $derived(stories[parseInt(storyIndex)]);

  function play(): void {
    storyComponent.reset();
  }
</script>

<svelte:head>
  <title>Flagged Down</title>
</svelte:head>

<main>
  <h1>Flagged Down</h1>

  <div class="log">
    <h1>Log</h1>
    <br />

    {#each $context.log as message, i (i)}
      {@const sender = i % 2 === 0 ? "BROADCAST" : "YOU"}

      {sender}: {message}
      <br />
    {/each}
  </div>

  <div class="centre">
    <div class="story" class:hidden={storyState === "end"}>
      <p>{selectedStory.name}</p>
      <Story
        story={selectedStory.story}
        delay_ms={2000}
        bind:action={storyState}
        bind:this={storyComponent}
      />
    </div>

    {#if storyState === "end"}
      <p>Story finished! Select new story?</p>
      <select bind:value={storyIndex}>
        {#each stories as story, i (story.name)}
          <option value={i}>{story.name}</option>
        {/each}
      </select>
      <button onclick={play}>Play</button>
    {/if}
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

    font-family: "Roboto Mono", monospace;
    background: radial-gradient(circle at 50% 40%, #bcd1e8, #b0b7c1);

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

  .story {
    width: 30vw;

    p {
      text-align: center;
    }
  }

  .log {
    position: fixed;
    top: 0;
    left: 0;

    width: 20vw;
    min-height: 3em;
    max-height: 75vh;
    padding: 8px;
    border-radius: 0 0 1em 0;

    color: #fff;
    background-color: #0042;

    box-shadow: #64646f33 0px 7px 29px 0px;
    font-family: "Roboto Mono" monospace;

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

  .hidden {
    display: none;
  }
</style>
