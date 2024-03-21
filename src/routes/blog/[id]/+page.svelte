<script lang="ts">
  import { routes } from "$lib/constants/routes";
  export let data;
</script>

<svelte:head>
  <title>{data.post.title}</title>
  <meta name="description" content={data.post.body} />
</svelte:head>

<section class="container">
  <div class="post">
    <h1>{data.post.title}</h1>
    <p>{data.post.body}</p>
  </div>
  <aside>
    <h2>Other posts</h2>
    <ul class="posts">
      {#each data.posts.filter(({ id }) => id !== data.post.id) as { id, title } (id)}
        <li>
          <a href={`${routes[1].path}/${id}`}>
            {title}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
</section>

<style>
  .container {
    display: flex;
    gap: 30px;
  }

  .post {
    width: 70%;
  }

  .posts {
    padding-left: 15px;
    color: var(--color-secondary);
  }
</style>
