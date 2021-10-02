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
        @apply w-full h-full text-gray-100 bg-gray-800;
    }
    aside {
        @apply w-96 h-full absolute top-0 left-0 z-20 text-gray-100 bg-gray-800;
    }
    section {
        @apply w-full h-full z-0 flex justify-center items-center text-gray-100 bg-gray-800;
    }
</style>