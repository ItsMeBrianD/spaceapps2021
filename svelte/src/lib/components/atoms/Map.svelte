<script lang="ts" context="module">
	export const ssr = false;

</script>

<script lang="ts">
	import {onMount} from "svelte";
	import {map} from "leaflet";
	import type {Map} from "leaflet";
	import {leafletLayer} from "tangram";
	console.log(leafletLayer);

	let el: HTMLElement | undefined;
	let mapInstance: Map | undefined;
	let tangramInstance;

	onMount(() => {
	    mapInstance = map(el, {
	        // center: [0, 0],
	        zoom: 3,
	        minZoom: 3,
	        maxBounds: [ [-Infinity, -Infinity], [Infinity, Infinity] ],
	    });
	    tangramInstance = leafletLayer({scene: "tangram.yaml"});
	    mapInstance.addLayer(tangramInstance);

		
	    mapInstance.setView([48, -3], 2.5);
	});
</script>

<div class="map" bind:this={el} />

<slot map={mapInstance} tangram={tangramInstance}/>

<style lang="postcss">
	.map {
		@apply h-full w-full text-primary-500;
	}
	.map :global(.leaflet-control-container) {
		@apply hidden;
	}
	.map :global(img) {
		@apply inline absolute;
		will-change: opacity;
	}
</style>
