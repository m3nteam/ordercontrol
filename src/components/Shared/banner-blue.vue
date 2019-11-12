<template>
    <q-banner
        class="bg-primary text-white"
        rounded
        >
            <div class="row">
                <span class="text-h6">{{ title }}</span>
                <q-space />
                <slot />
            </div>
    </q-banner>
</template>

<script>
    export default {
        props: ['title']
    }
</script>


