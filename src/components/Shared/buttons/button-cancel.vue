<template>
    <q-btn
        round
        :color="color || 'negative'"
        icon="close"
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