<template>
    <q-page>
        {{ this.prepareReport(this.dbObj) }}
    </q-page>
</template>

<script>
    import dbObjects from '../mixin/db-objects'
    import jsFunctions from '../mixin/js-functions'

    export default {
        mixins: [dbObjects, jsFunctions],
    }
</script>

<style>

</style>