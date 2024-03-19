<script>
  import { list } from "../store/list";
  import Header from "./Header.svelte";
  import "./styles.css";
  import { toTemporalInstant } from "@js-temporal/polyfill";
  // @ts-ignore
  Date.prototype.toTemporalInstant = toTemporalInstant;
</script>

<div class="app">
  <Header
    --color-header={$list.length % 2 === 0
      ? `var(--color-header-green)`
      : `var(--color-header-red)`}
  />

  <main class="main">
    <slot />
  </main>
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
</style>
