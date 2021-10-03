<script lang="ts">
    import {getContext} from "svelte";

    import type {TleWasmModule} from "$lib/state/TleWasmModule";
    import {availableDatasets, ContextKeys} from "$lib/utils/constants";
    import Select from "$lib/components/atoms/Select.svelte";


    const wasm: TleWasmModule = getContext(ContextKeys.WasmStore);

    async function handleSelectDataset(e) {
        const newDatasetLocation = e.target.value;
        const newData = await fetch(newDatasetLocation).then(async r => r.text());
        console.log(newData);
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
            <Select options={availableDatasets} handleChange={handleSelectDataset}/>
        </label>
        
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