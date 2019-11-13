<template>
    <q-expansion-item
        dense
        :label="item.name"
        :caption="item.id"
        group="group1"
    >
        <template v-slot:header>
            <partner-avatar
                :partnerId="item.id"
                :partnerName="item.name"
                size="40px"
            />
            <q-space />
        </template>
        <slot />
    </q-expansion-item>
</template>

<script>
    export default {
        props:['item'],

        components:{
            'partner-avatar': require('../Partner/partner-avatar').default
        }
    }
</script>