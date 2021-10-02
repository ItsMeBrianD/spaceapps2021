<script lang="ts">
	import {onMount} from "svelte";
	import ContextProvider from "./ContextProvider.svelte";

	let value = false;
	let loading;

	onMount(() => {
	    loading = import("$lib/wasm/wasm").then(async wasmMod =>        new Promise(res => {
	        const moduleRef = {
	            onRuntimeInitialized: () => { res(moduleRef) },
	        };
	        wasmMod.default(moduleRef);
	    }).then(val => { value = val }));
	});
</script>

{#await loading}
	...
{:then}
	<ContextProvider key="wasm" {value}>
		<slot wasm={value} />
	</ContextProvider>
{/await}
