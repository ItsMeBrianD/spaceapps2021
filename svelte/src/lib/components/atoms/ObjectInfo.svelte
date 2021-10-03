<script lang="ts">
    import { selectedObject } from "$lib/state/AppState";

    let cat;
    const getCatInfo = async () => {
        cat = await fetch(`/api/satcat?catId=${$selectedObject.id}`).then(r => r.json());
    }

    if ($selectedObject) {
        getCatInfo();
    }

    const formatLatLong = x => `${x > 0 ? "+" : ""}${x.toFixed(3)}`;
    const formatAlt = x => (x/1000).toFixed(3);
</script>


{#if cat}
    <table>
        <tr>
            <th>Catalog Number</th>
            <td>{$selectedObject ? $selectedObject.id : ""}</td>
        </tr>
        {#if cat}
            <tr>
                <th>Name</th>
                <td>{cat.SATNAME}</td>
            </tr>
            <tr>
                <th>Object Type</th>
                <td>{cat.OBJECT_TYPE}</td>
            </tr>
            <tr>
                <th>Country</th>
                <td>{cat.COUNTRY}</td>
            </tr>
            <tr>
                <th>Launch Date</th>
                <td>{cat.LAUNCH}</td>
            </tr>
            <tr>
                <th>Launch Site</th>
                <td>{cat.SITE}</td>
            </tr>
            <tr>
                <th>Apogee</th>
                <td>{cat.APOGEE}</td>
            </tr>
            <tr>
                <th>Perigee</th>
                <td>{cat.PERIGEE}</td>
            </tr>
        {/if}
    </table>
{/if}

<br />

{#if $selectedObject}
    <table>
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