<!-- <script lang="ts" context="module">
    export const load = async ({fetch}) => {
        return {
            props: {
                wasmBuffer: await fetch("/main.wasm").then(r => r.arrayBuffer()),
            }
        }
    }
</script> -->
<script lang="ts">
	import '../app.postcss';
	// import ContextProvider from "$lib/components/abstract/ContextProvider.svelte";
	// export let wasmBuffer: ArrayBuffer;
</script>

<!-- {#await WebAssembly.instantiate(wasmBuffer)}
    Loading...
{:then wasm}
<ContextProvider key="wasm" value={wasm.instance.exports}> -->
<slot />
<!-- </ContextProvider>
{/await} -->
