<script lang="ts">
	import {onDestroy, onMount} from "svelte";
	import {
Map, TileLayer, ParticleLayer, VectorLayer, Circle, Marker, Point
} from "maptalks";
	let el: HTMLElement | undefined;
	let map;
	onMount(() => {
	    map = new Map(el, {
     		center: [0, 0],
			 draggable: false,
			 dragPan: false,
			 dragRotate: false,
			 dragPitch: false,
			 minZoom: 2.5,
			 maxExtent: [0, 0, 180, 180],
			 scrollWheelZoom: false,
			 touchZoom: false,
			 doubleClickZoom: false,
     		zoom: 2,
     		baseLayer: new TileLayer("base", {
       			"urlTemplate" : "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
       			"subdomains"  : ["a", 'b', 'c', 'd'],
       			"attribution"  : "&copy; <a href=\"http://www.osm.org/copyright\">OSM</a> contributors, "+
       			"&copy; <a href=\"https://carto.com/attributions\">CARTO</a>"
     		}),
			 layers : [
         		 new VectorLayer('v')
        	]
	    });
		
	    window.map = map;
	    const particles = new ParticleLayer("MYPARTICLELAYER");
		const center = map.getCenter();
		console.log(center);

	    particles.getParticles = function(t) {
	        return [
	            {
					point: new Point({
		                x: Math.sin(t) * 10,
		                y: 5,
	    	        }),
	        	    r: 40,
	            	color: "rgb(0,255,0)"
				},
				{
					point: new Point({
		                y: Math.cos(t) * 10,
		                x: 5,
	    	        }),
	        	    r: 40,
	            	color: "rgb(255,0,0)"
				},
	        ];
	    };
	    map.addLayer(particles);

		new Marker(center, {
        symbol : {
          markerType : 'cross',
          markerWidth : 10,
          markerHeight : 10,
          markerLineWidth : 2
        }
      })
      .addTo(map.getLayer('v'));

      new Circle(center, 1000, {
        symbol : {
          lineColor : '#fff',
          lineWidth : 6,
          lineOpacity : 0.2,
          polygonOpacity : 0
        }
      })
      .addTo(map.getLayer('v'));
		
	});
	onDestroy(() => {
	    map.remove();
	    window.map = undefined;
	});

</script>

<div bind:this={el}/>

<style lang="postcss">
	div {
		@apply h-full w-full;
	}
</style>