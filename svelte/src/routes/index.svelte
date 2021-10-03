<script lang="ts">
	import {browser} from "$app/env";
	import Map from "$lib/components/atoms/Map.svelte";
	import {setContext} from "svelte";
	import {TleStore} from "$lib/state/TleStore";
	import {ContextKeys} from "$lib/utils/constants";
	import DefaultLayout from "$lib/components/layouts/DefaultLayout.svelte";
	import Sidebar from "$lib/components/page-components/index/Sidebar.svelte";
	import Spinner from "$lib/components/atoms/Spinner.svelte";
	import {readable} from "svelte/store";
	
	let store;
	if (browser) {
	    store = new TleStore();
	    setContext(ContextKeys.WasmStore, store);
	} else {
	    store = readable({loading: true});
	}
</script>


<DefaultLayout>
	{#if $store.loading}
		<Spinner/>
	{:else if !$store.loading}
		<Map/>
	{/if}
	<Sidebar slot="aside"/>
</DefaultLayout>