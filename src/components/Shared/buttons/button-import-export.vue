<template>
    <q-btn
        round
        :color="color || 'primary'"
        icon="import_export"
        @click="clicked"
    ></q-btn>
</template>

<script>
export default {
    props:[ 'color' ],

    methods:{
        clicked(){
            this.$emit('clicked');
        }
    }
}
</script>