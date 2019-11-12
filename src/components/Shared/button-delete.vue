<template>
    <q-btn
        round
        flat
        color="negative"
        icon="delete"
        @click.stop="clicked"
    ></q-btn>
</template>

<script>
export default {
    props:[],

    methods:{
        clicked(){
            this.$emit('clicked');
        }
    }
}
</script>