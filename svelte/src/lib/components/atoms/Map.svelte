<script lang="ts">
	import {onDestroy, onMount} from "svelte";
	// import * as worldwind from "@nasaworldwind/worldwind";

	let el: HTMLElement | undefined;
	let canvas: HTMLCanvasElement | undefined;
	onMount(async () => {
		const WorldWind = await import("@nasaworldwind/worldwind");
		console.log(WorldWind);
		WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING)

		const worldWindow = new WorldWind.WorldWindow(canvas);
		const layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.DigitalGlobeTiledImageLayer("Digital Globe", "digitalglobe.n6ngnadl", accessToken),
                enabled: true},
            {layer: new WorldWind.DigitalGlobeTiledImageLayer("Digital Globe with Roads", "digitalglobe.n6nhclo2", accessToken),
                enabled: false},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWind UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true}
        ];
	});
	onDestroy(() => {
	    
	});

</script>

<canvas bind:this={canvas}/>
<div bind:this={el}/>

<style lang="postcss">
	div, canvas {
		@apply h-full w-full;
	}
</style>