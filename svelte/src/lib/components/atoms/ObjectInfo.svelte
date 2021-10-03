<script lang="ts">
    import { selectedObject } from "$lib/state/AppState";

    import satcat from "../../../../static/norad/satcat.json";

    let cat;
    if ($selectedObject) {
        cat = satcat.find(x => parseInt(x.NORAD_CAT_ID) === parseInt($selectedObject.id));
    }

    const formatLatLong = x => `${x > 0 ? "+" : ""}${x.toFixed(3)}`;
    const formatAlt = x => (x/1000).toFixed(3);
</script>

{#if $selectedObject}
    <table>
        <tr>
            <th>Catalog Number</th>
            <td>{$selectedObject.id}</td>
        </tr>
        {#if cat}
            <tr>
                <th>Name</th>
                <td>{cat.SATNAME}</td>
            </tr>
        {/if}
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
    </table>
{/if}



<style lang="postcss">
    table {
        @apply w-full;
    }
    tr {
        @apply border-b-2 border-primary-500 py-4 px-4;
    }

    th {
        @apply font-bold text-left;
    }
    td {
        @apply text-right;
    }
</style>