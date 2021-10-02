<div>
    <div class=" flex justify-center items-center"/>
    <div class="loader"/>
</div>

<style lang="postcss">
    .loader {
        @apply border-gray-200 h-32 w-32 rounded-full ease-linear border-8 border-t-8;
        border-top-color: theme("colors.blue.500");
        -webkit-animation: spinner 1.5s linear infinite;
        animation: spinner 1.5s linear infinite;
    }

    @keyframes spinner {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>