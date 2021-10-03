<script lang="ts">
	import {
    getContext, onDestroy, onMount,
} from "svelte";
import {playing} from "../../state/AppState";
import type {TleStore} from "../../state/TleStore";
import {ContextKeys} from "../../utils/constants";
import {WorldWindModule} from "../../utils/WorldWindModule";
	let canvas: HTMLCanvasElement | undefined;
	const wasmStore: TleStore = getContext(ContextKeys.WasmStore);

	onMount(async () => WorldWindModule.init(canvas, wasmStore));
	onDestroy(() => {
	    
	});

	function handleKeyPress(e: KeyboardEvent) {
	    if (e.key === " " && e.getModifierState("Shift")) {
	        $playing = !$playing;
	    }
	}

</script>

<svelte:body on:keypress={handleKeyPress}/>

<canvas bind:this={canvas}/>


<style lang="postcss">
	div, canvas {
		@apply w-full lg:h-full lg:mt-0 -mt-40 h-screen;
	}
</style>