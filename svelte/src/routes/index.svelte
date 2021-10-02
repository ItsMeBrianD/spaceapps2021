<script lang="ts">
	import WasmProvider from '$lib/components/abstract/WasmProvider.svelte';
</script>

<WasmProvider let:wasm>
	{#if wasm}
		<pre>
            {wasm.hello()}
        </pre>
	{:else}
		Loading...
	{/if}
</WasmProvider>
