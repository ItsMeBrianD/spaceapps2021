<script lang="ts">
	import Map from '$lib/components/atoms/Map.svelte';
	import { setContext } from 'svelte';
	import { TleStore } from '../lib/state/TleStore';
	import { ContextKeys } from '../lib/utils/constants';

	const store: TleStore = new TleStore();
	setContext(ContextKeys.WasmStore, store);


</script>

{#if $store.loading}
	Loading...
{:else if !$store.loading}
	<Map />
{/if}

