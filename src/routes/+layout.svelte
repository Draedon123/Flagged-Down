<script lang="ts">
  let { children }: WithChildren = $props();
</script>

<svelte:head>
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

{@render children?.()}
