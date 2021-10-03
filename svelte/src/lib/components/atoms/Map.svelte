<script lang="ts">
	import {getContext, onDestroy, onMount} from "svelte";
import type { TleStore } from "../../state/TleStore";
import { ContextKeys } from "../../utils/constants";
import { WorldWindModule } from "../../utils/WorldWindModule";
	// import * as worldwind from "@nasaworldwind/worldwind";

	let el: HTMLElement | undefined;
	let canvas: HTMLCanvasElement | undefined;
	const wasmStore: TleStore = getContext(ContextKeys.WasmStore);

	onMount(async () => {
		WorldWindModule.init(canvas, wasmStore);
	});
	onDestroy(() => {
	    
	});

	function handleKeyPress(e: KeyboardEvent) {
		if (e.key === " " && e.getModifierState("Shift")) {
			if (WorldWindModule.playing) {
				console.log("Pause");
				WorldWindModule.pause();
			} else {
				console.log("Play");
				WorldWindModule.play();
			}
		}
	}

</script>

<svelte:body on:keypress={handleKeyPress}/>

<canvas bind:this={canvas}/>


<style lang="postcss">
	div, canvas {
		@apply h-full w-full;
	}
</style>