<script lang="ts">
	import {browser} from "$app/env";
	import {setContext} from "svelte";
	import {TleStore} from "$lib/state/TleStore";
	import {ContextKeys} from "$lib/utils/constants";
	import Spinner from "$lib/components/atoms/Spinner.svelte";
	import { readable } from "svelte/store";
import WasmDebug from "$lib/components/atoms/WasmDebug.svelte";

	
	let store;
	if (browser) {
		store = new TleStore();
		setContext(ContextKeys.WasmStore, store);
	} else {
		store = readable({loading: true});
	}
</script>


<div>

	{#if $store.loading}
	<Spinner/>
	{:else if !$store.loading}
	Wasm Store Running
	<WasmDebug/>
	{/if}
</div>


<style lang="postcss">

</style>