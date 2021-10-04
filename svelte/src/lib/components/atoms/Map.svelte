<script lang="ts">
	import {
    getContext, onDestroy, onMount,
} from "svelte";
import type {TleStore} from "../../state/TleStore";
import {ContextKeys} from "../../utils/constants";
import {WorldWindModule} from "../../utils/WorldWindModule";
	let canvas: HTMLCanvasElement | undefined;
	const wasmStore: TleStore = getContext(ContextKeys.WasmStore);

	onMount(async () => WorldWindModule.init(canvas, wasmStore));
	onDestroy(WorldWindModule.destroy);

</script>

<canvas bind:this={canvas}/>


<style lang="postcss">
	canvas {
		@apply w-full lg:h-full lg:mt-0 -mt-40 h-screen;
	}
</style>