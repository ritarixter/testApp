<script lang="ts">
  import { routes } from '$lib/constants/routes';
  export let data;
</script>

<svelte:head>
  <title>Blog</title>
  <meta name="description" content="Posts" />
</svelte:head>

<section>
  <h1>Posts</h1>
  <ul class="posts">
    {#each data.posts as { id, title } (id)}
      <li class="post">
      
        <a class="link" href={`${routes[1].path}/${id}`}>
            <span class="ids">{id}</span>
          {title}
        </a>
      </li>
    {/each}
  </ul>
</section>

<style>
.posts {
    padding: 0;
    margin: 0;
    list-style: none;
}

.post {
    margin-bottom: 15px;
}

.link {
    display: flex;
    align-items: center;
    gap: 5px;
}
.ids {
    border-radius: 4px;
    background: var(--color-secondary);
    color: var(--color-inverted-primary);
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    font-size: 12px;
}


</style>