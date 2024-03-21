<script>
  import { routes } from "$lib/constants/routes";
  import { formatedTime, formatedDate } from "$lib/store/date";
  import { fly } from "svelte/transition";
  import { page } from "$app/stores";

  $: hh = $formatedTime.slice(0, 2);
  $: mm = $formatedTime.slice(3, 5);
  $: ss = $formatedTime.slice(6, 9);

  console.log($page.url.pathname);

  // Animation vars
  const duration = 180;
  const delay = 100;
  const y = 14;
  const minus_y = -14;
</script>

<header>
  <time datetime={$formatedDate}>{$formatedDate}</time>

  <nav>
    <ul class="nav">
      {#each routes as { path, name } (path)}
        <li>
          <a
            href={path}
            class="link"
            class:active={$page.url.pathname === path}
            aria-current={$page.url.pathname === path}>{name}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
  <div>
    <span class="value">
      {#key hh}
        <span
          class="value"
          in:fly={{ delay, duration, y }}
          out:fly={{ duration, y: minus_y }}>{hh}</span
        >
      {/key}
    </span>:<span class="value">
      {#key mm}
        <span
          class="value"
          in:fly={{ delay, duration, y }}
          out:fly={{ duration, y: minus_y }}>{mm}</span
        >
      {/key}
    </span>:<span class="value">
      {#key ss}
        <span
          class="value"
          in:fly={{ delay, duration, y: "5" }}
          out:fly={{ duration, y: minus_y }}>{ss}</span
        >
      {/key}
    </span>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    background-color: var(--color-header);
    padding: 17px 15px;
    height: 52px;
    box-sizing: border-box;
  }

  span.value {
    display: inline-flex;
    flex-flow: column;
  }

  .nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 10px;
  }
</style>
