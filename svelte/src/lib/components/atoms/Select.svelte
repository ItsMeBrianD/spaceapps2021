<script lang="ts" context="module">
    export interface SelectOption {
    label: string,
    value: string,
    group?: string
    };

</script>


<script lang="ts">
    export let options: SelectOption[];
    export let handleChange: (e: any) => Promise<void>;

    let groups: Record<string, SelectOption[]> = {};
    $: groups = options.reduce<Record<string, SelectOption[]>>((acc, val) => {
        if (val.group) {
            if (!acc[val.group]) {
                acc[val.group] = [];
            }
            acc[val.group].push(val);
        } else {
            if (!acc.__) {
                acc.__ = [];
            }
            acc.__.push(val);
        }

        return acc;
    }, {});
</script>


<select on:change={handleChange}>
    {#each Object.entries(groups) as [group, values]}
        {#if group !== "__"}
            <optgroup label={group}>
                {#each values as opt (opt.value)}
                    <option value={opt.value}>{opt.label}</option> 
                {/each}
            </optgroup>
        {:else}
            {#each values as opt (opt.value)}
                <option value={opt.value}>{opt.label}</option> 
            {/each}
        {/if}
    {/each}
</select>

<style lang="postcss">
    select {
        @apply text-gray-100 bg-gray-800;
    }
</style>