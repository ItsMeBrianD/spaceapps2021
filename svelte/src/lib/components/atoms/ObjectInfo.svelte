<script lang="ts">
    import { selectedObject } from "$lib/state/AppState";
import { onDestroy } from "svelte";
import { WorldWindModule } from "../../utils/WorldWindModule";
import Spinner from "./Spinner.svelte";

    let cat;
    let loading = false;
    const getCatInfo = async () => {
        
        console.log(cat);
    }

    const unsub = selectedObject.subscribe(async (v) => {
        if(!v?.id) {
            cat = undefined;
        } else {
            loading = true;
            cat = await fetch(`/api/satcat?catId=${v.id}`).then(r => r.json());
            WorldWindModule.placemarks[v.id].label = cat.OBJECT_NAME;
            WorldWindModule.redraw();
            loading = false;
        }
    });
    onDestroy(unsub);


    const formatLatLong = x => `${x > 0 ? "+" : ""}${x.toFixed(3)}`;
    const formatAlt = x => (x/1000).toFixed(3);
    const objectTypeToString = abbr => {
        switch (abbr) {
            case "PAY": return "Payload";
            case "DEB": return "Debris";
            case "R/B": return "Rocket Body";
            case "UNK": return "Unknown";
            default: return abbr;
        }
    }
</script>


<div>
    {#if loading} 
        <Spinner/>
    {:else} 
        {#if cat || $selectedObject}
            <table>
                <tbody>
                {#if $selectedObject}
                    <tr>
                        <th>Catalog Number</th>
                        <td>{$selectedObject ? $selectedObject.id : ""}</td>
                    </tr>
                {/if}
                {#if cat}
                    <tr>
                        <th>Name</th>
                        <td>{cat.OBJECT_NAME}</td>
                    </tr>
                    <tr>
                        <th>Object Type</th>
                        <td>{objectTypeToString(cat.OBJECT_TYPE)}</td>
                    </tr>
                    <tr>
                        <th>Owner</th>
                        <td>{cat.OWNER}</td>
                    </tr>
                    <tr>
                        <th>Launch Date</th>
                        <td>{cat.LAUNCH_DATE}</td>
                    </tr>
                    <tr>
                        <th>Launch Site</th>
                        <td>{cat.LAUNCH_SITE}</td>
                    </tr>
                {/if}
                </tbody>
                {#if cat}
                <tbody>
                    <tr>
                        <th>Apogee</th>
                        <td>{cat.APOGEE}</td>
                    </tr>
                    <tr>
                        <th>Perigee</th>
                        <td>{cat.PERIGEE}</td>
                    </tr>
                    <tr>
                        <th>Period</th>
                        <td>{cat.PERIOD}</td>
                    </tr>
                </tbody>
                {/if}
                {#if $selectedObject}
                <tbody>
                    <tr>
                        <th>Latitude</th>
                        <td>{formatLatLong($selectedObject.lat)}°</td>
                    </tr>
                    <tr>
                        <th>Longitude</th>
                        <td>{formatLatLong($selectedObject.long)}°</td>
                    </tr>
                    <tr>
                        <th>Altitude</th>
                        <td>{formatAlt($selectedObject.alt)} km</td>
                    </tr>
                </tbody>
                {/if}
            </table>
        {/if}

    {/if}
</div>



<style lang="postcss">
    div {
        @apply w-full text-sm border-2 border-secondary-500 px-4 py-2 flex justify-center items-center;
        height: 288px;
    }
    table {
        @apply w-full
    }
    tr {
        @apply w-full;
    }

    th {
        @apply font-bold text-left;
    }
    td {
        @apply text-right;
    }
    tbody:not(:first-child) {
        @apply border-t-2 border-secondary-500;
    }
</style>