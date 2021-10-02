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
        @apply w-full h-full;
    }
    aside {
        @apply w-96 h-full absolute top-0 left-0 z-20;
    }
    section {
        @apply w-full h-full z-0 flex justify-center items-center;
    }
</style>