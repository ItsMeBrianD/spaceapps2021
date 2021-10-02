<script context="module">
	export const ssr = false;
</script>
<script lang="ts">
	import WasmProvider from "$lib/components/abstract/WasmProvider.svelte";
	import Map from "$lib/components/atoms/Map.svelte";
	import WasmDebug from "$lib/components/atoms/WasmDebug.svelte";
	import {setContext} from "svelte";
	import {TleStore} from "../lib/state/TleStore";
	import {ContextKeys} from "../lib/utils/constants";

	const store: TleStore = new TleStore();
	setContext(ContextKeys.WasmStore, store);


</script>
<WasmProvider let:wasm>
	{#if wasm}
		<WasmDebug/>
		<!-- {@debug wasm}
		{@debug wasm} -->
	{/if}
	<!-- {#if $store.loading}
		Loading...
	{:else if !$store.loading}
		<Map />
	{/if} -->
</WasmProvider>


