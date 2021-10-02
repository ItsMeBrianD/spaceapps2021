<script lang="ts">
    import { getContext } from "svelte";

    import type { TleWasmModule } from "$lib/state/TleWasmModule";
    import { availableDatasets, ContextKeys } from "$lib/utils/constants";
    import Select from "$lib/components/atoms/Select.svelte";


    const wasm: TleWasmModule = getContext(ContextKeys.WasmStore);
</script>

<section>
    <header>
        <h1>Sprocket Orbital Tracker</h1>
        <hr/>
    </header>

    <div>
        <header><h2>Filters</h2></header>
        <label>
            Dataset:
            <Select options={availableDatasets}/>
        </label>
        
    </div>
</section>

<style lang="postcss">
    section {
        @apply px-6 py-8;
    }
    header h1 {
        @apply text-2xl font-bold text-center mb-2;
    }
    header hr {
        @apply mx-4;
    }
    section > Header {
        @apply mb-8;
    }
    div header h2 {
        @apply text-xl font-bold text-center mb-2;
    }
    div label {
        @apply flex justify-between;
    }
</style>