<script>
  import { list } from "$lib/store/list";
  import Header from "$lib/components/header/Header.svelte";
  import "./styles.css";
  import { toTemporalInstant } from "@js-temporal/polyfill";
  import { fade } from "svelte/transition";
  export let data;
  // @ts-ignore
  Date.prototype.toTemporalInstant = toTemporalInstant;
</script>

<div class="app">
  <Header
    --color-header={$list.length % 2 === 0
      ? `var(--color-header-green)`
      : `var(--color-header-red)`}
  />

  {#key data.pathname}
    <main class="main" in:fade>
      <slot />
    </main>
  {/key}
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  .main {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 100px);
  }

  :global(a) {
    text-decoration: none;
    transition: all 0.1s linear;
  }

  :global(a:hover) {
    text-decoration: none;
    opacity: 0.7;
  }

  :global(a:hover.active) {
    text-decoration: underline;
    text-underline-offset: 5px;
    opacity: 0.7;
  }

  :global(.active) {
    text-decoration: underline;
    text-underline-offset: 5px;
  }
</style>
