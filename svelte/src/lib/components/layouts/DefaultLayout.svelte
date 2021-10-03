<script lang="ts">

</script>


<main>
    <aside>
        <slot name="aside"/>
    </aside>
    <section>
        <slot/>
    </section>
</main>


<style lang="postcss">
    main {
        @apply w-full h-full text-gray-100 bg-gray-800 flex lg:flex-row flex-col;
    }
    aside {
        @apply w-full lg:w-600px lg:overflow-y-auto top-0 left-0 z-20 text-gray-100 bg-gray-800 max-w-full;
        
    }
    section {
        @apply w-full h-full z-0 flex justify-center items-center text-gray-100 bg-gray-800;
    }
</style>