<script lang="ts">
    import {getContext} from "svelte";

    import {availableDatasets, ContextKeys} from "$lib/utils/constants";
    import Select from "$lib/components/atoms/Select.svelte";
    import type {TleStore} from "../../../state/TleStore";
    import {WorldWindModule} from "../../../utils/WorldWindModule";
    import {
        currentTime, Increment, PlaybackManager, playing,
} from "../../../state/AppState";
    import {leftPad} from "../../../utils/time";
    


    const wasm: TleStore = getContext(ContextKeys.WasmStore);

    async function handleSelectDataset(e) {
        // This one's for you Zach
        WorldWindModule.yeet();

        if (!e.target.value) return;
        
        const newDatasetLocation = e.target.value;
        
        const newData = await fetch(newDatasetLocation).then(async r => r.text());
        wasm.updateValues(newData);

        wasm.getPositions(Math.floor($currentTime));

        e.target.blur();
    }

    function updateIncrement(i: Increment) {
        PlaybackManager.increment = i;
    }

    let formattedTime;
    $: if ($currentTime) {
        const date = new Date($currentTime * 1000);
        formattedTime = `${leftPad(date.getFullYear())}${leftPad(date.getMonth() + 1)}${leftPad(date.getDate())} @ ${leftPad(date.getHours())}:${leftPad(date.getMinutes())}:${leftPad(date.getSeconds())}`;
    }
</script>

<aside>
    <header>
        <h1>Sprocket Orbital Tracker</h1>
        <hr/>
        <i>Press Shift+Space to pause/play</i>
    </header>

    <section>
        <header><h2>Filters</h2></header>
        <label>
            Dataset:
            <Select options={availableDatasets} on:change={handleSelectDataset}/>
        </label>
    </section>

    <section>
        <header><h2>Controls</h2></header>
        <pre>As of {formattedTime} (local time)</pre>
        <div class="buttonRow">
            <button class:active={PlaybackManager.increment === Increment.SLOWER} on:click={() => { updateIncrement(Increment.SLOWER) }}>Slower</button>
            <button class:active={PlaybackManager.increment === Increment.SLOW} on:click={() => { updateIncrement(Increment.SLOW) }}>Slow</button>
            <button class:active={PlaybackManager.increment === Increment.REAL_TIME} on:click={() => { updateIncrement(Increment.REAL_TIME) }}>Real Time</button>
            <button class:active={PlaybackManager.increment === Increment.FAST} on:click={() => { updateIncrement(Increment.FAST) }}>Fast</button>
            <button class:active={PlaybackManager.increment === Increment.FASTER} on:click={() => { updateIncrement(Increment.FASTER) }}>Faster</button>
        </div>
        <button on:click={() => { $playing = !$playing }} class="play">
            {$playing ? "Pause" : "Play"}
        </button>
        <button class="w-full mt-2" on:click={() => { $currentTime = Math.floor(new Date().getTime() / 1000) }}>Reset to Now</button>
    </section>
</aside>

<style lang="postcss">
    aside {
        @apply px-6 py-8;
    }
    header {
        @apply text-center mb-4;
    }
    header:not(aside > header) {
        @apply mt-6;
    }
    header h1 {
        @apply text-2xl font-bold mb-2 text-primary-500;
    }
    header hr {
        @apply border-primary-500 my-2;
    }
    hr {
        @apply mx-4 my-4;
    }
    section > header {
        @apply mb-8;
    }
    section header h2 {
        @apply text-xl font-bold mb-2;
    }
    section label {
        @apply flex justify-between;
    }
    section label :global(select) {
        @apply w-2/3;
    }
    section {
        @apply border-t-2 border-primary-500 pb-4;
    }
    .buttonRow {
        @apply flex my-2;
    }
    .buttonRow button.active {
        @apply bg-green-500;
    }
    button.play {
        @apply w-full bg-green-500 active:bg-green-700 hover:bg-green-600;
    }
</style>