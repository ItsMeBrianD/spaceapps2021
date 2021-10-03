<script lang="ts">
	import WasmDebug from "$lib/components/atoms/WasmDebug.svelte";
	import {setContext} from "svelte";
	import {TleStore} from "$lib/state/TleStore";
	import {ContextKeys} from "$lib/utils/constants";

	const store: TleStore = new TleStore();
	setContext(ContextKeys.WasmStore, store);


</script>

<WasmDebug/>
