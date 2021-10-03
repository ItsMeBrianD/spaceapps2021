<script lang='ts'>
  import {slide} from "svelte/transition";
  import { createEventDispatcher } from "svelte";
  import { getMonthName } from "$lib/utils/date-time";
  import Calendar from "./Calendar.svelte"

  const dispatch = createEventDispatcher();

  // props
  export let isAllowed = () => true;
  export let selected = new Date();

  // state
  let date, month, year, showDatePicker;

  // so that these change with props
  $: {
    date = selected.getDate();
    month = selected.getMonth();
    year = selected.getFullYear();
  }

  // handlers
  const onFocus = () => {
    showDatePicker = true;
  };

  const next = () => {
    if (month === 11) {
      month = 0;
      year = year + 1;
      return;
    }
    month = month + 1;
  };

  const prev = () => {
    if (month === 0) {
      month = 11;
      year -= 1;
      return;
    }
    month -= 1;
  };

  const onDateChange = d => {
    showDatePicker = false;
    dispatch("datechange", d.detail);
  };

  let el: HTMLElement;
  const handleBodyClick = (e: MouseEvent) => {
    if(!el.contains(e.target)) {
      showDatePicker = false;
    }
  }
</script>

<svelte:body on:click={handleBodyClick}/>

<div class="-relative" bind:this={el}>
  <span on:click={onFocus}>{selected.toDateString()}</span>
  {#if showDatePicker}
    <div class="box" transition:slide>
      <div class="month-name">
        <div class="center">
          <button on:click={prev}>Prev</button>
        </div>
        <div class="center">{getMonthName(month)} {year}</div>
        <div class="center">
          <button on:click={next}>Next</button>
        </div>
      </div>
      <Calendar
        {month}
        {year}
        date={selected}
        {isAllowed}
        on:datechange={onDateChange} />
    </div>
  {/if}
</div>


<style lang="postcss">
  .-relative {
    @apply relative w-full;
  }
  span {
    @apply block bg-light-gray-500 text-primary-500 w-full py-1 px-2 my-2 outline-none focus:bg-light-gray-600 cursor-pointer select-none;
  }
  .box {
    @apply absolute top-10 left-0 border-2 border-primary-500 inline-block bg-light-gray-700 pt-2;
  }
  .month-name {
    @apply flex justify-around items-center my-2 mx-0;
  }
  .center {
    @apply flex justify-center items-center;
  }
  * {
    @apply select-none;
  }
</style>
