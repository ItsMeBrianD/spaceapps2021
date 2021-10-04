<script lang="ts">
    import {selectedObject} from "$lib/state/AppState";
    import {onDestroy} from "svelte";
    import {WorldWindModule} from "../../utils/WorldWindModule";
    import Spinner from "./Spinner.svelte";

    let cat;
    let loading = false;
    const unsub = selectedObject.subscribe(async v => {
        if (!v?.id) {
            cat = undefined;
        } else if (!cat || cat.NORAD_CAT_ID !== parseInt(v.id)) {
            loading = true;
            cat = await fetch(`/api/satcat?catId=${v.id}`).then(async r => {
                if (r.status === 200) return r.json();
                return null;
            });
            if (cat) {
                WorldWindModule.placemarks[v.id].label = cat.OBJECT_NAME;
            }
            WorldWindModule.redraw();
            loading = false;
        }
    });
    onDestroy(unsub);


    const formatLatLong = x => `${x > 0 ? "+" : ""}${x.toFixed(3)}`;
    const formatAlt = x => (x / 1000).toFixed(3);
    const objectTypeToString = abbr => {
        switch (abbr) {
            case "PAY": return "Payload";
            case "DEB": return "Debris";
            case "R/B": return "Rocket Body";
            case "UNK": return "Unknown";
            default: return abbr;
        }
    };
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
                        <td>
                            <a href={`https://www.n2yo.com/satellite/?s=${$selectedObject.id}#results`} target="_blank">{$selectedObject ? $selectedObject.id : ""}</a>
                        </td>
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
        @apply w-full text-sm;
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

    a:hover {
        @apply cursor-pointer underline;
    }
</style>