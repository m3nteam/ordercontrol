<template>
    <q-banner
        class="bg-primary text-white"
        rounded
        >
            <div class="row">
                <span class="col text-h6 justify-center">{{ title }}</span>
                <slot />
            </div>
    </q-banner>
</template>

<script>
    export default {
        props: ['title']
    }
</script>


