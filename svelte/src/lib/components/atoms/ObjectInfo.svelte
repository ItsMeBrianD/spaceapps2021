<script lang="ts">
    import { selectedObject } from "$lib/state/AppState";

    let cat;
    const getCatInfo = async () => {
        cat = await fetch(`/api/satcat?catId=${$selectedObject.id}`).then(r => r.json());
        console.log(cat);
    }

    if ($selectedObject) {
        getCatInfo();
    }

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
</div>



<style lang="postcss">
    div {
        @apply w-full text-sm border-2 border-secondary-500 px-4 py-2;
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