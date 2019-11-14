<template>
    <q-btn
        round
        :color="color || 'positive'"
        icon="check"
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