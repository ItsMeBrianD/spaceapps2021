<div>
    <div class=" flex justify-center items-center"/>
    <div class="loader"/>
</div>

<style lang="postcss">
    .loader {
        @apply border-gray-200 h-16 w-16 rounded-full ease-linear border-4 border-t-4;
        border-top-color: theme("colors.secondary.500");
        -webkit-animation: spinner 1.5s linear infinite;
        animation: spinner 1.5s linear infinite;
    }

    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>