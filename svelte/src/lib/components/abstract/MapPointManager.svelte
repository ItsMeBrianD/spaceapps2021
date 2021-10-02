<script lang="ts">
    import {icon, GeoJSON, Map, marker, point, Layer} from "leaflet";
    import { getRandomGeoJson } from "../../utils/mocks";
    import {geoJSON} from "leaflet";
import { onMount } from "svelte";


    export let map: Map | undefined;

    let points = [];
    let pointsLayer: GeoJSON | undefined;
    let playing = false;
    let animating = false;
    let layerMap: Record<string, Layer> = {}

    onMount(() => {
        points = new Array(500).fill("").map(getRandomGeoJson)
    })

    $: if(points && map) {
        pointsLayer = geoJSON(points,
        {
            pointToLayer: (point, latlng) => marker(latlng, {
                icon: icon({iconUrl: "/icons/space/23-sputnik.svg",
                iconSize: [50, 50],
                // iconAnchor: [25, 25],
                popupAnchor: [0,-25]
            })}),
            onEachFeature: (f, l) => {
                layerMap[f.properties.name] = l;
                
                l.bindPopup(f.properties.name)
            }
        });
        map.addLayer(pointsLayer)

        pointsLayer.bringToFront();
    }

    function updateData() {
        if (!pointsLayer)  return;
        points.forEach((point, i) => {
            const layer = layerMap[point.properties.name];
            
            layer.setLatLng([point.geometry.coordinates[0], point.geometry.coordinates[1] + 1]);
            point.geometry.coordinates = [point.geometry.coordinates[0], point.geometry.coordinates[1] + 1]
            
        })
    }

    async function animate() {
        console.log("tick");
        animating = true;
        updateData();
        await new Promise(r => setTimeout(r, 34));
        
        if(playing) requestAnimationFrame(animate);
        else animating = false;
    }

    $: if (pointsLayer && playing && !animating) {    
        animate();
    } 
    $: console.log(playing);

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " " && e.getModifierState("Control")) {
            playing = !playing;
        }
    }

</script>

<svelte:body on:keydown={handleKeydown}/>