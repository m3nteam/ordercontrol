<template>
    <q-btn
        round
        :flat="flat"
        :color="color || 'negative'"
        icon="delete"
        @click.stop="clicked"
    ></q-btn>
</template>

<script>
export default {
    props:[ 'color', 'flat' ],

    methods:{
        clicked(){
            this.$emit('clicked');
        }
    }
}
</script>