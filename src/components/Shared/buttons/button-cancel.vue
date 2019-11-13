<template>
    <q-btn
        round
        color="negative"
        icon="close"
        @click="clicked"
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