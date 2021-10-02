<script lang="ts">
    import type {
        GeoJSON, Map, Layer,
} from "leaflet";
import type {Feature} from "geojson";

    import {getRandomGeoJson} from "../../utils/mocks";
    import {onMount} from "svelte";


    export let map: Map | undefined;
    export let tangram;

    let points: Feature[] = [];
    let playing = false;
    let animating = false;
    const layerMap: Record<string, Layer> = {};
    let scene;
    $: scene = tangram?.scene;
    $: window.tangram = tangram;


    async function attachToTangram() {
        if (!scene.initialized) {
            await new Promise(res => scene.subscribe({view_complete: res}));
        }
        scene.setDataSource("mySource", {
            type: "GeoJSON",
            data: {
                type: "FeatureCollection",
                features: points ?? []
            }
        });
        scene.config.layers["myLayers"] = {
            data: {
                source: "mySource"
            },
            draw: {
                points: {
                    color: "blue",
                    size: "20px"
                }
            }
        }
        scene.updateConfig();
    }

    $: if (scene) {
        attachToTangram();
    }


    onMount(() => {
        points = new Array(50).fill("")
            .map(getRandomGeoJson);
    });

    

    async function updateData() {
        points = points.map(p => {
            p.geometry.coordinates = [
                p.geometry.coordinates[0],
                p.geometry.coordinates[1] + 1
            ];
            return p;
        })
        scene.setDataSource("mySource", {
            type: "GeoJSON",
            data: {
                type: "FeatureCollection",
                features: points,
            }
        });
        await scene.updateConfig();
    }

    async function animate() {
        console.log("tick");
        animating = true;
        await updateData();
        // await new Promise(r => setTimeout(r, 50));
        
        if (playing) requestAnimationFrame(animate);
        else animating = false;
    }

    $: if (playing && !animating) {
        animate();
    }
    $: console.log(playing);

    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === " " && e.getModifierState("Control")) {
            playing = !playing;
        }
    };

</script>

<svelte:body on:keydown={handleKeydown}/>