<script lang="ts">
  import delete_icon from "$lib/images/delete.svg";
  import { list } from "../store/list";
  import { Temporal } from "@js-temporal/polyfill";

  // vars
  let value: string = "";
  let error: boolean = false;
  let selected_date: Date | null = null;
  let duration: string = "";
  let stringDate: string | null = null;

  function isPlural(n: number, singular: string, plural: string) {
    return `${n} ${n === 1 ? singular : plural}`;
  }

  $: {
    if (selected_date) stringDate = selected_date.toLocaleString();
  }

  $: {
    if (stringDate !== null) {
      const browserCalendar = new Intl.DateTimeFormat().resolvedOptions()
        .calendar;
      const futureDate =
        Temporal.PlainDate.from(stringDate).withCalendar(browserCalendar);
      const today = Temporal.Now.plainDate(browserCalendar);
      const until = today.until(futureDate, { largestUnit: "day" });
      const dayString = isPlural(until.days, "day", "days");

      if (until.days > 0) {
        duration = `The selected date will come in ${dayString}`;
      } else if (until.days === 0) {
        duration = "The selected date is today";
      } else {
        duration = `The selected date was ${dayString.slice(1)} ago`;
      }
    }
  }

  const handleSubmit = () => {
    if (value) {
      list.add(value);
      error = false;
      value = "";
    } else {
      error = true;
    }
  };

  const handleDelete = (id: number) => {
    list.remove(id);
  };
</script>

<svelte:head>
  <title>Test App</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
  <form
    class="form"
    action="POST"
    name="form_list"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="container_input">
      <input
        type="text"
        class="input"
        bind:value
        class:error
        placeholder="Enter the text"
      />
      {#if error}
        <p class="warning">The field must be non-empty</p>
      {/if}
    </div>
    <button class="button" type="submit">Add</button>
  </form>
  <ul class="list">
    {#each $list as { id, content } (id)}
      <li class="item">
        <p class="item__content">{content}</p>
        <button
          type="button"
          class="button_delete"
          on:click={() => handleDelete(id)}
        >
          <img src={delete_icon} class="icon" alt="Иконка удаления" />
        </button>
      </li>
    {/each}
  </ul>
</section>

<div class="containerDate">
  <input type="date" class="input" bind:value={selected_date} />
  <span>{duration}</span>
</div>

<style>
  .form {
    max-width: 270px;
    width: 100%;
    display: flex;
    gap: 7px;
    margin-bottom: 17px;
  }

  .container_input {
    position: relative;
  }

  .input {
    outline: none;
    border: 1px solid var(--color-secondary);
    padding: 7px 10px;
    border-radius: 4px;
    box-sizing: border-box;
  }

  .button {
    padding: 7px 15px;
    box-sizing: border-box;
    background: var(--color-secondary);
    border: 1px solid var(--color-secondary);
    color: var(--color-inverted-primary);
    border-radius: 4px;
	width: 100%;
  }

  .button_delete {
    background: transparent;
    border: none;
    outline: none;
    width: 15px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .button,
  .button_delete {
    cursor: pointer;
    transition: opacity 0.2s linear;
  }

  .button:hover,
  .button_delete:hover {
    opacity: 0.7;
  }

  .error {
    border: 1px solid var(--color-error);
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-width: 270px;
    width: 100%;
  }

  .item {
    height: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--color-placeholder);
  }

  .item__content {
    max-width: 206px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .icon {
    width: 15px;
    height: 15px;
  }

  .warning {
    color: var(--color-error);
    font-size: 12px;
    margin: 0;
    padding: 0;
    position: absolute;
  }

  .containerDate {
    display: flex;
    align-items: center;
    gap: 15px;
  }
</style>
