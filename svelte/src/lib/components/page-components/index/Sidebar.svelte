<script lang="ts">
    import {fly} from "svelte/transition";
    import {getContext} from "svelte";

    import {availableDatasets, ContextKeys} from "$lib/utils/constants";
    import Select from "$lib/components/atoms/Select.svelte";
    import type {TleStore} from "../../../state/TleStore";
    import {WorldWindModule} from "../../../utils/WorldWindModule";
    import {
        currentTime, PlaybackManager, playing, selectedObject,
} from "../../../state/AppState";
    import {leftPad} from "../../../utils/time";
    import ObjectInfo from "$lib/components/atoms/ObjectInfo.svelte";
    import DatePicker from "$lib/components/atoms/DatePicker.svelte";
    


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

    function updateIncrement(offset: number) {
        PlaybackManager.increment += offset;
    }
    function resetIncrement() {
        PlaybackManager.increment = 1;
    }

    let formattedTime;
    $: if ($currentTime) {
        const date = new Date($currentTime * 1000);
        formattedTime = `${leftPad(date.getFullYear())}${leftPad(date.getMonth() + 1)}${leftPad(date.getDate())} @ ${leftPad(date.getHours())}:${leftPad(date.getMinutes())}:${leftPad(date.getSeconds())}`;
    }
</script>

<aside>
    <header>
        <img src="/images/Full_Logo_Light.png" alt="Sprocket Orbital Tracker"/>
        <hr/>
        <i>Press Shift+Space to pause/play</i><br/>
        <i class="lg:hidden">Visualization is below filters</i>
    </header>

    <section>
        <header><h2>Filters</h2></header>
        <label>
            Dataset:
            <Select options={availableDatasets} on:change={handleSelectDataset}/>
        </label>
    </section>

    <section class="flex-1">
        <header><h2>Controls</h2></header>
        <pre>As of {formattedTime} (local time)</pre>
        <div class="buttonRow">
            <button on:click={() => updateIncrement(-2)}>--</button>
            <button on:click={() => updateIncrement(-1)}>-</button>
            <button on:click={resetIncrement}>{PlaybackManager.increment}x</button>
            <button on:click={() => updateIncrement(1)}>+</button>
            <button on:click={() => updateIncrement(2)}>++</button>
        </div>
        <button on:click={() => { $playing = !$playing }} class="play">
            {$playing ? "Pause" : "Play"}
        </button>
        <button class="w-full mt-2" on:click={() => PlaybackManager.setTime(Math.floor(new Date().getTime() / 1000))}>Reset to Now</button>
        <DatePicker
            on:datechange={(d) => PlaybackManager.setTime(d.detail / 1000)}
            selected={new Date($currentTime * 1000)}
        />
        
    </section>

    {#if $selectedObject}
        <section transition:fly={{y:50}}>
            <header><h2>Selected Object</h2></header>
            <ObjectInfo />
        </section>
    {/if}
</aside>

<style lang="postcss">
    aside {
        @apply px-6 py-8 flex flex-col h-full;
    }
    img {
        @apply w-1/2 mx-auto mb-4;
        max-height: 8rem;
        width: auto;
    }
    header {
        @apply text-center mb-2;
    }
    header:not(aside > header) {
        @apply mt-2;
    }
    header hr {
        @apply border-primary-500 my-2;
    }
    hr {
        @apply mx-4 my-4;
    }
    section > header {
        @apply mb-4;
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
        @apply flex my-2 justify-between;
    }
    .buttonRow button {
        @apply flex-1;
    }
    button.play {
        @apply w-full bg-green-500 active:bg-green-700 hover:bg-green-600;
    }
</style>