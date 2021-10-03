<script lang="ts">
    import {getContext} from "svelte";

    import type {TleWasmModule} from "$lib/state/TleWasmModule";
    import {availableDatasets, ContextKeys} from "$lib/utils/constants";
    import Select from "$lib/components/atoms/Select.svelte";
    import type { TleStore } from "../../../state/TleStore";
    import { WorldWindModule } from "../../../utils/WorldWindModule";
    import { playing } from "../../../state/AppState";
    


    const wasm: TleStore = getContext(ContextKeys.WasmStore);

    async function handleSelectDataset(e) {
        // This one's for you Zach
        WorldWindModule.yeet();

        if (!e.target.value) return;
        
        const newDatasetLocation = e.target.value;
        
        const newData = await fetch(newDatasetLocation).then(async r => r.text());
        wasm.updateValues(newData);
        wasm.getPositions(Math.floor(new Date().getTime() / 1000));

        e.target.blur();
    }
</script>

<section>
    <header>
        <h1>Sprocket Orbital Tracker</h1>
        <hr/>
        <i>Press Shift+Space to pause/play</i>
    </header>

    <div>
        <header><h2>Filters</h2></header>
        <label>
            Dataset:
            <Select options={availableDatasets} on:change={handleSelectDataset}/>
        </label>
    </div>

    <div>
        <header><h2>Controls</h2></header>
        <button on:click={() => $playing = !$playing}>
            {#if $playing}
                Pause
            {:else}
                Play
            {/if}
        </button>
    </div>
</section>

<style lang="postcss">
    section {
        @apply px-6 py-8;
    }
    header {
        @apply text-center;
    }
    header h1 {
        @apply text-2xl font-bold mb-2;
    }
    header hr {
        @apply mx-4;
    }
    section > header {
        @apply mb-8;
    }
    div header h2 {
        @apply text-xl font-bold mb-2;
    }
    div label {
        @apply flex justify-between;
    }
    div label :global(select) {
        @apply w-2/3;
    }
</style>