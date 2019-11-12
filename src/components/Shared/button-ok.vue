<template>
    <q-btn
        round
        color="positive"
        icon="check"
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