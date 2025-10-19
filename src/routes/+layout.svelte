<script lang="ts">
  let { children }: WithChildren = $props();
</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&display=swap"
    rel="stylesheet"
  />
  <link href="favicon.svg" rel="icon" />
</svelte:head>

{@render children?.()}
