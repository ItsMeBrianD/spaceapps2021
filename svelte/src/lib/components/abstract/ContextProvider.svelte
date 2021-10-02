<script lang="ts">
	import { setContext } from 'svelte';

	export let key: string, value: unknown;

	setContext(key, value);
</script>

<slot />
