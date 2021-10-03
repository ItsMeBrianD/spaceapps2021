<script>
  import { getDateRows, noop, uuid } from "$lib/utils/date-time";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  // props
  export let date;
  export let month;
  export let year;
  export let isAllowed;

  // local vars to help in render
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  let cells;

  // function helpers
  const onChange = date => {
    dispatch("datechange", new Date(year, month, date));
  };

  const allow = (year, month, date) => {
    if (!date) return true;
    return isAllowed(new Date(year, month, date));
  };

  $: cells = getDateRows(month, year).map(c => ({
    value: c,
    allowed: allow(year, month, c)
  }));
</script>

<style lang="postcss">
  .container {
    @apply mt-2 p-3 w-full z-10;
  }
  * {
    @apply select-none;
  }
  .row {
    @apply flex my-1 mx-1 flex-wrap;
  }
  .cell {
    @apply inline-flex justify-center items-center w-1/7 h-8 text-center p-1;
  }
  .selected {
    @apply bg-primary-500 text-gray-500;
  }

  .highlight {
    transition: transform 0.2s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .disabled {
    @apply bg-gray-400 cursor-not-allowed text-red-600;
  }

  .highlight:hover {
    @apply bg-primary-400 cursor-pointer scale-125 text-gray-500;
  }

  .selected.highlight:hover {
    @apply bg-primary-800;
  }
</style>

<div class="container">
  <div class="row">
    {#each weekdays as day}
      <div class="cell">{day}</div>
    {/each}
  </div>

  <div class="row">
    {#each cells as { allowed, value } (uuid())}
      <div
        on:click={allowed && value ? onChange.bind(this, value) : noop}
        class:cell={true}
        class:highlight={allowed && value}
        class:disabled={!allowed}
        class:selected={new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() === new Date(year, month, value).getTime()}>
        {value || ''}
      </div>
    {/each}
  </div>
</div>
