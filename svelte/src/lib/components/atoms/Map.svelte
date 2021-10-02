<script lang="ts" context="module">
	import {tileLayer} from "leaflet";

	export const ssr = false;

	const terrain = tileLayer(
	    "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.{ext}",
	    {
	        attribution:
				"Map tiles by <a href=\"http://stamen.com\">Stamen Design</a>, <a href=\"http://creativecommons.org/licenses/by/3.0\">CC BY 3.0</a> &mdash; Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors",
	        subdomains: "abcd",
	        minZoom: 0,
	        maxZoom: 18,
	        ext: "png",
	    },
	);
</script>

<script lang="ts">
	import {onMount} from "svelte";
	import {map} from "leaflet";
	import type {Map} from "leaflet";

	let el: HTMLElement | undefined;
	let mapInstance: Map | undefined;

	onMount(() => {
	    mapInstance = map(el, {
	        // center: [0, 0],
	        zoom: 3,
			minZoom: 3,
			maxBounds: [[-Infinity, -Infinity], [Infinity, Infinity]]
	    });
	    terrain.addTo(mapInstance);
		
		mapInstance.setView([48, -3], 2.5)
		mapInstance.on('zoom', console.log)
	});
</script>

<div class="map" bind:this={el} />

<slot map={mapInstance}/>

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
